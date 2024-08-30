import styles from "./page.module.scss";

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateContent}>
        <h3 className={styles.emptyStateTitle}>
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
}

export default EmptyState;
