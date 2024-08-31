import getCurrentUser from '@/app/actions/getCurrentUser';
import DesktopSidebar from './DesktopSidebar';
import styles from './Sidebar.module.scss';
import MobileFooter from './MobileFooter';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className={styles.sidebar}>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
