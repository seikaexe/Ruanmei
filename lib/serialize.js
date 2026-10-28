/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import { normJid, isLid, resolveSender, checkRoles, lidToPn } from './identity.js'

const WRAPPERS = ['ephemeralMessage', 'viewOnceMessage', 'viewOnceMessageV2', 'viewOnceMessageV2Extension', 'documentWithCaptionMessage', 'editedMessage']
// Key yang bukan isi pesan. Di grup key pertama sering "senderKeyDistributionMessage"/"messageContextInfo".
const SKIP = new Set(['senderKeyDistributionMessage', 'messageContextInfo', 'associatedChildMessage'])

function unwrap(msg) {
    while (msg) {
        const k = WRAPPERS.find((w) => msg[w])
        if (!k) break
        msg = msg[k].message
    }
    return msg
}

export function contentType(msg) {
    return Object.keys(msg || {}).find((k) => !SKIP.has(k) && msg[k] != null) || ''
}

function getText(msg, type) {
    if (!msg || !type) return ''
    const c = msg[type]
    if (!c) return ''
    if (typeof c === 'string') return c
    if (type === 'interactiveResponseMessage') {
        try {
            const p = JSON.parse(c.nativeFlowResponseMessage?.paramsJson || '{}')
            if (p.id) return p.id
        } catch {}
    }
    return c.text || c.caption || c.selectedButtonId || c.singleSelectReply?.selectedRowId || c.selectedId || ''
}

/** Parse sinkron (tanpa lookup identitas). */
export function parseMessage(sock, raw) {
    const chat = raw.key.remoteJid
    const m = {
        raw,
        key: raw.key,
        chat,
        fromMe: !!raw.key.fromMe,
        isGroup: chat.endsWith('@g.us'),
        pushName: raw.pushName || ''
    }
    const msg = unwrap(raw.message)
    m.message = msg
    m.type = contentType(msg)
    m.text = String(getText(msg, m.type) || '').trim()

    const ctxInfo = msg?.[m.type]?.contextInfo
    m.mentions = ctxInfo?.mentionedJid || []
    const qm = ctxInfo?.quotedMessage ? unwrap(ctxInfo.quotedMessage) : null
    m.quoted = qm
        ? { sender: ctxInfo.participant ? normJid(ctxInfo.participant) : null, message: qm, text: String(getText(qm, contentType(qm)) || '') }
        : null

    // sender sementara (diperbarui oleh identify)
    m.sender = normJid(m.fromMe ? sock.user?.id : m.isGroup ? raw.key.participant : chat)
    m.senderIds = [m.sender]
    m.isOwner = false
    m.isCreator = false

    m.reply = (text) => sock.sendMessage(chat, { text: String(text), mentions: m.mentions }, { quoted: raw })
    m.react = (emoji) => sock.sendMessage(chat, { react: { text: emoji, key: raw.key } })
    m.resolve = async (jid) => (isLid(jid) ? (await lidToPn(sock, jid)) || normJid(jid) : normJid(jid))
    return m
}

/** Lengkapi identitas pengirim (PN/LID) dan hak owner/creator. */
export async function identify(sock, m) {
    const who = await resolveSender(sock, m.raw)
    m.sender = who.jid
    m.senderPn = who.pn
    m.senderLid = who.lid
    m.senderIds = who.ids
    const roles = checkRoles(who.ids, m.fromMe)
    m.isOwner = roles.isOwner
    m.isCreator = roles.isCreator
    if (m.quoted?.sender && isLid(m.quoted.sender)) m.quoted.sender = await m.resolve(m.quoted.sender)
    return m
}

export async function serialize(sock, raw) {
    return identify(sock, parseMessage(sock, raw))
}