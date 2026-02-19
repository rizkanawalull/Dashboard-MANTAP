# Setup Supabase Database

## 1. Buat Tabel `agendas`

Jalankan SQL berikut di **Supabase SQL Editor**:

```sql
-- Create table
CREATE TABLE agendas (
  id BIGSERIAL PRIMARY KEY,
  nama_kegiatan TEXT NOT NULL,
  deskripsi TEXT,
  substansi_kegiatan TEXT,
  jenis_tugas TEXT,
  jenis_kegiatan TEXT,
  pelaksana TEXT[] DEFAULT '{}',
  pertanggung_jawaban TEXT[] DEFAULT '{}',
  tanggal_mulai DATE,
  tanggal_selesai DATE,
  waktu_mulai TIME,
  waktu_selesai TIME,
  dokumen TEXT[] DEFAULT '{}',
  target_selesai DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_agendas_updated_at
  BEFORE UPDATE ON agendas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 2. Disable Row Level Security (RLS) untuk Testing

**PENTING**: Untuk testing cepat, nonaktifkan RLS dulu:

```sql
-- Disable RLS temporarily
ALTER TABLE agendas DISABLE ROW LEVEL SECURITY;
```

## 3. Enable RLS dengan Policies (untuk Production)

Setelah yakin aplikasi berjalan, enable RLS dengan policies:

```sql
-- Enable RLS
ALTER TABLE agendas ENABLE ROW LEVEL SECURITY;

-- Allow public to SELECT
CREATE POLICY "Allow public to read agendas"
  ON agendas FOR SELECT
  TO public
  USING (true);

-- Allow public to INSERT
CREATE POLICY "Allow public to insert agendas"
  ON agendas FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to UPDATE
CREATE POLICY "Allow public to update agendas"
  ON agendas FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow public to DELETE
CREATE POLICY "Allow public to delete agendas"
  ON agendas FOR DELETE
  TO public
  USING (true);
```

## 4. Verifikasi Credentials

Pastikan file `.env.local` berisi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wexbrlcxctorypmtolkr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0J2cnmfk8rkQ3kNf1GjtlQ_hU7ewnel
```

## 5. Test Koneksi

Buka browser console (F12) dan lihat:
- Error messages yang detail
- Log dari `console.log('Inserting agenda:', newAgenda)`
- Log dari `console.log('Insert result:', { data, error })`

## 6. Setup Storage Bucket untuk Dokumen

### a. Buat Storage Bucket

1. Buka Supabase Dashboard
2. Pergi ke **Storage** di sidebar
3. Klik **Create a new bucket**
4. Isi form:
   - **Name**: `documents`
   - **Public bucket**: Centang (untuk akses publik)
5. Klik **Create bucket**

### b. Set Storage Policies (Opsional)

Untuk kontrol akses lebih baik, jalankan SQL berikut:

```sql
-- Allow public to upload files
CREATE POLICY "Allow public to upload documents"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'documents');

-- Allow public to read files
CREATE POLICY "Allow public to read documents"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'documents');

-- Allow public to delete files
CREATE POLICY "Allow public to delete documents"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'documents');
```

### c. Verifikasi Upload

Setelah upload dokumen dari aplikasi, cek di **Storage > documents** untuk melihat file yang diunggah.

## Troubleshooting

### Error: "new row violates row-level security policy"
- Solution: Jalankan `ALTER TABLE agendas DISABLE ROW LEVEL SECURITY;`

### Error: "column does not exist"
- Solution: Periksa nama kolom di tabel sesuai schema di atas

### Error: "relation agendas does not exist"
- Solution: Tabel belum dibuat, jalankan SQL di step 1

### Error: "Invalid API key"
- Solution: Periksa kredensial di `.env.local`
