import { NextResponse } from 'next/server';
import { upsertUser, createOTP } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const { email, phone, name } = body || {};
  if (!email && !phone) return NextResponse.json({ ok:false, error:'email or phone required' }, { status:400 });

  const user = await upsertUser({ email, phone, name });
  const otp = await createOTP({ email, phone });

  // TODO(prod): send OTP via email/SMS here
  return NextResponse.json({ ok:true, dev_otp: otp, user });
}
