import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/constants/routes.constant';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('USER IN MIDDLEWARE:', user);

  const isProtectedRoute = request.nextUrl.pathname.startsWith(ROUTES.USERS);
  const isAuthRoute = request.nextUrl.pathname.startsWith(ROUTES.LOGIN);

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.USERS, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/users/:path*', '/users', '/login'],
};
