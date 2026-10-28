/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

/**
 * Helper tombol untuk @sakuraa/baileys (memakai templateButtons bawaan fork).
 * sock.sendMessage otomatis menambah node "biz" sehingga tombol Native Flow tampil.
 */

// Tombol daftar pilihan (single_select)
export function singleSelect({ title, sections }) {
    return { displayText: title, listTitle: title, sections }
}

// Tombol quick reply
export function quickReply(displayText, id) {
    return { displayText, id }
}

/**
 * Kirim pesan gambar di atas + teks di bawah + footer + tombol dalam 1x kirim.
 * Mendukung mentions dan fallback ke teks biasa jika gagal.
 */
export async function sendInteractive(
    sock,
    jid,
    {
        image,
        text,
        footer = '',
        buttons = [],
        mentions = [],
        quoted
    } = {}
) {
    const base = {
        footer,
        templateButtons: buttons,
        mentions
    }

    try {
        if (image) {
            try {
                return await sock.sendMessage(
                    jid,
                    {
                        image: typeof image === 'string' ? { url: image } : image,
                        caption: text,
                        ...base
                    },
                    { quoted }
                )
            } catch (e) {
                console.log(
                    '[sendInteractive] gambar gagal, kirim tanpa gambar:',
                    e.message
                )
            }
        }

        return await sock.sendMessage(
            jid,
            {
                text,
                ...base
            },
            { quoted }
        )
    } catch (e) {
        console.log('[sendInteractive] fallback teks:', e.message)

        return await sock.sendMessage(
            jid,
            {
                text: footer ? `${text}\n\n${footer}` : text,
                mentions
            },
            { quoted }
        )
    }
}