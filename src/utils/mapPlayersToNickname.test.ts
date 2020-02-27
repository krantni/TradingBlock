import { mapPlayersToNickname } from './mapPlayersToNickname';

const playerIDs = ['6178', '5916', '5170'];

const rosterNickNames1 = {
  p_nick_6178: 'OTB',
  p_nick_5916: 'OtB',
  p_nick_5170: 'otb',
};

const rosterNickNames2 = {
  p_nick_6178: '',
  p_nick_5916: 'On the trade block',
  p_nick_5170: 'PlayerNickName',
};

describe('mapPlayersToNickname', () => {
  it('works for any casing', () => {
    expect(
      mapPlayersToNickname(playerIDs, rosterNickNames1).filter(
        player => player.isOnTradeBlock,
      ).length,
    ).toBe(3);
  });

  it('nickname other than OTB', () => {
    expect(
      mapPlayersToNickname(playerIDs, rosterNickNames2).filter(
        player => player.isOnTradeBlock,
      ).length,
    ).toBe(0);
  });

  it('throws unknown player error', () => {
    try {
      mapPlayersToNickname(['46549876'], rosterNickNames1);
    } catch (e) {
      expect(e.message).toBe("Hmm.. I didn't find a player you have in your league.");
    }
  });
});
