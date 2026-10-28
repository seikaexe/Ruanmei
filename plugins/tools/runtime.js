/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import { runtime } from '../../lib/functions.js'

const handler = async (m) => {
    await m.reply(`⏱️ Bot aktif selama *${runtime(process.uptime())}*`)
}

handler.command = ['runtime', 'uptime']
handler.category = 'tools'
handler.group = false
handler.desc = 'Tampilkan lama bot aktif'

export default handler