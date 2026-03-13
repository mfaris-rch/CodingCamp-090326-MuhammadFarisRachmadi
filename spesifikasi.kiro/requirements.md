# Requirements Document

## Introduction

Dasbor Produktivitas adalah aplikasi web standalone yang membantu pengguna meningkatkan produktivitas melalui fitur-fitur esensial: sapaan waktu real-time, timer fokus Pomodoro, daftar tugas, dan tautan cepat ke website favorit. Aplikasi ini dibangun dengan teknologi web standar (HTML, CSS, Vanilla JavaScript) dan menyimpan semua data di browser menggunakan Local Storage API.

## Glossary

- **Aplikasi**: Dasbor Produktivitas web application
- **Local_Storage**: Browser Local Storage API untuk penyimpanan data client-side
- **Timer_Fokus**: Komponen timer 25 menit untuk teknik Pomodoro
- **Daftar_Tugas**: Komponen to-do list untuk manajemen tugas
- **Tautan_Cepat**: Komponen untuk menyimpan dan mengakses link website favorit
- **Sapaan**: Komponen yang menampilkan greeting berdasarkan waktu
- **Tugas**: Item individual dalam Daftar_Tugas
- **Link**: Item individual dalam Tautan_Cepat
- **Mode_Tema**: Pengaturan tampilan light mode atau dark mode
- **Urutan_Tugas**: Metode pengurutan daftar tugas (default, alfabetis, atau berdasarkan status)

## Requirements

### Requirement 1: Tampilan Waktu dan Tanggal Real-time

**User Story:** Sebagai pengguna, saya ingin melihat waktu dan tanggal saat ini, sehingga saya dapat mengetahui informasi waktu tanpa membuka aplikasi lain.

#### Acceptance Criteria

1. THE Aplikasi SHALL menampilkan waktu saat ini dalam format HH:MM:SS
2. THE Aplikasi SHALL menampilkan tanggal saat ini dalam format hari, tanggal bulan tahun (contoh: "Senin, 1 Januari 2024")
3. WHEN waktu berubah, THE Aplikasi SHALL memperbarui tampilan waktu dalam 1 detik
4. THE Aplikasi SHALL menggunakan locale Indonesia (id-ID) untuk format waktu dan tanggal

### Requirement 2: Sapaan Berdasarkan Waktu

**User Story:** Sebagai pengguna, saya ingin melihat sapaan yang sesuai dengan waktu, sehingga aplikasi terasa lebih personal dan ramah.

#### Acceptance Criteria

1. WHEN waktu menunjukkan jam 00:00 hingga 11:59, THE Sapaan SHALL menampilkan "Selamat Pagi"
2. WHEN waktu menunjukkan jam 12:00 hingga 17:59, THE Sapaan SHALL menampilkan "Selamat Siang"
3. WHEN waktu menunjukkan jam 18:00 hingga 23:59, THE Sapaan SHALL menampilkan "Selamat Malam"
4. WHEN waktu melewati batas periode sapaan, THE Aplikasi SHALL memperbarui sapaan dalam 60 detik

### Requirement 3: Timer Fokus 25 Menit

**User Story:** Sebagai pengguna, saya ingin menggunakan timer 25 menit, sehingga saya dapat menerapkan teknik Pomodoro untuk meningkatkan fokus.

#### Acceptance Criteria

1. THE Timer_Fokus SHALL menampilkan waktu dalam format MM:SS
2. THE Timer_Fokus SHALL memiliki durasi default 25 menit (1500 detik)
3. WHEN tombol "Mulai" diklik, THE Timer_Fokus SHALL menghitung mundur setiap 1 detik
4. WHEN Timer_Fokus mencapai 00:00, THE Aplikasi SHALL menampilkan notifikasi "Sesi fokus selesai!"
5. WHEN Timer_Fokus mencapai 00:00, THE Timer_Fokus SHALL berhenti menghitung mundur
6. WHEN tombol "Berhenti" diklik, THE Timer_Fokus SHALL menghentikan countdown tanpa mengubah waktu tersisa
7. WHEN tombol "Atur Ulang" diklik, THE Timer_Fokus SHALL mengatur ulang waktu ke 25:00 dan menghentikan countdown jika sedang berjalan

