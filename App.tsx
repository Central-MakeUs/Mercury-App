import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { BackHandler, } from "react-native";
import type WebView from "react-native-webview";
import { Providers } from "~/app/Providers";
import { WebView as MercuryWebView } from "~/shared/bridge";
import { MercuryStatusBar } from "~/shared/bridge/status-bar";
import { NotificationProvider } from "~/shared/pushNotifications/NotificationContext";

const BASE_URL = __DEV__
  ? "http://119.196.213.25:5173"
  : "https://www.mercuryplanet.co.kr";

const DECELERATION_RATE = 0.999;
const JAVASCRIPT_BEFORE_CONTENTLOADED = `window.__APP_DEV__="${
  __DEV__ ? "development" : "production"
}";`;

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [canGoBack, webViewRef]);

  // 웹뷰 네비게이션 상태 변경 시 canGoBack 업데이트
  const onNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
  };

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
          onNavigationStateChange={onNavigationStateChange}
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
