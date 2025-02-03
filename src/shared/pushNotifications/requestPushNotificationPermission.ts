import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

export async function requestPushNotificationPermission() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    Alert.alert(
      "물리적 기기가 필요합니다",
      "푸시 알림은 실제 기기에서만 테스트할 수 있습니다. 실제 기기에서 실행해주세요!"
    );
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "푸시 알림 권한이 필요합니다",
      "앱에서 알림을 받아보시려면 권한이 필요합니다. 설정에서 권한을 허용해주세요"
    );
  } else {
  }
}
