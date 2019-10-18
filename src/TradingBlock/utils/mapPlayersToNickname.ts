import { Player } from './types';
import players from './players.json';

export const mapPlayersToNickname = (
  roster: string[],
  rosterMetaData: {
    [key: string]: string;
  } | null,
): Player[] => {
  return roster.map(playerID => {
    const nickNameKey = 'p_nick_' + playerID;
    let nickName = '';
    if (rosterMetaData && rosterMetaData[nickNameKey]) {
      nickName = rosterMetaData[nickNameKey];
    }
    const playerIDObject = players as { [key: string]: { [key: string]: string } };

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
