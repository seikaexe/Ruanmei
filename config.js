/*
  Made By Seikagenou
  Telegram : t.me/seikagenou
  Mohon Untuk Tidak Menghapus, Mengedit, dll Watermark Di Dalam Kode Ini
*/

export default {
    botName: 'Ruan Mei-Ai',
    version: '1.0',
    creator: 'seika',
    ownerName: 'Seika',

    // Nomor owner (tanpa +, tanpa spasi)
    owner: ['6283167752474'],
    // Nomor creator (hak penuh). Kosongkan [] untuk mengikuti daftar owner.
    creatorNumber: ['6283167752474'],
    // Opsional: LID owner/creator (angka saja atau xxxx@lid). Biasanya TIDAK perlu diisi,
    // bot otomatis memetakan LID <-> nomor. Isi hanya jika owner masih tidak terdeteksi di grup.
    ownerLid: [],
    creatorLid: [],

    // Log pesan masuk & balasan bot selalu tampil. 'verbose' = tambah log detail command/penolakan, selain itu = mati
    debug: false,

    // Login lewat terminal dengan pairing code (tanpa QR).
    // Saat bot dijalankan pertama kali, bot akan meminta nomor (format internasional, mis. 6281234567890)
    // lalu menampilkan kode pairing custom di bawah ini (wajib 8 karakter huruf/angka).
    pairingCode: 'RUANMEII',

    prefix: ['.', '!', '#', '/'],
    public: true,

    // ===== MENU =====
    // URL gambar menu (tampil di atas, teks di bawah, 1x kirim)
    menu: 'https://files.catbox.moe/m0lj05.jpg',
    // Reaction saat .menu (string, atau array untuk random)
    menuReact: '🪸',
    footer: '© Ruan Mei-Ai',

    // ===== LIMIT & RANK =====
    defaultLimit: 20,
    ranks: [
        { min: 1, name: 'Newbie 🌱' },
        { min: 5, name: 'Apprentice 🪴' },
        { min: 10, name: 'Adept 🌸' },
        { min: 20, name: 'Expert 💠' },
        { min: 35, name: 'Master 🔮' },
        { min: 50, name: 'Grandmaster 👑' }
    ],

    // ===== PATH =====
    sessionDir: './session',
    dbPath: './database/database.sqlite',

    messages: {
        owner: '❌ Fitur ini khusus *Owner*.',
        premium: '💎 Fitur ini khusus user *Premium*.',
        group: '👥 Fitur ini hanya bisa dipakai di *grup*.',
        private: '💬 Fitur ini hanya bisa dipakai di *chat pribadi*.',
        admin: '🛡️ Fitur ini khusus *admin grup*.',
        botAdmin: '🤖 Jadikan bot *admin grup* dulu.',
        limit: '⚠️ Limit kamu habis. Limit reset tiap hari.',
        banned: '🚫 Kamu di-banned dari bot.'
    }
}