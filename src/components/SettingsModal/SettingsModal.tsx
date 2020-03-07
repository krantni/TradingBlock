import * as React from "react";
import { Modal } from "components/common";

const SettingsModal = ({ closeModal }: Props) => {
  return (
    <Modal closeModal={closeModal} title={"Settings"}>
      <div></div>
    </Modal>
  );
};

export interface Props {
  closeModal: () => void;
}

export default SettingsModal;
