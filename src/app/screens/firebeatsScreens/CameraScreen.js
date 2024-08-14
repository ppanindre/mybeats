import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { CameraView } from "expo-camera";
import CustomButton from "../components/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { customTheme } from "../constants/themeConstants";
import CustomSafeView from "../components/CustomSafeView";
import { ActivityIndicator } from "react-native";
import { storeImageToS3 } from "../apis/awsQueries";

const validateNutritionData = (data) => {
  const regex =
      /total calories: (\d+(\.\d+)?), carbs: (\d+(\.\d+)?)g, protein: (\d+(\.\d+)?)g, fat: (\d+(\.\d+)?)g/;
  const match = data.match(regex);

  if (match) {
      return {
          totalCalories: parseInt(match[1], 10), // Converting totalCalories to an integer
          carbs: parseInt(match[3], 10), // Converting carbs to an integer
          protein: parseInt(match[5], 10), // Converting protein to an integer
          fat: parseInt(match[7], 10), // Converting fat to an integer
      };
  } else {
      throw new Error("Invalid nutrition data format");
  }
};

const CameraScreen = () => {
  const route = useRoute();
  const { plateSize } = route.params;

  const navigation = useNavigation();
  const cameraRef = useRef();

  const [loading, setLoading] = useState(false);
  const takePhoto = async () => {
      const url =
          "https://firebeats-food-model-b19df6cf5e48.herokuapp.com/detect";

      const driveUrl =
          "https://us-central1-firebeats-43aaf.cloudfunctions.net/uploadImage";

      if (cameraRef.current) {
          cameraRef.current.takePictureAsync({
              base64: false,
              onPictureSaved: async (picture) => {
                  try {
                      setLoading(true);

                      const file = {
                          uri: picture.uri,
                          type: "image/jpeg",
                          name: "image.jpg",
                      };

                      const formData = new FormData();
                      formData.append("image_file", file);
                      formData.append("plate_size", plateSize ?? "10");

                      const response = await axios.post(url, formData, {
                          headers: {
                              "Content-Type": "multipart/form-data",
                          },
                      });

                      // store the image data of food
                      await storeImageToS3(picture, response.data);

                      if (response.status === 200) {
                          console.log(
                              "response data message",
                              response.data.message
                          );
                          const validatedData = validateNutritionData(
                              response.data.message
                          );
                          navigation.navigate("food", {
                              autoFillFoodData: validatedData,
                          });
                      } else {
                          console.error(`Error: ${response.status}`);
                      }

                      setLoading(false);
                  } catch (error) {
                      showAlert();
                      setLoading(false);
                      console.error("Error:", error);
                  }
              },
          });
      }
  };

  const showAlert = () => {
      Alert.alert(
          "",
          "Unable to detect image",
          [
              {
                  text: "Try again",
                  onPress: () => {
                      // Handle the "Try again" action, e.g., prompt to click the image again
                      // Your logic to handle "Try again"
                      setLoading(false);
                  },
              },
              {
                  text: "Enter manually",
                  onPress: () => {
                      // Handle the "Enter manually" action, e.g., navigate to the manual entry screen
                      navigation.navigate("food", {
                          autoFillFoodData: null,
                      });
                      // Your logic to handle "Enter manually"
                  },
              },
          ],
          { cancelable: false } // Make the alert not dismissible by tapping outside
      );
  };

  if (loading)
      return (
          <CustomSafeView>
              <View className="h-[100%] bg-white w-[full] items-center justify-center space-y-3">
                  <Text>Analyzing the image with AI</Text>
                  <ActivityIndicator color={customTheme.colors.primary} />
              </View>
          </CustomSafeView>
      );

  return (
      <View className="flex-1 justify-center">
          <CameraView
              className="flex-1"
              ref={cameraRef}
              facing="back"
          ></CameraView>
          <View className="flex-1 p-10 justify-between">
              <View className="space-y-5">
                  <Text className="font-bold text-lg">Instructions</Text>
                  <Text className="text-lg ml-5">
                      1. Please try to fit the food plate in the space above
                  </Text>
                  <Text className="text-lg ml-5">
                      2. Click on the button below to capture the image.
                  </Text>
              </View>
              <View className="flex-row space-x-2">
                  <View className="flex-1">
                      <CustomButton
                          btnLabel="Back"
                          variant="light"
                          onPress={() => navigation.goBack()}
                      />
                  </View>
                  <View className="flex-1">
                      <CustomButton
                          btnLabel="Take photo"
                          variant="primary"
                          onPress={takePhoto}
                      />
                  </View>
              </View>
          </View>
      </View>
  );
};

export default CameraScreen;
