import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
export const uploadImage = async () => {
  const { granted, canAskAgain } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert("알림", "이미지 업로드 권한을 허용해주세요.", [
        { text: "취소", style: "cancel" },
        {
          text: "설정 열기",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
      return { success: false, status: "permission_denied", value: [] };
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return { success: false, status: "permission_required", value: [] };
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
    aspect: [1, 1],
    base64: true,
  });

  if (result.canceled) {
    return { success: false, status: "canceled", value: [] };
  }

  return {
    success: true,
    status: "success",
    value: result.assets,
  };
};
