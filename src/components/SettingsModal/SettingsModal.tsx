import * as React from "react";
import { Modal } from "components/common";
import Toggle from "components/common/Toggle";
import { useAppContext } from "provider/Provider";

const SettingsModal = ({ closeModal }: Props) => {
  const {
    data: {
      queryParams: { fullRosters }
    },
    dispatch
  } = useAppContext();
  return (
    <Modal closeModal={closeModal} title={"Settings"}>
      <Toggle
        label={"Show full rosters"}
        isSelected={fullRosters}
        onToggle={() => {
          dispatch({
            type: "UPDATE_SETTINGS",
            settingKey: "fullRosters",
            settingValue: !fullRosters
          });
        }}
      />
    </Modal>
  );
};

export interface Props {
  closeModal: () => void;
}

export default SettingsModal;
