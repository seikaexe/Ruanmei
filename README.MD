🪸 Ruan Mei-Ai — WhatsApp Bot Base

«Ruan Mei-Ai adalah base WhatsApp Bot yang dibangun menggunakan Node.js ESM dan library "@sakuraa/baileys". Base ini dirancang dengan sistem plugin modular, sehingga fitur dapat ditambahkan, dikembangkan, dan dikelola dengan mudah tanpa harus mengubah seluruh sistem bot»

---

✨ Fitur Utama

- 🔌 Plugin System — Memuat plugin secara otomatis dari folder "plugins/", termasuk subfolder
- ♻️ Auto Restart — Memulai ulang proses bot secara otomatis ketika file konfigurasi, handler, library, atau plugin berubah
- 📖 Interactive Menu — Menu bot dengan gambar, teks, reaction, serta tombol pemilihan kategori
- 🧩 Menu Builder — Menyusun menu berdasarkan kategori plugin.
- 🗃️ SQLite Database — Menyimpan data pengguna, EXP, level, limit, status premium, dan status banned
- 🏅 Level & Rank System — Mendukung sistem EXP, level, rank, dan limit harian
- 👑 Owner & Premium System — Mengatur akses khusus untuk owner dan pengguna premium
- 👥 Group Protection — Mendukung pembatasan command berdasarkan grup, admin grup, dan status admin bot
- 🔐 Pairing Code — Menghubungkan akun WhatsApp melalui kode pairing dari terminal
- 📱 Session Management — Menggunakan sistem autentikasi Baileys untuk mengelola sesi WhatsApp
- 🛠️ Command Handler — Mendukung prefix, alias command, permission, dan kategori plugin
- 🔍 Debug System — Membantu memeriksa pemrosesan command dan kesalahan plugin
- 🔄 Reconnect System — Mencoba menyambungkan kembali bot ketika koneksi terputus

---

🛠️ Teknologi

Teknologi| Kegunaan
Node.js| Runtime JavaScript
JavaScript ESM| Sistem modul
"@sakuraa/baileys"| Koneksi WhatsApp
SQLite ("node:sqlite")| Penyimpanan data
Chokidar| Pemantauan perubahan file

---

📂 Struktur Modular

Kode dipisahkan menjadi beberapa bagian agar lebih mudah dikelola dan dikembangkan.

- 📄 "index.js" — Mengelola koneksi WhatsApp dan proses supervisor
- 📄 "handler.js" — Memproses pesan dan command
- ⚙️ "config.js" — Menyimpan konfigurasi bot
- 📁 "lib/" — Berisi fungsi dan modul pendukung
- 📁 "plugins/" — Tempat menyimpan fitur dan command bot

---

🎯 Tujuan Proyek

Ruan Mei-Ai dibuat sebagai fondasi pengembangan WhatsApp Bot yang:

- ✅ Modular dan mudah dikembangkan
- ✅ Memiliki struktur kode yang terorganisasi
- ✅ Memudahkan penambahan fitur melalui plugin
- ✅ Dapat dikustomisasi sesuai kebutuhan pengembang

---

📌 Ketentuan Penggunaan Base

- 🛡️ Pertahankan watermark asli pembuat yang terdapat di dalam kode
- 🚫 Dilarang menghapus atau mengubah watermark yang telah dicantumkan
- ⛔ Dilarang menjual kembali base ini sebagai produk milik sendiri
- 🤝 Jika membagikan atau mengembangkan base ini, tetap hargai dan pertahankan kredit pembuat aslinya

---

👨‍💻 Credits

Made By Seikagenou

📱 Telegram: "t.me/seikagenou" (https://t.me/seikagenou)

---

<p align="center">
  <b>Ruan Mei-Ai — Modular, Flexible, and Easy to Recode</b>
</p>