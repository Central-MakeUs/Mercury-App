import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert, Linking } from "react-native";

export const downloadImage = async (url: string) => {
  try {
    const imagePermission = await MediaLibrary.getPermissionsAsync();

    if (!imagePermission?.granted) {
      if (!imagePermission?.canAskAgain) {
        Alert.alert("알림", "이미지를 저장하려면 갤러리 접근 권한이 필요해요", [
          { text: "취소", style: "cancel" },
          {
            text: "설정 열기",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
        return { success: false, status: "permission_denied" };
      }
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        return { success: false, status: "permission_required" };
      }
    }

    const downloadResumable = await FileSystem.downloadAsync(
      url,
      `${FileSystem.cacheDirectory}image_${new Date().getTime()}.jpg`
    );
    if (downloadResumable.status === 200) {
      await MediaLibrary.saveToLibraryAsync(downloadResumable.uri);
      return { success: true, status: "success" };
    }
    return { success: false, status: "download_failed" };
  } catch (_e) {
    return { success: false, status: "download_failed" };
  }
};
