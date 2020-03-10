import { Settings } from "./types";

export const getSettingsFromStorage = (): Settings => {
  const storage = window.localStorage;
  return {
    fullRosters: storage.getItem("fullRosters") === "true",
    showNicknames: storage.getItem("showNicknames") === "true",
    customNickname: storage.getItem("customNickname") || ""
  };
};

export const setStorage = (settings: Settings) => {
  const storage = window.localStorage;
  // tslint:disable-next-line:prefer-array-literal
  (Object.keys(settings) as Array<keyof Settings>).forEach(key => {
    storage.setItem(key, settings[key].toString());
  });
};
