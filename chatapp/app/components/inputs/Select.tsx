'use client';

import ReactSelect from 'react-select';
import styles from './select.module.scss';

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return ( 
    <div className={styles["select-container"]}>
      <label className={styles.label}>
        {label}
      </label>
      <div className={styles["select-wrapper"]}>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 })
          }}
          classNamePrefix="react-select"
        />
      </div>
    </div>
   );
}
 
export default Select;
