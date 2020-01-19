export type ServiceLeagueData = {
  user_id: string;
  metadata: {
    team_name: string;
  };
  display_name: string;
  avatar: string;
};

export type TeamOwner = {
  userName: string;
  userID: string;
  avatarID: string;
  teamName: string;
  players: Player[];
};

export type ServiceRosterData = {
  players: string[];
  owner_id: string;
  metadata: {
    [key: string]: string;
  } | null;
};

export type Roster = {
  players: Player[];
  ownerID: string;
};

export type Player = {
  id: string;
  name: string;
  nickname: string;
  isOnTradeBlock: boolean;
  team: string;
  position: string;
};

export type TradingBlockState = {
  leagueId: string;
  leagueName: string;
  teamOwners: TeamOwner[];
  isLoading: boolean;
  errorMessage: string;
};

export type TradingBlockActions = SetOwners | SetLeagueId | SetError | Reset | SetLoading;

type SetOwners = {
  type: 'SET_TRADING_BLOCK';
  leagueName: string;
  owners: TeamOwner[];
};

type SetLeagueId = {
  type: 'SET_LEAGUE_ID';
  id: string;
};

type SetError = {
  type: 'SET_ERROR';
  error: string;
};

type SetLoading = {
  type: 'SET_LOADING';
};

type Reset = {
  type: 'RESET';
};
