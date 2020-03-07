import * as React from "react";
import { Modal } from "components/common";
import Toggle from "components/common/Toggle";

const SettingsModal = ({ closeModal }: Props) => {
  const [toggle, toggleTheToggle] = React.useState<boolean>(false);
  return (
    <Modal closeModal={closeModal} title={"Settings"}>
      <Toggle
        label={"Show full roster"}
        isSelected={toggle}
        onToggle={() => {
          toggleTheToggle(!toggle);
        }}
      />
    </Modal>
  );
};

export interface Props {
  closeModal: () => void;
}

export default SettingsModal;
