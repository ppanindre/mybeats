import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { customTheme } from "../../constants/themeConstants";

const LabCard = ({ labName, labRating, labStoryCount }) => {
    return (
        <View className="flex-row items-center justify-between rounded-lg shadow-lg p-5"
        style={{ backgroundColor: customTheme.colors.lightPrimary }}>
            <Image
                source={require("../../src/app/assets/doc1.webp")}
                className="w-20 h-20 mr-3 rounded-full"
            />
            <View className="flex-1">
                <Text className="text-base font-[appfont-semi]">
                   {labName}
                </Text>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="star" color={customTheme.colors.primary} />
                    <Text className="text-xs font-[appfont]">{labRating} {labStoryCount}</Text>
                </View>
            </View>
        </View>
    );
};

export default LabCard;
