import * as React from 'react';
import styles from './Modal.module.css';

const Modal = ({ message, closeModal }: Props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.body}>
          <span className={styles.message}>{message}</span>
          <p>Please try again.</p>
          <div className={styles.button} onClick={() => closeModal()}>
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Props {
  message: string;
  closeModal: () => void;
}

export default Modal;
