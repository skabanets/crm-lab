import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_ROUTES, PROTECTED_ROUTES, ROUTES } from '@/constants/routes.constant';
import { updateSession } from '@/lib/supabase/middleware';

const isMatchedRoute = (pathname: string, routes: readonly string[]) => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function middleware(request: NextRequest) {
  const { supabase, response } = updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isProtectedRoute = isMatchedRoute(pathname, PROTECTED_ROUTES);
  const isAuthRoute = isMatchedRoute(pathname, AUTH_ROUTES);

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
