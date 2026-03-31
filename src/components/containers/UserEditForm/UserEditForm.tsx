'use client';

import { useActionState } from 'react';

import { updateUser } from '@/actions/user';
import { FormField } from '@/components/elements/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { INITIAL_STATE, ROLE_OPTIONS, STATUS_OPTIONS, USER_FORM_FIELDS } from '@/constants/user.constant';
import type { TUpdateUserState, TUser } from '@/types/user.type';

import styles from './UserEditForm.module.scss';

type TUserEditFormProps = {
  user: TUser;
};

const UserEditForm = ({ user }: TUserEditFormProps) => {
  const [state, formAction, isPending] = useActionState<TUpdateUserState, FormData>(updateUser, INITIAL_STATE);

  return (
    <form className={styles.form} action={formAction}>
      <input name={USER_FORM_FIELDS.ID} type="hidden" value={user.id} />

      <div className={styles.grid}>
        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.FIRST_NAME}>First Name</FormField.Label>

          <Input
            defaultValue={user.first_name}
            hasError={Boolean(state.errors?.first_name?.[0])}
            id={USER_FORM_FIELDS.FIRST_NAME}
            name={USER_FORM_FIELDS.FIRST_NAME}
            required
          />

          <FormField.Error>{state.errors?.first_name?.[0]}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.LAST_NAME}>Last Name</FormField.Label>

          <Input
            defaultValue={user.last_name}
            hasError={Boolean(state.errors?.last_name?.[0])}
            id={USER_FORM_FIELDS.LAST_NAME}
            name={USER_FORM_FIELDS.LAST_NAME}
            required
          />

          <FormField.Error>{state.errors?.last_name?.[0]}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.EMAIL}>Email</FormField.Label>

          <Input
            defaultValue={user.email}
            hasError={Boolean(state.errors?.email?.[0])}
            id={USER_FORM_FIELDS.EMAIL}
            name={USER_FORM_FIELDS.EMAIL}
            required
            type="email"
          />

          <FormField.Error>{state.errors?.email?.[0]}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.PHONE}>Phone</FormField.Label>

          <Input
            defaultValue={user.phone ?? ''}
            hasError={Boolean(state.errors?.phone?.[0])}
            id={USER_FORM_FIELDS.PHONE}
            name={USER_FORM_FIELDS.PHONE}
          />

          <FormField.Error>{state.errors?.phone?.[0]}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.ROLE}>Role</FormField.Label>

          <Select
            defaultValue={user.role}
            name={USER_FORM_FIELDS.ROLE}
            options={ROLE_OPTIONS}
            placeholder="Select role"
          />

          <FormField.Error>{state.errors?.role?.[0]}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.STATUS}>Status</FormField.Label>

          <Select
            defaultValue={user.status}
            name={USER_FORM_FIELDS.STATUS}
            options={STATUS_OPTIONS}
            placeholder="Select status"
          />

          <FormField.Error>{state.errors?.status?.[0]}</FormField.Error>
        </FormField.Root>
      </div>

      {state.error && <p className={styles.error}>{state.error}</p>}

      <div className={styles.actions}>
        <Button disabled={isPending} type="submit">
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
};

export { UserEditForm };
