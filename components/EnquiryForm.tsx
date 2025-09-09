'use client';
import { useMemo, useState } from 'react';
import { Product } from '@/lib/types';

export default function EnquiryForm({ product, qty }: { product: Product; qty: number }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    mode: 'B2B', name: '', phone: '', email: '',
    company: '', quantity: qty, size: String(product.size), notes: ''
  });

  const waText = useMemo(() => {
    const t =
`Enquiry — ${product.name}
Mode: ${form.mode}
Qty: ${form.quantity}
Size: ${form.size} mm
Phone: ${form.phone}
Email: ${form.email}
Company: ${form.company}
Notes: ${form.notes}`;
    return encodeURIComponent(t);
  }, [form, product.name]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ product, form })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setOk(true);
    } catch (e:any) { setErr(e.message || 'Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card p-5">
      <h3 className="text-lg font-semibold mb-2">Questions / Wholesale Enquiry</h3>
      {ok ? (
        <div className="text-green-600 text-sm">
          Thank you! We received your enquiry. Our team will reach out within 24h.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm">Mode
              <select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}
                className="w-full rounded-xl border p-2 mt-1">
                <option>B2B</option><option>B2C</option>
              </select>
            </label>
            <label className="text-sm">Company (optional)
              <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl border p-2 mt-1"/>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm">Your Name
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border p-2 mt-1"/>
            </label>
            <label className="text-sm">Phone
              <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border p-2 mt-1"/>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm">Email
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border p-2 mt-1"/>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm">Qty
                <input type="number" min={1} value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: Number(e.target.value||1) })}
                  className="w-full rounded-xl border p-2 mt-1"/>
              </label>
              <label className="text-sm">Size (mm)
                <input value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}
                  className="w-full rounded-xl border p-2 mt-1"/>
              </label>
            </div>
          </div>

          <label className="text-sm">Notes / Requirements
            <textarea rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-xl border p-2 mt-1"/>
          </label>

          {err && <div className="text-red-600 text-sm">{err}</div>}

          <div className="flex flex-wrap gap-3">
            <button disabled={loading} className="btn btn-primary" type="submit">
              {loading ? 'Submitting…' : 'Send Enquiry'}
            </button>
            <a className="btn" target="_blank" href={`https://wa.me/?text=${waText}`} rel="noreferrer">
              Send on WhatsApp
            </a>
          </div>
          <div className="text-xs text-gray-500">We usually reply within 24 hours on business days.</div>
        </form>
      )}
    </div>
  );
}
