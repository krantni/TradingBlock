import React from 'react';
import styles from './App.module.css';
import TradingBlock from 'components/TradingBlock';
import Intro from 'components/Intro';
import LoadingSpinner from 'components/LoadingSpinner';
import { ReactComponent as Arrow } from 'images/downArrow.svg';
import Modal from 'components/Modal';
import { useAppContext } from 'provider/Provider';

const App = () => {
  const {
    data: { teamOwners, leagueId, leagueName, route, isLoading, errorMessage },
    dispatch,
  } = useAppContext();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.arrow}>
          {route !== '' && (
            <Arrow
              onClick={() => {
                dispatch({ type: 'CLEAR_ROUTE' });
              }}
            />
          )}
        </div>
        {route !== '' && leagueName ? (
          <div className={styles.title}>
            <h1>{leagueName}</h1>
            <h3>Trading Block</h3>
          </div>
        ) : (
          <h1>The Trading Block</h1>
        )}
        <div className={styles.arrow}></div>
      </div>
      {route === '' && <Intro />}
      {route !== '' && <TradingBlock teamOwners={teamOwners} />}
      {isLoading && <LoadingSpinner />}
      {errorMessage && (
        <Modal
          leagueId={leagueId || ''}
          message={errorMessage}
          closeModal={() => {
            dispatch({ type: 'SET_ERROR', error: '' });
          }}
        />
      )}
      <div className={styles.footer}>
        <div>
          Not affiliated with Sleeper{' '}
          <p>
            <a href="mailto:krantni@gmail.com?subject=The Trading Block">Email me</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
