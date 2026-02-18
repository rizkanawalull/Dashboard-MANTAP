-- Menambahkan kolom pelaksanaan_kegiatan ke tabel agendas
ALTER TABLE agendas
ADD COLUMN IF NOT EXISTS pelaksanaan_kegiatan DATE;

-- Verifikasi kolom berhasil ditambahkan
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agendas' 
  AND column_name = 'pelaksanaan_kegiatan';
