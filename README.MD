🪸 Ruan Mei-Ai — WhatsApp Bot Base

«Ruan Mei-Ai adalah base WhatsApp Bot yang dibangun menggunakan Node.js ESM dan library "@sakuraa/baileys"

Base ini dirancang dengan sistem plugin modular, sehingga fitur dapat ditambahkan, dikembangkan, dan dikelola dengan mudah tanpa harus mengubah seluruh sistem bot»

---

✨ Fitur Utama

- 🔌 Plugin System — Memuat plugin secara otomatis dari folder "plugins/", termasuk subfolder
- ♻️ Auto Restart — Memulai ulang proses bot secara otomatis ketika file konfigurasi, handler, library, atau plugin berubah
- 📖 Interactive Menu — Menampilkan menu bot dengan gambar, teks, reaction, serta tombol pemilihan kategori
- 🧩 Menu Builder — Menyusun menu secara otomatis berdasarkan kategori plugin
- 🗃️ SQLite Database — Menyimpan data pengguna, EXP, level, limit, status premium, dan status banned
- 🏅 Level & Rank System — Mendukung sistem EXP, level, rank, dan limit harian
- 👑 Owner & Premium System — Mengatur hak akses khusus untuk owner dan pengguna premium
- 👥 Group Protection — Mendukung pembatasan command berdasarkan grup, admin grup, dan status admin bot
- 🔐 Pairing Code — Menghubungkan akun WhatsApp melalui kode pairing dari terminal
- 📱 Session Management — Mengelola autentikasi dan sesi WhatsApp menggunakan Baileys
- 🛠️ Command Handler — Mendukung prefix, alias command, permission, dan kategori plugin
- 🔍 Debug System — Membantu memeriksa pemrosesan command dan kesalahan plugin
- 🔄 Reconnect System — Mencoba menyambungkan kembali bot ketika koneksi terputus

---

🛠️ Teknologi

Teknologi| Kegunaan
Node.js| Runtime JavaScript
JavaScript ESM| Sistem modul JavaScript
"@sakuraa/baileys"| Menghubungkan bot dengan WhatsApp
SQLite ("node:sqlite")| Penyimpanan dan pengelolaan data
Chokidar| Memantau perubahan file

---

📂 Struktur Proyek

Kode sumber dipisahkan menjadi beberapa bagian agar lebih mudah dipahami, dikelola, dan dikembangkan

Ruan-Mei-Ai/
├── 📄 index.js       # Koneksi WhatsApp dan proses supervisor
├── 📄 handler.js     # Pemrosesan pesan dan command
├── ⚙️ config.js      # Konfigurasi bot
├── 📁 lib/           # Modul dan fungsi pendukung
└── 📁 plugins/       # Fitur dan command bot

---

🎯 Tujuan Proyek

Ruan Mei-Ai dibuat sebagai fondasi pengembangan WhatsApp Bot yang mengutamakan

- ✅ Modularitas — Memudahkan pengembangan dan pemeliharaan kode
- ✅ Struktur Terorganisasi — Memisahkan handler, konfigurasi, library, dan plugin
- ✅ Kemudahan Pengembangan — Memungkinkan penambahan fitur melalui sistem plugin
- ✅ Fleksibilitas — Dapat dikustomisasi sesuai kebutuhan pengembang
- ✅ Efisiensi — Mempermudah pengelolaan fitur tanpa harus mengubah seluruh sistem bot

---

📜 Lisensi dan Ketentuan Penggunaan

«⚠️ PENTING — BACA SEBELUM MENGGUNAKAN, MEMODIFIKASI, ATAU MENDISTRIBUSIKAN PROYEK INI»

Penggunaan Ruan Mei-Ai — WhatsApp Bot Base harus menghormati hak cipta pembuat asli, ketentuan lisensi yang berlaku, dan hak pemilik komponen pihak ketiga

🛡️ 1 — Hak Cipta dan Kepemilikan

- Hak cipta kode asli tetap berada pada pemegang hak yang sah
- Pengguna dilarang mengklaim kode asli sebagai karya pribadi
- Modifikasi atau penambahan fitur tidak secara otomatis mengalihkan kepemilikan kode asli
- Kontributor diperbolehkan mencantumkan kredit atas kontribusinya sendiri tanpa menghilangkan kredit pembuat asli
- Komponen pihak ketiga tetap tunduk pada lisensi masing-masing

©️ 2 — Watermark dan Kredit Pembuat

- Watermark asli pembuat wajib dipertahankan pada kode sumber yang memuatnya
- Dilarang menghapus, mengubah, menyamarkan, atau mengganti watermark dengan identitas pihak lain
- Kredit pembuat asli wajib dicantumkan ketika mendistribusikan ulang proyek jika dipersyaratkan oleh ketentuan yang berlaku
- Pengembang boleh menambahkan kredit untuk fitur yang dibuatnya sendiri
- Kredit tambahan tidak boleh digunakan untuk mengaburkan identitas pembuat asli

🚫 3 — Larangan Penjualan dan Penjualan Ulang

DILARANG MENJUAL KEMBALI BASE INI SEBAGAI PRODUK MILIK SENDIRI TANPA IZIN TERTULIS DARI PEMEGANG HAK YANG BERWENANG

