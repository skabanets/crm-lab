'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes.constant';
import { USER_FORM_FIELDS } from '@/constants/user.constant';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { updateUserSchema } from '@/schemas/user.schema';
import type { TUpdateUserState } from '@/types/user.type';
import { getZodFieldErrors } from '@/utils/getZodFieldErrors';

const updateUser = async (state: TUpdateUserState, formData: FormData): Promise<TUpdateUserState> => {
  const supabase = await createSupabaseServerClient();

  const rawData = {
    id: formData.get(USER_FORM_FIELDS.ID),
    first_name: formData.get(USER_FORM_FIELDS.FIRST_NAME),
    last_name: formData.get(USER_FORM_FIELDS.LAST_NAME),
    email: formData.get(USER_FORM_FIELDS.EMAIL),
    phone: formData.get(USER_FORM_FIELDS.PHONE),
    role: formData.get(USER_FORM_FIELDS.ROLE),
    status: formData.get(USER_FORM_FIELDS.STATUS),
  };

  const parsed = updateUserSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ...state,
      errors: getZodFieldErrors(parsed.error),
    };
  }

  const { id, first_name, last_name, email, phone, role, status } = parsed.data;

  const normalizedPhone = phone?.trim() ? phone.trim() : null;

  const { error } = await supabase
    .from('users')
    .update({
      first_name,
      last_name,
      email,
      phone: normalizedPhone,
      role,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(ROUTES.USERS);
  revalidatePath(`${ROUTES.USERS}/${id}`);
  redirect(ROUTES.USERS);
};

export { updateUser };
