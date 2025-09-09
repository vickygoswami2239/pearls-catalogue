'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function B2BLogin() {
  const [mode, setMode] = useState<'email'|'phone'>('email');
  const [email, setEmail] = useState(''); const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'form'|'otp'>('form');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string|undefined>();
  const router = useRouter();
  const next = useSearchParams().get('next') || '/b2b';

  const request = async () => {
    const res = await fetch('/api/auth/request-otp', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ email: mode==='email'?email: undefined, phone: mode==='phone'?phone: undefined })
    });
    const data = await res.json();
    if (data.ok) { setDevOtp(data.dev_otp); setStep('otp'); }
    else alert(data.error || 'Failed');
  };
  const verify = async () => {
    const res = await fetch('/api/auth/verify-otp', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ email: mode==='email'?email: undefined, phone: mode==='phone'?phone: undefined, code: otp })
    });
    const data = await res.json();
    if (data.ok) router.replace(next);
    else alert(data.error || 'Invalid code');
  };

  return (
    <div className="container max-w-md py-10 space-y-6">
      <h1 className="text-2xl font-semibold">B2B Login</h1>

      {step==='form' ? (
        <div className="space-y-3">
          <div className="flex gap-2 text-sm">
            <button onClick={()=>setMode('email')} className={`btn ${mode==='email'?'btn-primary':''}`}>Email</button>
            <button onClick={()=>setMode('phone')} className={`btn ${mode==='phone'?'btn-primary':''}`}>Phone</button>
          </div>
          {mode==='email' ? (
            <label className="text-sm">Email
              <input className="w-full rounded-xl border p-2 mt-1" value={email} onChange={e=>setEmail(e.target.value)} />
            </label>
          ) : (
            <label className="text-sm">Phone
              <input className="w-full rounded-xl border p-2 mt-1" value={phone} onChange={e=>setPhone(e.target.value)} />
            </label>
          )}
          <button onClick={request} className="btn btn-primary w-full">Send OTP</button>
          {devOtp && <div className="text-xs text-gray-500">Dev OTP: <b>{devOtp}</b></div>}
          <div className="text-sm text-gray-500">New to B2B? <a href="/b2b/register" className="underline">Register</a></div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-sm">Enter OTP
            <input className="w-full rounded-xl border p-2 mt-1" value={otp} onChange={e=>setOtp(e.target.value)} />
          </label>
          <button onClick={verify} className="btn btn-primary w-full">Verify & Continue</button>
        </div>
      )}
    </div>
  );
}