- ❌ Dilarang menjual kembali base dalam bentuk asli sebagai karya pribadi
- ❌ Dilarang menjual versi modifikasi dengan menghilangkan watermark atau kredit pembuat asli
- ❌ Dilarang mengemas ulang proyek untuk dijual dengan mengklaim kepemilikan kode asli
- ❌ Dilarang mengklaim kepemilikan eksklusif atas kode asli yang bukan hasil karya sendiri
- ❌ Penggunaan komersial atau distribusi berbayar memerlukan izin apabila tidak diizinkan oleh lisensi yang berlaku
- ⚠️ Izin atas kode asli tidak otomatis memberikan hak untuk menjual komponen pihak ketiga

🔧 4 — Modifikasi dan Pengembangan

- Pengguna dapat mempelajari struktur kode sesuai ketentuan lisensi yang berlaku
- Pengguna dapat memperbaiki bug, menambahkan fitur, dan menyesuaikan konfigurasi sesuai izin yang diberikan
- Modifikasi tidak boleh digunakan untuk menyamarkan asal-usul kode asli
- Perubahan yang dilakukan sebaiknya didokumentasikan dengan jelas
- Pengembang boleh mencantumkan namanya sebagai kontributor tambahan tanpa menghapus kredit pembuat asli
- Seluruh modifikasi wajib mematuhi lisensi yang berlaku

📤 5 — Distribusi dan Pembagian Ulang

- Distribusi ulang hanya diperbolehkan sejauh diizinkan oleh pemegang hak dan lisensi yang berlaku
- Watermark dan pemberitahuan hak cipta yang relevan wajib dipertahankan
- Dilarang mendistribusikan ulang proyek dengan informasi kepemilikan yang menyesatkan
- Dilarang menghapus ketentuan lisensi yang berlaku untuk mengklaim proyek sebagai karya sendiri
- Distribusi komponen pihak ketiga wajib mengikuti lisensi masing-masing
- Jika izin distribusi belum jelas, hubungi pembuat asli sebelum membagikan kode sumber

👑 6 — Permintaan Izin Khusus

Permintaan izin khusus dapat diajukan untuk penggunaan yang tidak secara jelas diizinkan oleh ketentuan ini

Contoh penggunaan yang memerlukan klarifikasi atau izin khusus

- 💼 Penggunaan dalam proyek komersial
- 💰 Distribusi atau penjualan dalam bentuk paket berbayar
- 📦 Redistribusi dengan ketentuan berbeda
- 🤝 Kerja sama pengembangan dengan persyaratan khusus

Hubungi pembuat asli

- 👤 Nama: Seikagenou
- 📱 Telegram: "t.me/seikagenou" (https://t.me/seikagenou)

«Mengajukan permintaan tidak berarti izin telah diberikan

Pastikan memperoleh persetujuan tertulis sebelum melakukan aktivitas yang memerlukan izin khusus»

⚖️ 7 — Tanggung Jawab Pengguna

- Pengguna bertanggung jawab atas konfigurasi, modifikasi, dan penggunaan bot yang diterapkannya
- Pengguna wajib mematuhi ketentuan layanan WhatsApp serta hukum yang berlaku
- Pengguna bertanggung jawab atas penyalahgunaan yang dilakukannya sesuai hukum yang berlaku
- Pengguna wajib menjaga keamanan kredensial dan sesi autentikasi WhatsApp
- Pembuat asli tidak otomatis bertanggung jawab atas perubahan yang dilakukan oleh pihak lain
- Ketentuan ini tidak menghapus tanggung jawab yang tidak dapat dikecualikan berdasarkan hukum

⛔ 8 — Pelanggaran Ketentuan

Pelanggaran terhadap hak cipta atau ketentuan lisensi dapat ditindaklanjuti oleh pemegang hak sesuai hukum yang berlaku

Tindakan yang dapat dipertimbangkan meliputi

- 📩 Permintaan penghentian distribusi yang melanggar
- 🛡️ Permintaan pemulihan watermark atau kredit yang dihapus
- ⚖️ Tindakan hukum apabila memiliki dasar yang sah

---

📋 Ringkasan Ketentuan

Aktivitas| Ketentuan
Menggunakan base| Wajib mematuhi lisensi yang berlaku
Mempelajari kode| Diizinkan sejauh sesuai lisensi
Memodifikasi kode| Diizinkan sejauh sesuai lisensi
Mempertahankan watermark| Wajib sesuai ketentuan penggunaan
Menghapus kredit pembuat asli| Dilarang jika melanggar ketentuan yang berlaku
Mengklaim kode asli sebagai karya sendiri| DILARANG
Menjual ulang sebagai produk sendiri| DILARANG TANPA IZIN YANG DIPERLUKAN
Penggunaan komersial| Memerlukan izin jika tidak diizinkan oleh lisensi
Distribusi ulang| Harus sesuai lisensi dan izin yang berlaku
Menambahkan kredit kontributor| Diizinkan tanpa menghapus kredit asli

---

🤝 Prinsip Penggunaan

«Gunakan dengan bijak, kembangkan dengan kreatif, dan selalu hargai karya pembuat aslinya»

Ruan Mei-Ai dibuat sebagai fondasi bagi pengembang yang ingin membangun WhatsApp Bot dengan struktur modular dan fleksibel

Hormati karya asli, pertahankan kredit pembuat, dan patuhi ketentuan penggunaan yang berlaku

---

👨‍💻 Credits

Original Creator: Seikagenou

- 📱 Telegram: "t.me/seikagenou" (https://t.me/seikagenou)

---

<p align="center">
  <b>🪸 Ruan Mei-Ai — Modular, Flexible, and Easy to Recode</b>
  <br>
  <i>Built for developers · Designed for flexibility</i>
  <br><br>
  <b>© Seikagenou — Original Creator</b>
</p>
