import * as React from 'react';
import styles from './ErrorModal.module.css';
import { Modal } from 'components/common';

const ErrorModal = ({ leagueId, closeModal, message }: Props) => {
  return (
    <Modal closeModal={closeModal}>
      <>
        <p className={styles.message}>{message}</p>
        <a
          className={styles.link}
          href={`mailto:krantni@gmail.com?subject=The Trading Block Error&body=I had an error with the Trading Block. %0D%0AMy League ID is: ${leagueId}`}
        >
          Email Me
        </a>
        <p>Please try again.</p>
        <div className={styles.button} onClick={() => closeModal()}>
          OK
        </div>
      </>
    </Modal>
  );
};

export interface Props {
  leagueId: string;
  message: string;
  closeModal: () => void;
}

export default ErrorModal;
