import * as React from "react";
import styles from "./Settings.module.css";
import { ReactComponent as Gear } from "images/settings.svg";

const Settings = () => {
  return (
    <div className={styles.gear}>
      <Gear />
    </div>
  );
};

export default Settings;
