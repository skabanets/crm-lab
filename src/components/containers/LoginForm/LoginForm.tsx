'use client';

import { FormField } from '@/components/elements/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { SIGN_IN_FORM_FIELDS } from '@/constants/auth.constant';

import { useLoginForm } from './hooks/useLoginForm';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { register, submit, errors, isValid, isPending, isSubmitting } = useLoginForm();

  return (
    <form className={styles.form} onSubmit={submit}>
      <h1 className={styles.title}>Login</h1>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.EMAIL}>Email</FormField.Label>

        <Input
          id={SIGN_IN_FORM_FIELDS.EMAIL}
          type="email"
          placeholder="Enter your email"
          hasError={Boolean(errors.email?.message)}
          {...register(SIGN_IN_FORM_FIELDS.EMAIL)}
        />

        <FormField.Error>{errors.email?.message}</FormField.Error>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.PASSWORD}>Password</FormField.Label>

        <Input
          id={SIGN_IN_FORM_FIELDS.PASSWORD}
          type="password"
          placeholder="Enter your password"
          hasError={Boolean(errors.password?.message)}
          {...register(SIGN_IN_FORM_FIELDS.PASSWORD)}
        />

        <FormField.Error>{errors.password?.message}</FormField.Error>
      </FormField.Root>

      <Button disabled={!isValid || isPending || isSubmitting} type="submit">
        {isPending || isSubmitting ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
};

export { LoginForm };
