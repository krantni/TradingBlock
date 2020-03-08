import { TradingBlockData, TradingBlockActions, QueryParams } from "utils/types";
import { getAppDataFromQueryString, setQueryParams } from "utils/queryParams";

export const initialData: TradingBlockData = {
  leagueId: "",
  leagueName: "",
  teamOwners: [],
  route: "",
  isLoading: false,
  errorMessage: "",
  queryParams: getAppDataFromQueryString()
};

export const tradingBlockReducer = (
  state: TradingBlockData = initialData,
  action: TradingBlockActions
) => {
  switch (action.type) {
    case "SET_TRADING_BLOCK":
      window.history.pushState(
        "",
        action.leagueName,
        window.location.origin + "/" + action.leagueId
      );
      return {
        ...state,
        leagueName: action.leagueName,
        teamOwners: action.owners,
        leagueId: action.leagueId,
        route: action.leagueId,
        isLoading: false
      };
    case "UPDATE_SETTINGS":
      const newQueryParams: QueryParams = {
        ...state.queryParams,
        [action.settingKey]: action.settingValue
      };
      setQueryParams(newQueryParams);
      return {
        ...state,
        queryParams: newQueryParams
      };
    case "SET_LEAGUE_ID":
      return {
        ...state,
        leagueId: action.id
      };
    case "CLEAR_ROUTE":
      window.history.pushState("", "Trading Block", window.location.origin + "/");
      return {
        ...state,
        route: ""
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "RESET":
      return initialData;
    default:
      return state;
  }
};
