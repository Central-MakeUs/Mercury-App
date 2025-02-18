import {
  bridge,
  createWebView,
  postMessageSchema,
} from "@webview-bridge/react-native";
import type { StatusBarStyle } from "expo-status-bar";
import { cancelTimerNotification } from "../pushNotifications/cancelTimerNotification";
import { getPushToken } from "../pushNotifications/getPushToken";
import { hasPushNotificationPermission } from "../pushNotifications/hasPushNotificationPermission";
import { requestPushNotificationPermission } from "../pushNotifications/requestPushNotificationPermission";
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
  triggerHapticFeedback: async (type: HapticType) =>
    triggerHapticFeedback(type),
  scheduleTimerNotification,
  cancelTimerNotification,
  getPushToken,
  requestPushNotificationPermission,
  hasPushNotificationPermission,
});

const appPostMessageSchema = postMessageSchema({
  login: {
    validate: (data) =>
      data as {
        refresh_token: string;
        access_token: string;
        isNewUser: string;
        oauthType: string;
      },
  },
});

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
  postMessageSchema: appPostMessageSchema,
});
