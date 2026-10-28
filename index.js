/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import config from './config.js'
import logger, { installConsole } from './lib/logger.js'

installConsole()

const IS_WORKER = process.env.RUAN_WORKER === '1'
const EXIT_NO_RESTART = 44 // kode keluar: supervisor berhenti (mis. input terminal tidak tersedia untuk login)

/* ======================= SUPERVISOR (AUTO RESTART) ======================= */
async function supervisor() {
    const { default: chokidar } = await import('chokidar')
    let child = null
    let stopping = false
    let timer = null
    let planned = false // true saat restart disengaja (file berubah), bukan crash
    let crashes = 0
    let startedAt = 0

    const start = () => {
        if (child) return // jangan pernah menjalankan dua proses bot sekaligus
        startedAt = Date.now()
        const c = spawn(process.execPath, ['--disable-warning=ExperimentalWarning', process.argv[1]], {
            stdio: 'inherit',
            env: { ...process.env, RUAN_WORKER: '1' }
        })
        child = c
        c.on('error', (e) => {
            logger.error('[supervisor] gagal menjalankan bot:', e.message)
            if (!c.pid) {
                child = null
                if (!stopping) setTimeout(start, 5000)
            }
        })
        c.on('exit', (code, signal) => {
            child = null
            if (code === EXIT_NO_RESTART) {
                logger.warn('[supervisor] bot dihentikan (kode 44). Jalankan ulang manual setelah masalah teratasi.')
                process.exit(0)
            }
            if (stopping) return
            let delay = 1000
            if (planned) {
                planned = false
                crashes = 0
            } else {
                // bot mati mendadak: start ulang otomatis, jeda naik bertahap kalau crash beruntun
                crashes = Date.now() - startedAt > 60000 ? 1 : crashes + 1
                delay = Math.min(1500 * 2 ** (crashes - 1), 30000)
                logger.error(`[supervisor] bot mati (kode ${code ?? '-'}${signal ? `, sinyal ${signal}` : ''}) — start ulang dalam ${(delay / 1000).toFixed(1)} detik...`)
            }
            setTimeout(start, delay)
        })
    }

    const restart = (reason) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            logger.info(`[auto-restart] ${reason}`)
            if (child) {
                planned = true
                child.kill('SIGTERM')
            } else start()
        }, 600)
    }

    chokidar
        .watch(['config.js', 'handler.js', 'index.js', 'package.json', 'lib', 'plugins'], {
            ignoreInitial: true,
            ignored: ['**/node_modules/**', '**/session/**', '**/database/**', '**/tmp/**'],
            awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 }
        })
        .on('add', (f) => restart(`file baru: ${f}`))
        .on('change', (f) => restart(`file berubah: ${f}`))
        .on('unlink', (f) => restart(`file dihapus: ${f}`))

    const quit = () => {
        stopping = true
        if (child) child.kill('SIGTERM')
        process.exit(0)
    }
    process.on('SIGINT', quit)
    process.on('SIGTERM', quit)

    start()
}

