'use client';

import { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';

import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import styles from "./page.module.scss"
interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);
  
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);
  
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline'
  }, [data, isActive]);

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.overlay} />
          </Transition.Child>

          <div className={styles.drawer}>
            <div className={styles.content}>
              <div className={styles.panel + ' ' + (isOpen ? 'open' : '')}>
                <div className={styles.inner}>
                  <div className={styles.header}>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <IoClose size={24} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <div className="flex flex-col items-center">
                      <div className={styles.profileInfo}>
                        <div className={styles.avatar}>
                          {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
                        </div>
                        <div className={styles.name}>{title}</div>
                        <div className={styles.status}>{statusText}</div>
                        <div className={styles.actions}>
                          <div onClick={() => setConfirmOpen(true)} className={styles.delete}>
                            <div className={styles.icon}>
                              <IoTrash size={20} />
                            </div>
                            <div className={styles.label}>
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className={styles.details}>
                            {data.isGroup && (
                              <div>
                                <dt className={styles.term}>
                                  Emails
                                </dt>
                                <dd className={styles.definition}>
                                  {data.users.map((user) => user.email).join(', ')}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <div>
                                <dt className={styles.term}>
                                  Email
                                </dt>
                                <dd className={styles.definition}>
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className={styles.term}>
                                    Joined
                                  </dt>
                                  <dd className={styles.definition}>
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default ProfileDrawer;
