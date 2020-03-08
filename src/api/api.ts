import axios, { AxiosResponse } from 'axios';
import {
  ServiceLeagueData,
  TeamOwner,
  ServiceRosterData,
  Roster,
  TradingBlockActions,
} from 'utils/types';
import { mapPlayersToNickname } from 'utils/mapPlayersToNickname';
import { sortTeamOwners, sortPlayersByPosition } from 'utils/sorting';

export const getLeagueTradingBlock = (
  leagueId: string,
  dispatch: React.Dispatch<TradingBlockActions>,
) => {
  if (!isAllNumbers(leagueId)) {
    dispatch({
      type: 'SET_ERROR',
      error:
        'Your League ID should only contains numbers 0-9. Did you enter the correct League ID?',
    });
    return;
  }
  dispatch({ type: 'SET_LOADING' });
  const leagueNamePromise = fetchLeagueDetails(leagueId);
  const leagueUserPromise = fetchLeagueUsers(leagueId);
  const leagueRosterPromise = fetchLeagueRosters(leagueId);
  Promise.all([leagueNamePromise, leagueUserPromise, leagueRosterPromise])
    .then(([leagueName, teamOwners, rosters]) => {
      if (teamOwners && rosters) {
        teamOwners.forEach(owner => {
          const roster = rosters.find(roster => {
            return roster.ownerID === owner.userID;
          });
          if (roster) {
            owner.players = roster.players;
          }
        });
        dispatch({
          leagueName,
          leagueId,
          type: 'SET_TRADING_BLOCK',
          owners: teamOwners.sort(sortTeamOwners),
        });
      }
    })
    .catch(err => {
      dispatch({ type: 'SET_ERROR', error: err.message });
    });
};

const fetchLeagueUsers = (leagueId: string): Promise<TeamOwner[]> => {
  return axios
    .get(`https://api.sleeper.app/v1/league/${leagueId}/users`)
    .then((serviceResponse: AxiosResponse<ServiceLeagueData[]>): TeamOwner[] => {
      if (serviceResponse.data && serviceResponse.data.length) {
        return serviceResponse.data.map(user => {
          return {
            userName: user.display_name,
            userID: user.user_id,
            avatarID: user.avatar,
            teamName:
              user.metadata && user.metadata.team_name ? user.metadata.team_name : '',
            players: [],
          };
        });
      }
      throw new Error('Error finding league users. Did you enter the correct League ID?');
    });
};

const fetchLeagueRosters = (leagueId: string): Promise<Roster[]> => {
  return axios
    .get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
    .then((serviceResponse: AxiosResponse<ServiceRosterData[]>): Roster[] => {
      if (serviceResponse.data && serviceResponse.data.length) {
        return serviceResponse.data.map(roster => {
          return {
            players: mapPlayersToNickname(roster.players, roster.metadata).sort(sortPlayersByPosition),
            ownerID: roster.owner_id,
          };
        });
      }
      throw new Error(
        'Error finding league rosters. Did you enter the correct League ID?',
      );
    });
};

const fetchLeagueDetails = (leagueId: string): Promise<string> => {
  return axios
    .get(`https://api.sleeper.app/v1/league/${leagueId}`)
    .then((serviceResponse: AxiosResponse<{ name: string }>): string => {
      if (serviceResponse.data && serviceResponse.data) {
        return serviceResponse.data.name;
      }
      throw new Error(
        'Error finding league details. Did you enter the correct League ID?',
      );
    });
};

const isAllNumbers = (input: string) => {
  const regex = new RegExp(/^\d+$/);
  return regex.test(input);
};

export default getLeagueTradingBlock;
