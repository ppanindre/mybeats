import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import CustomSafeView from "../../../components/CustomSafeView";
import Onboarding from "../../../components/Onboarding";

const WelcomeScreens = () => {
  // define navigation
  const navigation = useNavigation();

  return (
    <CustomSafeView sentry-label="welcome">
      {/* Header */}
      <View className="p-5 border-b-2 borderdarkSecondary flex-row items-center justify-end">
        {/* Skip Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("addDevice")}
          sentry-label="welcome-screen-skip-btn"
        >
          <Text className="text-lg text-orange-400 font-bold">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View>

        {/* Header */}
        <View className="my-4">
          <Text className="text-center text-2xl font-bold">
            How does it work
          </Text>
        </View>

        {/* Caraousel */}
        <Onboarding />        
      </View>

    </CustomSafeView>
  );
};

export default WelcomeScreens;
