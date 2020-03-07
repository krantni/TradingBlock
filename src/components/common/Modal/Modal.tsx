import * as React from "react";
import styles from "./Modal.module.css";
import { ReactComponent as Close } from "images/close.svg";

const Modal = ({ children, closeModal, title }: Props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          {title && <p className={styles.title}>{title}</p>}
          <Close onClick={() => closeModal()} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export interface Props {
  children: JSX.Element;
  title?: string;
  closeModal: () => void;
}

export default Modal;
