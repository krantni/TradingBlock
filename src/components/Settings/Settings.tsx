import * as React from "react";
import styles from "./Settings.module.css";
import { ReactComponent as Gear } from "images/settings.svg";
import SettingsModal from "./SettingsModal";

const Settings = () => {
  const [showSettings, toggleSettings] = React.useState<boolean>(false);

  return (
    <>
      <div className={styles.gear}>
        <Gear
          onClick={() => {
            toggleSettings(true);
          }}
        />
      </div>
      {showSettings && <SettingsModal closeModal={() => toggleSettings(false)} />}
    </>
  );
};

export default Settings;
