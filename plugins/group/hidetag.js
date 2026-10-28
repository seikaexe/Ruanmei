/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

const handler = async (m, { conn, text, groupMetadata }) => {
    const ids = groupMetadata.participants.map((p) => p.id)
    await conn.sendMessage(m.chat, { text: text || '', mentions: ids })
}

handler.command = ['hidetag', 'h']
handler.category = 'group'
handler.usage = '<pesan>'
handler.group = true
handler.admin = true
handler.desc = 'Kirim pesan dengan mention tersembunyi ke semua anggota'

export default handler