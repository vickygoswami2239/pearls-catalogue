'use client';
import { useState } from 'react';

type Props = { images: string[]; alt: string };

export default function LightboxGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen]   = useState(false);

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <img
          src={images[active]}
          alt={alt}
          className="w-full h-[520px] object-cover transition scale-100 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src+i}
            onClick={() => setActive(i)}
            className={`h-16 w-16 rounded-lg overflow-hidden border ${active===i?'border-gray-900':'border-gray-200'}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur flex items-center justify-center p-4"
        >
          <img src={images[active]} alt={alt} className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl" />
        </div>
      )}
    </>
  );
}
