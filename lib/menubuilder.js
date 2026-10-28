/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import config from '../config.js'
import { singleSelect } from './sendButtons.js'

export const LEGEND = 'Ⓛ Limit Ⓟ Premium Ⓞ Owner'

// [judul, deskripsi, command (tanpa prefix)]
const MAIN = [
    ['📖 𝗔𝗟𝗟 𝗠𝗘𝗡𝗨', 'Tampilkan semua kategori sekaligus', 'allmenu'],
    ['👑 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂', 'Tampilkan Owner Menu', 'ownermenu'],
    ['👥 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂', 'Tampilkan Group Menu', 'groupmenu'],
    ['🌸 𝗚𝗮𝗺𝗲 𝗠𝗲𝗻𝘂', 'Tampilkan Game Menu', 'gamemenu'],
    ['📥 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 𝗠𝗲𝗻𝘂', 'Tampilkan Downloader Menu', 'downloadermenu'],
    ['💻 𝗜𝗻𝘀𝘁𝗮𝗹𝗹𝗲𝗿 𝗠𝗲𝗻𝘂', 'Tampilkan Installer Menu', 'installermenu'],
    ['💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗠𝗘𝗡𝗨', 'Tampilkan Premium Menu', 'premiummenu'],
    ['〽️ 𝗣𝗶𝗻𝗴 𝗦𝗲𝗿𝘃𝗲𝗿', 'Server Live', 'ping']
]

const OTHER = [
    ['🛡️ 𝗣𝗥𝗢𝗧𝗘𝗞𝗦𝗜 𝗠𝗘𝗡𝗨', 'Tampilkan Proteksi Menu', 'proteksimenu'],
    ['🔍 𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨', 'Tampilkan Search Menu', 'searchmenu'],
    ['🔮 𝗣𝗥𝗜𝗠𝗕𝗢𝗡 𝗠𝗘𝗡𝗨', 'Tampilkan Primbon Menu', 'primbonmenu'],
    ['✨ 𝗘𝗣𝗛𝗢𝗧𝗢 𝗠𝗘𝗡𝗨', 'Tampilkan Ephoto Menu', 'ephotomenu'],
    ['🔧 𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨', 'Tampilkan Tools Menu', 'toolsmenu'],
    ['💰 𝗦𝗘𝗪𝗔 𝗠𝗘𝗡𝗨', 'Tampilkan Sewa Menu', 'sewamenu'],
    ['🤖 𝗔𝗜 𝗠𝗘𝗡𝗨', 'Tampilkan AI Menu', 'aimenu'],
    ['🪄 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 𝗠𝗘𝗡𝗨', 'Tampilkan Sticker Menu', 'stickermenu'],
    ['⚔️ 𝗥𝗣𝗚 𝗠𝗘𝗡𝗨', 'Tampilkan RPG Menu', 'rpgmenu'],
    ['📳 𝗔𝗣𝗞 𝗠𝗘𝗡𝗨', 'Tampilkan APK Menu', 'apkmenu'],
    ['🍥 𝗔𝗡𝗜𝗠𝗘 𝗠𝗘𝗡𝗨', 'Tampilkan Anime Menu', 'animemenu']
]

// id kategori = nama command tanpa "menu" (allmenu & ping dikecualikan)
export const CATEGORIES = [...MAIN, ...OTHER]
    .map((r) => r[2])
    .filter((c) => c.endsWith('menu') && c !== 'allmenu')
    .map((c) => c.replace(/menu$/, ''))

const rows = (list, prefix) =>
    list.map(([title, description, cmd]) => ({ header: '', title, description, id: `${prefix}${cmd}` }))

export function menuButton(prefix) {
    return singleSelect({
        title: 'Pilih Kategori',
        sections: [
            { title: config.botName, highlight_label: 'Paling Populer 🔥', rows: rows(MAIN, prefix) },
            { title: `${config.botName} • Kategori Lainnya`, rows: rows(OTHER, prefix) }
        ]
    })
}

const mark = (p) => `${p.limit ? ' Ⓛ' : ''}${p.premium ? ' Ⓟ' : ''}${p.owner ? ' Ⓞ' : ''}`

export function buildCategory(title, items, prefix) {
    const lines = items.map((p) => `╎│•ぎ ${prefix}${p.command[0]}${p.usage ? ' ' + p.usage : ''}${mark(p)}`)
    return [`╔═──⋞ *${String(title).toUpperCase()}* ⋟──☉`, '╎╭───────────────❍', ...lines, '╎╰───────────────❍', '╰───────────────✧'].join('\n')
}

export function buildAll(features, prefix) {
    const visible = features.filter((p) => !p.hidden)
    const known = new Set(CATEGORIES)
    const cats = [...CATEGORIES, ...new Set(visible.map((p) => p.category).filter((c) => !known.has(c)))]
    return cats
        .map((c) => ({ c, items: visible.filter((p) => p.category === c) }))
        .filter((x) => x.items.length)
        .map((x) => buildCategory(x.c, x.items, prefix))
        .join('\n\n')
}