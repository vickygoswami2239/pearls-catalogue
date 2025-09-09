import { promises as fs } from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'referrals.json');

async function readStore() {
  try { return JSON.parse(await fs.readFile(file, 'utf-8')); }
  catch { await fs.mkdir(path.dirname(file), { recursive: true }); return {}; }
}
async function writeStore(data: any) { await fs.writeFile(file, JSON.stringify(data, null, 2)); }

export async function POST(req: Request) {
  const { rid } = await req.json().catch(()=>({}));
  if (!rid) return new Response('Missing rid', { status: 400 });
  const db = await readStore();
  const row = db[rid] || { conversions: 0, reward10: false };
  row.conversions += 1;
  row.reward10 = true; // one-time grant
  db[rid] = row;
  await writeStore(db);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
}
