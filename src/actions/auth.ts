'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes.constant';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signInSchema } from '@/schemas/auth.schema';
import type { TActionState } from '@/types/auth.type';

const signIn = async (state: TActionState, formData: FormData) => {
  const supabase = await createSupabaseServerClient();

  const rawData = Object.fromEntries(formData.entries());

  const parsed = signInSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      ...state,
      errors: fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { ...state, error: error.message };
  }

  revalidatePath('/');
  redirect(ROUTES.USERS);
};

const signOut = async () => {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  revalidatePath('/');
  redirect(`${ROUTES.LOGIN}`);
};

export { signOut, signIn };
