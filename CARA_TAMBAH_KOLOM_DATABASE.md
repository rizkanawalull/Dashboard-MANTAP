# Cara Menambah Kolom `jenis_pertanggung_jawaban_keuangan` ke Database Supabase

## Langkah-langkah:

### 1. Buka Supabase Dashboard
- Login ke Supabase: https://supabase.com/dashboard
- Pilih project Anda

### 2. Buka SQL Editor
- Di sidebar kiri, klik menu **SQL Editor**
- Atau langsung ke: https://supabase.com/dashboard/project/[PROJECT_ID]/sql

### 3. Jalankan SQL Query
- Copy SQL dari file `add_column_jenis_keuangan.sql`
- Paste ke SQL Editor
- Klik tombol **Run** atau tekan `Ctrl+Enter` (Windows/Linux) / `Cmd+Enter` (Mac)

### 4. Verifikasi Kolom Berhasil Ditambahkan
Setelah menjalankan query, Anda akan melihat hasil verifikasi:

```
column_name                           | data_type
--------------------------------------|----------
jenis_pertanggung_jawaban_keuangan   | ARRAY
```

Jika muncul hasil seperti di atas, berarti kolom berhasil ditambahkan!

### 5. Cek di Table Editor (Opsional)
- Klik menu **Table Editor** di sidebar
- Pilih tabel `agendas`
- Scroll ke kanan, Anda akan melihat kolom baru `jenis_pertanggung_jawaban_keuangan`

## Selesai!

Setelah kolom berhasil ditambahkan, aplikasi Next.js Anda sudah siap menampilkan:
- **Kolom PIC** - Menampilkan pelaksana kegiatan
- **Kolom JENIS PERTANGGUNG JAWABAN KEUANGAN** - Menampilkan jenis keuangan (Belanja Modal, Paket Meeting, dll)
- **Kolom DOKUMEN PERTANGGUNG JAWABAN** - Menampilkan dokumen yang sudah dicentang

## Troubleshooting

### Error: permission denied
- Pastikan Anda login sebagai owner/admin project
- Atau disable RLS sementara untuk testing

### Kolom tidak muncul di aplikasi
- Restart development server (tekan `Ctrl+C` lalu `npm run dev` lagi)
- Clear browser cache
- Periksa console browser untuk error
