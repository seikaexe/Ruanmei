/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

const handler = async (m) => {
    await m.reply('♻️ Restarting...')
    setTimeout(() => process.exit(0), 1000) // supervisor otomatis start ulang
}

handler.command = ['restart']
handler.category = 'owner'
handler.owner = true
handler.group = false
handler.desc = 'Restart bot'

export default handler