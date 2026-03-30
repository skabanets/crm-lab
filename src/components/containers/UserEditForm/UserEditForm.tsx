'use client';

import { useActionState, useMemo, useState } from 'react';

import { updateUser } from '@/actions/user';
import { FormField } from '@/components/elements/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { INITIAL_STATE, ROLE_OPTIONS, STATUS_OPTIONS, USER_FORM_FIELDS } from '@/constants/user.constant';
import { updateUserSchema } from '@/schemas/user.schema';
import type { TUpdateUserState, TUser } from '@/types/user.type';
import { getZodFieldErrors } from '@/utils/getZodFieldErrors';

import styles from './UserEditForm.module.scss';

type TUserEditFormProps = {
  user: TUser;
};

const UserEditForm = ({ user }: TUserEditFormProps) => {
  const [serverState, formAction, isPending] = useActionState(updateUser, INITIAL_STATE);
  const [clientErrors, setClientErrors] = useState<TUpdateUserState['errors']>({});

  const mergedErrors = useMemo(
    () => ({
      ...serverState.errors,
      ...clientErrors,
    }),
    [serverState.errors, clientErrors]
  );

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);

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
      const errors = getZodFieldErrors(parsed.error);
      setClientErrors(errors);
      return false;
    }

    setClientErrors({});
    return true;
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit User</h1>
        <p className={styles.subtitle}>Update user information and save changes.</p>
      </div>

      <form
        className={styles.form}
        action={formAction}
        onBlur={(event) => {
          const form = event.currentTarget;
          validateForm(form);
        }}
        onSubmit={(event) => {
          const form = event.currentTarget;

          if (!validateForm(form)) {
            event.preventDefault();
          }
        }}
      >
        <input name={USER_FORM_FIELDS.ID} type="hidden" value={user.id} />

        <div className={styles.grid}>
          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.FIRST_NAME}>First Name</FormField.Label>

            <Input
              defaultValue={user.first_name}
              hasError={Boolean(mergedErrors?.first_name?.[0])}
              id={USER_FORM_FIELDS.FIRST_NAME}
              name={USER_FORM_FIELDS.FIRST_NAME}
              required
            />

            <FormField.Error>{mergedErrors?.first_name?.[0]}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.LAST_NAME}>Last Name</FormField.Label>

            <Input
              defaultValue={user.last_name}
              hasError={Boolean(mergedErrors?.last_name?.[0])}
              id={USER_FORM_FIELDS.LAST_NAME}
              name={USER_FORM_FIELDS.LAST_NAME}
              required
            />

            <FormField.Error>{mergedErrors?.last_name?.[0]}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.EMAIL}>Email</FormField.Label>

            <Input
              defaultValue={user.email}
              hasError={Boolean(mergedErrors?.email?.[0])}
              id={USER_FORM_FIELDS.EMAIL}
              name={USER_FORM_FIELDS.EMAIL}
              required
              type="email"
            />

            <FormField.Error>{mergedErrors?.email?.[0]}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.PHONE}>Phone</FormField.Label>

            <Input
              defaultValue={user.phone ?? ''}
              hasError={Boolean(mergedErrors?.phone?.[0])}
              id={USER_FORM_FIELDS.PHONE}
              name={USER_FORM_FIELDS.PHONE}
            />

            <FormField.Error>{mergedErrors?.phone?.[0]}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.ROLE}>Role</FormField.Label>

            <Select
              defaultValue={user.role}
              name={USER_FORM_FIELDS.ROLE}
              options={ROLE_OPTIONS}
              placeholder="Select role"
            />

            <FormField.Error>{mergedErrors?.role?.[0]}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.STATUS}>Status</FormField.Label>

            <Select
              defaultValue={user.status}
              name={USER_FORM_FIELDS.STATUS}
              options={STATUS_OPTIONS}
              placeholder="Select status"
            />

            <FormField.Error>{mergedErrors?.status?.[0]}</FormField.Error>
          </FormField.Root>
        </div>

        {serverState.error && <p className={styles.error}>{serverState.error}</p>}

        <div className={styles.actions}>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export { UserEditForm };
