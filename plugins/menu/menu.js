/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import config from '../../config.js'
import { getRank, pickRandom, runtime } from '../../lib/functions.js'
import { menuButton } from '../../lib/menubuilder.js'
import { sendInteractive } from '../../lib/sendButtons.js'

const handler = async (m, { conn, usedPrefix, user, isOwner, isPremium, features }) => {
    await m.react(pickRandom(config.menuReact))

    const status = isOwner ? 'Owner 👑' : isPremium ? 'Premium 💎' : 'Free'
    const limit = isOwner || isPremium ? '∞' : user.limits
    const pushname = m.pushName || 'User'

    const sender = m.sender
    const mention = `@${sender.split('@')[0].split(':')[0]}`

    const text = `Hello, ${mention} 🪸
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp

╔┈┈「 *${config.botName}* 」┈✧
╎╭───────────────❍
╎│• Name : ${pushname}
╎│• Rank : ${getRank(user.level, config.ranks)}
╎│• Level : ${user.level}
╎│• Limit : ${limit}
╎│• Status : ${status}
╎│• Uptime : ${runtime(process.uptime())}
╎│• Total fitur : ${features.length}
╎╰───────────────❍
╰───────────────✧`

    await sendInteractive(conn, m.chat, {
        image: config.menu,
        text,
        footer: config.footer,
        buttons: [menuButton(usedPrefix)],
        mentions: [sender],
        quoted: m.raw
    })
}

handler.command = ['menu']
handler.category = 'menu'
handler.hidden = true
handler.group = false
handler.desc = 'Tampilkan menu utama bot'

export default handler