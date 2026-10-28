/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const jidNumber = (jid = '') => String(jid).split('@')[0].split(':')[0]

export const pickRandom = (arr) => (Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr)

export const levelFromExp = (exp) => Math.floor(Math.sqrt(exp / 20)) + 1

export function getRank(level, ranks) {
    let name = ranks[0]?.name || '-'
    for (const r of ranks) if (level >= r.min) name = r.name
    return name
}

export function runtime(sec) {
    sec = Math.floor(sec)
    const d = Math.floor(sec / 86400)
    const h = Math.floor((sec % 86400) / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${d}d ${h}h ${m}m ${s}s`
}