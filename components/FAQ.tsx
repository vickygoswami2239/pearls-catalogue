export default function FAQ() {
  const faqs = [
    { q: 'Pearls real hain?', a: 'Haan, hum lab-tested authentic pearls supply karte hain.' },
    { q: 'Care kaise karein?', a: 'Soft cloth se wipe, perfumes/sprays se door rakhein.' },
    { q: 'Warranty?', a: 'Manufacturing defects par 6-month limited warranty.' },
  ];
  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-semibold mb-2">FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-lg border p-3">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
