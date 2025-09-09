'use client';
import { useEffect } from 'react';

export default function ModeGate() {
  useEffect(() => {
    const existing = localStorage.getItem('mode');
    if (existing) location.href = '/' + existing;
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Sstringz Pearls</h1>
      <p>Select how you’d like to browse.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => { localStorage.setItem('mode','b2c'); location.href='/b2c'; }} className="rounded-2xl border p-6 hover:shadow">
          <div className="text-lg font-semibold">B2C — Retail</div>
          <div className="text-sm text-gray-600">Buy now with Razorpay</div>
        </button>
        <button onClick={() => { localStorage.setItem('mode','b2b'); location.href='/b2b'; }} className="rounded-2xl border p-6 hover:shadow">
          <div className="text-lg font-semibold">B2B — Wholesale</div>
          <div className="text-sm text-gray-600">Create wholesale inquiry</div>
        </button>
      </div>
    </div>
  );
}
