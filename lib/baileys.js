/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import * as ns from '@sakuraa/baileys'

const d = ns.default
const base = Object.assign({}, ns, d && (typeof d === 'object' || typeof d === 'function') ? d : {})

export const makeWASocket = typeof d === 'function' ? d : base.makeWASocket || base.default
export const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
    Browsers
} = base