import { Settings } from "./types";

const getQueryParams = (): {
  [key: string]: string | null;
} => {
  let search = window.location.search;
  const queryParams: { [key: string]: string | null } = {};
  if (search) {
    search = search.substr(1);
    search.split("&").forEach(keyValuePair => {
      const keyValueArray = keyValuePair.split("=");
      if (keyValueArray.length === 2) {
        queryParams[keyValueArray[0]] = keyValueArray[1];
      }
    });
    return queryParams;
  }
  return queryParams;
};

export const getSettingsFromQueryString = (): Settings => {
  const queryParams = getQueryParams();
  return {
    fullRosters: queryParams["fullRosters"] === "true",
    customNickName: ""
  };
};

export const setQueryParams = (settings: Settings) => {
  let newQueryString = "?";
  // tslint:disable-next-line:prefer-array-literal
  (Object.keys(settings) as Array<keyof Settings>).forEach(key => {
    if (settings[key]) {
      if (newQueryString.length > 1) {
        newQueryString += `&${key}=${settings[key]}`;
      } else {
        newQueryString += `${key}=${settings[key]}`;
      }
    }
  });
  if (newQueryString.length !== 1) {
    window.history.replaceState(
      {},
      "",
      window.location.origin + window.location.pathname + newQueryString
    );
  } else {
    window.history.replaceState(
      {},
      "",
      window.location.origin + window.location.pathname
    );
  }
};
