import * as Notifications from "expo-notifications";

export const cancelTimerNotification = async (id: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    return { success: true } as const;
  } catch (_e) {
    return { success: false } as const;
  }
};
