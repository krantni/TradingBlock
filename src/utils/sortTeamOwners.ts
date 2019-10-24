import { TeamOwner } from './types';

export const sortTeamOwners = (teamA: TeamOwner, teamB: TeamOwner) => {
  const playersOnBlockA = teamA.players.filter(player => player.isOnTradeBlock).length;
  const playersOnBlockB = teamB.players.filter(player => player.isOnTradeBlock).length;
  if (playersOnBlockA > playersOnBlockB) {
    return -1;
  }
  if (playersOnBlockA < playersOnBlockB) {
    return 1;
  }
  return 0;
};
