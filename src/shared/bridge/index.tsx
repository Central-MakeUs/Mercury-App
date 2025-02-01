import { bridge, createWebView } from "@webview-bridge/react-native";
import type { StatusBarStyle } from "expo-status-bar";
import { getUserAppVersion } from "./app-version/get-user-app-version";
import { copyClipboard } from "./clipboard/copy-clipboard";
import { downloadImage } from "./images/download-image";
import { uploadImage } from "./images/upload-image";
import { openExternalUrl } from "./linking/open-external-url";
import { openInAppUrl } from "./linking/open-in-app-url";
import { openSetting } from "./open-setting/open-setting";
import { requestReview } from "./review/request-review";
import { getInsets } from "./safe-area";
import { notifyStatusBarStyle } from "./status-bar";

export const appBridge = bridge({
  getUserAppVersion: async () => getUserAppVersion(),
  copyClipboard,
  downloadImage,
  uploadImage,
  openExternalUrl,
  openInAppUrl,
  openSetting,
  requestReview,
  getInsets: async () => getInsets(),
  notifyStatusBar: async (style: StatusBarStyle) => notifyStatusBarStyle(style),
});

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
});
