import * as React from "react";
import styles from "./Modal.module.css";
import { ReactComponent as Close } from "images/close.svg";

const Modal = ({ message, closeModal, leagueId }: Props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          <Close onClick={() => closeModal()} />
        </div>
        <div className={styles.body}>
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
        </div>
      </div>
    </div>
  );
};

export interface Props {
  leagueId: string;
  message: string;
  closeModal: () => void;
}

export default Modal;
