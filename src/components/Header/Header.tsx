import * as React from "react";
import styles from "./Header.module.css";
import { ReactComponent as Arrow } from "images/downArrow.svg";
import { useAppContext } from "provider/Provider";

const Header = () => {
  const {
    data: { route, leagueName },
    dispatch
  } = useAppContext();
  return (
    <div className={styles.header}>
      <div className={styles.arrow}>
        {route !== "" && (
          <Arrow
            onClick={() => {
              dispatch({
                type: "CLEAR_ROUTE"
              });
            }}
          />
        )}
      </div>
      {route !== "" && leagueName ? (
        <div className={styles.title}>
          <h1>{leagueName}</h1>
          <h3>Trading Block</h3>
        </div>
      ) : (
        <h1>The Trading Block</h1>
      )}
      <div className={styles.arrow}></div>
    </div>
  );
};

export default Header;
