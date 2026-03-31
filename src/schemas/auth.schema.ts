import { z } from 'zod';

import { SIGN_IN_FIELD_ERRORS } from '@/constants/auth.constant';

const signInSchema = z.object({
  email: z.email(SIGN_IN_FIELD_ERRORS.EMAIL),
  password: z.string().min(6, SIGN_IN_FIELD_ERRORS.PASSWORD),
});

export { signInSchema };
