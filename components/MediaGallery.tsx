'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function MediaGallery({ images, videoUrl }: { images: string[]; videoUrl?: string }) {
  const [active, setActive] = useState(0);

  const main = images[active];

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 ring-1 ring-gray-200">
        <Image
          src={main}
          alt="Product"
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-16 rounded-xl overflow-hidden ring-1 ${i === active ? 'ring-black' : 'ring-gray-200'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="thumb" className="h-full w-full object-cover" />
          </button>
        ))}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            className="h-16 w-16 rounded-xl ring-1 ring-gray-200 flex items-center justify-center text-xs"
          >
            ▶ Video
          </a>
        )}
      </div>
    </div>
  );
}
