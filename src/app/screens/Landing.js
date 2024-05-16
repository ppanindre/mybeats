import { View, Text, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";

// Register push notifications
const registerForPushNotifications = async () => {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    // Send a message that user did not grant the permission for notifications
    Sentry.captureMessage("User did not grant permissions for notifications")
    return;
  }
  token = await Notifications.getExpoPushTokenAsync({
    projectId: "75a57d2e-e4e1-4fba-9a96-4467262579c6",
  });

  return token;
};

const Landing = () => {
  // define navigation hook
  const navigation = useNavigation();

  // define notification listener
  const notificationListener = useRef();

  // define response listener
  const responseListener = useRef();

  useEffect(() => {
    // get user from firebase auth
    const user = auth().currentUser;
    
    // if there is no user signed in, navigate the user to dashboard
    if (user !== null) {
      navigation.navigate("BottomTabNav");
    }
  });

  // Set up push notifications
  useEffect(() => {
    registerForPushNotifications();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification", notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  });

  return (
    <CustomSafeView sentry-label="landing-screen">
      <View className="items-center">
        <View
          className="p-10 justify-center"
          style={{ height: "100%", width: "95%" }}
        >
          {/* Header */}
          <View className="items-center justify-center">
            {/* Firebeats Logo */}
            <Image
              source={require("../assets/firebeats-icon.png")}
              style={{ height: 170, width: 230 }}
            />
            <Text className="mb-3 text-center mt-3">
              Our Artificial Intelligence algorithms track your health tracker
              to track your health
            </Text>
          </View>

          <View>
            {/* Login with otp */}
            <CustomButton
              sentry-label="landing-login-otp-btn"
              variant="primary"
              btnLabel="Login"
              onPress={() => navigation.navigate("loginOtp")}
            />
          </View>
        </View>
      </View>
    </CustomSafeView>
  );
};

export default Landing;
