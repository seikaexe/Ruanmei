/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

// Taruh scraper kamu di folder ini (lib/scraper/*.js), lalu import dari plugin:
// import { getJson } from '../../lib/scraper/index.js'

export async function getJson(url, options = {}) {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function getText(url, options = {}) {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
}