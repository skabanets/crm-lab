'use client';

import { UsersGrid } from '@/components/elements/UsersGrid/UsersGrid';

import { useUsersTable } from './hooks/useUsersTable';
import styles from './UsersTableContainer.module.scss';

const UsersTableContainer = () => {
  const { users, isLoading, usersCount } = useUsersTable();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>
            Total users: <span>{usersCount}</span>
          </p>
        </div>
      </div>

      <div className={styles.tableSection}>
        {isLoading ? <div className={styles.loader}>Loading users...</div> : <UsersGrid users={users} />}
      </div>
    </section>
  );
};

export { UsersTableContainer };
