'use client';

import { useActionState } from 'react';

import { signIn } from '@/actions/auth';
import { FormField } from '@/components/elements/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { INITIAL_STATE, SIGN_IN_FORM_FIELDS } from '@/constants/auth.constant';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, INITIAL_STATE);

  const emailError = state.errors?.email?.[0];
  const passwordError = state.errors?.password?.[0];

  return (
    <form className={styles.form} action={formAction}>
      <h1 className={styles.title}>Login</h1>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.email}>Email</FormField.Label>

        <Input
          id={SIGN_IN_FORM_FIELDS.email}
          name={SIGN_IN_FORM_FIELDS.email}
          type="email"
          placeholder="Enter your email"
          hasError={Boolean(emailError)}
          required
        />

        <FormField.Error>{emailError}</FormField.Error>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.password}>Password</FormField.Label>

        <Input
          id={SIGN_IN_FORM_FIELDS.password}
          name={SIGN_IN_FORM_FIELDS.password}
          type="password"
          placeholder="Enter your password"
          hasError={Boolean(passwordError)}
          required
        />

        <FormField.Error>{passwordError}</FormField.Error>
      </FormField.Root>

      {state.error && <p className={styles.globalError}>{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
};

export { LoginForm };
