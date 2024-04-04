import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { customTheme } from "../../constants/themeConstants";

const LabCard = ({ labName, labRating, labStoryCount }) => {
    return (
        <View className="flex-row items-center justify-between rounded-lg shadow-lg bg-white p-5">
            <Image
                source={require("../../assets/doc1.webp")}
                className="w-20 h-20 mr-4 rounded-full"
            />
            <View className="flex-1">
                <Text className="text-base font-[appfont-semi]">
                    Boca Biolteics LAB
                </Text>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="star" color={customTheme.colors.primary} />
                    <Text className="text-xs font-[appfont]">4.5 (500+ ratings)</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    /* logic to handle phone call */
                }}
                className="bg-green-500 rounded-full p-3 shadow-lg"
            >
                <Ionicons name="call-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default LabCard;
