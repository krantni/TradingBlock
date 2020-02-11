import { Player } from './types';
import players from '../constants/players.json';

export const mapPlayersToNickname = (
  roster: string[] | null,
  rosterMetaData: {
    [key: string]: string;
  } | null,
): Player[] => {
  if (!roster) {
    return [];
  }
  return roster.map(playerID => {
    const nickNameKey = 'p_nick_' + playerID;
    let nickName = '';
    if (rosterMetaData && rosterMetaData[nickNameKey]) {
      nickName = rosterMetaData[nickNameKey];
    }
    const playerIDObject = players as { [key: string]: { [key: string]: string } };
    if (playerIDObject[playerID] === undefined) {
      throw new Error("Hmm.. I didn't find a player you have in your league.");
    }

    return {
      id: playerID,
      name: playerIDObject[playerID].name,
      nickname: nickName,
      isOnTradeBlock: nickName.toUpperCase() === 'OTB',
      team: playerIDObject[playerID].team,
      position: playerIDObject[playerID].position,
    };
  });
};
