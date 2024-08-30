'use client';

import { User } from "@prisma/client";

import UserBox from "./UserBox";
import styles from "./page.module.scss"; // Import the SCSS module

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return ( 
    <div className={styles.userList}>
      <div className={styles.header}>
        <div className={styles.title}>
          People
        </div>
      </div>
      <div className={styles.content}>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
