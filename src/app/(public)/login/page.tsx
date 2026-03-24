'use client';

import { useActionState } from 'react';

import { signIn } from '@/actions/auth';
import { INITIAL_STATE } from '@/constants/auth.constant';

const LoginPage = () => {
  const [state, formAction] = useActionState(signIn, INITIAL_STATE);

  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input name="email" type="email" required />
      </div>
      {state.errors?.email && <p>{state.errors.email[0]}</p>}

      <div>
        <label>Password</label>
        <input name="password" type="password" required />
      </div>
      {state.errors?.password && <p>{state.errors.password[0]}</p>}

      <button type="submit">Login</button>

      {state.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginPage;
