import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import ScreenContainer from "../Containers/ScreenContainer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import ExerciseSVG from "../../../../assets/icons/ExerciseSVG";


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

const HealthTracking = ({ route }) => {
  const { patient, bmi } = route.params;
  const navigation = useNavigation();

  const navigateToCharts = (type) => {
    navigation.navigate("MyBeatsCharts", { patientId: patient.id, type });
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
            <TouchableOpacity onPress={() => navigateToCharts("walk")}>
              <View className="bg-primary rounded-2xl h-60 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-light">Walk</Text>
                  <FontAwesome5 name="walking" size={24} color="white" />
                </View>
                <View className="items-center">
                  <CircularProgress progress={7235 / 10000} size={100} color={theme.colors.light} />
                </View>
                <Text className="text-lg font-bold text-light">
                  7,235 <Text className="text-sm">Steps</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("exercise")}>
              <View className="bg-lightPrimary rounded-2xl h-56 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-dark">Exercise</Text>
                  <MaterialCommunityIcons name="run" size={24} color="#3B82F6" />
                </View>
                <View className="items-center">
                  <ExerciseSVG />
                </View>
                <Text className="text-lg font-bold text-dark">
                  3 <Text className="text-sm">Hours</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("food")}>
              <View className="bg-lightPrimary rounded-2xl h-32 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-dark">Food</Text>
                  <MaterialCommunityIcons name="bike-fast" size={24} color={theme.colors.dark} />
                </View>
                <Text className="text-lg font-bold text-dark">
                  35 <Text className="text-sm">Minutes</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* RIGHT COLUMN */}
          <View className="flex-1 space-y-3">
            <TouchableOpacity onPress={() => navigateToCharts("sleep")}>
              <View className="bg-lightPrimary rounded-2xl h-32 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-dark">Sleep</Text>
                  <MaterialCommunityIcons name="weather-night" size={24} color={theme.colors.dark} />
                </View>
                <Text className="text-lg font-bold text-dark">
                  7.40 <Text className="text-sm">Hours</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("heart")}>
              <View className="bg-lightPrimary rounded-2xl h-56 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-dark">Heart</Text>
                </View>
                <View className="items-center">
                  <MaterialCommunityIcons name="pulse" size={120} color="#EF4444" />
                </View>
                <Text className="text-lg font-bold text-dark">
                  73 <Text className="text-sm">bpm</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToCharts("calories")}>
              <View className="bg-lightPrimary rounded-2xl h-60 justify-between p-3 space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-bold text-dark">Calories</Text>
                  <MaterialCommunityIcons name="leaf" size={24} color="#10B981" />
                </View>
                <View className="items-center">
                  <CircularProgress progress={0.5} size={100} color="#10B981" />
                </View>
                <Text className="text-lg font-bold text-dark">
                  245 <Text className="text-sm">Kcal</Text>
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
