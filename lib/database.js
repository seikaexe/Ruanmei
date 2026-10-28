/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import { DatabaseSync } from 'node:sqlite' // bawaan Node.js >= 22.5, tanpa compile native module
import fs from 'fs'
import path from 'path'
import config from '../config.js'

fs.mkdirSync(path.dirname(config.dbPath), { recursive: true })

const db = new DatabaseSync(config.dbPath)
db.exec('PRAGMA journal_mode = WAL')
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    jid TEXT PRIMARY KEY,
    name TEXT DEFAULT '',
    exp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    limits INTEGER DEFAULT 0,
    premium INTEGER DEFAULT 0,
    banned INTEGER DEFAULT 0,
    resetDate TEXT DEFAULT '',
    createdAt INTEGER DEFAULT 0
)`)

const FIELDS = ['name', 'exp', 'level', 'limits', 'premium', 'banned', 'resetDate']
const today = () => new Date().toISOString().slice(0, 10)

export function getUser(jid, name = '') {
    let u = db.prepare('SELECT * FROM users WHERE jid = ?').get(jid)
    if (!u) {
        db.prepare('INSERT INTO users (jid, name, limits, resetDate, createdAt) VALUES (?, ?, ?, ?, ?)').run(
            jid, name, config.defaultLimit, today(), Date.now()
        )
        u = db.prepare('SELECT * FROM users WHERE jid = ?').get(jid)
    }
    if (u.resetDate !== today()) {
        if (!u.premium) u.limits = config.defaultLimit
        u.resetDate = today()
        updateUser(jid, { limits: u.limits, resetDate: u.resetDate })
    }
    return u
}

export function updateUser(jid, data) {
    const keys = Object.keys(data).filter((k) => FIELDS.includes(k))
    if (!keys.length) return
    const set = keys.map((k) => `${k} = ?`).join(', ')
    db.prepare(`UPDATE users SET ${set} WHERE jid = ?`).run(...keys.map((k) => data[k]), jid)
}

export const countUsers = () => db.prepare('SELECT COUNT(*) AS c FROM users').get().c

export default db