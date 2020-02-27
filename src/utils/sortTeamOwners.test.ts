import { sortTeamOwners } from './sortTeamOwners';
import { TeamOwner } from './types';

const team1 = {
  userName: 'team1',
  players: [{ isOnTradeBlock: true }],
};
const team2 = {
  userName: 'team2',
  players: [{ isOnTradeBlock: false }],
};

describe('sortTeamOwners', () => {
  it('sorts teams larger first', () => {
    expect(sortTeamOwners(team1 as TeamOwner, team2 as TeamOwner)).toBe(-1);
  });
  it('sorts teams larger second', () => {
    expect(sortTeamOwners(team2 as TeamOwner, team1 as TeamOwner)).toBe(1);
  });
  it('sorts teams stays same OTB', () => {
    expect(sortTeamOwners(team1 as TeamOwner, team1 as TeamOwner)).toBe(0);
  });
  it('sorts teams stays same no-OTB', () => {
    expect(sortTeamOwners(team2 as TeamOwner, team2 as TeamOwner)).toBe(0);
  });
});
