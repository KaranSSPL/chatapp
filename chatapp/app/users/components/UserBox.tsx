import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import styles from "./page.module.scss"; // Import the SCSS module

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className={styles.userBox}
    >
      <Avatar user={data} className={styles.avatar} />
      <div className={styles.content}>
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className={styles.header}>
            <p className={styles.name}>
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
