import * as Notifications from "expo-notifications";
import type React from "react";
import {type 
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // 함수 반환 타입을 유추하여 타입 지정
  const notificationListener =
    useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
  const responseListener =
    useRef<
      ReturnType<typeof Notifications.addNotificationResponseReceivedListener>
    >();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => typeof token === "string" && setExpoPushToken(token),
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((_response) => {
        // 알림 응답 처리 로직 추가
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