### Requirement 4: Manajemen Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin mengelola daftar tugas, sehingga saya dapat melacak pekerjaan yang perlu diselesaikan.

#### Acceptance Criteria

1. WHEN pengguna memasukkan teks dan mengklik tombol "Tambah", THE Daftar_Tugas SHALL menambahkan Tugas baru ke daftar
2. WHEN pengguna memasukkan teks dan menekan tombol Enter, THE Daftar_Tugas SHALL menambahkan Tugas baru ke daftar
3. WHEN input teks kosong atau hanya berisi spasi, THE Daftar_Tugas SHALL mengabaikan permintaan penambahan Tugas
4. WHEN pengguna mencoba menambahkan Tugas yang sudah ada (case-insensitive), THE Aplikasi SHALL menampilkan peringatan "Tugas ini sudah ada dalam daftar!" dan tidak menambahkan Tugas duplikat
5. WHEN Tugas ditambahkan, THE Aplikasi SHALL mengosongkan input field
6. THE Daftar_Tugas SHALL menampilkan setiap Tugas dengan checkbox, teks tugas, tombol "Ubah", dan tombol "Hapus"

### Requirement 5: Penandaan Status Tugas

**User Story:** Sebagai pengguna, saya ingin menandai tugas sebagai selesai, sehingga saya dapat melihat progress pekerjaan saya.

#### Acceptance Criteria

1. WHEN checkbox Tugas diklik, THE Daftar_Tugas SHALL mengubah status Tugas menjadi selesai atau belum selesai
2. WHEN Tugas berstatus selesai, THE Aplikasi SHALL menampilkan teks Tugas dengan garis coret (strikethrough)
3. WHEN Tugas berstatus selesai, THE Aplikasi SHALL mengubah warna teks Tugas menjadi abu-abu
4. WHEN status Tugas berubah, THE Aplikasi SHALL menyimpan perubahan ke Local_Storage

### Requirement 6: Edit Tugas

**User Story:** Sebagai pengguna, saya ingin mengubah teks tugas, sehingga saya dapat memperbaiki atau memperbarui informasi tugas.

#### Acceptance Criteria

1. WHEN tombol "Ubah" diklik, THE Daftar_Tugas SHALL mengubah teks Tugas menjadi editable
2. WHEN teks Tugas dalam mode edit, THE Aplikasi SHALL menampilkan border pada teks dan mengubah label tombol menjadi "Simpan"
3. WHEN tombol "Simpan" diklik, THE Daftar_Tugas SHALL menyimpan perubahan teks Tugas
4. WHEN perubahan disimpan, THE Aplikasi SHALL mengubah teks kembali menjadi non-editable dan mengembalikan label tombol menjadi "Ubah"
5. WHEN teks Tugas diubah, THE Aplikasi SHALL menyimpan perubahan ke Local_Storage

### Requirement 7: Hapus Tugas

**User Story:** Sebagai pengguna, saya ingin menghapus tugas, sehingga saya dapat menghilangkan tugas yang tidak relevan.

#### Acceptance Criteria

1. WHEN tombol "Hapus" diklik, THE Daftar_Tugas SHALL menghapus Tugas dari daftar
2. WHEN Tugas dihapus, THE Aplikasi SHALL memperbarui tampilan daftar tanpa Tugas tersebut
3. WHEN Tugas dihapus, THE Aplikasi SHALL menyimpan perubahan ke Local_Storage

### Requirement 8: Persistensi Data Tugas

**User Story:** Sebagai pengguna, saya ingin tugas-tugas saya tersimpan, sehingga data tidak hilang saat saya menutup dan membuka kembali aplikasi.

#### Acceptance Criteria

1. WHEN Tugas ditambahkan, diubah, atau dihapus, THE Aplikasi SHALL menyimpan seluruh daftar Tugas ke Local_Storage
2. WHEN Aplikasi dimuat, THE Daftar_Tugas SHALL membaca data Tugas dari Local_Storage
3. WHEN tidak ada data di Local_Storage, THE Daftar_Tugas SHALL menampilkan daftar kosong
4. THE Aplikasi SHALL menyimpan data Tugas dalam format JSON array dengan properti text dan done

