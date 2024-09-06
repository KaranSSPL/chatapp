import Image from "next/image";
import styles from "./page.module.scss";

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateContent}>
        <Image width={400} height={400} className={styles.chat_image} src={"/images/vector.png"} alt="" /> 
      </div>
    </div>
  );
};

export default EmptyState;
