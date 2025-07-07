import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { useSelector } from "react-redux";
import CustomSafeView from "../../../components/CustomSafeView";

const YourScore = () => {
  const user = useSelector((state) => state.UserReducer);
  const navigation = useNavigation();

  // More varied zig-zag dummy data (points per day)
  const data = [3000, 4800, 4000, 6500, 5200, 7000, 6000];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const Gradient = () => (
    <Defs key={"gradient"}>
      <LinearGradient id={"orangeGradient"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
        <Stop offset={"0%"} stopColor={"#fb923c"} stopOpacity={0.8} />
        <Stop offset={"100%"} stopColor={"#fb923c"} stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );

  console.log("user data points", user["crowns"])

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="flex-row items-center space-x-2 border-b-2 p-5 border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Points Summary</Text>
      </View>

      <View className="p-5 space-y-5">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-xl">Total Points</Text>
          <Text className="text-primary font-bold text-xl">
            {user.totalPoints?.total || 0}
          </Text>
        </View>

        <View className="flex flex-col space-y-3">
          <Text className="font-bold text-xl">My Badges</Text>
          <View className="flex-row justify-between">
            {/* Badge 1 */}
            <View className="flex-1 flex-row items-center justify-between border-2  border-primary rounded-lg p-3 mr-2">
              <MaterialCommunityIcons name="medal" color="#FFD700" size={20} />
              <Text className="font-medium">Gold</Text>
              <Text className="font-bold text-orange-500">
                {user.totalMedalCollection?.gold || 0}
              </Text>
            </View>

            {/* Badge 2 */}
            <View className="flex-1 flex-row items-center justify-between border-2 border-primary rounded-lg p-3 mx-1">
              <MaterialCommunityIcons name="medal" color="#C0C0C0" size={20} />
              <Text className="font-medium">Silver</Text>
              <Text className="font-bold text-orange-500">
                {user.totalMedalCollection?.silver || 0}
              </Text>
            </View>

            {/* Badge 3 */}
            <View className="flex-1 flex-row items-center justify-between border-2 border-primary rounded-lg p-3 ml-2">
              <MaterialCommunityIcons name="medal" color="#CD7F32" size={20} />
              <Text className="font-medium">Bronze</Text>
              <Text className="font-bold text-orange-500">
                {user.totalMedalCollection?.bronze || 0}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col space-y-3">
          <Text className="font-bold text-xl">My Crowns</Text>
          <View className="flex-row justify-between">
            {/* Badge 1 */}
            <View className="flex-1 flex-row items-center justify-between border-2  border-primary rounded-lg p-3 mr-2">
              <MaterialCommunityIcons
                name="crown-circle"
                color="#FFD700"
                size={20}
              />
              <Text className="font-medium">Gold</Text>
              <Text className="font-bold text-orange-500">
                {user.crowns?.gold || 0}
              </Text>
            </View>

            {/* Badge 2 */}
            <View className="flex-1 flex-row items-center justify-between border-2 border-primary rounded-lg p-3 mx-1">
              <MaterialCommunityIcons
                name="crown-circle"
                color="#C0C0C0"
                size={20}
              />
              <Text className="font-medium">Silver</Text>
              <Text className="font-bold text-orange-500">
                {user.crowns?.silver || 0}
              </Text>
            </View>

            {/* Badge 3 */}
            <View className="flex-1 flex-row items-center justify-between border-2 border-primary rounded-lg p-3 ml-2">
              <MaterialCommunityIcons
                name="crown-circle"
                color="#CD7F32"
                size={20}
              />
              <Text className="font-medium">Bronze</Text>
              <Text className="font-bold text-orange-500">
                {user.crowns?.bronze || 0}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-xl">My Longest Sync Streak</Text>
          <Text className="text-primary font-bold text-xl">
            {user.longestStreakNew || 0}
          </Text>
        </View>
      </View>
    </CustomSafeView>
  );
};

export default YourScore;
