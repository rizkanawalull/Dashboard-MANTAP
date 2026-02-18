'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Agenda {
  id: number
  nama_kegiatan: string
  deskripsi: string
  substansi_kegiatan: string
  jenis_tugas: string
  jenis_kegiatan: string
  pelaksana: string[]
  pertanggung_jawaban: string[]
  tanggal_mulai: string
  tanggal_selesai: string
  waktu_mulai: string
  waktu_selesai: string
  dokumen: string[]
  created_at: string
}

export default function DataKegiatan() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null)
  const [agendas, setAgendas] = useState<Agenda[]>([])
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState('')
  const [currentYear, setCurrentYear] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({}) // State untuk file upload

  // Form states
  const [formData, setFormData] = useState<{
    nama_kegiatan: string
    deskripsi: string
    substansi_kegiatan: string
    jenis_tugas: string
    jenis_kegiatan: string
    pelaksana_kegiatan: string[]
    pertanggung_jawaban: string[]
    tanggal_mulai: string
    tanggal_selesai: string
    waktu_mulai: string
    waktu_selesai: string
    dokumen_teknis: string[]
  }>({
    nama_kegiatan: '',
    deskripsi: '',
    substansi_kegiatan: '',
    jenis_tugas: 'Teknis',
    jenis_kegiatan: '',
    pelaksana_kegiatan: [],
    pertanggung_jawaban: [],
    tanggal_mulai: '',
    tanggal_selesai: '',
    waktu_mulai: '',
    waktu_selesai: '',
    dokumen_teknis: []
  })

  // Fetch agendas from Supabase on mount
  useEffect(() => {
    fetchAgendas()
  }, [])

  const fetchAgendas = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('agendas')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setAgendas(data || [])
      // Trigger event for other components to update
      window.dispatchEvent(new Event('agenda-updated'))
    } catch (error: any) {
      console.error('Error fetching agendas:', error)
      const errorMessage = error?.message || error?.toString() || 'Unknown error'
      alert(`Gagal memuat data dari Supabase:\n${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing && editingAgenda) {
        // Update existing agenda in Supabase
        const updatedData = {
          nama_kegiatan: formData.nama_kegiatan,
          deskripsi: formData.deskripsi,
          substansi_kegiatan: formData.substansi_kegiatan,
          jenis_tugas: formData.jenis_tugas,
          jenis_kegiatan: formData.jenis_kegiatan,
          pelaksana: formData.pelaksana_kegiatan,
          pertanggung_jawaban: formData.pertanggung_jawaban,
          tanggal_mulai: formData.tanggal_mulai || null,
          tanggal_selesai: formData.tanggal_selesai || null,
          waktu_mulai: formData.waktu_mulai || null,
          waktu_selesai: formData.waktu_selesai || null,
          dokumen: formData.dokumen_teknis
        }
        
        console.log('Updating agenda:', updatedData)
        
        const { data, error } = await supabase
          .from('agendas')
          .update(updatedData)
          .eq('id', editingAgenda.id)
          .select()
        
        console.log('Update result:', { data, error })
        
        if (error) throw error
        alert('Kegiatan berhasil diperbarui!')
        setIsEditing(false)
        setEditingAgenda(null)
      } else {
        // Create new agenda in Supabase
        const newAgenda = {
          nama_kegiatan: formData.nama_kegiatan,
          deskripsi: formData.deskripsi,
          substansi_kegiatan: formData.substansi_kegiatan,
          jenis_tugas: formData.jenis_tugas,
          jenis_kegiatan: formData.jenis_kegiatan,
          pelaksana: formData.pelaksana_kegiatan,
          pertanggung_jawaban: formData.pertanggung_jawaban,
          tanggal_mulai: formData.tanggal_mulai || null,
          tanggal_selesai: formData.tanggal_selesai || null,
          waktu_mulai: formData.waktu_mulai || null,
          waktu_selesai: formData.waktu_selesai || null,
          dokumen: formData.dokumen_teknis
        }
        
        console.log('Inserting agenda:', newAgenda)
        
        const { data, error } = await supabase
          .from('agendas')
          .insert([newAgenda])
          .select()
        
        console.log('Insert result:', { data, error })
        
        if (error) throw error
        alert('Kegiatan berhasil ditambahkan!')
      }
      
      // Refresh data from Supabase
      await fetchAgendas()
    } catch (error: any) {
      console.error('Error saving agenda:', error)
      const errorMessage = error?.message || error?.toString() || 'Unknown error'
      alert(`Gagal menyimpan data ke Supabase:\n${errorMessage}`)
    }
    
    setShowForm(false)
    setUploadedFiles({})
    setFormData({
      nama_kegiatan: '',
      deskripsi: '',
      substansi_kegiatan: '',
      jenis_tugas: 'Teknis',
      jenis_kegiatan: '',
      pelaksana_kegiatan: [],
      pertanggung_jawaban: [],
      tanggal_mulai: '',
      tanggal_selesai: '',
      waktu_mulai: '',
      waktu_selesai: '',
      dokumen_teknis: []
    })
    setLoading(false)
  }

  const handleDetailClick = (agenda: Agenda) => {
    setSelectedAgenda(agenda)
  }

  const handleEditClick = (agenda: Agenda) => {
    setEditingAgenda(agenda)
    setIsEditing(true)
    setFormData({
      nama_kegiatan: agenda.nama_kegiatan,
      deskripsi: agenda.deskripsi,
      substansi_kegiatan: agenda.substansi_kegiatan,
      jenis_tugas: agenda.jenis_tugas,
      jenis_kegiatan: agenda.jenis_kegiatan,
      pelaksana_kegiatan: agenda.pelaksana,
      pertanggung_jawaban: agenda.pertanggung_jawaban,
      tanggal_mulai: agenda.tanggal_mulai,
      tanggal_selesai: agenda.tanggal_selesai,
      waktu_mulai: agenda.waktu_mulai,
      waktu_selesai: agenda.waktu_selesai,
      dokumen_teknis: agenda.dokumen
    })
    setShowForm(true)
    setSelectedAgenda(null)
  }

  const handleDeleteClick = async (agendaId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      try {
        const { error } = await supabase
          .from('agendas')
          .delete()
          .eq('id', agendaId)
        
        if (error) throw error
        
        if (selectedAgenda?.id === agendaId) {
          setSelectedAgenda(null)
        }
        alert('Kegiatan berhasil dihapus!')
        // Refresh data
        await fetchAgendas()
      } catch (error: any) {
        console.error('Error deleting agenda:', error)
        const errorMessage = error?.message || error?.toString() || 'Unknown error'
        alert(`Gagal menghapus data dari Supabase:\n${errorMessage}`)
      }
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingAgenda(null)
    setShowForm(false)
    setUploadedFiles({})
    setFormData({
      nama_kegiatan: '',
      deskripsi: '',
      substansi_kegiatan: '',
      jenis_tugas: 'Teknis',
      jenis_kegiatan: '',
      pelaksana_kegiatan: [],
      pertanggung_jawaban: [],
      tanggal_mulai: '',
      tanggal_selesai: '',
      waktu_mulai: '',
      waktu_selesai: '',
      dokumen_teknis: []
    })
  }

  const handleFileUpload = (documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...fileArray]
      }))
    }
  }

  const removeUploadedFile = (documentType: string, fileIndex: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: prev[documentType]?.filter((_, index) => index !== fileIndex) || []
    }))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agenda</h1>
          <div className="border-b-2 border-blue-500 w-24 mt-1"></div>
        </div>
        <button
          onClick={() => {
            if (showForm && isEditing) {
              handleCancelEdit()
            } else {
              setShowForm(!showForm)
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {showForm ? 'Kembali' : 'Tambah'}
        </button>
      </div>

      {/* Form Tambah Kegiatan */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">
            {isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Kegiatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
              <input
                type="text"
                value={formData.nama_kegiatan}
                onChange={(e) => setFormData({...formData, nama_kegiatan: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Nama Kegiatan"
                required
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20"
                required
              />
            </div>

            {/* Substansi Kegiatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Substansi Kegiatan</label>
              <select
                value={formData.substansi_kegiatan}
                onChange={(e) => setFormData({...formData, substansi_kegiatan: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">-- data lama --</option>
                <option value="Penyusunan Arsitektur dan Peta Rencana Pemerintah Digital">Penyusunan Arsitektur dan Peta Rencana Pemerintah Digital</option>
                <option value="Penyusunan Arsitektur">Penyusunan Arsitektur</option>
              </select>
            </div>

            {/* Jenis Tugas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Tugas</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jenis_tugas"
                    value="Teknis"
                    checked={formData.jenis_tugas === 'Teknis'}
                    onChange={(e) => setFormData({...formData, jenis_tugas: e.target.value})}
                    className="mr-2"
                  />
                  Teknis
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jenis_tugas"
                    value="Administrasi"
                    checked={formData.jenis_tugas === 'Administrasi'}
                    onChange={(e) => setFormData({...formData, jenis_tugas: e.target.value})}
                    className="mr-2"
                  />
                  Administrasi
                </label>
              </div>
            </div>

            {/* Jenis Kegiatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kegiatan</label>
              <select
                value={formData.jenis_kegiatan}
                onChange={(e) => setFormData({...formData, jenis_kegiatan: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">-- Pilih Jenis Tugas Terlebih Dahulu --</option>
                <option value="Konsinyering">Konsinyering</option>
                <option value="Koordinasi">Koordinasi</option>
                <option value="Pembahasan">Pembahasan</option>
              </select>
            </div>

            {/* Pelaksana Kegiatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pelaksana Kegiatan</label>
              <div className="grid grid-cols-2 gap-4">
                {['Desti', 'Aisyah', 'Mutia', 'Kevin', 'Andi', 'Kharisma', 'Nana', 'Evan', 'Citra' ].map((name) => (
                  <label key={name} className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={formData.pelaksana_kegiatan.includes(name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, pelaksana_kegiatan: [...formData.pelaksana_kegiatan, name]})
                        } else {
                          setFormData({...formData, pelaksana_kegiatan: formData.pelaksana_kegiatan.filter(p => p !== name)})
                        }
                      }}
                    />
                    {name}
                  </label>
                ))}
              </div>
            </div>

            {/* Jenis Pertanggung Jawaban Keuangan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Pertanggung Jawaban Keuangan</label>
              <div className="grid grid-cols-2 gap-4">
                {['Belanja Modal', 'Uang Saku Konsi', 'Jasa Konsultan', 'Paket Meeting', 'Konsum', 'Perjadin', 'Narsum', 'Translok'].map((jenis) => (
                  <label key={jenis} className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={formData.pertanggung_jawaban.includes(jenis)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, pertanggung_jawaban: [...formData.pertanggung_jawaban, jenis]})
                        } else {
                          setFormData({...formData, pertanggung_jawaban: formData.pertanggung_jawaban.filter(p => p !== jenis)})
                        }
                      }}
                    />
                    {jenis}
                  </label>
                ))}
              </div>
            </div>

            {/* Tanggal Pelaksanaan Kegiatan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  value={formData.tanggal_mulai}
                  onChange={(e) => setFormData({...formData, tanggal_mulai: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                <input
                  type="date"
                  value={formData.tanggal_selesai}
                  onChange={(e) => setFormData({...formData, tanggal_selesai: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>

            {/* Waktu Mulai dan Selesai */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                <div className="relative">
                  <input
                    type="time"
                    value={formData.waktu_mulai}
                    onChange={(e) => setFormData({...formData, waktu_mulai: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Selesai</label>
                <div className="relative">
                  <input
                    type="time"
                    value={formData.waktu_selesai}
                    onChange={(e) => setFormData({...formData, waktu_selesai: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                {formData.waktu_selesai && (
                  <p className="text-red-500 text-xs mt-1">kosong = &quot;selesai&quot;</p>
                )}
              </div>
            </div>

            {/* Dokumen Pertanggung Jawaban */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dokumen Pertanggung Jawaban</label>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Berita Acara Pembahasan Modul
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dokumen Evaluasi alat Bantu
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dokumen Visualisasi Alat bantu
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Modul Diklat
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat keterangan pemanfaatan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat Permohonan Narsum
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat/NoDin penyampaian
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Daftar Hadir
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dokumen KAK
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dokumen/Bahan Paparan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Notulensi Rapat
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat keterangan/sertifikat
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat Pernyataan Melaksanakan Kegiatan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat/Nota Dinas Pimpinan
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Daftar konsultasi dan hasil konsultasi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Dokumen RAB
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Hasil Konsultasi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    SK Penugasan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat Pelaksanaan Kegiatan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Surat Telaah ke pimpinan
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Undangan Rapat/Kegiatan Penyusunan
                  </label>
                </div>
              </div>
            </div>

            {/* Upload Dokumen SPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Upload Dokumen SPJ</label>
              <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                {/* Dropdown untuk memilih jenis dokumen */}
                <div className="flex items-center space-x-4">
                  <select 
                    id="document-type" 
                    className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[200px]"
                  >
                    <option value="">Pilih Jenis Dokumen</option>
                    <option value="berita-acara">Berita Acara Pembahasan Modul</option>
                    <option value="dokumen-evaluasi">Dokumen Evaluasi alat Bantu</option>
                    <option value="dokumen-visualisasi">Dokumen Visualisasi Alat bantu</option>
                    <option value="modul-diklat">Modul Diklat</option>
                    <option value="surat-pemanfaatan">Surat keterangan pemanfaatan</option>
                    <option value="surat-narsum">Surat Permohonan Narsum</option>
                    <option value="surat-nodin">Surat/NoDin penyampaian</option>
                    <option value="daftar-hadir">Daftar Hadir</option>
                    <option value="dokumen-kak">Dokumen KAK</option>
                    <option value="bahan-paparan">Dokumen/Bahan Paparan</option>
                    <option value="notulensi">Notulensi Rapat</option>
                    <option value="surat-sertifikat">Surat keterangan/sertifikat</option>
                    <option value="surat-pelaksanaan">Surat Pernyataan Melaksanakan Kegiatan</option>
                    <option value="nota-dinas">Surat/Nota Dinas Pimpinan</option>
                    <option value="daftar-konsultasi">Daftar konsultasi dan hasil konsultasi</option>
                    <option value="dokumen-rab">Dokumen RAB</option>
                    <option value="hasil-konsultasi">Hasil Konsultasi</option>
                    <option value="sk-penugasan">SK Penugasan</option>
                    <option value="surat-kegiatan">Surat Pelaksanaan Kegiatan</option>
                    <option value="surat-telaah">Surat Telaah ke pimpinan</option>
                    <option value="undangan">Undangan Rapat/Kegiatan Penyusunan</option>
                  </select>
                  
                  <input 
                    type="file" 
                    id="file-upload"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const documentType = (document.getElementById('document-type') as HTMLSelectElement)?.value;
                      if (documentType) {
                        handleFileUpload(documentType, e);
                      } else {
                        alert('Silakan pilih jenis dokumen terlebih dahulu');
                        e.target.value = '';
                      }
                    }}
                    className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  Format yang didukung: PDF, DOC, DOCX, JPG, JPEG, PNG (Maksimal 5MB per file)
                </p>

                {/* Daftar file yang sudah diupload */}
                {Object.entries(uploadedFiles).map(([docType, files]) => (
                  files.length > 0 && (
                    <div key={docType} className="bg-gray-50 p-3 rounded border">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                        {docType.replace('-', ' ')}
                      </h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600 text-sm">📄</span>
                              <span className="text-sm text-gray-700 truncate max-w-[300px]" title={file.name}>
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeUploadedFile(docType, index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {loading ? 'Menyimpan...' : (isEditing ? 'Update' : 'Simpan')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Data Kegiatan */}
      {!showForm && !selectedAgenda && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Filter dan Search */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm">entries</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="">Semua</option>
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="Oktober">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </select>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="">Semua</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                placeholder="Cari..."
              />
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">NO</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">NAMA KEGIATAN</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">SUBSTANSI KEGIATAN</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">PELAKSANAAN KEGIATAN</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">PIC</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">DOKUMEN PERTANGGUNG JAWABAN</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {agendas
                  .filter(agenda => {
                    // Filter berdasarkan bulan dan tahun
                    const agendaDate = new Date(agenda.tanggal_mulai);
                    const agendaMonth = agendaDate.toLocaleDateString('id-ID', { month: 'long' });
                    const monthCapitalized = agendaMonth.charAt(0).toUpperCase() + agendaMonth.slice(1);
                    const agendaYear = agendaDate.getFullYear().toString();
                    
                    const matchMonth = currentMonth === '' || monthCapitalized === currentMonth;
                    const matchYear = currentYear === '' || agendaYear === currentYear;
                    
                    // Filter berdasarkan search term
                    const matchSearch = searchTerm === '' || 
                      agenda.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      agenda.substansi_kegiatan.toLowerCase().includes(searchTerm.toLowerCase());
                    
                    return matchMonth && matchYear && matchSearch;
                  })
                  .slice(0, entriesPerPage)
                  .map((agenda, index) => (
                  <tr key={agenda.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">{index + 1}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {agenda.nama_kegiatan}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {agenda.substansi_kegiatan}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <div className="text-xs">
                        {(() => {
                          const tanggalMulai = new Date(agenda.tanggal_mulai);
                          const tanggalSelesai = new Date(agenda.tanggal_selesai);
                          const isSameDay = tanggalMulai.toDateString() === tanggalSelesai.toDateString();
                          
                          if (isSameDay) {
                            // Tampilkan satu tanggal saja
                            return (
                              <>
                                <div>{tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                <div>{agenda.waktu_mulai} - {agenda.waktu_selesai || 'selesai'}</div>
                              </>
                            );
                          } else {
                            // Tampilkan tanggal mulai - tanggal selesai
                            return (
                              <>
                                <div>
                                  {tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                                <div>{agenda.waktu_mulai} - {agenda.waktu_selesai || 'selesai'}</div>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </td>
                    

                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <div className="space-y-1 text-xs">
                        {agenda.pelaksana && agenda.pelaksana.length > 0 ? (
                          agenda.pelaksana.map((p, idx) => (
                            <div key={idx}>• {p}</div>
                          ))
                        ) : (
                          <div className="text-gray-400">-</div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <div className="space-y-1 text-xs">
                        {agenda.pertanggung_jawaban && agenda.pertanggung_jawaban.length > 0 ? (
                          agenda.pertanggung_jawaban.map((p, idx) => (
                            <div key={idx}>• {p}</div>
                          ))
                        ) : (
                          <div className="text-gray-400">-</div>
                        )}
                        {agenda.dokumen && agenda.dokumen.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="font-semibold mb-1">Dokumen:</div>
                            {agenda.dokumen.map((doc, idx) => (
                              <div key={idx} className="text-green-500">✓ {doc}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDetailClick(agenda)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 w-full"
                          title="Detail"
                        >
                          Detail
                        </button>
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleEditClick(agenda)}
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Edit"
                          >
                            <span className="text-xl">✏️</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(agenda.id)}
                            className="text-red-500 hover:text-red-600"
                            title="Hapus"
                          >
                            <span className="text-xl">🗑️</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Kegiatan */}
      {selectedAgenda && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setSelectedAgenda(null)}
              className="bg-yellow-400 text-black px-3 py-1 rounded text-sm mr-4"
            >
              Kembali
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Detail Kegiatan</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Nama Kegiatan</label>
                  <div className="text-sm">: {selectedAgenda.nama_kegiatan}</div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <div className="text-sm">: {selectedAgenda.deskripsi}</div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Pembuat</label>
                  <div className="text-sm">: Perwita Sari</div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Jenis Tugas</label>
                  <div className="text-sm">: {selectedAgenda.jenis_tugas}</div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Jenis Kegiatan</label>
                  <div className="text-sm">: {selectedAgenda.jenis_kegiatan}</div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Petugas Pelaksana</label>
                  <div className="text-sm">
                    : <ul className="list-disc list-inside ml-2">
                      {selectedAgenda.pelaksana.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Petugas Keuangan</label>
                  <div className="text-sm">
                    : <ul className="list-disc list-inside ml-2">
                      {selectedAgenda.pertanggung_jawaban.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Pertanggung Jawaban Keuangan</label>
                  <div className="text-sm">
                    : {selectedAgenda.pertanggung_jawaban.join(', ')}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Pelaksanaan Kegiatan</label>
                  <div className="text-sm">
                    : {(() => {
                      const tanggalMulai = new Date(selectedAgenda.tanggal_mulai);
                      const tanggalSelesai = new Date(selectedAgenda.tanggal_selesai);
                      const isSameDay = tanggalMulai.toDateString() === tanggalSelesai.toDateString();
                      
                      if (isSameDay) {
                        return `${tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} | ${selectedAgenda.waktu_mulai} - ${selectedAgenda.waktu_selesai || 'selesai'} (WIB)`;
                      } else {
                        return `${tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} | ${selectedAgenda.waktu_mulai} - ${selectedAgenda.waktu_selesai || 'selesai'} (WIB)`;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Daftar Berkas Kegiatan</h3>              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Form Unggah Berkas</label>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>Daftar Hadir</option>
                  </select>
                  <input 
                    type="file" 
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="Choose File"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                    Unggah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}