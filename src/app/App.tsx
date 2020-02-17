import React from 'react';
import styles from './App.module.css';
import TradingBlock from 'components/TradingBlock';
import { Route, Redirect, Switch, withRouter, useHistory } from 'react-router-dom';
import Intro from 'components/Intro';
import LoadingSpinner from 'components/LoadingSpinner';
import { ReactComponent as Arrow } from 'images/downArrow.svg';
import Modal from 'components/Modal';
import getLeagueTradingBlock from 'api';
import { useAppContext } from 'provider/Provider';

const App = () => {
  const history = useHistory();
  const {
    data: { teamOwners, leagueId, isLoading, leagueName, errorMessage },
    dispatch,
  } = useAppContext();

  const triggerLeagueFetch = () => {
    getLeagueTradingBlock(leagueId, dispatch);
    history.push(`${leagueId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.arrow}>
          {teamOwners.length !== 0 && (
            <Arrow
              onClick={() => {
                history.push(`/`);
              }}
            />
          )}
        </div>
        {!isLoading &&
          (leagueName ? (
            <div className={styles.title}>
              <h1>{leagueName}</h1>
              <h3>Trading Block</h3>
            </div>
          ) : (
            <h1>The Trading Block</h1>
          ))}

        <div className={styles.arrow}></div>
      </div>
      {isLoading && <LoadingSpinner />}
      <Switch>
        <Route path="/:id" render={() => <TradingBlock teamOwners={teamOwners} />} />
        <Route
          path="/"
          render={() => (
            <Intro
              startLeagueFetch={triggerLeagueFetch}
              leagueId={leagueId || ''}
              setLeagueId={(id: string) => dispatch({ id, type: 'SET_LEAGUE_ID' })}
            />
          )}
        />
        <Redirect from="*" to="/" />
      </Switch>
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

export default withRouter(App);
