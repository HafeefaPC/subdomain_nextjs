// src/middleware.js
import { NextResponse } from 'next/server';
import { getValidSubdomain } from './utils/subdomain';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  if (!subdomain) {
    if (url.pathname !== '/') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === '/admin' && !subdomain) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (subdomain) {
    url.pathname = `/${subdomain}${url.pathname}`;
  } else {

    if (url.pathname !== '/') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.rewrite(url);
}
