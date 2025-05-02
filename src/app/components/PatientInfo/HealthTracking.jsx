import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import ScreenContainer from "../Containers/ScreenContainer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import ExerciseSVG from "../../../../assets/myHeathSVG/ExerciseSVG";
import HeartECG from "../../../../assets/myHeathSVG/HeartECG-SVG";
import HeartSVG from "../../../../assets/myHeathSVG/HeartSVG";
import StepsSVG from "../../../../assets/myHeathSVG/StepsSVG";
import SleepSVG from "../../../../assets/myHeathSVG/SleepSVG";
import DietSVG from "../../../../assets/myHeathSVG/DietSVG";

const CircularProgress = ({ progress, size = 90, strokeWidth = 8, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#E5E7EB"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke={color}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
};

const StatusPill = ({ label }) => {
  const bgColors = {
    Best: "#A3E635",     // Lime
    Good: "#8B5CF6",     // Violet
    Normal: "#FACC15",   // Yellow
    Poor: "#FC080880",     // Red
  };

  const isLightBg = label === "Best" || label === "Normal";

  return (
    <View
      style={{
        backgroundColor: bgColors[label] || "#D1D5DB",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 9999,
      }}
    >
      <Text
        style={{
          color: isLightBg ? "black" : "white",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const HealthTracking = ({ route }) => {
  const { patient, bmi } = route.params;
  const navigation = useNavigation();

  const navigateToCharts = (type) => {
    navigation.navigate("myBeatsCharts", { patientId: patient.id, type });
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
        <View className="flex-row items-center space-x-4">
          <Image
            source={
              patient.profileImage
                ? { uri: patient.profileImage }
                : require("../../assets/add-avatar.png")
            }
            className="w-12 h-12 rounded-xl"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-bold">
              {patient.firstname} {patient.lastname}
            </Text>
            <Text className="text-sm text-dark font-medium">
              BMI: {bmi} | Age: {patient.age ? `${patient.age} Years` : "N/A"}
            </Text>
          </View>
        </View>

        {/* Grid */}
        <View className="flex-row space-x-3">
          {/* LEFT COLUMN */}
          <View className="flex-1 space-y-3">
            <TouchableOpacity onPress={() => navigateToCharts("heart")}>
              <View className="bg-primary rounded-2xl h-60 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-md font-bold text-light">Heart</Text>
                  {/* <FontAwesome5 name="walking" size={24} color="white" /> */}
                  <StatusPill label="Best" />
                </View>
                <View className="items-center">
                  <HeartECG />
                </View>
                <Text className="text-md font-bold text-light">
                  Average: 75 BPM
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("steps")}>
              <View className="bg-primary rounded-2xl h-56 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">Steps</Text>
                  {/* <MaterialCommunityIcons
                    name="run"
                    size={24}
                    color="#3B82F6"
                  /> */}
                  <StatusPill label="Good" />
                </View>
                <View className="items-center">
                  <StepsSVG />
                </View>
                <Text className="text-md font-bold text-light">
                  6000 steps/ day
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("sleep")}>
              <View className="bg-primary rounded-2xl h-32 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">Sleep</Text>
                  {/* <MaterialCommunityIcons
                    name="bike-fast"
                    size={24}
                    color={theme.colors.dark}
                  /> */}
                    <StatusPill label="Poor" />
                </View>
                <View className="items-center">
                  <SleepSVG/>
                </View>
                <Text className="text-md font-bold text-light">
                  7 hr 10 mins/ day
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* RIGHT COLUMN */}
          <View className="flex-1 space-y-3">
            <TouchableOpacity onPress={() => navigateToCharts("hrv")}>
              <View className="bg-primary rounded-2xl h-32 justify-between p-3 space-y">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">HRV</Text>
                  {/* <MaterialCommunityIcons
                    name="weather-night"
                    size={24}
                    color={theme.colors.dark}
                  /> */}
                  <StatusPill label="Poor" />
                </View>
                <View className="space-y-3">
                  <View className="items-center">
                    <HeartSVG />
                  </View>
                  <Text className="text-md font-bold text-light">
                    Average: 42ms
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("activity")}>
              <View className="bg-primary rounded-2xl h-56 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">Activity</Text>
                  <StatusPill label="Good" />
                </View>
                <View className="items-center">
                  {/* <CircularProgress progress={7235 / 10000} size={100} color={theme.colors.light} /> */}
                  <ExerciseSVG />
                </View>
                <Text className="text-md font-bold text-light">
                  90 mins/ day
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("food")}>
              <View className="bg-primary rounded-2xl h-60 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">Diet</Text>
                  {/* <MaterialCommunityIcons
                    name="leaf"
                    size={24}
                    color="#10B981"
                  /> */}
                  <StatusPill label="Normal" />
                </View>
                <View className="items-center">
                  {/* <CircularProgress progress={0.5} size={100} color="#10B981" /> */}
                  <DietSVG />
                </View>
                <Text className="text-md font-bold text-light">
                  2100 Cal/day
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HealthTracking;
