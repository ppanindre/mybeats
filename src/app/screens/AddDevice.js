import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

import CustomSafeView from "../../../components/CustomSafeView";
import FitbitButton from "../../../components/FitbitButton";
import AppleButton from "../../../components/AppleButton";
import AddDeviceButton from "../../../components/AddDeviceButton";
import { customTheme } from "../../../constants/themeConstants";

const AddDevice = () => {
  // if new user, show skip button
  const { showSkipDevice } = useSelector((state) => state.UserAuthReducer);

  // define navigation instance
  const navigation = useNavigation();

  return (
    <CustomSafeView sentry-label="add-device">
      {/* Header */}
      {/* If new user, back button should not be present */}
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
        {/* Header */}
        <View
          className="flex-row items-center justify-between"
          style={{ width: "100%" }}
        >
          <View className="flex-row items-center gap-2">
            {!showSkipDevice && (
              <TouchableOpacity
                sentry-label="add-device-back-btn"
                onPress={() => navigation.navigate("profile")}
              >
                {/* chevron lefticon */}
                <ChevronLeftIcon color={customTheme.colors.dark} />
              </TouchableOpacity>
            )}
            <Text className="text-2xl font-bold">Add Device</Text>
          </View>

          {/* if new user, show skip btn */}
          {showSkipDevice && (
            <TouchableOpacity
              sentry-label="add-device-skip-btn"
              onPress={() => navigation.navigate("BottomTabNav")}
            >
              <Text className="font-bold mr-3 text-lg text-orange-400">
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="p-5 space-y-5" style={{ height: "80%" }}>
        {/* Device buttons */}
        <View className="flex-row">
          {/* Gfit button */}
          <View className="flex-1">
            <AddDeviceButton
              sentry-label="gfit-btn"
              btnIcon="gfit"
              deviceName="Google Fit"
              onPress={() => navigation.navigate("signInWithGfit")}
            />
          </View>

          {/* Garmin button */}
          <View className="flex-1">
            <AddDeviceButton
              sentry-label="garmin-btn"
              btnIcon="garmin"
              deviceName="Garmin"
              onPress={() => navigation.navigate("signInWithGarmin")}
            />
          </View>
        </View>
        <View className="flex-row">
          {/* Fitbit button */}
          <View className="flex-1">
            <FitbitButton sentry-label="fitbit-btn" />
          </View>

          {/* If platform is android, do not show apple button */}
          <View className="flex-1">
            {Platform.OS !== "android" && (
              <AppleButton sentry-label="apple-btn" />
            )}
          </View>
        </View>
      </View>
    </CustomSafeView>
  );
};

export default AddDevice;
