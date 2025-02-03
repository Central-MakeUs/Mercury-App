import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

export interface ScheduleTimerNotificationProps {
  seconds: number;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export const scheduleTimerNotification = async (
  props: ScheduleTimerNotificationProps
) => {
  const { seconds, title, body, data } = props;
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
    return { success: true, id } as const;
  } catch (_error) {
    return { success: false, id: null } as const;
  }
};
