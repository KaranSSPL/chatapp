"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./page.module.scss";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, register, required, errors, type = "text", disabled }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(errors[id] && styles.error, disabled && styles.disabled)}
        />
      </div>
    </div>
  );
};

export default Input;
