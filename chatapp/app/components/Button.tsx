import clsx from "clsx";
import styles from "./page.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = "button", fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        styles.button,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        secondary && styles.secondary,
        danger && styles.danger,
        !secondary && !danger && styles.default
      )}
    >
      {children}
    </button>
  );
};

export default Button;
