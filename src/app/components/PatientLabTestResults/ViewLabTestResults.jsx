import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../Containers/ScreenContainer";
import { theme } from "../../../../tailwind.config";
import { handleDelete } from "../../utils/doctorMedicineUtils";

const ViewLabTestResults = ({ route }) => {
  const { labTestResult } = route.params;
  const { title, labResultImages } = labTestResult;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Storage permission for android
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to download images.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // handling download image
  const handleDownloadImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Storage permission is required to download images."
      );
      return;
    }

    const imageUrl = labResultImages[currentImageIndex];
    const filename = imageUrl.split("/").pop();
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      // downloading the image
      const downloadRes = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadRes.statusCode === 200) {
        if (Platform.OS === "android") {
          const destPath = `${RNFS.PicturesDirectoryPath}/${filename}`;
          await RNFS.moveFile(downloadDest, destPath);
          Alert.alert("Download Success", "Image has been saved to your gallery.");
        } else if (Platform.OS === "ios") {
          try {
            await CameraRoll.save(downloadDest, { type: "photo" });
            Alert.alert(
              "Download Success",
              "Image has been saved to your Photos library."
            );
          } catch (error) {
            console.log("Save error", error);
            Alert.alert(
              "Download Error",
              "Failed to save image to the Photos library."
            );
          }
        }
      } else {
        Alert.alert("Error", "Failed to download image.");
      }
    } catch (error) {
      console.log("Download error", error);
      Alert.alert("Error", "An error occurred while downloading the image.");
    }
  };

  if (!labTestResult) return <Loader />;

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-8">
        {/* Title */}
        <View>
          <Text className="font-[appfont-semi] text-lg">Test Title</Text>
          <Text>{title}</Text>
        </View>


        {/* Images */}
        {labResultImages?.length > 0 && (
          <View>
            <Text className="font-[appfont-semi] text-lg">Images</Text>
            <View
              className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[475px] bg-darkSecondary"
              style={{ borderColor: theme.colors.primary }}
            >
              {isImageLoading && (
                <ActivityIndicator
                  size="medium"
                  color={theme.colors.primary}
                  style={{ position: "absolute" }}
                />
              )}
              <Image
                source={{ uri: labResultImages[currentImageIndex] }}
                className="w-full h-full"
                resizeMode="contain"
                onLoad={() => setIsImageLoading(false)}
                onError={(error) => {
                  setIsImageLoading(false);
                  console.error("Image failed to load:", error.nativeEvent.error);
                }}
              />
              <TouchableOpacity
                onPress={handleDownloadImage}
                className="absolute right-0 top-0"
              >
                <Ionicons name="download" size={35} color={theme.colors.primary} />
              </TouchableOpacity>

              {/* Image Navigation */}
              <TouchableOpacity
                onPress={() => {
                  setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
                  setIsImageLoading(true);
                }}
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name="chevron-back-circle"
                  size={40}
                  color={
                    currentImageIndex === 0
                      ? theme.colors.darkSecondary
                      : theme.colors.primary
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCurrentImageIndex((prev) =>
                    Math.min(prev + 1, labResultImages.length - 1)
                  );
                  setIsImageLoading(true);
                }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name="chevron-forward-circle"
                  size={40}
                  color={
                    currentImageIndex === labResultImages.length - 1
                      ? theme.colors.darkSecondary
                      : theme.colors.primary
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ViewLabTestResults;
