import { NextResponse } from 'next/server';
import { findUser, setSession, verifyOTP } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const { email, phone, code } = body || {};
  if ((!email && !phone) || !code) return NextResponse.json({ ok:false, error:'missing' }, { status:400 });

  const ok = await verifyOTP({ email, phone }, String(code));
  if (!ok) return NextResponse.json({ ok:false, error:'invalid otp' }, { status:401 });

  const user = await findUser({ email, phone });
  if (!user) return NextResponse.json({ ok:false, error:'user not found' }, { status:404 });

  await setSession(user);
  return NextResponse.json({ ok:true, user });
}
