import { Linking } from "react-native";

export const openSetting = async () => {
  return Linking.openSettings();
};
