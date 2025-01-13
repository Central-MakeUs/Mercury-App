import Constants from "expo-constants";

export const getUserAppVersion = () => {
  return Constants.expoConfig?.version ?? null;
};
