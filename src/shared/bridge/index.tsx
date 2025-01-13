import { createWebView, bridge } from "@webview-bridge/react-native";
import { getUserAppVersion } from "./app-version/get-user-app-version";
import { copyClipboard } from "./clipboard/copy-clipboard";
import { downloadImage } from "./images/download-image";
import { uploadImage } from "./images/upload-image";
import { openExternalUrl } from "./linking/open-external-url";
import { openInAppUrl } from "./linking/open-in-app-url";
import { openSetting } from "./open-setting/open-setting";
import { requestReview } from "./review/request-review";
import { notifySafeArea } from "./safe-area";

export const appBridge = bridge({
  getUserAppVersion: async () => getUserAppVersion(),
  copyClipboard,
  downloadImage,
  uploadImage,
  openExternalUrl,
  openInAppUrl,
  openSetting,
  requestReview,
  notifySafeArea,
});

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
});
