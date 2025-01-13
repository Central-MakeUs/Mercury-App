import { StatusBar } from "expo-status-bar";
import { WebView } from "~/shared/bridge";
import { Providers } from "~/app/Providers";

const BASE_URL = __DEV__ ? "http://localhost:5173" : "https://app.azito.kr";
const DECELERATION_RATE = 0.999;
const JAVASCRIPT_BEFORE_CONTENTLOADED = `window.__APP_DEV__="${
  __DEV__ ? "development" : "production"
}";`;

export default function App() {
  return (
    <Providers>
      <StatusBar style="auto" />
      <WebView
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
        injectedJavaScriptBeforeContentLoaded={JAVASCRIPT_BEFORE_CONTENTLOADED}
      />
    </Providers>
  );
}
