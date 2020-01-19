import React from 'react';
import styles from './App.module.css';
import TradingBlock from 'components/TradingBlock';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Intro from 'components/Intro';
import LoadingSpinner from 'components/LoadingSpinner';
import { ReactComponent as Arrow } from './images/downArrow.svg';
import {
  tradingBlockReducer,
  initialState,
} from './components/TradingBlock/TradingBlock.util';
import { TradingBlockState } from './utils/types';
import Modal from 'components/Modal';
import { getLeagueTradingBlock } from 'API/api';

const App = ({ history }: Props) => {
  const initialTradingState: TradingBlockState = history.location.pathname.substr(1)
    ? { ...initialState, leagueId: history.location.pathname.substr(1), isLoading: true }
    : initialState;

  const [
    { leagueId, leagueName, teamOwners, errorMessage, isLoading },
    dispatch,
  ] = React.useReducer(tradingBlockReducer, initialTradingState);
  React.useEffect(() => {
    if (history.location.pathname.substr(1)) {
      getLeagueTradingBlock(history.location.pathname.substr(1), dispatch);
    }
    // eslint-disable-next-line
  }, []);

  const triggerLeagueFetch = () => {
    getLeagueTradingBlock(leagueId, dispatch);
    history.push(`/${leagueId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.arrow}>
          {teamOwners.length !== 0 && (
            <>
              <Arrow
                onClick={() => {
                  history.push(`/`);
                }}
              />
            </>
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
        <Route path="/:id" component={() => <TradingBlock teamOwners={teamOwners} />} />
        <Route
          path="/"
          component={() => (
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

export interface Props {
  history: any;
}

export default withRouter(App);
