import { TradingBlockState, TradingBlockActions } from './utils/types';

export const initialState: TradingBlockState = {
  leagueId: null,
  teamOwners: [],
  isLoading: false,
  errorMessage: '',
};

export const tradingBlockReducer = (
  state: TradingBlockState = initialState,
  action: TradingBlockActions,
) => {
  switch (action.type) {
    case 'SET_TEAM_OWNERS':
      return {
        ...state,
        teamOwners: action.owners,
        isLoading: false,
      };
    case 'SET_LEAGUE_ID':
      return {
        ...state,
        leagueId: action.id,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
