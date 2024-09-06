'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConversationType } from '@/app/types';
import styles from './page.module.scss';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => data.messages?.[data.messages.length - 1], [data.messages]);

  const userEmail = sessionData?.user?.email;

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;
    return lastMessage.seen?.some((user) => user.email === userEmail) || false;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image';
    return lastMessage?.body || 'Started a conversation';
  }, [lastMessage]);

  return (
    <div onClick={handleClick} className={clsx(styles.container, selected && styles.selected)}>
      <Avatar user={otherUser} />
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.name}>{data.name || otherUser?.name}</p>
          {lastMessage?.createdAt && <p className={styles.timestamp}>{format(new Date(lastMessage.createdAt), 'p')}</p>}
        </div>
        <p className={clsx(styles.message, hasSeen ? styles.seen : styles.unseen)}>{lastMessageText}</p>
      </div>
    </div>
  );
};

export default ConversationBox;
