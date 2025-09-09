import '@/styles/globals.css';
import Link from 'next/link';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">Sstringz Pearls</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/catalogue">Catalogue</Link>
              <Link href="/b2b">Wholesale</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
