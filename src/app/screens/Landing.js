import { View, Text, Image, Linking } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";

const Landing = () => {
  // Define navigation hook
  const navigation = useNavigation();

  useEffect(() => {
    // Handle incoming deep links
    const handleUrl = ({ url }) => {
      const regex = /landing\/(\w+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        const doctorId = match[1];

        // Check if the user is authenticated
        const user = auth().currentUser;

        console.log("user")

        if (user) {
          // User is authenticated, navigate to appointment page with doctorId
          navigation.navigate("BottomTabNav", {
            screen: "MyHealth",
            params: {
              screen: "appointment", // The actual screen name inside MyHealth
              params: { doctorId }, // Pass doctorId to Appointment screen
            },
          });
        } else {
          // User is not authenticated, do nothing
          console.log("User is not logged in.");
        }
      }
    };

    // Add event listener for deep links
    const linkingListener = Linking.addEventListener("url", handleUrl);

    // Check if the app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl({ url });
      }
    });

    // Cleanup listener on unmount
    return () => {
      linkingListener.remove();
    };
  }, [navigation]);

  useEffect(() => {
    // get user from firebase auth
    try {
      const user = auth().currentUser;
      // if there is no user signed in, navigate the user to dashboard
      if (user !== null) {
        navigation.navigate("BottomTabNav");
      }
    } catch (error) {
      console.log("error while logging", error);
    }
  }, []);

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
              source={require("../assets/mybeats-icon.png")}
              style={{ height: 240, width: 260 }}
            />
            <Text className="mb-3 text-center mt-3 font-bold text-l text-[#4a4a4a]">
              Track your health with AI!
            </Text>
            <Text></Text>
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
