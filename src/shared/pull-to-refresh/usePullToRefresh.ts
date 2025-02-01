import { type RefObject, useCallback, useState } from "react";
import type { WebView as NativeWebView } from "react-native-webview";

export const usePullToRefresh = (webViewRef: RefObject<NativeWebView>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webViewRef.current?.reload();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [webViewRef.current]);

  return [refreshing, onRefresh] as const;
};
