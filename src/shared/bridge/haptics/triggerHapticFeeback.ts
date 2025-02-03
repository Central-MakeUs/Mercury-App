import * as Haptics from "expo-haptics";

export type HapticType =
  | "selection"
  | "notification-error"
  | "notification-warning"
  | "notification-success"
  | "impact-light"
  | "impact-medium"
  | "impact-heavy"
  | "impact-soft"
  | "impact-rigid";

export const triggerHapticFeedback = (type: HapticType) => {
  switch (type) {
    case "selection":
      Haptics.selectionAsync();
      break;
    case "notification-error":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case "notification-warning":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case "notification-success":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case "impact-light":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case "impact-medium":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case "impact-heavy":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case "impact-soft":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      break;
    case "impact-rigid":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      break;
    default:
      throw new Error(`Invalid haptic type: ${type}`);
  }
};
