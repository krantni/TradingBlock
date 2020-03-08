import { QueryParams } from "./types";

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

export const getAppDataFromQueryString = (): QueryParams => {
  const queryParams = getQueryParams();
  return {
    fullRosters: queryParams["fullRosters"] === "true",
    customNickName: ""
  };
};

export const setQueryParams = (queryParams: QueryParams) => {
  let newQueryString = "?";
  // tslint:disable-next-line:prefer-array-literal
  (Object.keys(queryParams) as Array<keyof QueryParams>).forEach(key => {
    if (queryParams[key]) {
      if (newQueryString.length > 1) {
        newQueryString += `&${key}=${queryParams[key]}`;
      } else {
        newQueryString += `${key}=${queryParams[key]}`;
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
