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
  players: string[] | null;
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

export type TradingBlockData = {
  leagueId: string;
  leagueName: string;
  teamOwners: TeamOwner[];
  route: string;
  isLoading: boolean;
  errorMessage: string;
};

export type TradingBlockActions =
  | SetTradingBlock
  | SetLeagueId
  | ClearRoute
  | SetError
  | Reset
  | SetLoading;

type SetTradingBlock = {
  type: 'SET_TRADING_BLOCK';
  leagueName: string;
  owners: TeamOwner[];
  leagueId: string;
};

type SetLeagueId = {
  type: 'SET_LEAGUE_ID';
  id: string;
};

type ClearRoute = {
  type: 'CLEAR_ROUTE';
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
