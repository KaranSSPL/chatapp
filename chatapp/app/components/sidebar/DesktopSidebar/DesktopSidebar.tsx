'use client';

import DesktopItem from "../DesktopItem/DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import Avatar from "../../Avatar";
import { User } from "@prisma/client";
import styles from "./DesktopSidebar.module.scss";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser }, 'TEST');

  return (
    <div className={styles["desktop-sidebar"]}>
      <nav className={styles.nav}>
        <ul role="list" className={styles["nav-items"]}>
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className={styles["nav-avatar"]}>
        <div
          onClick={() => setIsOpen(true)}
          className={styles["avatar-container"]}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
