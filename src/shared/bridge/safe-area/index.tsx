import { Observable } from "@xionwcfm/utils";
import { type PropsWithChildren, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type SafeAreaEdges = "bottom" | "left" | "right" | "top";

class SafeAreaObservable extends Observable<SafeAreaEdges[]> {
  edges: SafeAreaEdges[];
  constructor(edges: SafeAreaEdges[]) {
    super();
    this.edges = edges;
  }
}

const safeAreaObservable = new SafeAreaObservable([
  "bottom",
  "left",
  "right",
  "top",
]);

export const SafeAreaContext = ({ children }: PropsWithChildren) => {
  const [safeAreaState, setSafeAreaState] = useState(() => {
    return safeAreaObservable.edges;
  });

  useEffect(() => {
    safeAreaObservable.subscribe(setSafeAreaState);
    return () => safeAreaObservable.unsubscribe(setSafeAreaState);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={safeAreaState}
        style={{ flex: 1, backgroundColor: "#fdfdfd" }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const notifySafeArea = async (edges: SafeAreaEdges[]) => {
  safeAreaObservable.notify(edges);
};
