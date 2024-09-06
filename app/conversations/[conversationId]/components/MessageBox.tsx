'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { FullMessageType } from '@/app/types';

import Avatar from '@/app/components/Avatar';
import styles from './page.module.scss';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  return (
    <div className={clsx(styles.messageContainer, isOwn && styles.isOwn)}>
      <div className={clsx(styles.avatar, isOwn && styles.isOwn)}>
        <Avatar user={data.sender} />
      </div>
      <div className={clsx(styles.body, isOwn && styles.isOwn)}>
        <div className={styles.senderName}>
          <div className={styles.senderData}>{data.sender.name}</div>
          <div className={styles.date}>{format(new Date(data.createdAt), 'p')}</div>
        </div>
        <div className={clsx(styles.message, data.image ? styles.hasImage : styles.noImage)}>
          <div>{data.body}</div>
        </div>
        {isLast && isOwn && seenList.length > 0 && <div className={styles.seenList}>{`Seen by ${seenList}`}</div>}
      </div>
    </div>
  );
};

export default MessageBox;
