import { ReactNode } from "react";
import styles from "./AdminButton.module.css";

interface AdminButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  label?: string;
  variant?: ButtonType;
}

type ButtonType = 'default' | 'warning' | 'primary' | 'secondary';

const styleFromVariant = (variant: ButtonType) => {
  switch (variant) {
    case 'warning':
      return `${styles.warning} ${styles.button}`;
    case 'primary':
      return `${styles.primary} ${styles.button}`;
    case 'secondary':
      return `${styles.secondary} ${styles.button}`;
    default:
      return styles.button;
  };
} 

export const AdminButton = ({
  onClick,
  disabled,
  icon,
  label,
  variant = 'default',
}: AdminButtonProps) => {
  return (
    <button className={styleFromVariant(variant)} onClick={onClick} disabled={disabled}>
      {icon}
      {label}
    </button>
  );
};
