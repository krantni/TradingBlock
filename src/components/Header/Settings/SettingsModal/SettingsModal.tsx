import * as React from "react";
import { Modal } from "components/common";
import Toggle from "components/common/Toggle";
import { useAppContext } from "provider/Provider";

const SettingsModal = ({ closeModal }: Props) => {
  const {
    data: {
      settings: { fullRosters, showNicknames }
    },
    dispatch
  } = useAppContext();
  const [showFullRosters, toggleFullRosters] = React.useState(fullRosters);
  const [showAllNicknames, toggleNicknames] = React.useState(showNicknames);

  return (
    <Modal
      closeModal={() => {
        dispatch({
          type: "UPDATE_SETTINGS",
          settings: {
            fullRosters: showFullRosters
          }
        });
        closeModal();
      }}
      title={"Settings"}
    >
      <>
        <Toggle
          label={"Show full rosters"}
          isSelected={showFullRosters}
          onToggle={() => {
            toggleFullRosters(!showFullRosters);
          }}
        />
        <Toggle
          label={"Show player nicknames"}
          isSelected={showAllNicknames}
          onToggle={() => {
            toggleNicknames(!showAllNicknames);
          }}
        />
      </>
    </Modal>
  );
};

export interface Props {
  closeModal: () => void;
}

export default SettingsModal;
