// app/layout.tsx
import './globals.css';
import Sidebar from '../components/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50">
        {/* Sidebar di sisi kiri */}
        <Sidebar />
        
        {/* Area konten di sisi kanan, diberi margin-left 64 (w-64) agar tidak tertutup sidebar */}
        <main className="flex-1 ml-64 p-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}