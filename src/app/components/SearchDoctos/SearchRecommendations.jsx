// SearchRecommendations.js
import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import { useNavigation } from "@react-navigation/native";

const SearchRecommendations = ({ recommendations = [], onSelect }) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0)
    return null;

  const handlePress = (rec) => {
    if (typeof onSelect === "function")
      onSelect(rec); // or onSelect(rec.doctorID) if needed
    else console.warn("SearchRecommendations: onSelect not provided");
  };

  const navigation = useNavigation();

  return (
    <View className="px-4">
      <View className="rounded-lg shadow-lg space-y-3">
        {recommendations.map((rec) => (
          <View
            key={String(rec.doctorID)}
            className="p-4 border-b border-darkSecondary"
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("appointment", {
                  doctorId: rec.doctorID,
                })
              }
            >
              <View className="flex-row items-center space-x-3">
                <Ionicons
                  size={16}
                  name="search-outline"
                  color={theme.colors.dark}
                />
                <Text className="font-[appfont]">
                  {`${rec.firstname} ${rec.lastname}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchRecommendations;
