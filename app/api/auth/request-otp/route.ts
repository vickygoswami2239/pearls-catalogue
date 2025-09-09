import { NextResponse } from 'next/server';
import { findUser, createOTP } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const { email, phone } = body || {};
  if (!email && !phone) return NextResponse.json({ ok:false, error:'email or phone required' }, { status:400 });

  const user = await findUser({ email, phone });
  if (!user) return NextResponse.json({ ok:false, error:'user not found' }, { status:404 });

  const otp = await createOTP({ email, phone });
  return NextResponse.json({ ok:true, dev_otp: otp });
}
