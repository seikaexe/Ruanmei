/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

import chalk from 'chalk'
import { color } from './color.js'

const DOT = chalk.hex('#6b6b7b')('┃')

const badge = (label, bg, fg = '#111111') =>
    chalk.bgHex(bg).hex(fg).bold(` ${label} `)

const originalLog = console.log.bind(console)
const originalWarn = console.warn.bind(console)
const originalError = console.error.bind(console)

const fmtArgs = args =>
    args.map(a => {
        if (a instanceof Error)
            return a.stack || a.message

        if (typeof a === 'string')
            return a

        try {
            return typeof a === 'object'
                ? JSON.stringify(a)
                : String(a)
        } catch {
            return String(a)
        }
    }).join(' ')

// ============================================================
// LOGGER
// ============================================================

// Semua warna keyword CSS untuk nama user (nama tak dikenal chalk otomatis dibuang)
const KEYWORD_COLORS = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond',
    'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral',
    'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkcyan', 'darkgoldenrod', 'darkgray',
    'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
    'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray',
    'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
    'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred',
    'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen',
    'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray',
    'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta',
    'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
    'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'mintcream',
    'mistyrose', 'moccasin', 'navajowhite', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered',
    'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
    'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue',
    'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
    'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal',
    'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow',
    'yellowgreen'
].filter(name => {
    try { color('x', name); return true } catch { return false }
})

const randomKeyword = () =>
    KEYWORD_COLORS[Math.floor(Math.random() * KEYWORD_COLORS.length)] || 'green'

const logger = {

    info: (...a) =>
        originalLog(
            badge('INFO', '#4fc3f7'),
            chalk.hex('#b3e5fc')(fmtArgs(a))
        ),

    ok: (...a) =>
        originalLog(
            badge('OK', '#69f0ae'),
            chalk.hex('#b9f6ca')(fmtArgs(a))
        ),

    warn: (...a) =>
        originalLog(
            badge('WARN', '#ffd54f'),
            chalk.hex('#ffe082')(fmtArgs(a))
        ),

    error: (...a) =>
        originalLog(
            badge('ERROR', '#ff5252', '#ffffff'),
            chalk.hex('#ff8a80')(fmtArgs(a))
        ),

    // ========================================================
    // KONEKSI
    // Hanya tampil saat TERHUBUNG
    // ========================================================

    conn: (status, detail = '') => {
        if (String(status).toUpperCase() !== 'TERHUBUNG')
            return

        originalLog(
            badge(
                'KONEKSI',
                '#ff4f9a',
                '#ffffff'
            ),

            chalk.bgHex('#ff4f9a')
                .hex('#ffffff')
                .bold(' TERHUBUNG '),

            detail
                ? chalk.hex('#ffffff')(
                    `${DOT} sebagai ${detail}`
                )
                : ''
        )
    },

    // ========================================================
    // PESAN
    // ========================================================

    message(m, text) {
        const sender =
            m?.pushName ||
            'Tanpa Nama'

        originalLog(
            badge(
                'PESAN',
                '#f06292',
                '#ffffff'
            ),

            chalk.white(sender),

            DOT,

            chalk.hex('#fce4ec')(
                String(text ?? '')
            )
        )
    },

    // ========================================================
    // COMMAND
    // ========================================================

    // Log pesan masuk: nama user warna acak dari semua keyword CSS
    chat(m, body, owner = 'Seikagenou') {
        const randomColor = randomKeyword()
        const type = String(m.mtype || m.type || '')
        const mediaType = /^(conversation|extendedTextMessage|protocolMessage)$/.test(type)
            ? '' : type.replace(/Message$/, '')
        const logTag = mediaType ? `[${mediaType}]` : ''
        const pushname = m.pushName || 'Tanpa Nama'
        originalLog(
            chalk.yellow.bold(`Credit : ${owner}`),
            chalk.green.bold('[ Pesan ]'),
            color(pushname, randomColor),
            color(' : ', randomColor),
            chalk.magenta.bold(`${logTag}`),
            chalk.white(` ${body}`)
        )
    },

    // Balasan bot (tampil tepat di bawah log pesan masuk)
    reply(content = {}, owner = 'Seikagenou', name = 'Bot') {
        if (!content || content.react)
            return

        const key = [
            'text', 'image', 'video', 'audio', 'sticker', 'document',
            'location', 'contacts', 'poll'
        ].find(k => content[k] != null)

        const logTag = key && key !== 'text' ? `[${key}]` : ''
        const body = String(content.text ?? content.caption ?? '')
            .replace(/\s*\n+\s*/g, ' ')
            .trim()
        const short = body.length > 120 ? `${body.slice(0, 120)}…` : body

        originalLog(
            chalk.yellow.bold(`Credit : ${owner}`),
            chalk.cyan.bold('[ Balasan ]'),
            chalk.hex('#ff9ec8')(name),
            chalk.hex('#ff9ec8')(' : '),
            chalk.magenta.bold(logTag),
            chalk.white(` ${short}`)
        )
    },

    command(m, command, args = []) {
        originalLog(
            badge(
                'CMD',
                '#66bb6a'
            ),

            chalk.hex('#c8e6c9')
                .bold(command),

            args.length
                ? `${DOT} ${chalk.hex('#a5d6a7')(
                    args.join(' ')
                )}`
                : ''
        )
    },

    // ========================================================
    // CHATBOT / AI
    // ========================================================

    ai(kind, text, ms) {
        originalLog(
            badge(
                'CHATBOT',
                '#ba68c8'
            ),

            chalk.hex('#e1bee7')
                .bold(kind),

            DOT,

            chalk.hex('#f3e5f5')(
                String(text ?? '')
            ),

            ms !== undefined
                ? `${DOT} ${chalk.hex('#ce93d8')(
                    `${ms} ms`
                )}`
                : ''
        )
    },

    aiError: (kind, text) =>
        originalLog(
            badge(
                'CHATBOT',
                '#ff5252',
                '#ffffff'
            ),

            chalk.hex('#ff8a80')
                .bold(kind),

            DOT,

            chalk.hex('#ffcdd2')(
                String(text ?? '')
            )
        ),

    // ========================================================
    // GROUP
    // ========================================================

    group: (event, detail = '') =>
        originalLog(
            badge(
                'GRUP',
                '#f48fb1'
            ),

            chalk.hex('#f8bbd0')
                .bold(event),

            detail
                ? `${DOT} ${chalk.hex('#9e9eb5')(
                    detail
                )}`
                : ''
        ),

    // ========================================================
    // API
    // ========================================================

    api: (...a) =>
        originalLog(
            badge(
                'API',
                '#ffab40'
            ),

            chalk.hex('#ffe0b2')(
                fmtArgs(a)
            )
        ),

    apiError: (...a) =>
        originalLog(
            badge(
                'API',
                '#ff5252',
                '#ffffff'
            ),

            chalk.hex('#ff8a80')(
                fmtArgs(a)
            )
        )
}

