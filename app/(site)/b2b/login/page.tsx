'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function B2BLogin() {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [form, setForm] = useState({ email: '', phone: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function sendOTP() {
    setLoading(true); setMsg(null);
    const res = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mode === 'email' ? { email: form.email } : { phone: form.phone }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep('verify');
      setMsg(`OTP sent.${data?.dev_otp ? ` (dev: ${data.dev_otp})` : ''}`);
    } else setMsg(data?.error || 'Failed to send OTP');
    setLoading(false);
  }

  async function verifyOTP() {
    setLoading(true); setMsg(null);
    const payload = { otp: form.otp, ...(mode === 'email' ? { email: form.email } : { phone: form.phone }) };
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get('next') || '/b2b';
      window.location.href = next;
    } else setMsg(data?.error || 'Invalid OTP');
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">B2B Login</h1>
        <p className="mt-1 text-sm text-gray-600">Retailers/Wholesalers ke liye OTP login.</p>

        <div className="mt-5 inline-flex rounded-xl border overflow-hidden">
          <button
            onClick={() => { setMode('email'); setStep('request'); }}
            className={`px-4 py-2 text-sm ${mode === 'email' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
          >Email</button>
          <button
            onClick={() => { setMode('phone'); setStep('request'); }}
            className={`px-4 py-2 text-sm ${mode === 'phone' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
          >Phone</button>
        </div>

        <div className="mt-5 space-y-3">
          {mode === 'email' ? (
            <input
              type="email"
              placeholder="you@company.com"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          ) : (
            <input
              type="tel"
              placeholder="+91 98xxxxxxx"
              className="input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          )}

          {step === 'verify' && (
            <input
              inputMode="numeric"
              placeholder="Enter OTP"
              className="input tracking-widest"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
            />
          )}

          {msg && <p className="text-xs text-amber-600">{msg}</p>}

          {step === 'request' ? (
            <button onClick={sendOTP} disabled={loading} className="btn-primary w-full">
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          ) : (
            <button onClick={verifyOTP} disabled={loading} className="btn-primary w-full">
              {loading ? 'Verifying…' : 'Verify & Continue'}
            </button>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-700">
          New to B2B?{' '}
          <Link href="/b2b/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
