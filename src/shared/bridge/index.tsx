import { bridge, createWebView } from "@webview-bridge/react-native";
import type { StatusBarStyle } from "expo-status-bar";
import { cancelTimerNotification } from "../pushNotifications/cancelTimerNotification";
import { scheduleTimerNotification } from "../pushNotifications/scheduleTimerNotification";
import { getUserAppVersion } from "./app-version/get-user-app-version";
import { copyClipboard } from "./clipboard/copy-clipboard";
import {
  type HapticType,
  triggerHapticFeedback,
} from "./haptics/triggerHapticFeeback";
import { openExternalUrl } from "./linking/open-external-url";
import { openInAppUrl } from "./linking/open-in-app-url";
import { openSetting } from "./open-setting/open-setting";
import { requestReview } from "./review/request-review";
import { getInsets } from "./safe-area";
import { notifyStatusBarStyle } from "./status-bar";

export const appBridge = bridge({
  getUserAppVersion: async () => getUserAppVersion(),
  copyClipboard,
  openExternalUrl,
  openInAppUrl,
  openSetting,
  requestReview,
  getInsets: async () => getInsets(),
  notifyStatusBar: async (style: StatusBarStyle) => notifyStatusBarStyle(style),
  getPushToken: async () => {},
  triggerHapticFeedback: async (type: HapticType) =>
    triggerHapticFeedback(type),
  scheduleTimerNotification,
  cancelTimerNotification,
});

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
});
