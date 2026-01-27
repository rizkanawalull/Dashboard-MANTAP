'use client'
import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
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
  target_selesai: string
  created_at: string
}

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(3) // April = 3 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [selectedEvent, setSelectedEvent] = useState<Agenda | null>(null)
  const [agendas, setAgendas] = useState<Agenda[]>([])
  const [loading, setLoading] = useState(false)

  // Sample data - sesuai dengan gambar kalender
  const sampleEvents: Agenda[] = [
    {
      id: 1,
      nama_kegiatan: 'Finalisasi Materi Penyusunan Arsitektur dan Peta Rencana Inisiatif Strategis Nasional Pada SIA SPBE',
      deskripsi: 'Finalisasi materi untuk penyusunan arsitektur dan peta rencana inisiatif strategis nasional',
      substansi_kegiatan: 'Penyusunan Arsitektur dan Peta Rencana Pemerintah Digital',
      jenis_tugas: 'Teknis',
      jenis_kegiatan: 'Finalisasi',
      pelaksana: ['Muthia Nur Rachmayanti'],
      pertanggung_jawaban: ['Admin Keuangan'],
      tanggal_mulai: '2025-04-16',
      tanggal_selesai: '2025-04-25',
      waktu_mulai: '09:00',
      waktu_selesai: '17:00',
      dokumen: [],
      target_selesai: '2025-04-25',
      created_at: '2025-04-16'
    },
    {
      id: 2,
      nama_kegiatan: 'Pembuatan Laporan',
      deskripsi: 'Pembuatan laporan bulanan kegiatan',
      substansi_kegiatan: 'Administrasi',
      jenis_tugas: 'Administrasi',
      jenis_kegiatan: 'Laporan',
      pelaksana: ['Perwita Sari'],
      pertanggung_jawaban: [],
      tanggal_mulai: '2025-04-10',
      tanggal_selesai: '2025-04-10',
      waktu_mulai: '09:00',
      waktu_selesai: '17:00',
      dokumen: [],
      target_selesai: '2025-04-10',
      created_at: '2025-04-10'
    },
    {
      id: 3,
      nama_kegiatan: 'Materi Pendampingan',
      deskripsi: 'Persiapan materi untuk pendampingan instansi',
      substansi_kegiatan: 'Pendampingan',
      jenis_tugas: 'Teknis',
      jenis_kegiatan: 'Persiapan',
      pelaksana: ['Muthia Nur Rachmayanti'],
      pertanggung_jawaban: [],
      tanggal_mulai: '2025-04-14',
      tanggal_selesai: '2025-04-14',
      waktu_mulai: '09:00',
      waktu_selesai: '17:00',
      dokumen: [],
      target_selesai: '2025-04-14',
      created_at: '2025-04-14'
    },
    {
      id: 4,
      nama_kegiatan: 'Konsinyering Pendampingan',
      deskripsi: 'Konsinyering untuk pendampingan arsitektur SPBE',
      substansi_kegiatan: 'Konsinyering',
      jenis_tugas: 'Administrasi',
      jenis_kegiatan: 'Konsinyering',
      pelaksana: ['Muthia Nur Rachmayanti'],
      pertanggung_jawaban: ['Admin Keuangan'],
      tanggal_mulai: '2025-04-29',
      tanggal_selesai: '2025-04-29',
      waktu_mulai: '09:00',
      waktu_selesai: '17:00',
      dokumen: [],
      target_selesai: '2025-04-29',
      created_at: '2025-04-29'
    },
    {
      id: 5,
      nama_kegiatan: 'FGD Sosialisasi',
      deskripsi: 'Focus Group Discussion untuk sosialisasi program',
      substansi_kegiatan: 'Sosialisasi',
      jenis_tugas: 'Teknis',
      jenis_kegiatan: 'FGD',
      pelaksana: ['Perwita Sari'],
      pertanggung_jawaban: [],
      tanggal_mulai: '2025-04-05',
      tanggal_selesai: '2025-04-05',
      waktu_mulai: '09:00',
      waktu_selesai: '17:00',
      dokumen: [],
      target_selesai: '2025-04-05',
      created_at: '2025-04-05'
    }
  ]

  useEffect(() => {
    // Load data from localStorage or use sample data
    const savedAgendas = localStorage.getItem('agendas')
    if (savedAgendas) {
      setAgendas(JSON.parse(savedAgendas))
    } else {
      setAgendas(sampleEvents)
      localStorage.setItem('agendas', JSON.stringify(sampleEvents))
    }
    
    // Listen for agenda updates from other pages
    const handleStorageChange = () => {
      const updatedAgendas = localStorage.getItem('agendas')
      if (updatedAgendas) {
        setAgendas(JSON.parse(updatedAgendas))
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('agenda-updated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('agenda-updated', handleStorageChange)
    }
  }, [])

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getEventsForDate = (date: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return agendas.filter(agenda => 
      agenda.tanggal_mulai <= dateString && agenda.tanggal_selesai >= dateString
    )
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
      const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear)
      const date = daysInPrevMonth - firstDay + i + 1
      
      days.push(
        <div key={`prev-${i}`} className="h-24 p-1 bg-gray-100 text-gray-400 border border-gray-200">
          <div className="text-sm">{date}</div>
        </div>
      )
    }

    // Days of current month
    for (let date = 1; date <= daysInMonth; date++) {
      const events = getEventsForDate(date)
      
      days.push(
        <div key={date} className="h-24 p-1 bg-white border border-gray-200 overflow-hidden">
          <div className="text-sm font-medium mb-1">{date}</div>
          <div className="space-y-1">
            {events.map((event, idx) => (
              <div
                key={`${event.id}-${idx}`}
                onClick={() => setSelectedEvent(event)}
                className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded cursor-pointer hover:bg-blue-600 truncate"
                title={event.nama_kegiatan}
              >
                {event.nama_kegiatan.length > 20 ? event.nama_kegiatan.substring(0, 20) + '...' : event.nama_kegiatan}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <div className="flex h-screen">
          {/* Calendar Section */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow-md h-full">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  ←
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  →
                </button>
                <button 
                  onClick={() => {
                    setCurrentMonth(3) // April
                    setCurrentYear(2025)
                  }}
                  className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                >
                  today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-0 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-0 border-t">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Section */}
          <div className="w-80 p-6">
            <div className="bg-white rounded-lg shadow-md h-full">
              {selectedEvent ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Detil Kegiatan</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Kegiatan</label>
                      <div className="text-sm text-gray-900 mt-1">{selectedEvent.nama_kegiatan}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pembuat</label>
                      <div className="text-sm text-gray-900 mt-1">Perwita Sari</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pelaksana</label>
                      <ul className="text-sm text-gray-900 mt-1 list-disc list-inside">
                        {selectedEvent.pelaksana.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Keuangan</label>
                      <div className="text-sm text-gray-900 mt-1">
                        {selectedEvent.pertanggung_jawaban.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {selectedEvent.pertanggung_jawaban.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        ) : (
                          'data tidak ditemukan'
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Jadwal</label>
                      <div className="text-sm text-gray-900 mt-1">
                        {new Date(selectedEvent.tanggal_mulai).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                        {selectedEvent.tanggal_mulai !== selectedEvent.tanggal_selesai && (
                          <>
                            {' - '}
                            {new Date(selectedEvent.tanggal_selesai).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </>
                        )}
                        {' | '}
                        {selectedEvent.waktu_mulai}-{selectedEvent.waktu_selesai || 'selesai'} WIB
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Daftar Dokumen</label>
                      <div className="text-sm text-gray-900 mt-1">
                        {selectedEvent.dokumen.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {selectedEvent.dokumen.map((doc, idx) => (
                              <li key={idx}>{doc}</li>
                            ))}
                          </ul>
                        ) : (
                          'data tidak ditemukan'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Klik pada kegiatan di kalender untuk melihat detail</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}