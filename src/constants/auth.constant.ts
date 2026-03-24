import type { TActionState } from '@/types/auth.type';

const SIGN_IN_FORM_FIELDS = {
  email: 'email',
  password: 'password',
} as const;

const SIGN_IN_FIELD_ERRORS = {
  email: 'Invalid email',
  password: 'Password must be at least 6 characters',
} as const;

const INITIAL_STATE: TActionState = {
  errors: {},
  error: '',
} as const;

export { SIGN_IN_FORM_FIELDS, SIGN_IN_FIELD_ERRORS, INITIAL_STATE };
