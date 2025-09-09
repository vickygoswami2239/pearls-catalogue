'use client';
import { useEffect, useState } from 'react';
export default function Toast({ message }: { message: string }) {
const [show, setShow] = useState(true);
useEffect(()=>{ const t=setTimeout(()=>setShow(false), 2500); return ()=>clearTimeout(t); }, []);
if(!show) return null;
return <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow">{message}</div>;
}
