import type { ReactNode } from 'react';

import styles from './PublicLayout.module.scss';

type TPublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: TPublicLayoutProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default PublicLayout;
