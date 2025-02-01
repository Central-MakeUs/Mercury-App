import { Observable } from "@xionwcfm/utils";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

type StatusBarStyle = "auto" | "inverted" | "light" | "dark";

class StatusBarObservable extends Observable<StatusBarStyle> {
  style: StatusBarStyle;
  constructor(style: StatusBarStyle) {
    super();
    this.style = style;
  }
}

const statusBarObservable = new StatusBarObservable("auto");

export const getStatusBarStyle = () => {
  return statusBarObservable.style;
};

export const notifyStatusBarStyle = (style: StatusBarStyle) => {
  statusBarObservable.notify(style);
};

export const MercuryStatusBar = () => {
  const [style, setStyle] = useState(() => getStatusBarStyle());

  useEffect(() => {
    statusBarObservable.subscribe(setStyle);
    return () => {
      statusBarObservable.unsubscribe(setStyle);
    };
  }, []);

  return <StatusBar style={style} />;
};
