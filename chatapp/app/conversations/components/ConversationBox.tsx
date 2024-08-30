'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import styles from './page.module.scss';

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ 
  data, 
  selected 
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email,
  [session.data?.user?.email]);
  
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        styles.container,
        selected && 'selected'
      )}
    >
        <Avatar user={otherUser} />
      <div className={styles.content}>
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className={styles.header}>
            <p className={styles.name}>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className={styles.timestamp}>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={clsx(
              styles.message,
              hasSeen ? 'seen' : 'unseen'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
 
export default ConversationBox;
