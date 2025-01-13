import { Linking } from "react-native";

export const openExternalUrl = async (url: string) => {
  await Linking.openURL(url);
};
