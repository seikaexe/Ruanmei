/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import config from '../config.js'

/*
  Identitas WhatsApp modern memakai dua format:
  - PN  : 628xxx@s.whatsapp.net  (nomor telepon)
  - LID : 1234xxx@lid            (ID anonim, dipakai di grup)
  Modul ini menyatukan keduanya supaya deteksi owner/admin akurat di grup maupun chat pribadi.
*/

const PN = 's.whatsapp.net'

export function normJid(jid) {
    jid = String(jid || '')
    if (!jid) return ''
    const [left, server] = jid.split('@')
    const user = left.split(':')[0]
    if (!server) return user
    return `${user}@${server === 'c.us' ? PN : server}`
}
export const isLid = (j) => normJid(j).endsWith('@lid')
export const isPn = (j) => normJid(j).endsWith(`@${PN}`)
export const toNumber = (j) => normJid(j).split('@')[0]

const digits = (n) => String(n).replace(/\D/g, '')
const pnSet = (list) => new Set([].concat(list || []).map(digits).filter(Boolean).map((n) => `${n}@${PN}`))
const lidSet = (list) =>
    new Set(
        [].concat(list || [])
            .map((x) => String(x).trim())
            .filter(Boolean)
            .map((x) => normJid(x.includes('@') ? x : `${x}@lid`))
    )

// LID yang sudah terverifikasi milik owner/creator (lewat pemetaan server). Hanya di memori.
const learnedOwner = new Set()
const learnedCreator = new Set()

const ownerPn = () => pnSet(config.owner)
const creatorPn = () => pnSet(config.creatorNumber?.length ? config.creatorNumber : config.owner)

export async function lidToPn(sock, lid) {
    try {
        const r = await sock?.signalRepository?.lidMapping?.getPNForLID?.(normJid(lid))
        return r ? normJid(String(r).includes('@') ? r : `${r}@${PN}`) : null
    } catch {
        return null
    }
}

export async function pnToLid(sock, pn) {
    try {
        const r = await sock?.signalRepository?.lidMapping?.getLIDForPN?.(normJid(pn))
        return r ? normJid(String(r).includes('@') ? r : `${r}@lid`) : null
    } catch {
        return null
    }
}

/** Dipanggil saat koneksi terbuka: petakan nomor owner/creator ke LID-nya. */
export async function learnOwnerLids(sock) {
    for (const pn of ownerPn()) {
        const lid = await pnToLid(sock, pn)
        if (lid) learnedOwner.add(lid)
    }
    for (const pn of creatorPn()) {
        const lid = await pnToLid(sock, pn)
        if (lid) learnedCreator.add(lid)
    }
}

// ===== Cache metadata grup =====
const groupCache = new Map()
const GROUP_TTL = 5 * 60 * 1000

export async function getGroupMeta(sock, jid) {
    const c = groupCache.get(jid)
    if (c && Date.now() - c.t < GROUP_TTL) return c.meta
    try {
        const meta = await sock.groupMetadata(jid)
        groupCache.set(jid, { meta, t: Date.now() })
        return meta
    } catch (e) {
        console.log(`[group] gagal mengambil metadata ${jid}: ${e.message}`)
        return c?.meta || null
    }
}
export const cachedGroupMetadata = async (jid) => groupCache.get(jid)?.meta
export const invalidateGroup = (jid) => groupCache.delete(jid)

/** Kumpulkan semua identitas (PN + LID) pengirim pesan. */
export async function resolveSender(sock, raw) {
    const key = raw.key
    const chat = key.remoteJid
    const group = chat.endsWith('@g.us')
    const ids = new Set()
    const add = (j) => {
        j = normJid(j)
        if (j) ids.add(j)
    }

    if (key.fromMe) {
        add(sock.user?.id)
        add(sock.user?.lid)
    } else if (group) {
        add(key.participant)
        add(key.participantAlt)
    } else {
        add(chat)
        add(key.remoteJidAlt)
    }

    let pn = [...ids].find(isPn) || null
    let lid = [...ids].find(isLid) || null

    if (!pn && lid) {
        pn = await lidToPn(sock, lid)
        if (pn) ids.add(pn)
    }
    if (!pn && lid && group) {
        // fallback: cari nomor di daftar peserta grup
        const meta = await getGroupMeta(sock, chat)
        const p = meta?.participants?.find((x) => normJid(x.id) === lid || normJid(x.lid) === lid)
        if (p?.phoneNumber) {
            pn = normJid(p.phoneNumber)
            ids.add(pn)
        }
    }
    if (!lid && pn) {
        lid = await pnToLid(sock, pn)
        if (lid) ids.add(lid)
    }

    const list = [...ids]
    return { ids: list, pn, lid, jid: pn || lid || list[0] || chat }
}

/** Tentukan owner & creator. Pencocokan EXACT, tidak ada pencocokan sebagian. */
export function checkRoles(ids, fromMe = false) {
    const list = ids.map(normJid)
    const owners = ownerPn()
    const creators = creatorPn()
    const ownerLids = lidSet(config.ownerLid)
    const creatorLids = lidSet(config.creatorLid?.length ? config.creatorLid : config.ownerLid)

    // PN terverifikasi + punya LID -> ingat LID-nya
    const pnMatchOwner = list.some((i) => owners.has(i))
    const pnMatchCreator = list.some((i) => creators.has(i))
    for (const i of list) {
        if (isLid(i)) {
            if (pnMatchOwner) learnedOwner.add(i)
            if (pnMatchCreator) learnedCreator.add(i)
        }
    }

    const isCreator = !!fromMe || list.some((i) => creators.has(i) || creatorLids.has(i) || learnedCreator.has(i))
    const isOwner = isCreator || list.some((i) => owners.has(i) || ownerLids.has(i) || learnedOwner.has(i))
    return { isOwner, isCreator }
}

export const participantIds = (p) => [p.id, p.lid, p.phoneNumber].map(normJid).filter(Boolean)

export function isGroupAdmin(meta, ids) {
    const want = ids.map(normJid)
    return !!meta?.participants?.some((p) => p.admin && participantIds(p).some((i) => want.includes(i)))
}