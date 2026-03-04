'use client'
import { useState, useMemo } from 'react'

interface TagihanData {
  id: number
  no_bukti: string
  tgl_bukti: string
  no_spby: string
  tgl_spby: string
  no_sptb: string
  tgl_sptb: string
  no_spp: string
  tgl_spp: string
  no_spm: string
  tgl_spm: string
  no_sp2d: string
  tgl_sp2d: string
  nama_penerima: string
  uraian: string
  sifat_pembayaran: string
  jumlah_uang: number
  ppn: number
  pph_21: number
  pph_22: number
  pph_23: number
  pph_24: number
  status: string
  direktorat: string
}

export default function MonitoringTagihan() {
  const [data] = useState<TagihanData[]>([
    {
      id: 1,
      no_bukti: '48 / 03-03-2026',
      tgl_bukti: '03-03-2026',
      no_spby: '42 / 03-03-2026',
      tgl_spby: '03-03-2026',
      no_sptb: '255 / 03-03-2026',
      tgl_sptb: '03-03-2026',
      no_spp: '',
      tgl_spp: '',
      no_spm: '',
      tgl_spm: '',
      no_sp2d: '',
      tgl_sp2d: '',
      nama_penerima: 'Holland Bakery',
      uraian: 'Konsumsi Makan dan Snack dalam rangka menerima audiensi badan penyelenggara jaminan produk halal tanggal 27 Februari 2026\nRM /7908.PEA 003.052.A 521211',
      sifat_pembayaran: 'Penggantian UP (GUP)',
      jumlah_uang: 1101000,
      ppn: 0,
      pph_21: 0,
      pph_22: 0,
      pph_23: 0,
      pph_24: 0,
      status: 'SPTB',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    },
    {
      id: 2,
      no_bukti: '47 / 03-03-2026',
      tgl_bukti: '03-03-2026',
      no_spby: '42 / 03-03-2026',
      tgl_spby: '03-03-2026',
      no_sptb: '254 / 03-03-2026',
      tgl_sptb: '03-03-2026',
      no_spp: '',
      tgl_spp: '',
      no_spm: '',
      tgl_spm: '',
      no_sp2d: '',
      tgl_sp2d: '',
      nama_penerima: 'Holland Bakery',
      uraian: 'Konsumsi Makan dan Snack Rapat Diskusi Pembahasan Manajemen Layanan Pemerintah Digital Tanggal 26 Februari 2026\nRM /6189.PBL 018.051.A 521211',
      sifat_pembayaran: 'Penggantian UP (GUP)',
      jumlah_uang: 1762500,
      ppn: 0,
      pph_21: 0,
      pph_22: 0,
      pph_23: 0,
      pph_24: 0,
      status: 'SPTB',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    },
    {
      id: 3,
      no_bukti: '46 / 27-02-2026',
      tgl_bukti: '27-02-2026',
      no_spby: '40 / 27-02-2026',
      tgl_spby: '27-02-2026',
      no_sptb: '241 / 27-02-2026',
      tgl_sptb: '27-02-2026',
      no_spp: '42 / 02-03-2026',
      tgl_spp: '02-03-2026',
      no_spm: '',
      tgl_spm: '',
      no_sp2d: '',
      tgl_sp2d: '',
      nama_penerima: 'HELMI WARDHANI dkk.',
      uraian: 'Honor Narasumber pada Kegiatan Rapat Diskusi Kelompok Terarah Koordinasi Kerangka Kompetensi dan Budaya Digital ASN tanggal 20 Februari 2026\nRM /6189.PBL 018.052.A 522151',
      sifat_pembayaran: 'Pembayaran Langsung (LS) Bendahara',
      jumlah_uang: 11700000,
      ppn: 0,
      pph_21: 855000,
      pph_22: 0,
      pph_23: 0,
      pph_24: 0,
      status: 'SPP',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    },
    {
      id: 4,
      no_bukti: '45 / 27-02-2026',
      tgl_bukti: '27-02-2026',
      no_spby: '40 / 27-02-2026',
      tgl_spby: '27-02-2026',
      no_sptb: '239 / 27-02-2026',
      tgl_sptb: '27-02-2026',
      no_spp: '',
      tgl_spp: '',
      no_spm: '',
      tgl_spm: '',
      no_sp2d: '',
      tgl_sp2d: '',
      nama_penerima: 'KANTIN FAJAR',
      uraian: 'Konsumsi Makan dan Snack Rapat Pematangan Konsep Manajemen Layanan Pemerintah Digital tanggal 18 Februari 2026\nRM /7908.AEA 001.051.A 521211',
      sifat_pembayaran: 'Penggantian UP (GUP)',
      jumlah_uang: 1170000,
      ppn: 0,
      pph_21: 0,
      pph_22: 0,
      pph_23: 0,
      pph_24: 0,
      status: 'SPTB',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    },
    {
      id: 5,
      no_bukti: '44 / 26-02-2026',
      tgl_bukti: '26-02-2026',
      no_spby: '',
      tgl_spby: '',
      no_sptb: '',
      tgl_sptb: '',
      no_spp: '',
      tgl_spp: '',
      no_spm: '',
      tgl_spm: '',
      no_sp2d: '',
      tgl_sp2d: '',
      nama_penerima: 'PT Digital Indonesia',
      uraian: 'Pembayaran Jasa Konsultan Digitalisasi Layanan Publik\nRM /8901.PEA 004.053.A 521211',
      sifat_pembayaran: 'Pembayaran Langsung (LS) Pihak Ketiga',
      jumlah_uang: 75000000,
      ppn: 7500000,
      pph_21: 0,
      pph_22: 1500000,
      pph_23: 0,
      pph_24: 0,
      status: 'Kuitansi',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    },
    {
      id: 6,
      no_bukti: '43 / 25-02-2026',
      tgl_bukti: '25-02-2026',
      no_spby: '39 / 25-02-2026',
      tgl_spby: '25-02-2026',
      no_sptb: '238 / 25-02-2026',
      tgl_sptb: '25-02-2026',
      no_spp: '41 / 27-02-2026',
      tgl_spp: '27-02-2026',
      no_spm: '50 / 01-03-2026',
      tgl_spm: '01-03-2026',
      no_sp2d: '100 / 04-03-2026',
      tgl_sp2d: '04-03-2026',
      nama_penerima: 'CV Maju Bersama',
      uraian: 'Pengadaan Perangkat Komputer untuk Keperluan Kantor\nRM /7890.PBL 019.052.A 532111',
      sifat_pembayaran: 'Tambahan UP (TUP)',
      jumlah_uang: 45000000,
      ppn: 4500000,
      pph_21: 0,
      pph_22: 900000,
      pph_23: 0,
      pph_24: 0,
      status: 'SPM/SP2D',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    }
  ])

  // Filter states
  const [direktorat, setDirektorat] = useState('Semua')
  const [berdasarkan, setBerdasarkan] = useState('Semua')
  const [kataKunci, setKataKunci] = useState('')
  const [status, setStatus] = useState('Semua')
  const [sifatSPM, setSifatSPM] = useState('Semua')
  const [jumlahTagihan, setJumlahTagihan] = useState('Semua')
  const [bulan, setBulan] = useState('Semua')

  const filteredData = useMemo(() => {
    let filtered = [...data]

    if (direktorat !== 'Semua') {
      filtered = filtered.filter(item => item.direktorat.includes(direktorat))
    }

    if (status !== 'Semua') {
      filtered = filtered.filter(item => item.status === status)
    }

    if (sifatSPM !== 'Semua') {
      filtered = filtered.filter(item => item.sifat_pembayaran === sifatSPM)
    }

    if (jumlahTagihan === 'Di Atas 50 Juta') {
      filtered = filtered.filter(item => item.jumlah_uang > 50000000)
    } else if (jumlahTagihan === 'Di Bawah 50 Juta') {
      filtered = filtered.filter(item => item.jumlah_uang <= 50000000)
    }

    if (kataKunci) {
      const keyword = kataKunci.toLowerCase()
      
      if (berdasarkan === 'Penerima') {
        filtered = filtered.filter(item => 
          item.nama_penerima.toLowerCase().includes(keyword)
        )
      } else if (berdasarkan === 'Uraian') {
        filtered = filtered.filter(item => 
          item.uraian.toLowerCase().includes(keyword)
        )
      } else if (berdasarkan === 'Nomor Kuitansi') {
        filtered = filtered.filter(item => 
          item.no_bukti.toLowerCase().includes(keyword)
        )
      } else if (berdasarkan === 'Nomor SP2D') {
        filtered = filtered.filter(item => 
          item.no_sp2d.toLowerCase().includes(keyword)
        )
      } else {
        // Semua - search across all fields
        filtered = filtered.filter(item => 
          item.nama_penerima.toLowerCase().includes(keyword) ||
          item.uraian.toLowerCase().includes(keyword) ||
          item.no_bukti.toLowerCase().includes(keyword) ||
          item.no_sp2d.toLowerCase().includes(keyword)
        )
      }
    }

    if (bulan !== 'Semua') {
      filtered = filtered.filter(item => {
        const month = item.tgl_bukti.split('-')[1]
        return month === bulan
      })
    }

    return filtered
  }, [data, direktorat, status, sifatSPM, jumlahTagihan, kataKunci, berdasarkan, bulan])

  const getTotalAmount = () => {
    return filteredData.reduce((sum, item) => sum + item.jumlah_uang, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount)
  }

  const exportToExcel = () => {
    // Implementasi export ke Excel (compressed)
    alert('Export to Excel functionality would be implemented here')
  }

  const bulanOptions = [
    { value: 'Semua', label: 'Semua' },
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Monitoring Tagihan</h1>
      
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Direktorat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direktorat
            </label>
            <select
              value={direktorat}
              onChange={(e) => setDirektorat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua</option>
              <option value="(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin">
                (1103) Asisten Deputi Manajemen Transformasi Digital Pemerin
              </option>
            </select>
          </div>

          {/* Berdasarkan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Berdasarkan
            </label>
            <select
              value={berdasarkan}
              onChange={(e) => setBerdasarkan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua</option>
              <option value="Penerima">Penerima</option>
              <option value="Uraian">Uraian</option>
              <option value="Jumlah Uang">Jumlah Uang</option>
              <option value="Nomor Kuitansi">Nomor Kuitansi</option>
              <option value="Nomor SP2D">Nomor SP2D</option>
            </select>
          </div>

          {/* Kata Kunci */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kata Kunci
            </label>
            <input
              type="text"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua</option>
              <option value="Kuitansi">Kuitansi</option>
              <option value="SPTB">SPTB</option>
              <option value="SPP">SPP</option>
              <option value="SPM/SP2D">SPM/SP2D</option>
            </select>
          </div>

          {/* Sifat SPM */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sifat SPM
            </label>
            <select
              value={sifatSPM}
              onChange={(e) => setSifatSPM(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua</option>
              <option value="Dana Uang Persediaan (UP)">Dana Uang Persediaan (UP)</option>
              <option value="Tambahan UP (TUP)">Tambahan UP (TUP)</option>
              <option value="Penggantian UP (GUP)">Penggantian UP (GUP)</option>
              <option value="Pembayaran Langsung (LS) Pihak Ketiga">Pembayaran Langsung (LS) Pihak Ketiga</option>
              <option value="Penggantian UP KKP (GUP KKP)">Penggantian UP KKP (GUP KKP)</option>
              <option value="Pertanggungjawaban TUP (PTUP)">Pertanggungjawaban TUP (PTUP)</option>
              <option value="Perigesahan">Perigesahan</option>
              <option value="Pembayaran Langsung (LS) Bendahara">Pembayaran Langsung (LS) Bendahara</option>
              <option value="Pertanggungjawaban TUP KKP (PTUP KKP)">Pertanggungjawaban TUP KKP (PTUP KKP)</option>
            </select>
          </div>

          {/* Jumlah Tagihan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Tagihan
            </label>
            <select
              value={jumlahTagihan}
              onChange={(e) => setJumlahTagihan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua">Semua</option>
              <option value="Di Atas 50 Juta">Di Atas 50 Juta</option>
              <option value="Di Bawah 50 Juta">Di Bawah 50 Juta</option>
            </select>
          </div>

          {/* Bulan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bulan
            </label>
            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {bulanOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Cari
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table Header */}
        <div className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Monitoring Tagihan</h2>
          <div className="flex items-center gap-6">
            <span className="text-sm">
              Total {filteredData.length} kuitansi / Rp {formatCurrency(getTotalAmount())}
            </span>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              Excel (Compressed)
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl Bukti</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl SPBy</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl SPTB</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl SPP</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl SPM</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">No / Tgl SP2D</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300 min-w-[300px]">Nama Penerima Uraian</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">Sifat Pembayaran</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">Jumlah Uang</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">PPn</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">PPh 21</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">PPh 22</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">PPh 23</th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-r border-gray-300">PPh 24</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-3 border-r border-gray-200">{index + 1}</td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_bukti}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_spby}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_sptb}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_spp || '-'}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_spm || '-'}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 whitespace-pre-line text-xs">
                    {item.no_sp2d || '-'}
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200">
                    <div className="font-medium text-gray-900">{item.nama_penerima}</div>
                    <div className="text-xs text-gray-600 mt-1 whitespace-pre-line">{item.uraian}</div>
                  </td>
                  <td className="px-3 py-3 border-r border-gray-200 text-xs">{item.sifat_pembayaran}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{formatCurrency(item.jumlah_uang)}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{item.ppn || 0}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{item.pph_21 || 0}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{item.pph_22 || 0}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{item.pph_23 || 0}</td>
                  <td className="px-3 py-3 border-r border-gray-200 text-right">{item.pph_24 || 0}</td>
                  <td className="px-3 py-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No data message */}
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data yang ditemukan
          </div>
        )}
      </div>
    </div>
  )
}
