import { ShieldCheck, CheckCircle2, Truck, Lock } from 'lucide-react';

export default function TrustBar() {
  const items = [
    { icon: Truck, label: 'Fast Shipping' },
    { icon: CheckCircle2, label: '7-Day Easy Returns' },
    { icon: ShieldCheck, label: '100% Authentic' },
    { icon: Lock, label: 'Secure Checkout' },
  ];
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-700 md:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 rounded-lg border px-3 py-2">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
