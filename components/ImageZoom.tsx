'use client';
import { useRef, useState } from 'react';


export default function ImageZoom({ src, alt }: { src: string, alt: string }) {
const imgRef = useRef<HTMLImageElement>(null);
const lensRef = useRef<HTMLDivElement>(null);
const resRef = useRef<HTMLDivElement>(null);
const [loaded, setLoaded] = useState(false);


const onMove = (e: React.MouseEvent) => {
const img = imgRef.current!, lens = lensRef.current!, res = resRef.current!;
const rect = img.getBoundingClientRect();
const x = e.clientX - rect.left - lens.offsetWidth/2;
const y = e.clientY - rect.top - lens.offsetHeight/2;
const maxX = rect.width - lens.offsetWidth; const maxY = rect.height - lens.offsetHeight;
const nx = Math.max(0, Math.min(x, maxX));
const ny = Math.max(0, Math.min(y, maxY));
lens.style.left = nx + 'px'; lens.style.top = ny + 'px';
const cx = res.offsetWidth / lens.offsetWidth; const cy = res.offsetHeight / lens.offsetHeight;
res.style.backgroundImage = `url(${src})`;
res.style.backgroundSize = `${rect.width*cx}px ${rect.height*cy}px`;
res.style.backgroundPosition = `-${nx*cx}px -${ny*cy}px`;
};


return (
<div className="zoom-container relative">
<img ref={imgRef} src={src} alt={alt} className="w-full rounded-2xl" onLoad={()=>setLoaded(true)}
onMouseEnter={()=>{ if(lensRef.current&&resRef.current){ lensRef.current.style.display='block'; resRef.current.style.display='block'; }}}
onMouseLeave={()=>{ if(lensRef.current&&resRef.current){ lensRef.current.style.display='none'; resRef.current.style.display='none'; }}}
onMouseMove={onMove}
/>
<div ref={lensRef} className="zoom-lens rounded" />
<div ref={resRef} className="zoom-result rounded-xl shadow" />
{!loaded && <div className="absolute inset-0 animate-pulse bg-gray-100 rounded-2xl" />}
</div>
);
}
