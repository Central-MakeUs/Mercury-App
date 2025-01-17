import { Observable } from "@xionwcfm/utils";
import { type PropsWithChildren, useEffect } from "react";
import {
  type EdgeInsets,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type SafeAreaEdges = "bottom" | "left" | "right" | "top";

class SafeAreaObservable extends Observable<SafeAreaEdges[]> {
  edges: SafeAreaEdges[];
  insets: EdgeInsets;
  constructor(edges: SafeAreaEdges[], insets: EdgeInsets) {
    super();
    this.edges = edges;
    this.insets = insets;
  }
}

const safeAreaObservable = new SafeAreaObservable(["left", "right", "bottom"], {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
});

export const getInsets = () => {
  return safeAreaObservable.insets;
};

export const SafeAreaContext = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      {children}
      <NotifyInsets />
    </SafeAreaProvider>
  );
};

const NotifyInsets = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    safeAreaObservable.insets = insets;
  }, [insets]);

  return null;
};

export const notifySafeArea = async (edges: SafeAreaEdges[]) => {
  safeAreaObservable.notify(edges);
};
