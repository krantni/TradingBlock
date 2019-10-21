import * as React from 'react';
import styles from './TradingBlock.module.css';
import LoadingSpinner from './components/LoadingSpinner';
import Team from './components/Team';
import { fetchLeagueUsers, fetchLeagueRosters } from './API/api';
import Modal from './components/Modal';
import { ReactComponent as Arrow } from './images/downArrow.svg';
import SleeperLeagueIdImage from './images/sleeperleagueid.png';
import { tradingBlockReducer, initialState } from './TradingBlock.util';
import { TradingBlockState } from './utils/types';

const TradingBlock = ({ match, history }: Props) => {
  const initialTradingState: TradingBlockState = match.params.id
    ? { ...initialState, leagueId: match.params.id, isLoading: true }
    : initialState;

  const [{ leagueId, teamOwners, errorMessage, isLoading }, dispatch] = React.useReducer(
    tradingBlockReducer,
    initialTradingState,
  );

  React.useEffect(() => {
    if (match.params.id) {
      getLeagueTradingBlock();
    }
  }, []);

  const getLeagueTradingBlock = () => {
    if (leagueId) {
      dispatch({ type: 'SET_LOADING' });
      const leagueUserPromise = fetchLeagueUsers(leagueId);
      const leagueRosterPromise = fetchLeagueRosters(leagueId);
      Promise.all([leagueUserPromise, leagueRosterPromise])
        .then(([teamOwners, rosters]) => {
          history.push(`/${leagueId}`);
          if (teamOwners && rosters) {
            teamOwners.forEach(owner => {
              const roster = rosters.find(roster => {
                return roster.ownerID === owner.userID;
              });
              if (roster) {
                owner.players = roster.players;
              }
            });
            dispatch({ type: 'SET_TEAM_OWNERS', owners: teamOwners });
          }
        })
        .catch(err => {
          dispatch({ type: 'SET_ERROR', error: err.errorMessage });
        });
    }
  };
  console.log('render');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.arrow}>
          {teamOwners.length !== 0 && (
            <>
              <Arrow
                onClick={() => {
                  history.push(`/`);
                  dispatch({ type: 'RESET' });
                }}
              />
            </>
          )}
        </div>
        <h1>The Trading Block</h1>
        <div className={styles.arrow}></div>
      </div>
      {teamOwners.length === 0 && (
        <div className={styles.intro}>
          <div className={styles.inputHolder}>
            <span className={styles.span100}>Enter Sleeper League ID</span>
            <input
              type="text"
              className={styles.leagueInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({ type: 'SET_LEAGUE_ID', id: e.target.value });
              }}
            ></input>
            <div className={styles.goButton} onClick={() => getLeagueTradingBlock()}>
              GO
            </div>
          </div>
          <div className={styles.text}>
            Set the nickname of players you want to show up on the trading block to: OTB
            or otb.
          </div>
          <div className={styles.text}>
            You can find your sleep league ID by logging into the Sleeper Web App and
            finding the ID in the URL bar.
          </div>
          <img src={SleeperLeagueIdImage} alt="sleeper league example" />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && leagueId && (
        <div className={styles.teams}>
          {teamOwners.map(teamOwner => {
            return (
              <div className={styles.teamContainer} key={teamOwner.userID}>
                <Team owner={teamOwner} />
              </div>
            );
          })}
        </div>
      )}
      {errorMessage && (
        <Modal
          message={errorMessage}
          closeModal={() => {
            dispatch({ type: 'SET_ERROR', error: '' });
          }}
        />
      )}
    </div>
  );
};

export interface Props {
  match: any;
  history: any;
}

export default TradingBlock;
