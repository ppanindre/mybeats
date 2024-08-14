import { View, Text, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";

const Landing = () => {
  // define navigation hook
  const navigation = useNavigation();

  useEffect(() => {
      // get user from firebase auth
      try {
          const user = auth().currentUser;
          // if there is no user signed in, navigate the user to dashboard
          if (user !== null) {
              navigation.navigate("BottomTabNav");
          }
      } catch (error) {
          console.log("error while logging", error)
      }
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
