// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Anggaran', path: '/anggaran' },
    { name: 'Agenda Perencanaan', path: '/perencanaan anggaran' },
    { name: 'Meeting Weekly', path: '/meeting' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6 fixed left-0 top-0">
      <h1 className="text-xl font-bold mb-10 text-blue-400">Dashboard Mantap</h1>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-blue-400"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}