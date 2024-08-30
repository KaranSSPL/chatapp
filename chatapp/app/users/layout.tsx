import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/sidebar/Sidebar";
import UserList from "./components/UserList";
import styles from "./page.module.scss"; // Import the SCSS module

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar className={styles.sidebarWrapper}>
      <div className={styles.container}>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
