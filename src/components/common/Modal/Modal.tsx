import * as React from "react";
import styles from "./Modal.module.css";
import { ReactComponent as Close } from "images/close.svg";

const Modal = ({ children, closeModal }: Props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          <Close onClick={() => closeModal()} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export interface Props {
  children: JSX.Element;
  closeModal: () => void;
}

export default Modal;
