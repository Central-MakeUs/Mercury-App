import * as Notifications from "expo-notifications";

export const hasPushNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  return status === "granted";
};
