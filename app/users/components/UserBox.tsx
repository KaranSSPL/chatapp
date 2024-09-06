import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import styles from "./page.module.scss";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios.post("/api/conversations", { userId: data.id }).then((response) => {
      router.push(`/conversations/${response.data.id}`);
    });
  }, [data, router]);

  return (
    <div onClick={handleClick} className={styles.userBox}>
      <Avatar user={data} />
      <div className={styles.content}>
        <div className={styles.focus}>
          <span className={styles.span} aria-hidden="true" />
          <div className={styles.header}>
            <p className={styles.name}>{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
