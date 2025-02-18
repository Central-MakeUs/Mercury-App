import * as Application from "expo-application";

export const getUserAppVersion = () => {
  return Application.nativeBuildVersion ?? null;
};
