import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { promises as fs } from 'fs';
import path from 'path';

const USERS = path.join(process.cwd(), 'data', 'users.json');
const OTPS  = path.join(process.cwd(), 'data', 'otps.json');
const COOKIE_NAME = 'b2b_session';
const AUTH_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret');

type User = { id: string; name?: string; email?: string; phone?: string; createdAt: number };

async function readJSON(file: string) {
  try { return JSON.parse(await fs.readFile(file, 'utf-8')); }
  catch { await fs.mkdir(path.dirname(file), { recursive: true }); return {}; }
}
async function writeJSON(file: string, data: any) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

export async function upsertUser({ email, phone, name }:{ email?:string; phone?:string; name?:string }) {
  const db = await readJSON(USERS);
  // key by email or phone
  const key = email ? `e:${email.toLowerCase()}` : `p:${phone}`;
  let user: User = db[key];
  if (!user) {
    user = { id: 'U-' + Math.random().toString(36).slice(2,10), email, phone, name, createdAt: Date.now() };
    db[key] = user;
    await writeJSON(USERS, db);
  } else if (name && !user.name) { user.name = name; await writeJSON(USERS, db); }
  return user;
}
export async function findUser({ email, phone }:{email?:string; phone?:string}) {
  const db = await readJSON(USERS);
  const key = email ? `e:${email.toLowerCase()}` : `p:${phone}`;
  return db[key] as User | undefined;
}

export async function createOTP(target: {email?:string; phone?:string}) {
  const code = (Math.floor(100000 + Math.random()*900000)).toString(); // 6-digit
  const store = await readJSON(OTPS);
  const key = target.email ? `e:${target.email.toLowerCase()}` : `p:${target.phone}`;
  store[key] = { code, expiresAt: Date.now() + 10*60*1000 }; // 10 mins
  await writeJSON(OTPS, store);
  return code; // dev: return OTP (prod me yahin send SMS/email)
}
export async function verifyOTP(target:{email?:string; phone?:string}, code:string) {
  const store = await readJSON(OTPS);
  const key = target.email ? `e:${target.email.toLowerCase()}` : `p:${target.phone}`;
  const row = store[key];
  if (!row) return false;
  const ok = row.code === code && row.expiresAt > Date.now();
  if (ok) { delete store[key]; await writeJSON(OTPS, store); }
  return ok;
}

// --- JWT session ---
export async function setSession(user: User) {
  const token = await new SignJWT({ sub: user.id, email: user.email, phone: user.phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(AUTH_SECRET);

  cookies().set(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*30 });
}
export function clearSession() {
  cookies().set(COOKIE_NAME, '', { httpOnly:true, sameSite:'lax', path:'/', maxAge:0 });
}
export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, AUTH_SECRET); return payload; }
  catch { return null; }
}
