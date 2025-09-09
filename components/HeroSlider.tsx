'use client';

export default function HeroSlider() {
  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-3 -mt-2">
      {[1, 2, 3].map(i => (
        <img
          key={i}
          src={`https://picsum.photos/seed/hero-${i}/1600/600`}
          alt="Pearl Hero"
          className="snap-start min-w-[85%] md:min-w-[60%] rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}
