'use client';

import clsx from "clsx";

import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";
import styles from './page.module.scss';

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx(
      styles.container,
      isOpen ? styles.visible : styles.hidden
    )}>
      <EmptyState />
    </div>  
  )
}

export default Home;
