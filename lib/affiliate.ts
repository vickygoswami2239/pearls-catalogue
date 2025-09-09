const AFF = 'affiliate_code';
const SHARES = 'affiliate_shares';
const CONVERSIONS = 'affiliate_conversions';


export function getAffiliateCode() {
if (typeof window === 'undefined') return 'AFF-TEST';
let code = localStorage.getItem(AFF);
if (!code) { code = 'AFF-' + Math.random().toString(36).slice(2,7).toUpperCase(); localStorage.setItem(AFF, code); }
return code;
}


export function trackShare() {
if (typeof window === 'undefined') return;
const n = Number(localStorage.getItem(SHARES) || 0) + 1;
localStorage.setItem(SHARES, String(n));
}


export function recordConversion(orderId: string) {
if (typeof window === 'undefined') return;
const data = JSON.parse(localStorage.getItem(CONVERSIONS) || '[]');
data.push({ orderId, amount: 50 });
localStorage.setItem(CONVERSIONS, JSON.stringify(data));
}
