/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import os from 'os'
import { runtime } from '../../lib/functions.js'

const handler = async (m) => {
    const t = Date.now()
    await m.react('〽️')
    const ms = Date.now() - t
    const mem = process.memoryUsage().rss / 1024 / 1024
    await m.reply(`〽️ *Server Live*\n• Speed : ${ms} ms\n• Uptime : ${runtime(process.uptime())}\n• RAM : ${mem.toFixed(1)} MB\n• Platform : ${os.platform()} (${os.arch()})`)
}

handler.command = ['ping', 'speed']
handler.category = 'tools'
handler.group = false
handler.desc = 'Cek kecepatan respon & status server'

export default handler