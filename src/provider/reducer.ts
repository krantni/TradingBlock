import { TradingBlockData, TradingBlockActions, Settings } from 'utils/types';
import { getSettingsFromStorage, setStorage } from 'utils/storage';

export const initialData: TradingBlockData = {
  leagueId: '',
  leagueName: '',
  teamOwners: [],
  route: '',
  isLoading: false,
  errorMessage: '',
  settings: getSettingsFromStorage(),
};

export const tradingBlockReducer = (
  state: TradingBlockData = initialData,
  action: TradingBlockActions,
): TradingBlockData => {
  switch (action.type) {
    case 'SET_TRADING_BLOCK':
      window.history.pushState(
        '',
        action.leagueName,
        window.location.origin + '/' + action.leagueId + window.location.search,
      );
      return {
        ...state,
        leagueName: action.leagueName,
        teamOwners: action.owners,
        leagueId: action.leagueId,
        route: action.leagueId,
        isLoading: false,
      };
    case 'UPDATE_SETTINGS':
      const newSettings: Settings = {
        ...state.settings,
        ...action.settings,
      };
      setStorage(newSettings);
      return {
        ...state,
        settings: newSettings,
      };
    case 'SET_LEAGUE_ID':
      return {
        ...state,
        leagueId: action.id,
      };
    case 'CLEAR_ROUTE':
      window.history.pushState(
        '',
        'Trading Block',
        window.location.origin + '/' + window.location.search,
      );
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
