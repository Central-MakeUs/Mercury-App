import * as WebBrowser from "expo-web-browser";

export const openInAppUrl = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};
