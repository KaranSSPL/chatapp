'use client';

import { useState } from 'react';
import { Conversation, User } from '@prisma/client';
import { MdDelete } from "react-icons/md";
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';
import styles from './page.module.scss';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}


const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.userInfo}>
          <Avatar user={otherUser} />
          <div className={styles.userName}>
            <div>{conversation.name || otherUser?.name}</div>
          </div>
        </div>
        <div className={styles.delete} >
          <MdDelete  size={18} />
        </div>
      </div>
    </>
  );
};

export default Header;
