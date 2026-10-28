/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import { getUser, updateUser } from '../../lib/database.js'
import { toNumber } from '../../lib/identity.js'

const handler = async (m, { args }) => {
    const raw = m.mentions[0] || m.quoted?.sender || (args[0] ? args[0].replace(/\D/g, '') + '@s.whatsapp.net' : null)
    if (!raw) return m.reply('Tag / reply / masukkan nomor user.')
    const jid = await m.resolve(raw)
    getUser(jid)
    updateUser(jid, { premium: 0 })
    await m.reply(`✅ *Premium Dicabut*`)
}

handler.command = ['delprem']
handler.category = 'owner'
handler.usage = '<@tag/nomor>'
handler.owner = true
handler.group = false
handler.desc = 'Cabut status Premium user'

export default handler