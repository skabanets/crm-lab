import Link from 'next/link';
import type { ReactNode } from 'react';

import { ROUTES } from '@/constants/routes.constant';

import styles from './PrivateLayout.module.scss';

type TPrivateLayoutProps = {
  children: ReactNode;
};

const PrivateLayout = ({ children }: TPrivateLayoutProps) => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>CRM</div>

        <nav className={styles.nav}>
          <Link href={ROUTES.USERS} className={styles.link}>
            Users
          </Link>
        </nav>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default PrivateLayout;
