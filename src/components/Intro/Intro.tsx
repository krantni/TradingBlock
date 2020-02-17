import * as React from 'react';
import styles from './Intro.module.css';
import SleeperLeagueIdImage from 'images/sleeperleagueid.png';
import { useAppContext } from 'provider/Provider';
import getLeagueTradingBlock from 'api';

const Intro = () => {
  const {
    data: { leagueId },
    dispatch,
  } = useAppContext();

  const triggerLeagueFetch = () => {
    getLeagueTradingBlock(leagueId, dispatch);
  };

  return (
    <div className={styles.intro}>
      <div className={styles.inputHolder}>
        <span className={styles.span100}>Enter Sleeper League ID</span>
        <input
          type="text"
          className={styles.leagueInput}
          value={leagueId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ id: e.target.value, type: 'SET_LEAGUE_ID' });
          }}
        ></input>
        <div className={styles.goButton} onClick={() => triggerLeagueFetch()}>
          GO
        </div>
      </div>
      <div className={styles.text}>
        Set the nickname of players you want to show up on the trading block to: OTB or
        otb.
      </div>
      <div className={styles.text}>
        You can find your sleeper league ID by logging into the Sleeper Web App and
        finding the ID in the URL bar.
      </div>
      <img src={SleeperLeagueIdImage} alt="sleeper league example" />
    </div>
  );
};

export default Intro;
