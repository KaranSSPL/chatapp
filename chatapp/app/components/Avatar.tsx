import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";
import Image from "next/image";
import styles from "./page.module.scss";

interface AvatarProps {
  user?: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className={styles.avatar}>
      <div className={styles['image-container']}>
        <Image
          fill
          src={user?.image || '/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <span className={styles['status-indicator']} />
      ) : null}
    </div>
  );
}

export default Avatar;
