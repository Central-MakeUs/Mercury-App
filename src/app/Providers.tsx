import { ErrorBoundary, Suspense } from "@suspensive/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { type PropsWithChildren, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaContext } from "../shared/bridge/safe-area";

export const Providers = (props: PropsWithChildren) => {
  const { children } = props;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1000 * 60 * 60 * 24, staleTime: 1000 * 60 },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <FontProvider>
            <SafeAreaContext>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
              >
                {children}
              </KeyboardAvoidingView>
            </SafeAreaContext>
          </FontProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

const FontProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return children;
};
