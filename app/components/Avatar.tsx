import { User } from "@prisma/client";
import Image from "next/image";
import styles from "./page.module.scss";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

  return (
    <div className={styles.avatar}>
      <div className={styles.imageContainer}>
        <Image fill src={user?.image || "/images/placeholder.jpg"} alt="Avatar" />
      </div>
    </div>
  );
};

export default Avatar;
