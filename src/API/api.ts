import axios, { AxiosResponse } from 'axios';
import {
  ServiceLeagueData,
  TeamOwner,
  ServiceRosterData,
  Roster,
  TradingBlockActions,
} from '../utils/types';
import { mapPlayersToNickname } from '../utils/mapPlayersToNickname';
import { sortTeamOwners } from 'utils/sortTeamOwners';

export const getLeagueTradingBlock = (
  leagueId: string,
  dispatch: React.Dispatch<TradingBlockActions>,
) => {
  dispatch({ type: 'SET_LOADING' });
  const leagueUserPromise = fetchLeagueUsers(leagueId);
  const leagueRosterPromise = fetchLeagueRosters(leagueId);
  Promise.all([leagueUserPromise, leagueRosterPromise])
    .then(([teamOwners, rosters]) => {
      if (teamOwners && rosters) {
        teamOwners.forEach(owner => {
          const roster = rosters.find(roster => {
            return roster.ownerID === owner.userID;
          });
          if (roster) {
            owner.players = roster.players;
          }
        });
        dispatch({ type: 'SET_TEAM_OWNERS', owners: teamOwners.sort(sortTeamOwners) });
      }
    })
    .catch(err => {
      dispatch({ type: 'SET_ERROR', error: err.message });
    });
};

export const fetchLeagueUsers = (leagueId: string): Promise<TeamOwner[]> => {
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

export const fetchLeagueRosters = (leagueId: string): Promise<Roster[]> => {
  return axios
    .get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
    .then((serviceResponse: AxiosResponse<ServiceRosterData[]>): Roster[] => {
      if (serviceResponse.data && serviceResponse.data.length) {
        return serviceResponse.data.map(roster => {
          return {
            players: mapPlayersToNickname(roster.players, roster.metadata),
            ownerID: roster.owner_id,
          };
        });
      }
      throw new Error(
        'Error finding league rosters. Did you enter the correct League ID?',
      );
    });
};
