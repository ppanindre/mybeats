import React from "react";
import AddDeviceButton from "./AddDeviceButton";
import { initialize, requestPermission } from "react-native-health-connect";
import * as Sentry from "@sentry/react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deviceQueries } from "../apis/deviceQueries";
import { Alert } from "react-native";

const HealthConnectButton = () => {
  const { user } = useSelector((state) => state.UserAuthReducer);
  const navigation = useNavigation();

  const addHealthConnect = async () => {
    try {
      const isInitialized = await initialize();
      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
        { accessType: "read", recordType: "HeartRate" },
        { accessType: "read", recordType: "SleepSession" },
        { accessType: "read", recordType: "TotalCaloriesBurned" },
      ]);

      // vendor data
      const vendorData = {
        vendor: "healthConnect",
      };

      if (grantedPermissions) {
        await deviceQueries.addVendorToFirebase(user, vendorData);
        Alert.alert("", "Your device has been added successfully!"); // alert user of device being added

        navigation.navigate("BottomTabNav");
      } else {
        console.log("did not grant permission");
      }
    } catch (error) {
      console.error("error", error);
      Sentry.captureException(error, {
        extra: {
          message: "Error while giving health connect permissions",
        },
      });
    }
  };

  return (
    <AddDeviceButton
      sentry-label="add-health-connect-btn"
      onPress={addHealthConnect}
      btnIcon="healthConnect"
      deviceName="Health Connect"
    />
  );
};

export default HealthConnectButton;
