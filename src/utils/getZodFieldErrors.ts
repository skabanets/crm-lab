import type { ZodError } from 'zod';

import type { TUserFormErrors } from '@/types/user.type';

const getZodFieldErrors = (error: ZodError): TUserFormErrors => {
  return error.issues.reduce<TUserFormErrors>((acc, issue) => {
    const field = issue.path[0];

    if (typeof field !== 'string') {
      return acc;
    }

    const currentFieldErrors = acc[field as keyof TUserFormErrors] ?? [];

    acc[field as keyof TUserFormErrors] = [...currentFieldErrors, issue.message];

    return acc;
  }, {});
};

export { getZodFieldErrors };
