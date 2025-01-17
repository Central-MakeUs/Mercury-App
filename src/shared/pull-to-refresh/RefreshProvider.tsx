import type { PropsWithChildren, RefObject } from "react";
import { RefreshControl, ScrollView } from "react-native";
import type WebView from "react-native-webview";
import { usePullToRefresh } from "./usePullToRefresh";

export const RefreshProvider = ({
  children,
  webViewRef,
}: PropsWithChildren<{ webViewRef: RefObject<WebView> }>) => {
  const [refreshing, onRefresh] = usePullToRefresh(webViewRef);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};
