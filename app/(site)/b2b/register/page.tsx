'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'email' | 'phone';
type Step = 'details' | 'verify';

export default function B2BRegister() {
  const [mode, setMode] = useState<Mode>('email');
  const [step, setStep]   = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    businessName: '',
    contactName:  '',
    businessType: 'Retailer',
    email:  '',
    phone:  '',
    gst:    '',
    city:   '',
    country:'India',
    otp:    '',
    accept: false,
  });

  const canRequest =
    !loading &&
    form.businessName.trim().length > 1 &&
    (mode === 'email' ? /\S+@\S+\.\S+/.test(form.email) : form.phone.trim().length >= 8) &&
    form.accept;

  function onChange<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function requestOTP(e: React.FormEvent) {
    e.preventDefault();
    if (!canRequest) return;
    setLoading(true); setMsg(null);

    // Send details to register endpoint. Backend can store user + send OTP.
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: form.businessName,
        contactName:  form.contactName,
        businessType: form.businessType,
        gst:          form.gst || undefined,
        city:         form.city || undefined,
        country:      form.country || undefined,
        ...(mode === 'email' ? { email: form.email } : { phone: form.phone }),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStep('verify');
      setMsg(`OTP sent.${data?.dev_otp ? ` (dev: ${data.dev_otp})` : ''}`);
    } else {
      setMsg(data?.error || 'Could not send OTP');
    }
  }

  async function verifyOTP() {
    if (!form.otp.trim()) return;
    setLoading(true); setMsg(null);

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        otp: form.otp.trim(),
        ...(mode === 'email' ? { email: form.email } : { phone: form.phone }),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get('next') || '/b2b';
      window.location.href = next;
    } else {
      setMsg(data?.error || 'Invalid OTP');
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">B2B Registration</h1>
        <p className="mt-1 text-sm text-gray-600">
          Retailers • Wholesalers • Manufacturers — create account with OTP.
        </p>

        {/* Tabs */}
        <div className="mt-5 inline-flex rounded-xl border overflow-hidden">
          <button
            onClick={() => { setMode('email'); setStep('details'); }}
            className={`px-4 py-2 text-sm ${mode === 'email' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
          >
            Email
          </button>
          <button
            onClick={() => { setMode('phone'); setStep('details'); }}
            className={`px-4 py-2 text-sm ${mode === 'phone' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
          >
            Phone
          </button>
        </div>

        {/* STEP 1: DETAILS */}
        {step === 'details' && (
          <form onSubmit={requestOTP} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Business name *</label>
              <input
                className="input mt-1"
                placeholder="Sstringz Jewels"
                value={form.businessName}
                onChange={(e) => onChange('businessName', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact person</label>
              <input
                className="input mt-1"
                placeholder="Your name"
                value={form.contactName}
                onChange={(e) => onChange('contactName', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Business type</label>
              <select
                className="input mt-1"
                value={form.businessType}
                onChange={(e) => onChange('businessType', e.target.value)}
              >
                <option>Retailer</option>
                <option>Wholesaler</option>
                <option>Manufacturer</option>
                <option>Exporter</option>
                <option>Other</option>
              </select>
            </div>

            {mode === 'email' ? (
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  className="input mt-1"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                />
              </div>
            ) : (
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Phone *</label>
                <input
                  type="tel"
                  className="input mt-1"
                  placeholder="+91 98xxxxxxx"
                  value={form.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">GST (optional)</label>
              <input
                className="input mt-1"
                placeholder="27ABCDE1234F1Z5"
                value={form.gst}
                onChange={(e) => onChange('gst', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input
                className="input mt-1"
                placeholder="Mumbai"
                value={form.city}
                onChange={(e) => onChange('city', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                className="input mt-1"
                placeholder="India"
                value={form.country}
                onChange={(e) => onChange('country', e.target.value)}
              />
            </div>

            <label className="md:col-span-2 mt-1 inline-flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.accept}
                onChange={(e) => onChange('accept', e.target.checked)}
                className="mt-1"
              />
              <span>
                I agree to the Terms & Privacy. We’ll use your info to set up your B2B account.
              </span>
            </label>

            {msg && <p className="md:col-span-2 text-xs text-amber-600">{msg}</p>}

            <div className="md:col-span-2 mt-1 flex gap-3">
              <button disabled={!canRequest} className="btn-primary">
                {loading ? 'Sending…' : 'Register & Send OTP'}
              </button>
              <Link href="/b2b/login" className="btn-secondary">Already have an account? Login</Link>
            </div>
          </form>
        )}

        {/* STEP 2: VERIFY */}
        {step === 'verify' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-700">
              Enter the OTP sent to your {mode === 'email' ? 'email' : 'phone'} to complete registration.
            </p>
            <input
              inputMode="numeric"
              placeholder="Enter OTP"
              className="input tracking-widest"
              value={form.otp}
              onChange={(e) => onChange('otp', e.target.value)}
            />
            {msg && <p className="text-xs text-amber-600">{msg}</p>}
            <div className="flex gap-3">
              <button onClick={verifyOTP} disabled={loading || !form.otp} className="btn-primary">
                {loading ? 'Verifying…' : 'Verify & Continue'}
              </button>
              <button
                onClick={() => setStep('details')}
                className="btn-secondary"
              >
                Change details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
