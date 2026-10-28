/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import fs from 'node:fs/promises'
import config from '../../config.js'
import { fileURLToPath } from 'node:url'

const configPath = fileURLToPath(new URL('../../config.js', import.meta.url))

async function setMode(value) {
    let source = await fs.readFile(configPath, 'utf8')

    if (!/\bpublic\s*:\s*(true|false)\b/.test(source)) {
        throw new Error('Konfigurasi public tidak ditemukan.')
    }

    source = source.replace(
        /\bpublic\s*:\s*(true|false)\b/,
        `public: ${value}`
    )

    await fs.writeFile(configPath, source, 'utf8')
    config.public = value
}

const handler = async m => {
    if (!m.isCreator) {
        return m.reply('❌ Fitur ini khusus *Creator Bot*.')
    }

    if (config.public === true) {
        return m.reply('✅ *Bot Sudah Dalam Mode Public*')
    }

    try {
        await setMode(true)

        return m.reply(
            '✅ *Mode Public Berhasil Diaktifkan*'
        )
    } catch (error) {
        console.error('[publick]', error)
        return m.reply(
            '❌ Gagal menyimpan mode Public ke config.js'
        )
    }
}

handler.command = ['public']
handler.category = 'owner'
handler.usage = ''
handler.owner = true
handler.group = false
handler.desc = 'Mengaktifkan mode Public'

export default handler