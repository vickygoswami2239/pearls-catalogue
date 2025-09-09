'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mode, setMode] = useState<string | null>(null);
  useEffect(() => { setMode(typeof window !== 'undefined' ? localStorage.getItem('mode') : null); }, []);
  return (
    <header className="border-b">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">Sstringz Pearls</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={mode === 'b2b' ? '/b2b' : '/b2c'}>Catalogue</Link>
          <button onClick={() => { localStorage.removeItem('mode'); location.href = '/'; }} className="opacity-70 hover:opacity-100">
            Switch Mode
          </button>
        </nav>
      </div>
    </header>
  );
}
