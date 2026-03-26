const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
  DASHBOARD: '/dashboard',
} as const;

const PROTECTED_ROUTES = [ROUTES.USERS, ROUTES.DASHBOARD] as const;

const AUTH_ROUTES = [ROUTES.LOGIN] as const;

export { ROUTES, PROTECTED_ROUTES, AUTH_ROUTES };
