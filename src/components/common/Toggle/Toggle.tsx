import * as React from 'react';
import styles from './Toggle.module.css';

const Toggle = ({ isSelected, onToggle, label }: Props) => {
  return (
    <div className={styles.toggleHolder}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={isSelected} onChange={() => onToggle()} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export interface Props {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default Toggle;
