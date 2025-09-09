'use client';
import { useEffect, useState } from 'react';
import { getCouponCode, applyCoupon, getAppliedCoupon, clearAppliedCoupon, calcDiscount, type AppliedCoupon } from '@/lib/coupon';

export default function CouponBox({ baseAmount, qty, onChangeFinal }: { baseAmount: number; qty: number; onChangeFinal: (r: {final:number;off:number;percent:number; applied: AppliedCoupon|null}) => void }) {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    const applied = getAppliedCoupon();
    if (applied) setCode(applied.code);
    // first compute
    const res = calcDiscount(baseAmount * qty);
    onChangeFinal({ ...res, applied: getAppliedCoupon() });
  }, [baseAmount, qty, onChangeFinal]);

  const handleApply = () => {
    const res = applyCoupon(code);
    if (res) {
      setMsg(`Applied ${res.percent}% off`);
      const calc = calcDiscount(baseAmount * qty);
      onChangeFinal({ ...calc, applied: res });
    } else {
      setMsg('Invalid coupon');
    }
  };

  const handleClear = () => {
    clearAppliedCoupon();
    setMsg('Coupon removed');
    const calc = { final: baseAmount * qty, off: 0, percent: 0 };
    onChangeFinal({ ...calc, applied: null });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={code || getCouponCode()}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 rounded-xl border p-2 text-sm"
          placeholder="Enter coupon e.g. PEARL10-ABC123"
        />
        <button onClick={handleApply} className="btn btn-primary">Apply</button>
        <button onClick={handleClear} className="btn">Clear</button>
      </div>
      {msg && <div className="text-xs text-gray-600">{msg}</div>}
    </div>
  );
}
