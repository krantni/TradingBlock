import { TradingBlockData, TradingBlockActions } from 'utils/types';

export const initialData: TradingBlockData = {
  leagueId: '',
  leagueName: '',
  teamOwners: [],
  isLoading: false,
  errorMessage: '',
};

export const tradingBlockReducer = (
  state: TradingBlockData = initialData,
  action: TradingBlockActions,
) => {
  switch (action.type) {
    case 'SET_TRADING_BLOCK':
      return {
        ...state,
        leagueName: action.leagueName,
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
      return initialData;
    default:
      return state;
  }
};
