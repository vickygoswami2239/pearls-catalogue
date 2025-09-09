const KEY = 'coupon10';
const APPLIED = 'coupon_applied';
const FIRST_FLAG = 'first_purchase_done';
const REWARD10_READY = 'reward_10_ready'; // set when server credits your rid

export type AppliedCoupon = { code: string; percent: number };

export function ensureCoupon() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEY)) {
    const code = 'SHARE10-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem(KEY, code);
  }
}
export function getCouponCode() {
  if (typeof window === 'undefined') return 'FIRST5';
  ensureCoupon();
  return localStorage.getItem(KEY) || 'FIRST5';
}

export function validateCoupon(code: string): AppliedCoupon | null {
  const c = (code || '').trim().toUpperCase();
  if (!c) return null;
  // First order 5%
  if (c === 'FIRST5' && !firstPurchaseDone()) return { code: c, percent: 5 };
  // Share reward 10%
  if (c.startsWith('SHARE10')) return { code: c, percent: 10 };
  // Allow a fallback 10% code if you want
  if (c === 'WELCOME10') return { code: c, percent: 10 };
  return null;
}

export function getAppliedCoupon(): AppliedCoupon | null {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(APPLIED) || 'null'); } catch { return null; }
}
export function applyCoupon(code: string): AppliedCoupon | null {
  if (typeof window === 'undefined') return null;
  const res = validateCoupon(code);
  if (res) localStorage.setItem(APPLIED, JSON.stringify(res));
  return res;
}
export function clearAppliedCoupon() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(APPLIED);
}

export function markFirstPurchaseDone() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FIRST_FLAG, '1');
}
export function firstPurchaseDone(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(FIRST_FLAG) === '1';
}

export function setReward10Ready(v: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REWARD10_READY, v ? '1' : '');
}
export function reward10Ready(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(REWARD10_READY) === '1';
}

/** Compute discounted totals based on applied coupon (if any) */
export function calcDiscount(amount: number) {
  const ap = getAppliedCoupon();
  if (!ap) return { final: amount, off: 0, percent: 0 };
  const off = Math.round((amount * ap.percent) / 100);
  const final = Math.max(0, amount - off);
  return { final, off, percent: ap.percent };
}
