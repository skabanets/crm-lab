import { notFound } from 'next/navigation';

import { UserEditForm } from '@/components/containers/UserEditForm/UserEditForm';
import { Breadcrumbs } from '@/components/elements/Breadcrumbs/Breadcrumbs';
import { ROUTES } from '@/constants/routes.constant';
import { createSupabaseServerClient } from '@/lib/supabase/server';

import styles from './UserPage.module.scss';

type TUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UserPage = async ({ params }: TUserPageProps) => {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error || !user) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Users', href: ROUTES.USERS },
    { label: `${user.first_name} ${user.last_name}` },
  ] as const;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Breadcrumbs items={breadcrumbItems} />

        <div className={styles.heading}>
          <h1 className={styles.title}>Edit User</h1>
          <p className={styles.subtitle}>Update user information and save changes.</p>
        </div>
      </div>

      <UserEditForm user={user} />
    </section>
  );
};

export default UserPage;
