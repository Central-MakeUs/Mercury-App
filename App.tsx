import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { useRef } from "react";
import type WebView from "react-native-webview";
import { Providers } from "~/app/Providers";
import { WebView as MercuryWebView, postMessage } from "~/shared/bridge";
import { MercuryStatusBar } from "~/shared/bridge/status-bar";
import { NotificationProvider } from "~/shared/pushNotifications/NotificationContext";

const BASE_URL = __DEV__
  ? "http://192.168.0.20:5173/"
  : "https://www.mercuryplanet.co.kr";

const DECELERATION_RATE = 0.999;
const JAVASCRIPT_BEFORE_CONTENTLOADED = `window.__APP_DEV__="${
  __DEV__ ? "development" : "production"
}";`;

export default function App() {
  const webViewRef = useRef<WebView>(null);

  const url = Linking.useURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    if (
      typeof queryParams?.access_token === "string" &&
      typeof queryParams?.refresh_token === "string" &&
      typeof queryParams?.isNewUser === "string" &&
      typeof queryParams?.oauthType === "string"
    ) {
      postMessage("login", {
        access_token: queryParams?.access_token,
        refresh_token: queryParams?.refresh_token,
        isNewUser: queryParams?.isNewUser,
        oauthType: queryParams?.oauthType,
      });
    }
  }

  return (
    <NotificationProvider>
      <Providers>
        <MercuryStatusBar />

        {/* <RefreshProvider webViewRef={webViewRef}> */}
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
        {/* </RefreshProvider> */}
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
