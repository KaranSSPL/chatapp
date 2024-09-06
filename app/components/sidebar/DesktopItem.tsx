import clsx from 'clsx';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      <Link href={href} className={clsx(styles.link, active && styles.active)}>
        <Icon className={styles.icon} aria-hidden="true" />
      </Link>
    </li>
  );
};

export default DesktopItem;
