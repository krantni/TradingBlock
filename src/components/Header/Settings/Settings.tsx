import * as React from "react";
import Toggle from "components/common/Toggle";
import { useAppContext } from "provider/Provider";
// import styles from "./Settings.module.css";
// import { ReactComponent as Gear } from "images/settings.svg";
// import SettingsModal from "components/Header/Settings/SettingsModal";

const Settings = () => {
  // const [showSettings, toggleSettings] = React.useState<boolean>(false);
  const {
    data: {
      settings: { fullRosters }
    },
    dispatch
  } = useAppContext();

  return (
    <>
      <Toggle
        label={"Show full rosters"}
        isSelected={fullRosters}
        onToggle={() => {
          dispatch({
            type: "UPDATE_SETTINGS",
            settings: {
              fullRosters: !fullRosters
            }
          });
        }}
      />
      {/* 
      These comments are bad.. but I built for something ahead of time and the experience was poor with only one option.
      So I commented it out. I'll fix it later. Promise.
      
      <div className={styles.gear}>
        <Gear
          onClick={() => {
            toggleSettings(true);
          }}
        />
      </div>
      {showSettings && <SettingsModal closeModal={() => toggleSettings(false)} />} */}
    </>
  );
};

export default Settings;
