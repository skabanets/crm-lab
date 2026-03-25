const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
} as const;

const PROTECTED_ROUTES = [ROUTES.USERS] as const;

const AUTH_ROUTES = [ROUTES.LOGIN] as const;

export { ROUTES, PROTECTED_ROUTES, AUTH_ROUTES };
