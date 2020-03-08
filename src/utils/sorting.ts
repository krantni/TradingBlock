import { TeamOwner, Player } from "./types";
import { positionsRanked } from "constants/positions";

export const sortTeamOwners = (teamA: TeamOwner, teamB: TeamOwner) => {
  const playersOnBlockA = teamA.players.filter(player => player.isOnTradeBlock).length;
  const playersOnBlockB = teamB.players.filter(player => player.isOnTradeBlock).length;
  if (playersOnBlockA > playersOnBlockB) return -1;
  if (playersOnBlockA < playersOnBlockB) return 1;
  return 0;
};

export const sortPlayersByPosition = (playerA: Player, playerB: Player) => {
  const playerARank: number =
    positionsRanked[playerA.position as keyof typeof positionsRanked] || 99;
  const playerBRank: number =
    positionsRanked[playerB.position as keyof typeof positionsRanked] || 99;
  if (playerARank > playerBRank) return 1;
  if (playerARank < playerBRank) return -1;
  return 0;
};
