-- Tambah kolom jenis_pertanggung_jawaban_keuangan ke tabel agendas
-- Jalankan SQL ini di Supabase SQL Editor

ALTER TABLE agendas 
ADD COLUMN jenis_pertanggung_jawaban_keuangan TEXT[];

-- Verifikasi kolom berhasil ditambahkan
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agendas' 
AND column_name = 'jenis_pertanggung_jawaban_keuangan';
