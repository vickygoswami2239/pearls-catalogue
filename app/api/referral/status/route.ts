import { promises as fs } from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'referrals.json');

async function readStore() {
  try { return JSON.parse(await fs.readFile(file, 'utf-8')); }
  catch { return {}; }
}
async function writeStore(data: any) { await fs.writeFile(file, JSON.stringify(data, null, 2)); }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rid = searchParams.get('rid') || '';
  const claim = searchParams.get('claim') === '1';
  if (!rid) return new Response('Missing rid', { status: 400 });
  const db = await readStore();
  const row = db[rid] || { conversions: 0, reward10: false };
  const out = { conversions: row.conversions, reward10: row.reward10 };
  if (claim && row.reward10) { row.reward10 = false; db[rid] = row; await writeStore(db); }
  return new Response(JSON.stringify(out), { status: 200, headers: { 'content-type': 'application/json' } });
}
