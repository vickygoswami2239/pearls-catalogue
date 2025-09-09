import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
const body = await req.text();
const { amount } = JSON.parse(body || '{}');


// TODO: replace with real Razorpay order creation using secret key on server
// This is a stub that mimics an order object
const id = 'order_' + Math.random().toString(36).slice(2,10);
return NextResponse.json({ id, amount: amount || 10000 });
}
