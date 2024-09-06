import clsx from 'clsx';
import styles from './page.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', fullWidth = false, children, onClick, secondary = false, danger = false, disabled = false }) => {
  
  const buttonClassNames = clsx(styles.button, {
    [styles.fullWidth]: fullWidth,
    [styles.disabled]: disabled,
    [styles.secondary]: secondary,
    [styles.danger]: danger,
    [styles.default]: !secondary && !danger,
  });

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClassNames}>
      {children}
    </button>
  );
};

export default Button;
