/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

const handler = async (m, { features }) => {
    await m.reply(`*Total Fitur : ${features.length}*`)
}

handler.command = ['totalfitur', 'totalfeature']
handler.category = 'menu'
handler.hidden = true
handler.group = false
handler.desc = 'Tampilkan jumlah fitur bot'

export default handler