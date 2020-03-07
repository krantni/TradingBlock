import React from "react";
import styles from "./App.module.css";
import TradingBlock from "components/TradingBlock";
import Intro from "components/Intro";
import LoadingSpinner from "components/LoadingSpinner";
import { ErrorModal } from "components/Modals";
import { useAppContext } from "provider/Provider";
import Header from "components/Header";

const App = () => {
  const {
    data: { teamOwners, leagueId, route, isLoading, errorMessage },
    dispatch
  } = useAppContext();

  return (
    <div className={styles.container}>
      <Header />
      {route === "" && <Intro />}
      {route !== "" && <TradingBlock teamOwners={teamOwners} />}
      {isLoading && <LoadingSpinner />}
      {errorMessage && (
        <ErrorModal
          leagueId={leagueId || ""}
          message={errorMessage}
          closeModal={() => {
            dispatch({ type: "SET_ERROR", error: "" });
          }}
        />
      )}
      <div className={styles.footer}>
        <div>
          Not affiliated with Sleeper{" "}
          <p>
            <a href="mailto:krantni@gmail.com?subject=The Trading Block">Email me</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
