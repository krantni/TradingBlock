import { TradingBlockData, TradingBlockActions } from 'utils/types';

export const initialData: TradingBlockData = {
  leagueId: '',
  leagueName: '',
  teamOwners: [],
  route: '',
  isLoading: false,
  errorMessage: '',
};

export const tradingBlockReducer = (
  state: TradingBlockData = initialData,
  action: TradingBlockActions,
) => {
  switch (action.type) {
    case 'SET_TRADING_BLOCK':
      // window.location.pathname = action.leagueId;
      window.history.pushState(
        '',
        action.leagueName,
        window.location.origin + '/' + action.leagueId,
      );
      return {
        ...state,
        leagueName: action.leagueName,
        teamOwners: action.owners,
        leagueId: action.leagueId,
        route: action.leagueId,
        isLoading: false,
      };
    case 'SET_LEAGUE_ID':
      return {
        ...state,
        leagueId: action.id,
      };
    case 'CLEAR_ROUTE':
      window.history.pushState('', 'Trading Block', window.location.origin + '/');
      return {
        ...state,
        route: '',
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