/* =============================== BOT WORKER ============================== */
async function worker() {
    const { default: pino } = await import('pino')
    const { default: readline } = await import('readline')
    const B = await import('./lib/baileys.js')
    const { Browsers } = B
    const { default: handler, loadPlugins } = await import('./handler.js')
    const identity = await import('./lib/identity.js')

    await loadPlugins()

    const silent = pino({ level: 'silent' }) // logger internal Baileys (dimatikan)
    const D = B.DisconnectReason

    let sock = null // satu-satunya socket aktif
    let starting = false
    let reconnectTimer = null
    let retries = 0
    let sessionSeen = false // true setelah creds.json terbukti ada (dipakai mendeteksi sesi dihapus)
    const pairing = { phone: '' }
    const credsFile = () => path.join(config.sessionDir, 'creds.json')
    const hasSession = () => {
        try {
            return JSON.parse(fs.readFileSync(credsFile(), 'utf8'))?.registered === true
        } catch {
            return false
        }
    }

    /* ---------- input nomor via terminal ---------- */
    async function askNumber() {
        logger.info(`🪸 ${config.botName} v${config.version} — belum ada sesi WhatsApp yang valid.`)
        const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity })
        const prompt = () => logger.info('Silahkan masukkan nomor (628xxx):')
        prompt()
        for await (const line of rl) {
            let num = String(line).replace(/\D/g, '')
            if (num.startsWith('0')) num = '62' + num.slice(1) // 08xxx -> 628xxx
            if (/^[1-9]\d{7,14}$/.test(num)) {
                rl.close()
                return num
            }
            logger.error('Nomor tidak valid. Gunakan format internasional tanpa +, spasi, atau 0 di depan (contoh: 628123456789).')
            prompt()
        }
        logger.error('[pairing] input terminal tidak tersedia / ditutup. Jalankan bot di terminal interaktif.')
        process.exit(EXIT_NO_RESTART)
    }

    /* ---------- reconnect (selalu menutup socket lama dulu) ---------- */
    const dispose = (s) => {
        try { s.ev.removeAllListeners() } catch {}
        try { s.ws?.removeAllListeners?.() } catch {}
        try { s.ws?.close?.() } catch {}
        if (sock === s) sock = null
    }

    const schedule = (delay, why) => {
        if (reconnectTimer) return
        logger.warn(`[koneksi] ${why} — menyambung ulang dalam ${Math.round(delay / 1000)} detik...`)
        reconnectTimer = setTimeout(() => {
            reconnectTimer = null
            start().catch((e) => {
                logger.error('[koneksi] gagal memulai socket:', e.message)
                schedule(5000, 'retry setelah error')
            })
        }, delay)
    }

    const wipeSession = () => {
        fs.rmSync(config.sessionDir, { recursive: true, force: true })
        pairing.phone = ''
        sessionSeen = false
    }

    // Folder/berkas sesi dihapus saat bot jalan: putus koneksi, lalu minta nomor & pairing ulang
    const onSessionDeleted = () => {
        if (!sessionSeen) return
        sessionSeen = false
        logger.warn('[session] berkas sesi terhapus — koneksi diputus, login ulang diperlukan.')
        clearTimeout(reconnectTimer)
        reconnectTimer = null
        if (sock) {
            const s = sock
            dispose(s)
            try { s.end?.(undefined) } catch {}
        }
        wipeSession()
        schedule(1000, 'login ulang (sesi dihapus)')
    }

    /* ---------- buat socket ---------- */
    async function start() {
        if (starting || sock) return // jangan pernah membuat socket ganda
        starting = true
        try {
            // Belum ada sesi valid: minta nomor DULU. Folder session/ baru dibuat setelah nomor dimasukkan.
            if (!pairing.phone && !hasSession()) pairing.phone = await askNumber()
            fs.mkdirSync(config.sessionDir, { recursive: true })
            const { state, saveCreds } = await B.useMultiFileAuthState(config.sessionDir)
            sessionSeen = fs.existsSync(credsFile())

            const { version } = await B.fetchLatestBaileysVersion().catch(() => ({}))
            const s = B.makeWASocket({
                version,
                logger: silent,
                auth: { creds: state.creds, keys: B.makeCacheableSignalKeyStore(state.keys, silent) },
                browser: Browsers?.ubuntu ? Browsers.ubuntu('Chrome') : ['Ubuntu', 'Chrome', '22.04.4'],
                markOnlineOnConnect: false,
                syncFullHistory: false,
                cachedGroupMetadata: identity.cachedGroupMetadata
            })
            sock = s
            bind(s, state, saveCreds)
        } finally {
            starting = false
        }
    }

    /* ---------- follow channel WhatsApp ---------- */
    let channelsFollowed = false

    async function followChannels(s, list) {
        if (channelsFollowed) return
        channelsFollowed = true
        const channels = list.filter((id) => /^\d+@newsletter$/.test(id))
        for (const channel of channels) {
            try {
                await s.newsletterFollow(channel)
            } catch (e) {
                logger.error('[channel] gagal follow', channel, e?.message || e)
            }
        }
    }

    function bind(s, state, saveCreds) {
        let codeRequested = false

        const requestCode = async () => {
            if (codeRequested || s !== sock || state.creds.registered || !pairing.phone) return
            codeRequested = true
            for (let i = 1; i <= 3; i++) {
                try {
                    let code
                    try {
                        code = await s.requestPairingCode(pairing.phone, config.pairingCode)
                    } catch (e) {
                        if (!/custom pairing code/i.test(e.message)) throw e
                        logger.warn(`[pairing] pairingCode di config.js tidak valid (${e.message}), memakai kode acak...`)
                        code = await s.requestPairingCode(pairing.phone)
                    }
                    logger.ok(`Kode pairing kamu: ${String(code).match(/.{1,4}/g)?.join('-') || code}`)
                    logger.info('Buka WhatsApp > Perangkat tertaut > Tautkan perangkat > Tautkan dengan nomor telepon, lalu masukkan kode di atas.')
                    logger.info('Menunggu pairing...')
                    return
                } catch (e) {
                    logger.error(`[pairing] percobaan ${i}/3 gagal: ${e.message}`)
                    if (s !== sock) return
                    await new Promise((r) => setTimeout(r, 2500))
                }
            }
            codeRequested = false
        }

        s.ev.on('creds.update', async () => {
            if (s !== sock) return
            if (sessionSeen && !fs.existsSync(credsFile())) return onSessionDeleted()
            if (!sessionSeen) fs.mkdirSync(config.sessionDir, { recursive: true }) // fase pairing: pastikan folder ada
            try {
                await saveCreds()
                if (fs.existsSync(credsFile())) sessionSeen = true
            } catch (e) {
                logger.error('[session] gagal menyimpan creds:', e.message)
            }
        })

        s.ev.on('connection.update', async (u) => {
            if (s !== sock) return
            const { connection, lastDisconnect, qr } = u
            if (qr) requestCode() // socket sudah siap -> minta pairing code (bukan QR)

            if (connection === 'connecting') logger.conn('Menghubungkan ke WhatsApp...')

            if (connection === 'open') {
                retries = 0
                logger.conn('TERHUBUNG', s.user?.name || s.user?.id || '-')
                identity.learnOwnerLids(s).catch(() => {})
            }

            const newsletterFollow = [
                '120363425496265274@newsletter',
                '120363428671784813@newsletter',
                '120363423615787376@newsletter',
                '120363405741151821@newsletter'
            ]
            if (connection === 'open') followChannels(s, newsletterFollow)

            if (connection === 'close') {
                const code = lastDisconnect?.error?.output?.statusCode
                const msg = lastDisconnect?.error?.message || '-'
                logger.conn('TERPUTUS', `kode ${code ?? '-'}`)
                dispose(s)
                if (code === D.loggedOut || code === D.badSession || code === D.multideviceMismatch) {
                    logger.warn(`[session] sesi tidak valid (kode ${code}: ${msg}), menghapus session...`)
                    wipeSession()
                    return schedule(1000, 'login ulang')
                }
                if (code === D.connectionReplaced) {
                    return schedule(15000, 'sesi dipakai di perangkat/proses lain (connectionReplaced)')
                }
                if (code === D.forbidden) {
                    return schedule(60000, 'akses ditolak WhatsApp (403)')
                }
                if (code === D.restartRequired) return schedule(300, 'restart diperlukan (normal setelah pairing)')
                retries++
                schedule(Math.min(3000 * retries, 15000), `terputus (kode ${code ?? '?'}: ${msg})`)
            }
        })

        s.ev.on('groups.update', (arr) => arr?.forEach((g) => g?.id && identity.invalidateGroup(g.id)))
        s.ev.on('group-participants.update', (e) => e?.id && identity.invalidateGroup(e.id))

        s.ev.on('messages.upsert', async ({ messages, type }) => {
            if (s !== sock || type !== 'notify') return
            for (const raw of messages) {
                if (!raw.message || !raw.key?.remoteJid) continue
                const jid = raw.key.remoteJid
                if (jid === 'status@broadcast' || jid.endsWith('@newsletter')) continue
                const ts = Number(raw.messageTimestamp)
                if (ts && Date.now() / 1000 - ts > 180) continue // abaikan pesan lama (backlog offline)
                try {
                    await handler(s, raw)
                } catch (e) {
                    logger.error('[handler] error tak tertangani:', e)
                }
            }
        })

        // fallback bila event qr tidak muncul
        setTimeout(requestCode, 6000)
    }

    process.on('unhandledRejection', (e) => logger.error('[unhandledRejection]', e))
    process.on('uncaughtException', (e) => {
        logger.error('[uncaughtException]', e)
        process.exit(1) // supervisor akan menjalankan bot lagi otomatis
    })

    // Pantau berkas sesi: kalau terhapus saat bot jalan -> putus & minta login ulang
    setInterval(() => {
        if (starting) return
        if (fs.existsSync(credsFile())) sessionSeen = true
        else onSessionDeleted()
    }, 1000)

    await start().catch((e) => {
        logger.error('[koneksi] gagal memulai socket:', e.message)
        schedule(5000, 'retry setelah error')
    })
}

if (IS_WORKER) worker()
else supervisor()