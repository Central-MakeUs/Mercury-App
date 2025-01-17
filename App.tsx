import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import type WebView from "react-native-webview";
import { Providers } from "~/app/Providers";
import { WebView as MercuryWebView } from "~/shared/bridge";
import { RefreshProvider } from "~/shared/pull-to-refresh/RefreshProvider";

const BASE_URL = __DEV__ ? "http://localhost:5173" : "https://app.azito.kr";
const DECELERATION_RATE = 0.999;
const JAVASCRIPT_BEFORE_CONTENTLOADED = `window.__APP_DEV__="${
  __DEV__ ? "development" : "production"
}";`;

export default function App() {
  const webViewRef = useRef<WebView>(null);
  return (
    <Providers>
      <StatusBar style="auto" />
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
  );
}