### Requirement 9: Manajemen Tautan Cepat

**User Story:** Sebagai pengguna, saya ingin menyimpan link website favorit, sehingga saya dapat mengaksesnya dengan cepat.

#### Acceptance Criteria

1. WHEN pengguna memasukkan nama dan URL lalu mengklik tombol "Tambah Tautan", THE Tautan_Cepat SHALL menambahkan Link baru ke daftar
2. WHEN input nama atau URL kosong, THE Tautan_Cepat SHALL mengabaikan permintaan penambahan Link
3. WHEN Link ditambahkan, THE Aplikasi SHALL mengosongkan kedua input field
4. THE Tautan_Cepat SHALL menampilkan setiap Link dengan nama yang dapat diklik dan tombol hapus
5. WHEN nama Link diklik, THE Aplikasi SHALL membuka URL di tab baru browser

### Requirement 10: Hapus Tautan Cepat

**User Story:** Sebagai pengguna, saya ingin menghapus link yang tidak lagi saya perlukan, sehingga daftar tetap relevan.

#### Acceptance Criteria

1. WHEN tombol hapus Link diklik, THE Tautan_Cepat SHALL menghapus Link dari daftar
2. WHEN Link dihapus, THE Aplikasi SHALL memperbarui tampilan daftar tanpa Link tersebut
3. WHEN Link dihapus, THE Aplikasi SHALL menyimpan perubahan ke Local_Storage

### Requirement 11: Persistensi Data Tautan Cepat

**User Story:** Sebagai pengguna, saya ingin tautan-tautan saya tersimpan, sehingga data tidak hilang saat saya menutup dan membuka kembali aplikasi.

#### Acceptance Criteria

1. WHEN Link ditambahkan atau dihapus, THE Aplikasi SHALL menyimpan seluruh daftar Link ke Local_Storage
2. WHEN Aplikasi dimuat, THE Tautan_Cepat SHALL membaca data Link dari Local_Storage
3. WHEN tidak ada data di Local_Storage, THE Tautan_Cepat SHALL menampilkan daftar kosong
4. THE Aplikasi SHALL menyimpan data Link dalam format JSON array dengan properti name dan url

### Requirement 12: Inisialisasi Aplikasi

**User Story:** Sebagai pengguna, saya ingin aplikasi langsung siap digunakan saat dimuat, sehingga saya dapat langsung produktif.

#### Acceptance Criteria

1. WHEN Aplikasi dimuat, THE Aplikasi SHALL menampilkan sapaan yang sesuai dengan waktu saat ini
2. WHEN Aplikasi dimuat, THE Aplikasi SHALL menampilkan waktu dan tanggal saat ini
3. WHEN Aplikasi dimuat, THE Timer_Fokus SHALL menampilkan 25:00
4. WHEN Aplikasi dimuat, THE Daftar_Tugas SHALL memuat dan menampilkan data dari Local_Storage
5. WHEN Aplikasi dimuat, THE Tautan_Cepat SHALL memuat dan menampilkan data dari Local_Storage

### Requirement 13: Responsivitas Interface

**User Story:** Sebagai pengguna, saya ingin interface yang responsif, sehingga aplikasi terasa cepat dan nyaman digunakan.

#### Acceptance Criteria

1. WHEN pengguna berinteraksi dengan tombol, THE Aplikasi SHALL memberikan feedback visual dalam 100 milidetik
2. WHEN data disimpan ke Local_Storage, THE Aplikasi SHALL memperbarui tampilan tanpa delay yang terlihat
3. THE Aplikasi SHALL memuat halaman dalam waktu kurang dari 2 detik pada koneksi normal
4. WHEN pengguna mengetik di input field, THE Aplikasi SHALL merespons setiap keystroke tanpa lag

### Requirement 14: Kompatibilitas Browser

**User Story:** Sebagai pengguna, saya ingin aplikasi bekerja di berbagai browser modern, sehingga saya dapat menggunakannya di perangkat apapun.

#### Acceptance Criteria

