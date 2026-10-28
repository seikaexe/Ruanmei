/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import config from './config.js'
import logger from './lib/logger.js'
import { parseMessage, identify } from './lib/serialize.js'
import { getUser, updateUser } from './lib/database.js'
import { levelFromExp } from './lib/functions.js'
import { getGroupMeta, isGroupAdmin } from './lib/identity.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PLUGIN_DIR = path.join(__dirname, 'plugins')

export const features = [] // semua plugin yang ter-load
export const commands = new Map() // command -> plugin

const dbg = (...a) => config.debug === 'verbose' && console.log('[cmd]', ...a)

// Log semua balasan bot (teks, gambar, stiker, dll) tepat di bawah log pesan masuk
function hookSend(sock) {
    if (sock.__ruanLogHook) return
    sock.__ruanLogHook = true
    const original = sock.sendMessage.bind(sock)
    sock.sendMessage = async (jid, content, ...rest) => {
        const res = await original(jid, content, ...rest)
        if (!String(jid).endsWith('@newsletter') && jid !== 'status@broadcast')
            logger.reply(content, config.ownerName, config.botName)
        return res
    }
}

// Tipe pesan sistem yang tidak perlu dilog
const IGNORED_TYPES = new Set(['', 'protocolMessage', 'senderKeyDistributionMessage'])
const flag = (v) => v === true // metadata hanya aktif jika benar-benar true (handler.group = false TIDAK memblokir)

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name)
        return e.isDirectory() ? walk(p) : e.name.endsWith('.js') ? [p] : []
    })
}

/**
 * Autoload: semua file .js di plugins/ otomatis jadi command.
 * Format standar:
 *   const handler = async (m, { conn, args, text, command }) => {}
 *   handler.command = ['contoh']; handler.group = false; handler.desc = '...'
 *   export default handler
 * Format lama (export default { command, run }) tetap didukung.
 */
export async function loadPlugins() {
    features.length = 0
    commands.clear()
    for (const file of walk(PLUGIN_DIR)) {
        const rel = path.relative(__dirname, file)
        try {
            const mod = await import(pathToFileURL(file).href)
            const plugin = mod.default
            if (!plugin) continue
            const exec = typeof plugin === 'function' ? plugin : plugin.run
            if (typeof exec !== 'function' || !plugin.command) {
                logger.warn(`[plugin] dilewati (bukan plugin valid): ${rel}`)
                continue
            }
            plugin.exec = exec
            plugin.command = [].concat(plugin.command).map((c) => String(c).toLowerCase())
            plugin.category ||= path.basename(path.dirname(file))
            plugin.file = rel
            features.push(plugin)
            for (const c of plugin.command) {
                if (commands.has(c)) logger.warn(`[plugin] peringatan: command "${c}" ganda (${commands.get(c).file} & ${rel})`)
                commands.set(c, plugin)
            }
        } catch (e) {
            logger.error(`[plugin] GAGAL load ${rel}:`, e)
        }
    }
    logger.ok(`[plugin] ${features.length} fitur ter-load, ${commands.size} command`)
}

const prefixList = () => [...config.prefix].sort((a, b) => b.length - a.length)

export default async function handler(sock, raw) {
    hookSend(sock)
    const m = parseMessage(sock, raw)
    if (m.chat.endsWith('@newsletter') || m.chat === 'status@broadcast') return
    if (config.debug === 'verbose') console.log(`[msg] chat=${m.chat} type=${m.type} text=${JSON.stringify(m.text.slice(0, 60))}`)
    if (!m.fromMe && !IGNORED_TYPES.has(m.type)) logger.chat(m, m.text, config.ownerName)
    if (!m.text) return

    const prefix = prefixList().find((p) => m.text.startsWith(p))
    if (!prefix) return
    const body = m.text.slice(prefix.length).trim()
    if (!body) return
    const command = body.split(/\s/)[0].toLowerCase()
    const text = body.slice(command.length).trim()
    const args = text ? text.split(/\s+/) : []
    const plugin = commands.get(command)
    if (!plugin) return

    await identify(sock, m)
    const where = m.isGroup ? 'group' : 'private'
    const isOwner = m.isOwner
    const isCreator = m.isCreator
    const user = getUser(m.sender, m.pushName)
    const isPremium = !!user.premium || isOwner
    const msg = config.messages
    dbg(`${prefix}${command} | ${where} | sender=${m.sender} lid=${m.senderLid || '-'} | owner=${isOwner} creator=${isCreator}`)

    const deny = (reason, text) => {
        dbg(`DITOLAK (${reason}) .${command} oleh ${m.sender}`)
        return text ? m.reply(text) : undefined
    }

    if (user.banned && !isOwner) return deny('banned', msg.banned)
    if (!config.public && !isOwner) return deny('mode self')
    if (flag(plugin.creator) && !isCreator) return deny('creator only', msg.owner)
    if (flag(plugin.owner) && !isOwner) return deny('owner only', msg.owner)
    if (flag(plugin.premium) && !isPremium) return deny('premium only', msg.premium)
    if (flag(plugin.group) && !m.isGroup) return deny('group only', msg.group)
    if (flag(plugin.private) && m.isGroup) return deny('private only', msg.private)

    let groupMetadata = null
    let isAdmin = false
    let isBotAdmin = false
    if (m.isGroup && (flag(plugin.admin) || flag(plugin.botAdmin) || flag(plugin.needGroup))) {
        groupMetadata = await getGroupMeta(sock, m.chat)
        if (!groupMetadata) return deny('metadata grup gagal', '⚠️ Gagal mengambil data grup, coba lagi sebentar.')
        isAdmin = isOwner || isGroupAdmin(groupMetadata, m.senderIds)
        isBotAdmin = isGroupAdmin(groupMetadata, [sock.user?.id, sock.user?.lid].filter(Boolean))
        if (flag(plugin.admin) && !isAdmin) return deny('admin only', msg.admin)
        if (flag(plugin.botAdmin) && !isBotAdmin) return deny('bot bukan admin', msg.botAdmin)
    }

    if (flag(plugin.limit) && !isPremium) {
        if (user.limits <= 0) return deny('limit habis', msg.limit)
        user.limits -= 1
        updateUser(m.sender, { limits: user.limits })
    }

    try {
        await plugin.exec(m, {
            conn: sock, sock, args, text, command,
            usedPrefix: prefix, prefix, config,
            user, isOwner, isCreator, isPremium, isAdmin, isBotAdmin, groupMetadata,
            features, commands
        })
        const exp = user.exp + 5
        updateUser(m.sender, { exp, level: levelFromExp(exp), name: m.pushName || user.name })
    } catch (e) {
        logger.error(`[error] ${prefix}${command} (${plugin.file}) di ${where}:`, e)
        await m.reply(`❌ Terjadi error: ${e.message}`).catch(() => {})
    }
}