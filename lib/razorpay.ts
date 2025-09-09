import { Product } from './types';
import { recordConversion } from './affiliate'; // if you were using this earlier
import { getRefFromURL } from './referral';
import { markFirstPurchaseDone } from './coupon';

export async function buyNowWithAmount(product: Product, totalAmountInRupees: number) {
  const res = await fetch('/api/razorpay-order', {
    method: 'POST',
    body: JSON.stringify({ amount: Math.round(totalAmountInRupees * 100) })
  });
  const order = await res.json();

  const options: any = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx',
    amount: order.amount,
    currency: 'INR',
    name: 'Sstringz Pearls',
    description: product.name,
    order_id: order.id,
    handler: async function () {
      // success
      markFirstPurchaseDone();
      const ref = getRefFromURL();
      if (ref) {
        // credit the sharer on server
        fetch('/api/referral/credit', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ rid: ref })
        }).catch(()=>{});
      }
      try { recordConversion?.(order.id); } catch {}
      alert('Payment success! Order: ' + order.id);
    }
  };
  // @ts-ignore
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