1. THE Aplikasi SHALL berfungsi dengan benar di Google Chrome versi terbaru
2. THE Aplikasi SHALL berfungsi dengan benar di Mozilla Firefox versi terbaru
3. THE Aplikasi SHALL berfungsi dengan benar di Microsoft Edge versi terbaru
4. THE Aplikasi SHALL berfungsi dengan benar di Safari versi terbaru
5. THE Aplikasi SHALL menggunakan API browser standar yang didukung oleh semua browser modern

### Requirement 15: Desain Visual

**User Story:** Sebagai pengguna, saya ingin interface yang bersih dan menarik, sehingga aplikasi nyaman digunakan dalam waktu lama.

#### Acceptance Criteria

1. THE Aplikasi SHALL menggunakan skema warna yang konsisten di seluruh interface
2. THE Aplikasi SHALL menampilkan setiap section dalam card terpisah dengan border radius dan shadow
3. THE Aplikasi SHALL menggunakan tipografi yang mudah dibaca dengan hierarki yang jelas
4. THE Aplikasi SHALL memberikan visual feedback pada hover untuk semua elemen interaktif
5. THE Aplikasi SHALL menggunakan spacing yang konsisten antara elemen-elemen UI

### Requirement 16: Mode Tema Light/Dark

**User Story:** Sebagai pengguna, saya ingin dapat beralih antara mode terang dan gelap, sehingga saya dapat menyesuaikan tampilan dengan preferensi dan kondisi pencahayaan saya.

#### Acceptance Criteria

1. THE Aplikasi SHALL menampilkan tombol toggle tema di pojok kanan atas halaman
2. WHEN mode light aktif, THE tombol toggle SHALL menampilkan ikon bulan (🌙)
3. WHEN mode dark aktif, THE tombol toggle SHALL menampilkan ikon matahari (☀️)
4. WHEN tombol toggle diklik, THE Aplikasi SHALL beralih antara mode light dan dark
5. WHEN mode dark aktif, THE Aplikasi SHALL mengubah background menjadi gradient gelap (#1a202c ke #2d3748)
6. WHEN mode dark aktif, THE Aplikasi SHALL mengubah warna teks sapaan menjadi putih (#ffffff)
7. WHEN mode dark aktif, THE Aplikasi SHALL mengubah background section menjadi #2d3748 dengan teks #e2e8f0
8. WHEN mode dark aktif, THE Aplikasi SHALL mengubah input fields dan task items menjadi background gelap dengan border yang sesuai
9. WHEN preferensi tema diubah, THE Aplikasi SHALL menyimpan pilihan ke Local_Storage
10. WHEN Aplikasi dimuat, THE Aplikasi SHALL menerapkan Mode_Tema yang tersimpan di Local_Storage
11. THE Aplikasi SHALL menerapkan transisi smooth (0.3s) saat beralih antara mode tema

### Requirement 17: Pengurutan Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin dapat mengurutkan daftar tugas, sehingga saya dapat melihat tugas dalam urutan yang paling berguna bagi saya.

#### Acceptance Criteria

1. THE Daftar_Tugas SHALL menampilkan dropdown "Urutkan" dengan 3 pilihan: "Urutan Default", "Alfabetis", dan "Status (Belum Selesai Dulu)"
2. WHEN "Urutan Default" dipilih, THE Daftar_Tugas SHALL menampilkan tugas sesuai urutan ditambahkan
3. WHEN "Alfabetis" dipilih, THE Daftar_Tugas SHALL mengurutkan tugas berdasarkan abjad (A-Z) menggunakan locale Indonesia
4. WHEN "Status (Belum Selesai Dulu)" dipilih, THE Daftar_Tugas SHALL menampilkan tugas belum selesai terlebih dahulu, diikuti tugas yang sudah selesai
5. WHEN Urutan_Tugas diubah, THE Aplikasi SHALL langsung memperbarui tampilan daftar sesuai urutan yang dipilih
6. WHEN Urutan_Tugas diubah, THE Aplikasi SHALL menyimpan preferensi ke Local_Storage
7. WHEN Aplikasi dimuat, THE Aplikasi SHALL menerapkan Urutan_Tugas yang tersimpan di Local_Storage
8. THE pengurutan SHALL tidak mengubah data asli tugas, hanya urutan tampilan
