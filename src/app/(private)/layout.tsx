import type { ReactNode } from 'react';

import { SidebarNavigation } from '@/components/elements/SidebarNavigation/SidebarNavigation';
import { UserMenu } from '@/components/elements/UserMenu/UserMenu';
import { createSupabaseServerClient } from '@/lib/supabase/server';

import styles from './PrivateLayout.module.scss';

type TPrivateLayoutProps = {
  children: ReactNode;
};

const PrivateLayout = async ({ children }: TPrivateLayoutProps) => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sidebarUser = user
    ? {
        id: user.id,
        email: user.email ?? '',
      }
    : null;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.topSection}>
          <div className={styles.logo}>CRM Lab</div>
        </div>

        <div className={styles.navigationSection}>
          <SidebarNavigation />
        </div>

        <div className={styles.bottomSection}>
          <UserMenu user={sidebarUser} />
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default PrivateLayout;
