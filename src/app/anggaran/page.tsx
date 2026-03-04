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
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<TagihanData[]>([
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

  // Form data state
  const [formData, setFormData] = useState({
    no_bukti: '',
    tgl_bukti: '',
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
    nama_penerima: '',
    uraian: '',
    sifat_pembayaran: 'Penggantian UP (GUP)',
    jumlah_uang: '',
    ppn: '',
    pph_21: '',
    pph_22: '',
    pph_23: '',
    pph_24: '',
    status: 'Kuitansi',
    direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTagihan: TagihanData = {
      id: data.length + 1,
      no_bukti: formData.no_bukti,
      tgl_bukti: formData.tgl_bukti,
      no_spby: formData.no_spby,
      tgl_spby: formData.tgl_spby,
      no_sptb: formData.no_sptb,
      tgl_sptb: formData.tgl_sptb,
      no_spp: formData.no_spp,
      tgl_spp: formData.tgl_spp,
      no_spm: formData.no_spm,
      tgl_spm: formData.tgl_spm,
      no_sp2d: formData.no_sp2d,
      tgl_sp2d: formData.tgl_sp2d,
      nama_penerima: formData.nama_penerima,
      uraian: formData.uraian,
      sifat_pembayaran: formData.sifat_pembayaran,
      jumlah_uang: parseFloat(formData.jumlah_uang) || 0,
      ppn: parseFloat(formData.ppn) || 0,
      pph_21: parseFloat(formData.pph_21) || 0,
      pph_22: parseFloat(formData.pph_22) || 0,
      pph_23: parseFloat(formData.pph_23) || 0,
      pph_24: parseFloat(formData.pph_24) || 0,
      status: formData.status,
      direktorat: formData.direktorat
    }

    setData([newTagihan, ...data])
    setShowForm(false)
    
    // Reset form
    setFormData({
      no_bukti: '',
      tgl_bukti: '',
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
      nama_penerima: '',
      uraian: '',
      sifat_pembayaran: 'Penggantian UP (GUP)',
      jumlah_uang: '',
      ppn: '',
      pph_21: '',
      pph_22: '',
      pph_23: '',
      pph_24: '',
      status: 'Kuitansi',
      direktorat: '(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin'
    })
    
    alert('Data tagihan berhasil ditambahkan!')
  }

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Monitoring Tagihan</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? 'Tutup Form' : 'Tambah Tagihan Baru'}
        </button>
      </div>

      {/* Form Input Tagihan */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Form Input Tagihan Baru</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* No Bukti */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No Bukti <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="no_bukti"
                  value={formData.no_bukti}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="48 / 03-03-2026"
                />
              </div>

              {/* Tanggal Bukti */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Bukti <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tgl_bukti"
                  value={formData.tgl_bukti}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="03-03-2026"
                />
              </div>

              {/* No SPBy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No SPBy
                </label>
                <input
                  type="text"
                  name="no_spby"
                  value={formData.no_spby}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="42 / 03-03-2026"
                />
              </div>

              {/* Tanggal SPBy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal SPBy
                </label>
                <input
                  type="text"
                  name="tgl_spby"
                  value={formData.tgl_spby}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="03-03-2026"
                />
              </div>

              {/* No SPTB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No SPTB
                </label>
                <input
                  type="text"
                  name="no_sptb"
                  value={formData.no_sptb}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="255 / 03-03-2026"
                />
              </div>

              {/* Tanggal SPTB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal SPTB
                </label>
                <input
                  type="text"
                  name="tgl_sptb"
                  value={formData.tgl_sptb}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="03-03-2026"
                />
              </div>

              {/* No SPP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No SPP
                </label>
                <input
                  type="text"
                  name="no_spp"
                  value={formData.no_spp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="42 / 02-03-2026"
                />
              </div>

              {/* Tanggal SPP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal SPP
                </label>
                <input
                  type="text"
                  name="tgl_spp"
                  value={formData.tgl_spp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="02-03-2026"
                />
              </div>

              {/* No SPM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No SPM
                </label>
                <input
                  type="text"
                  name="no_spm"
                  value={formData.no_spm}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="50 / 01-03-2026"
                />
              </div>

              {/* Tanggal SPM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal SPM
                </label>
                <input
                  type="text"
                  name="tgl_spm"
                  value={formData.tgl_spm}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="01-03-2026"
                />
              </div>

              {/* No SP2D */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No SP2D
                </label>
                <input
                  type="text"
                  name="no_sp2d"
                  value={formData.no_sp2d}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100 / 04-03-2026"
                />
              </div>

              {/* Tanggal SP2D */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal SP2D
                </label>
                <input
                  type="text"
                  name="tgl_sp2d"
                  value={formData.tgl_sp2d}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="04-03-2026"
                />
              </div>

              {/* Nama Penerima */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Penerima <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_penerima"
                  value={formData.nama_penerima}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama penerima"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Kuitansi">Kuitansi</option>
                  <option value="SPTB">SPTB</option>
                  <option value="SPP">SPP</option>
                  <option value="SPM/SP2D">SPM/SP2D</option>
                </select>
              </div>

              {/* Uraian */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uraian <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="uraian"
                  value={formData.uraian}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi lengkap tagihan..."
                />
              </div>

              {/* Sifat Pembayaran */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sifat Pembayaran <span className="text-red-500">*</span>
                </label>
                <select
                  name="sifat_pembayaran"
                  value={formData.sifat_pembayaran}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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

              {/* Direktorat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direktorat <span className="text-red-500">*</span>
                </label>
                <select
                  name="direktorat"
                  value={formData.direktorat}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="(1103) Asisten Deputi Manajemen Transformasi Digital Pemerin">
                    (1103) Asisten Deputi Manajemen Transformasi Digital Pemerin
                  </option>
                </select>
              </div>

              {/* Jumlah Uang */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Uang (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="jumlah_uang"
                  value={formData.jumlah_uang}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* PPn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPn (Rp)
                </label>
                <input
                  type="number"
                  name="ppn"
                  value={formData.ppn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* PPh 21 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPh 21 (Rp)
                </label>
                <input
                  type="number"
                  name="pph_21"
                  value={formData.pph_21}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* PPh 22 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPh 22 (Rp)
                </label>
                <input
                  type="number"
                  name="pph_22"
                  value={formData.pph_22}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* PPh 23 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPh 23 (Rp)
                </label>
                <input
                  type="number"
                  name="pph_23"
                  value={formData.pph_23}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              {/* PPh 24 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PPh 24 (Rp)
                </label>
                <input
                  type="number"
                  name="pph_24"
                  value={formData.pph_24}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Simpan Tagihan
              </button>
            </div>
          </form>
        </div>
      )}
      
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
