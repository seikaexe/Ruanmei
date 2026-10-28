🪸 Ruan Mei-Ai

<p align="center">
  <b>Advanced WhatsApp Bot Framework</b><br>
  Modular • Flexible • Developer-Friendly
</p><p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-ff69b4?style=for-the-badge" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Baileys-@sakuraa%2Fbaileys-8A2BE2?style=for-the-badge" alt="Sakuraa Baileys">
  <img src="https://img.shields.io/badge/License-Custom-red?style=for-the-badge" alt="Custom License">
</p><p align="center">
  <b>Ruan Mei-Ai</b> adalah base WhatsApp Bot berbasis Node.js dengan sistem plugin modular yang dirancang agar mudah dikembangkan, dikonfigurasi, dan diperluas sesuai kebutuhan pengembang
</p>---

📑 Daftar Isi

- "🌸 Tentang Proyek" (#-tentang-proyek)
- "📌 Informasi Proyek" (#-informasi-proyek)
- "✨ Fitur Utama" (#-fitur-utama)
- "📖 Sistem Menu" (#-sistem-menu)
- "🧩 Sistem Plugin" (#-sistem-plugin)
- "📂 Struktur Direktori" (#-struktur-direktori)
- "🛠️ Teknologi" (#️-teknologi)
- "🔄 Auto Restart" (#-auto-restart)
- "📦 Pengembangan" (#-pengembangan)
- "📜 Lisensi dan Ketentuan Penggunaan" (#-lisensi-dan-ketentuan-penggunaan)
- "👨‍💻 Credits" (#-credits)

---

🌸 Tentang Proyek

Ruan Mei-Ai merupakan framework WhatsApp Bot yang menggunakan JavaScript ES Modules dan package "@sakuraa/baileys"

Dengan arsitektur berbasis plugin, setiap fitur dapat dikelola secara terpisah tanpa harus mengubah keseluruhan sistem utama

✨ Keunggulan

- 🧩 Modular Architecture — Fitur dipisahkan berdasarkan kategori plugin
- ⚙️ Flexible Configuration — Konfigurasi bot dapat disesuaikan melalui "config.js"
- 🚀 Extensible System — Memudahkan penambahan plugin baru
- 📚 Dynamic Menu — Daftar command mengikuti plugin yang berhasil dimuat
- 🛠️ Developer-Friendly — Struktur proyek dirancang untuk memudahkan pengembangan
- 🔄 Automatic Recovery — Mendukung mekanisme penyambungan kembali ketika koneksi terputus
- 🔐 Session Management — Mengelola autentikasi dan sesi WhatsApp

---

📌 Informasi Proyek

Properti| Detail
Nama| Ruan Mei-Ai
Versi| 1.0.0
Author| Seikagenou
Runtime| Node.js
Module System| JavaScript ES Modules
WhatsApp Library| "@sakuraa/baileys"
Database| SQLite ("node:sqlite")
File Monitoring| Chokidar
License| Custom Terms of Use

---

✨ Fitur Utama

🧩 Plugin System

Sistem plugin modular memungkinkan bot memuat fitur dari folder "plugins/", termasuk subfolder

- Automatic Plugin Loader
- Nested Plugin Directory Support
- Command Registration
- Command Alias
- Category-Based Commands
- Permission-Based Execution
- Plugin Hot Reload
- Modular Feature Management

📖 Interactive Menu

Sistem menu interaktif untuk membantu pengguna mengakses fitur bot dengan lebih mudah

- 🌸 Interactive Main Menu
- 🖼️ Image Thumbnail
- 📝 Informative Text
- ⚡ Reaction Support
- 📂 Category Selection
- 📋 Dynamic Command Listing
- 👤 User Information
- 🤖 Bot Information

🗃️ Database System

Penyimpanan data menggunakan SQLite untuk mendukung pengelolaan informasi pengguna dan sistem bot

- User Data
- Experience Points (EXP)
- User Level
- User Rank
- Daily Limit
- Premium Status
- Banned Status
- Persistent Data Storage

🏅 Level & Rank System

Sistem progres pengguna berdasarkan pengalaman yang diperoleh

- EXP Management
- Level Progression
- Rank System
- Daily Limit Management
- User Progress Tracking

👑 Owner & Premium System

Sistem hak akses untuk membedakan pengguna berdasarkan izin yang diberikan

- Owner Access
- Premium Access
- Command Restrictions
- Permission Validation
- Role-Based Features

👥 Group Management & Protection

Mendukung pembatasan command dan pemeriksaan izin untuk penggunaan di grup WhatsApp

- Group-Only Commands
- Admin-Only Commands
- Bot Admin Validation
- Group Permission Checks
- Command Access Restrictions

🔐 Pairing Code & Session Management

Sistem autentikasi untuk menghubungkan akun WhatsApp dengan bot

- Pairing Code Authentication
- Session Management
- Authentication State Handling
- Connection Monitoring
- Reconnection Support

🔍 Debug System

Membantu pengembang memeriksa pemrosesan command dan menangani kesalahan

- Command Processing Logs
- Plugin Error Reporting
- Debug Information
- Error Monitoring

---

📖 Sistem Menu

Ruan Mei-Ai menyediakan sistem menu yang dirancang untuk menampilkan command berdasarkan kategori plugin yang berhasil dimuat

".menu"

Menampilkan menu utama bot dengan informasi dan navigasi kategori

Fitur menu

- 🌸 Tampilan menu interaktif
- 🖼️ Dukungan thumbnail
- ⚡ Reaction
- 📂 Pemilihan kategori
- 📋 Informasi command
- 🤖 Informasi bot

".allmenu"

Menampilkan seluruh kategori dan command yang tersedia berdasarkan plugin yang berhasil dimuat

Sistem menu dinamis membantu menjaga daftar command agar tetap selaras dengan plugin yang tersedia

---

🧩 Sistem Plugin

Ruan Mei-Ai menggunakan arsitektur plugin modular untuk memisahkan setiap fitur berdasarkan kategori

✨ Keuntungan Sistem Plugin

- Menambahkan fitur tanpa mengubah banyak bagian sistem utama
- Mengelompokkan command berdasarkan kategori
- Mempermudah proses pemeliharaan dan debugging
- Memungkinkan pengembangan fitur secara independen
- Memudahkan pengelolaan command dan permission
- Mendukung pemuatan ulang plugin sesuai implementasi yang tersedia

📄 Metadata Plugin

Plugin dapat menggunakan metadata untuk menentukan command, kategori, deskripsi, dan izin yang diperlukan

Contoh metadata plugin

handler.command = ['example', 'ex']
handler.category = 'tools'
handler.desc = 'Contoh command plugin'
handler.usage = '<teks>'

export default handler

Sesuaikan metadata dengan format yang didukung oleh handler pada versi proyek yang digunakan

---

📂 Struktur Direktori

Struktur berikut merupakan gambaran umum dari komponen utama proyek

Ruan-Mei-Ai/
├── config.js
├── index.js
├── handler.js
├── package.json
│
├── database/
│   └── ...
│
├── lib/
│   ├── ...
│   └── supervisor.js
│
└── plugins/
    ├── ai/
    ├── downloader/
    ├── game/
    ├── group/
    ├── menu/
    ├── owner/
    ├── premium/
    ├── tools/
    └── ...

«Catatan: Struktur di atas merupakan ilustrasi dan bukan daftar lengkap seluruh file proyek

Sesuaikan nama folder dan file dengan struktur aktual repositori»

---

🛠️ Teknologi

Teknologi| Kegunaan
Node.js| Menjalankan aplikasi JavaScript
JavaScript ESM| Mengelola sistem modul
"@sakuraa/baileys"| Integrasi koneksi WhatsApp
SQLite ("node:sqlite")| Penyimpanan data
Chokidar| Memantau perubahan file
JSON| Menyimpan konfigurasi atau data tertentu

---

🔄 Auto Restart

Ruan Mei-Ai mendukung pemantauan perubahan file untuk membantu proses pengembangan dan pemeliharaan bot

⚙️ Kemampuan

- Memantau perubahan pada file yang dikonfigurasi
- Menjalankan ulang proses sesuai aturan supervisor
- Mendukung pemuatan ulang plugin jika implementasi mengizinkannya
- Membantu menerapkan pembaruan kode tanpa harus memulai ulang proses secara manual setiap saat

📌 Catatan

Perilaku auto restart bergantung pada konfigurasi supervisor dan file yang dimasukkan ke dalam daftar pemantauan

Pastikan pengaturan sesuai dengan implementasi yang tersedia pada repositori

---

📦 Pengembangan

Ruan Mei-Ai dirancang agar dapat dikembangkan melalui sistem plugin modular

🛠️ Area Pengembangan

- Menambahkan command baru
- Mengembangkan kategori plugin
- Memperbaiki bug
- Meningkatkan performa
- Mengembangkan sistem menu
- Menambahkan integrasi layanan eksternal
- Memperbaiki dokumentasi

📌 Ketentuan Pengembangan

- Pertahankan watermark asli pembuat
- Jangan menghapus kredit pembuat asli
- Jangan mengklaim kode asli sebagai karya pribadi
- Pastikan dependensi baru memiliki lisensi yang sesuai
- Dokumentasikan perubahan yang dilakukan

---

📜 Lisensi dan Ketentuan Penggunaan

«⚠️ PENTING — BACA SELURUH KETENTUAN SEBELUM MENGGUNAKAN ATAU MENDISTRIBUSIKAN PROYEK INI»

Ruan Mei-Ai dikembangkan oleh Seikagenou dengan ketentuan penggunaan yang bertujuan melindungi atribusi pembuat asli dan mencegah penyalahgunaan identitas proyek

Ketentuan ini harus dibaca bersama file lisensi resmi yang disertakan dalam repositori, jika tersedia

🛡️ 1 — Hak Cipta dan Kepemilikan

- Hak atas kode asli tetap berada pada pemegang hak yang sah
- Pengguna dilarang mengklaim kode asli sebagai hasil karya pribadi
- Modifikasi tidak secara otomatis mengalihkan kepemilikan kode asli
- Kontributor dapat memberikan kredit atas fitur atau perubahan yang benar-benar dibuatnya
- Hak atas komponen pihak ketiga tetap mengikuti lisensi masing-masing

©️ 2 — Watermark dan Kredit Pembuat

Watermark dan kredit pembuat asli wajib dipertahankan sesuai ketentuan yang berlaku

- Dilarang menghapus watermark asli dari kode sumber
- Dilarang mengubah watermark untuk menggantinya dengan identitas pihak lain
- Dilarang menyamarkan atau menghilangkan identitas pembuat asli
- Dilarang mengklaim bahwa proyek asli sepenuhnya dibuat oleh pihak lain
- Kredit tambahan untuk kontributor diperbolehkan selama tidak menghilangkan kredit asli

🚫 3 — Larangan Menjual Base

DILARANG MENJUAL KEMBALI RUAN MEI-AI SEBAGAI PRODUK MILIK SENDIRI TANPA IZIN TERTULIS DARI PEMEGANG HAK YANG BERWENANG

Ketentuan larangan penjualan meliputi

- ❌ Menjual ulang base dalam bentuk asli
- ❌ Menjual ulang base dengan nama atau identitas berbeda untuk menyamarkan asal-usulnya
- ❌ Menjual versi modifikasi dengan menghilangkan watermark atau kredit pembuat asli
- ❌ Mengemas ulang kode sumber untuk dijual sebagai produk milik sendiri
- ❌ Mengklaim kepemilikan eksklusif atas kode asli yang bukan hasil karya sendiri
- ❌ Menggunakan kontribusi pihak lain untuk membuat klaim kepemilikan yang menyesatkan

Penggunaan komersial dan distribusi berbayar hanya diperbolehkan jika memiliki izin yang diperlukan dan sesuai dengan lisensi yang berlaku

🔧 4 — Modifikasi dan Pengembangan

- Pengguna dapat melakukan modifikasi sejauh diizinkan oleh ketentuan lisensi yang berlaku
- Pengguna dapat memperbaiki bug dan menambahkan fitur baru sesuai izin yang diberikan
- Modifikasi tidak boleh digunakan untuk menghapus atau menyamarkan atribusi pembuat asli
- Pengembang dapat mencantumkan identitasnya sebagai kontributor tambahan
- Perubahan sebaiknya didokumentasikan agar asal-usul kode tetap jelas
- Seluruh perubahan harus menghormati hak pemegang hak cipta dan lisensi komponen pihak ketiga

📤 5 — Distribusi dan Pembagian Ulang

- Distribusi ulang hanya diperbolehkan sejauh diizinkan oleh pemegang hak dan lisensi yang berlaku
- Watermark dan pemberitahuan hak cipta yang relevan harus dipertahankan
- Dilarang mendistribusikan ulang proyek dengan klaim kepemilikan yang menyesatkan
- Dilarang menghapus ketentuan lisensi untuk mengesankan bahwa proyek merupakan karya pribadi
- Distribusi komponen pihak ketiga harus mematuhi lisensi masing-masing
- Jika izin distribusi tidak jelas, hubungi pemegang hak sebelum membagikan kode sumber

👑 6 — Permintaan Izin Khusus

Untuk penggunaan yang tidak secara jelas diizinkan oleh ketentuan ini, pengguna harus memperoleh persetujuan dari pemegang hak yang berwenang

Contoh permintaan izin khusus

- 💼 Penggunaan komersial
- 💰 Penjualan atau distribusi berbayar
- 📦 Redistribusi dengan ketentuan berbeda
- 🤝 Kerja sama pengembangan dengan persyaratan khusus

Kontak pembuat asli

- Nama: Seikagenou
- Telegram: "t.me/seikagenou" (https://t.me/seikagenou)

«Mengajukan permintaan tidak berarti izin telah diberikan

Pastikan memperoleh persetujuan tertulis sebelum melakukan aktivitas yang memerlukan izin khusus»

⚖️ 7 — Tanggung Jawab Pengguna

- Pengguna bertanggung jawab atas konfigurasi, modifikasi, dan cara penggunaan bot
- Pengguna wajib mematuhi ketentuan layanan WhatsApp serta hukum yang berlaku
- Pengguna bertanggung jawab atas penyalahgunaan yang dilakukannya sesuai hukum yang berlaku
- Pengguna wajib menjaga keamanan kredensial dan sesi autentikasi
- Pembuat asli tidak otomatis bertanggung jawab atas perubahan yang dilakukan oleh pihak lain
- Ketentuan ini tidak menghapus tanggung jawab yang tidak dapat dikecualikan oleh hukum

⛔ 8 — Penanganan Pelanggaran

Pelanggaran terhadap hak cipta atau ketentuan lisensi dapat ditindaklanjuti oleh pemegang hak sesuai hukum yang berlaku

Tindakan yang dapat dipertimbangkan meliputi

- 📩 Permintaan penghentian distribusi yang melanggar
- 🛡️ Permintaan pemulihan watermark atau kredit yang dihapus
- ⚖️ Tindakan hukum apabila memiliki dasar yang sah

📋 Ringkasan Ketentuan

Aktivitas| Ketentuan
Menggunakan base| Wajib mengikuti lisensi yang berlaku
Mempelajari kode| Sesuai izin dan lisensi yang berlaku
Memodifikasi kode| Sesuai izin dan lisensi yang berlaku
Menghapus watermark asli| Dilarang sesuai ketentuan penggunaan
Menghapus kredit pembuat| Dilarang jika melanggar ketentuan yang berlaku
Mengklaim kode asli sebagai karya sendiri| DILARANG
Menjual ulang sebagai produk sendiri| DILARANG TANPA IZIN YANG DIPERLUKAN
Penggunaan komersial| Memerlukan izin jika tidak diizinkan oleh lisensi
Distribusi ulang| Harus sesuai lisensi dan izin yang berlaku
Menambahkan kredit kontributor| Diperbolehkan tanpa menghilangkan kredit asli

«⚠️ Catatan Lisensi

Ketentuan ini merupakan pernyataan kebijakan penggunaan proyek dan bukan pengganti dokumen lisensi resmi

Jika proyek menggunakan lisensi pihak ketiga atau lisensi open-source yang sudah memberikan hak tertentu kepada pengguna, ketentuan tambahan tidak dapat begitu saja menghapus hak yang telah diberikan oleh lisensi tersebut

Pastikan file "LICENSE" konsisten dengan aturan yang ditetapkan pemegang hak sebelum repositori dipublikasikan»

---

👨‍💻 Credits

<p align="center">
  <b>Original Creator</b><br>
  <strong>Seikagenou</strong><br><br>
  📱 <b>Telegram:</b> <a href="https://t.me/seikagenou">t.me/seikagenou</a>
</p>---

<p align="center">
  🪸 <b>Ruan Mei-Ai</b><br>
  <i>Modular • Flexible • Developer-Friendly</i><br><br>
  <b>Respect the Creator · Preserve the Credits</b>
</p>
