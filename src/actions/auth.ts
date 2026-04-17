'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { SIGN_IN_FORM_FIELDS } from '@/constants/auth.constant';
import { ROUTES } from '@/constants/routes.constant';
import { sendN8nNotification } from '@/lib/n8n/sendN8nNotification';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signInSchema } from '@/schemas/auth.schema';
import type { TActionState } from '@/types/auth.type';
import { getZodFieldErrors } from '@/utils/getZodFieldErrors';

const signIn = async (_state: TActionState, formData: FormData): Promise<TActionState> => {
  const supabase = await createSupabaseServerClient();

  const rawData = {
    email: formData.get(SIGN_IN_FORM_FIELDS.EMAIL),
    password: formData.get(SIGN_IN_FORM_FIELDS.PASSWORD),
  };

  const parsed = signInSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: getZodFieldErrors(parsed.error),
      error: undefined,
    };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errors: {},
      error: 'Incorrect email or password',
    };
  }

  await sendN8nNotification({
    message: `User logged in: ${email}`,
  });

  revalidatePath('/');
  redirect(ROUTES.USERS);
};

const signOut = async () => {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  revalidatePath('/');
  redirect(ROUTES.LOGIN);
};

export { signIn, signOut };
