import * as Clipboard from "expo-clipboard";

export const copyClipboard = async (params: string) => {
  await Clipboard.setStringAsync(params);
};
