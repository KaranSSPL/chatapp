'use client';

import DesktopItem from './DesktopItem';
import useRoutes from '@/app/hooks/useRoutes';
import { useState } from 'react';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
import styles from './Sidebar.module.scss';

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.desktopSidebar}>
      <nav className={styles.nav}>
        <ul role="list" className={styles.navItems}>
          {routes.map((item) => (
            <DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={item.onClick} />
          ))}
        </ul>
      </nav>
      <nav className={styles.navAvatar}>
        <div onClick={() => setIsOpen(true)} className={styles.navContainer}>
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
