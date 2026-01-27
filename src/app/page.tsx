import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Mantap</h1>
          <p className="text-gray-600">Sistem Manajemen Kegiatan SINERGIS</p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Masuk ke Dashboard
          </Link>
          
          <Link 
            href="/agenda" 
            className="block w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Data Kegiatan
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>© 2025 Dashboard Mantap - SINERGIS</p>
        </div>
      </div>
    </div>
  )
}