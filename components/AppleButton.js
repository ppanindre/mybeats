import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import appleHealthKit from "react-native-health";

import AddDeviceButton from "./AddDeviceButton";
import { deviceQueries } from "../apis/deviceQueries";

// permissions to get health data from apple health
const permissions = {
  permissions: {
    read: [
      appleHealthKit.Constants.Permissions.HeartRate,
      appleHealthKit.Constants.Permissions.HeartbeatSeries,
      appleHealthKit.Constants.Permissions.HeartRateVariability,
      appleHealthKit.Constants.Permissions.StepCount,
      appleHealthKit.Constants.Permissions.Steps,
      appleHealthKit.Constants.Permissions.SleepAnalysis,
      appleHealthKit.Constants.Permissions.ActivitySummary,
      appleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
  },
};

const AppleButton = () => {
  // get user
  const { user } = useSelector((state) => state.UserAuthReducer);

  // define navigation instance
  const navigation = useNavigation();

  // sign in with apple
  const addAppleDevice = async () => {
    appleHealthKit.initHealthKit(permissions, async (error) => {
      if (error) {
        // if error while giving permissions
        Sentry.captureException(error, {
          extra: { message: "Error while giving apple permissions" },
        });
      }

      // vendor data
      const vendorData = {
        vendor: "apple"
      }

      await deviceQueries.addVendorToFirebase(user, vendorData) // add apple to firebase
      navigation.navigate("BottomTabNav"); // navigate to bottomtabnav
      Alert.alert("", "Your device has been added successfully!") // alert user of device being added
    });

  };

  return (
    <AddDeviceButton
      sentry-label="add-apple-btn"
      onPress={addAppleDevice}
      btnIcon="apple"
      deviceName="Apple Watch"
    />
  );
};

export default AppleButton;
