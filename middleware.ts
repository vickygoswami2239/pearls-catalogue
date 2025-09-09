import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isB2B = url.pathname.startsWith('/b2b');
  if (!isB2B) return NextResponse.next();

  // cookie check
  const has = req.cookies.has('b2b_session');
  if (!has && !url.pathname.startsWith('/b2b/login') && !url.pathname.startsWith('/b2b/register')) {
    const loginUrl = new URL('/b2b/login', req.url);
    loginUrl.searchParams.set('next', url.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/b2b/:path*'],
};
