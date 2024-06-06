import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import * as Sentry from "@sentry/react-native";
import CryptoJS from 'react-native-crypto-js';

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";

import { DeviceActionCreators } from "../../../store/DeviceReducer/DeviceActionCreators";
import { deviceActionTypes } from "../../../store/DeviceReducer/DeviceActionTypes";
import { deviceQueries } from "../../../apis/deviceQueries";
import { userAuthActionTypes } from "../../../store/UserAuthReducer/UserAuthActionTypes";
import { userQueries } from "../../../apis/userQueries";
import { customTheme } from "../../../constants/themeConstants";

// route data
const profileData = [
  { label: "Edit Profile", route: "editProfile" },
  { label: "Add device", route: "addDevice" },
  { label: "Remove Device", route: "removeDevice" },
  { label: "Message Us", route: "chat" },
  { label: "Send Feedback", route: "feedback" },
  { label: "Delete Account", route: "deleteAccount" },
];

const Profile = () => {
  const { height } = useWindowDimensions(); // get window height

  // get device redux
  const { devicesData, deviceSelected } = useSelector(
    (state) => state.DeviceReducer
  );

  // get user listener instance
  const user = useSelector((state) => state.UserReducer);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // loading for delete

  // define navigation & dispatch
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DeviceActionCreators.fetchDevices()); // fetch devices
    auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("landing"); // if user logged out, navigate to landing
      }
    });
  }, []);

  // function to handle logout user
  const logoutUser = async () => {
    await userQueries.logoutUser(dispatch);
  };

  // function to delete account
  const deleteAccount = async () => {
    const email = user.email;
    setIsDeleteLoading(true); // show loading for delete

    // send delete otp
    await axios.get(
      "https://us-central1-firebeats-43aaf.cloudfunctions.net/sendDeleteUserMailFunction?email=" +
        email
    );

    setIsDeleteLoading(false); // stop showing loading
    navigation.navigate("deleteUser"); // navigate user to delete screen
  };

  // handle clicking any button from the profile screen
  const handleProfileButton = async (route) => {
    // route to delete account
    if (route === "deleteAccount") {
      Alert.alert(
        "",
        "Are you sure you want to delete your account?", // Alert Message
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              deleteAccount(); // delete function
            },
          },
        ],
        { cancelable: true } // This makes it possible to dismiss the alert by tapping outside it
      );
    } else if (route === "removeDevice") {
      if (devicesData.length === 0) {
        return; // if there is no devices data don't do anything
      } else {
        Alert.alert(
          "", // Alert Title
          "Are you sure you want to remove this device?", // Alert Message
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                removeDevice();
              },
            },
          ],
          { cancelable: true } // This makes it possible to dismiss the alert by tapping outside it
        );
      }
    } else if (route === "addDevice") {
      // go to add device screen
      dispatch({
        type: userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE,
        payload: { showSkip: false },
      });
      navigation.navigate(route); // navigate to add device route
    } else {
      navigation.navigate(route); // navigate to route
    }
  };

  // function to handle removal of device
  const removeDevice = async () => {
    try {
      const prevDeviceSelected = deviceSelected;
      const updatedDevicesData = devicesData.filter(
        (device) => device.deviceName !== deviceSelected
      ); // remove the device selected

      if (updatedDevicesData.length == 0) {
        await deviceQueries.removeDeviceFromFirebase(
          updatedDevicesData,
          prevDeviceSelected,
          user
        ); // remove device from firebase

        dispatch({
          type: deviceActionTypes.SET_DEVICES,
          payload: { updatedDevicesData, deviceSelected: null },
        }); // set device selected to be null if there are no devices

        Alert.alert("", "Your Device has been removed"); // alert the user that their device has been removed
      } else {
        const randomIndex = Math.floor(
          Math.random() * updatedDevicesData.length
        );
        updatedDevicesData[randomIndex].isSelected = true; // get the next selected device

        // remove the selected device from firebase
        await deviceQueries.removeDeviceFromFirebase(
          updatedDevicesData,
          prevDeviceSelected,
          user
        );

        // remove the selected device
        dispatch({
          type: deviceActionTypes.SET_DEVICES,
          payload: {
            updatedDevicesData,
            deviceSelected: updatedDevicesData[randomIndex].deviceName,
          },
        });

        // alert the user device has been removed
        Alert.alert("", "Your device has been removed");
      }
    } catch (error) {
      Alert.alert("", "Please terminate the app and try again");

      // capture the error through Sentry
      Sentry.captureException(error, {
        extra: {
          message: "Error while removing a device",
        },
      });
    }
  };

  // Go to the next device
  const goToNextDevice = () => {
    dispatch(DeviceActionCreators.selectNextDevice(devicesData));
  };

  //  Go to the previous device
  const goToPreviousDevice = () => {
    dispatch(DeviceActionCreators.selectPreviousDevice(devicesData));
  };

  // Go back when clicking the back button
  const goBack = async () => {
    await userQueries.setDeviceOnFirebase(deviceSelected, user.userId); // set selected device
    navigation.navigate("BottomTabNav");
  };

  // go to add device screen
  const addDevice = () => {
    dispatch({
      type: userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE,
      payload: { showSkip: false },
    }); // skip btn should not be present in add device screen
    navigation.navigate("addDevice");
  };

  return (
    <CustomSafeView sentry-label="profile">

      {/* if the delete is loading, show the activity indicator */}
      {isDeleteLoading && (
        <View
          style={{ height: height, width: "100%", opacity: 0.4 }}
          className="bg-dark absolute top-0 left-0 items-center justify-center z-20"
        >
          <ActivityIndicator color={customTheme.colors.primary} size="large" />
        </View>
      )}



      {/* Header */}
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
        <TouchableOpacity sentry-label="profile-back-btn" onPress={goBack}>
          <ChevronLeftIcon color={customTheme.colors.dark} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Profile</Text>
      </View>

      {/* Profile View */}
      <View className="flex-1" style={{ width: "100%" }}>
        <ScrollView className="relative" showsVerticalScrollIndicator={false}>
          <View className="px-10 py-5" style={{ width: "95%" }}>
            <View className="items-center mb-5">
              {/* If no devices are present display the plus icon */}
              {devicesData.length === 0 ? (
                // device icon
                <View style={{ height: 200, width: 200 }} className="relative">
                  <TouchableOpacity
                    sentry-label="add-device-btn"
                    onPress={addDevice}
                    className="bg-gray-100 rounded-full items-center justify-center"
                  >
                    {/* add device icon */}
                    <View>
                      <Image source={require("../assets/add-device.png")} />
                      <View
                        className="absolute z-30 bg-orange-400 rounded-md p-1"
                        style={{ top: 65, left: 55 }}
                      >
                        <Text className="text-white">Add Device</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                // if there is a device show it
                <View className="flex-row items-center gap-4">
                  {/* show the button to select the previous device */}
                  {devicesData?.length > 1 && (
                    <TouchableOpacity
                      sentry-label="profile-device-prev-btn"
                      onPress={goToPreviousDevice}
                    >
                      <ChevronLeftIcon
                        color={customTheme.colors.primary}
                        size={30}
                      />
                    </TouchableOpacity>
                  )}
                  <View
                    className="items-center justify-center border-4 border-orange-400 rounded-full"
                    style={{ height: 200, width: 200 }}
                  >
                    {/* map the user devices */}
                    {devicesData.map(
                      (deviceData, index) =>
                        deviceData.isSelected && (
                          <View key={index} className="items-center space-y-3">
                            {deviceData.deviceIcon}
                            <Text className="text-orange-400">
                              {deviceData.deviceDisplayName}
                            </Text>
                          </View>
                        )
                    )}
                  </View>

                  {/* show the button to select the next device */}
                  {devicesData?.length > 1 && (
                    <TouchableOpacity
                      sentry-label="profile-device-next-btn"
                      onPress={goToNextDevice}
                    >
                      <ChevronRightIcon
                        color={customTheme.colors.primary}
                        size={30}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {/* Profile Screens */}
            <View>
              <View className="mb-5">
                {profileData.map((data, index) => (
                  <TouchableOpacity
                    onPress={() => handleProfileButton(data.route)}
                    key={index}
                    sentry-label={`profile-${data.route}-btn`}
                  >
                    {data.label === "Remove Device" ? (
                      // if user has registered devices, show the remove device icon
                      devicesData.length > 0 && (
                        <View className="p-2 border-b-2 border-gray-200 mb-5">
                          <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-lg"
                          >
                            {data.label}
                          </Text>
                        </View>
                      )
                    ) : (
                      <View className="p-2 border-b-2 border-gray-200 mb-5">
                        <Text
                          style={{ color: customTheme.colors.dark }}
                          className="text-lg"
                        >
                          {data.label}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Logout Button */}
      <View className="px-10 mt-5">
        <CustomButton
          variant="primary"
          btnLabel="Logout"
          onPress={logoutUser}
        />
      </View>
    </CustomSafeView>
  );
};

export default Profile;
