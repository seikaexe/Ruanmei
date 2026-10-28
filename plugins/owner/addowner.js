/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '../../config.js'
import { toNumber } from '../../lib/identity.js'

const configPath = fileURLToPath(new URL('../../config.js', import.meta.url))

async function saveOwners(owners) {
    let source = await fs.readFile(configPath, 'utf8')

    const replacement = `owner: ${JSON.stringify(owners)}`

    if (!/\bowner\s*:\s*\[[^\]]*\]/.test(source)) {
        throw new Error('Konfigurasi owner tidak ditemukan di config.js')
    }

    source = source.replace(
        /\bowner\s*:\s*\[[^\]]*\]/,
        replacement
    )

    await fs.writeFile(configPath, source, 'utf8')
    config.owner = owners
}

const handler = async (m, { args }) => {
    if (!m.isCreator) {
        return m.reply('❌ Fitur ini khusus *Creator Bot*')
    }

    const raw =
        m.mentions?.[0] ||
        m.quoted?.sender ||
        (args[0]
            ? args[0].replace(/\D/g, '') + '@s.whatsapp.net'
            : null)

    if (!raw) {
        return m.reply(
            'Masukkan nomor atau tag pengguna'
        )
    }

    let jid

    try {
        jid = await m.resolve(raw)
    } catch {
        return m.reply('❌ Gagal mengenali identitas pengguna.')
    }

    const number = toNumber(jid).replace(/\D/g, '')

    if (!number || number.length < 8) {
        return m.reply('❌ Nomor pengguna tidak valid.')
    }

    const owners = [...new Set(
        (config.owner || [])
            .map(n => String(n).replace(/\D/g, ''))
            .filter(Boolean)
    )]

    if (owners.includes(number)) {
        return m.reply('⚠️ Nomor tersebut sudah terdaftar sebagai Owner.')
    }

    try {
        await saveOwners([...owners, number])

        return m.reply(
            '✅ *Berhasil Menambahkan Owner*'
        )
    } catch (error) {
        console.error('[addowner]', error)
        return m.reply(
            '❌ Gagal menyimpan Owner ke config.js.\n' +
            'Pastikan file memiliki izin tulis.'
        )
    }
}

handler.command = ['addowner', 'addown']
handler.category = 'owner'
handler.usage = '<nomor/tag/reply>'
handler.owner = true
handler.group = false
handler.desc = 'Menambahkan Owner bot'

export default handler