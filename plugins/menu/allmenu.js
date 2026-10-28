/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import config from '../../config.js'
import { pickRandom } from '../../lib/functions.js'
import { CATEGORIES, LEGEND, buildAll, buildCategory, menuButton } from '../../lib/menubuilder.js'
import { sendInteractive } from '../../lib/sendButtons.js'

// Menangani: allmenu, ownermenu, groupmenu, gamemenu, dst. (sesuai CATEGORIES)
const handler = async (m, { conn, command, usedPrefix, features }) => {
    await m.react(pickRandom(config.menuReact))

    let body
    if (command === 'allmenu') {
        body = buildAll(features, usedPrefix)
    } else {
        const id = command.replace(/menu$/, '')
        const items = features.filter((p) => !p.hidden && p.category === id)
        body = items.length ? buildCategory(id, items, usedPrefix) : `Belum ada fitur di kategori *${id}*.\nTambahkan file di \`plugins/${id}/\``
    }

    await sendInteractive(conn, m.chat, {
        image: config.menu,
        text: `${body || 'Belum ada fitur.'}\n\n${LEGEND}`,
        footer: config.footer,
        buttons: [menuButton(usedPrefix)],
        quoted: m.raw
    })
}

handler.command = ['allmenu', ...CATEGORIES.map((c) => `${c}menu`)]
handler.category = 'menu'
handler.hidden = true
handler.group = false
handler.desc = 'Tampilkan semua menu / menu per kategori'

export default handler