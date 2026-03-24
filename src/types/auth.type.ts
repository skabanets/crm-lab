import type { signInSchema } from '@/schemas/auth.schema';

import type { TFieldErrorsFrom, TZodInfer } from './utility.type';

type TSignInData = TZodInfer<typeof signInSchema>;

type TActionState = {
  errors?: TFieldErrorsFrom<TSignInData>;
  error?: string;
};

export type { TSignInData, TActionState };
