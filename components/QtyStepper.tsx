'use client';
export default function QtyStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border px-2 py-1">
      <button className="px-2 text-xl" onClick={() => onChange(Math.max(1, value - 1))}>−</button>
      <span className="px-3 min-w-6 text-center">{value}</span>
      <button className="px-2 text-xl" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
