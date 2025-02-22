import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";

const SearchRecommendations = ({ recommendations, onSelect }) => {
  if (recommendations.length === 0) return null;

  return (
    <View className="px-4">
      <View className="rounded-lg shadow-lg space-y-3">
        {recommendations.map((recommendation) => (
          <View
            key={recommendation.doctorID}
            className="p-4 border-b border-darkSecondary"
          >
            <TouchableOpacity onPress={() => onSelect(recommendation)}>
              <View className="flex-row items-center space-x-3">
                <Ionicons
                  size={16}
                  name="search-outline"
                  color={theme.colors.dark}
                />
                <Text className="font-[appfont]">
                  {`${recommendation.firstname} ${recommendation.lastname}`}
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
