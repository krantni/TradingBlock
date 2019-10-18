import * as React from 'react';
import styles from './LoadingSpinner.module.css';
import Spinner from './loading.svg';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <img src={Spinner} alt="Spinner" />
    </div>
  );
};

export default LoadingSpinner;
