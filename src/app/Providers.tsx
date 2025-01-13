import { PropsWithChildren, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SafeAreaContext } from "../shared/bridge/safe-area";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";

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
          <SafeAreaContext>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={{ flex: 1 }}
            >
              {children}
            </KeyboardAvoidingView>
          </SafeAreaContext>
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