// ============================================================
// CONSOLE COLOR
// ============================================================

const TAG_COLORS = [
    '#ff9ec8',
    '#80deea',
    '#ffcc80',
    '#c5e1a5',
    '#ce93d8',
    '#90caf9',
    '#ffab91',
    '#a5d6a7'
]

const tagColor = tag => {
    let h = 0

    for (const ch of tag)
        h =
            (h * 31 + ch.charCodeAt(0)) >>> 0

    return TAG_COLORS[
        h % TAG_COLORS.length
    ]
}

function colorizeArgs(args) {
    const out = [...args]

    if (typeof out[0] === 'string') {
        const match =
            out[0].match(
                /^(\[[^\]]{1,40}\])\s*(.*)$/s
            )

        if (match) {
            out[0] =
                chalk
                    .hex(tagColor(match[1]))
                    .bold(match[1]) +
                (
                    match[2]
                        ? ' ' + match[2]
                        : ''
                )
        }
    }

    return out
}

// ============================================================
// INSTALL CONSOLE
// Tanpa jam
// ============================================================

let installed = false

export function installConsole() {
    if (installed)
        return

    installed = true

    console.log = (...args) =>
        originalLog(
            badge(
                'LOG',
                '#ff4f9a',
                '#ffffff'
            ),
            ...colorizeArgs(args)
        )

    console.warn = (...args) =>
        originalWarn(
            badge(
                'WARN',
                '#ffd54f'
            ),
            ...colorizeArgs(args).map(
                a =>
                    typeof a === 'string'
                        ? chalk.hex('#ffe082')(a)
                        : a
            )
        )

    console.error = (...args) =>
        originalError(
            badge(
                'ERROR',
                '#ff5252',
                '#ffffff'
            ),
            ...colorizeArgs(args).map(
                a =>
                    typeof a === 'string'
                        ? chalk.hex('#ff8a80')(a)
                        : a
            )
        )
}

export default logger