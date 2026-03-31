import type { TActionState, TSignInFormValues } from '@/types/auth.type';

const SIGN_IN_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

const SIGN_IN_FIELD_ERRORS = {
  EMAIL: 'Invalid email',
  PASSWORD: 'Password must be at least 6 characters',
} as const;

const SIGN_IN_FORM_DEFAULT_VALUES: TSignInFormValues = {
  email: '',
  password: '',
};

const INITIAL_STATE: TActionState = {
  errors: {},
  error: undefined,
};

export { SIGN_IN_FORM_FIELDS, SIGN_IN_FIELD_ERRORS, SIGN_IN_FORM_DEFAULT_VALUES, INITIAL_STATE };
