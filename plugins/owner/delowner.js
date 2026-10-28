/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import config from '../../config.js'
import { toNumber } from '../../lib/identity.js'

const configPath = fileURLToPath(new URL('../../config.js', import.meta.url))

async function saveOwners(owners) {
    let source = await fs.readFile(configPath, 'utf8')

    if (!/\bowner\s*:\s*\[[^\]]*\]/.test(source)) {
        throw new Error('Konfigurasi owner tidak ditemukan.')
    }

    source = source.replace(
        /\bowner\s*:\s*\[[^\]]*\]/,
        `owner: ${JSON.stringify(owners)}`
    )

    await fs.writeFile(configPath, source, 'utf8')
    config.owner = owners
}

const handler = async (m, { args }) => {
    if (!m.isCreator) {
        return m.reply('❌ Fitur ini khusus *Creator Bot*.')
    }

    const raw =
        m.mentions?.[0] ||
        m.quoted?.sender ||
        (args[0]
            ? args[0].replace(/\D/g, '') + '@s.whatsapp.net'
            : null)

    if (!raw) {
        return m.reply(
            'Masukkan nomor atau tag Owner yang ingin dihapus'
        )
    }

    let jid

    try {
        jid = await m.resolve(raw)
    } catch {
        return m.reply('❌ Gagal mengenali identitas pengguna.')
    }

    const number = toNumber(jid).replace(/\D/g, '')
    const creators = (config.creatorNumber?.length
        ? config.creatorNumber
        : config.owner
    ).map(n => String(n).replace(/\D/g, ''))

    if (!number) {
        return m.reply('❌ Nomor pengguna tidak valid.')
    }

    if (creators.includes(number)) {
        return m.reply(
            '🛡️ Nomor Creator utama tidak dapat dihapus dari daftar Owner'
        )
    }

    const owners = [...new Set(
        (config.owner || [])
            .map(n => String(n).replace(/\D/g, ''))
            .filter(Boolean)
    )]

    if (!owners.includes(number)) {
        return m.reply('⚠️ Nomor tersebut tidak terdaftar sebagai Owner')
    }

    const updated = owners.filter(n => n !== number)

    try {
        await saveOwners(updated)

        return m.reply(
            '✅ *Berhasil Menghapus Owner*'
        )
    } catch (error) {
        console.error('[delowner]', error)
        return m.reply(
            '❌ Gagal menyimpan perubahan ke config.js.\n' +
            'Pastikan file memiliki izin tulis'
        )
    }
}

handler.command = ['delowner']
handler.category = 'owner'
handler.usage = '<nomor/tag/reply>'
handler.owner = true
handler.group = false
handler.desc = 'Menghapus Owner bot'

export default handler