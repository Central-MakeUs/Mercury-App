import * as Notifications from "expo-notifications";
import { useRef } from "react";
import type WebView from "react-native-webview";
import { Providers } from "~/app/Providers";
import { WebView as MercuryWebView } from "~/shared/bridge";
import { MercuryStatusBar } from "~/shared/bridge/status-bar";
import { RefreshProvider } from "~/shared/pull-to-refresh/RefreshProvider";
import { NotificationProvider } from "~/shared/pushNotifications/NotificationContext";

const BASE_URL = __DEV__
  ? "https://www.mercuryplanet.co.kr"
  : "https://www.mercuryplanet.co.kr";

const DECELERATION_RATE = 0.999;
const JAVASCRIPT_BEFORE_CONTENTLOADED = `window.__APP_DEV__="${
  __DEV__ ? "development" : "production"
}";`;

export default function App() {
  const webViewRef = useRef<WebView>(null);
  return (
    <NotificationProvider>
      <Providers>
        <MercuryStatusBar />
        <RefreshProvider webViewRef={webViewRef}>
          <MercuryWebView
            ref={webViewRef}
            source={{ uri: BASE_URL }}
            style={{ flex: 1 }}
            mixedContentMode={"always"}
            webviewDebuggingEnabled={__DEV__}
            javaScriptEnabled={true}
            bounces={true}
            allowsBackForwardNavigationGestures={true}
            decelerationRate={DECELERATION_RATE}
            overScrollMode={"never"}
            scrollEnabled={true}
            injectedJavaScriptBeforeContentLoaded={
              JAVASCRIPT_BEFORE_CONTENTLOADED
            }
          />
        </RefreshProvider>
      </Providers>
    </NotificationProvider>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
