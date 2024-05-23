// components/PatientStory.js
import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../../constants/themeConstants";

const PatientStory = ({ story }) => {
    return (
        <View
            style={{ backgroundColor: customTheme.colors.light }}
            className="p-2 rounded-lg mb-4"
        >
            <View className="flex-row items-center">
                <Image
                    source={require("../../src/app/assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-4 flex-1">
                    <Text className="text-sm font-[appfont-semi]">
                        {story.name}
                    </Text>
                    <View className="flex-row items-center space-x-40">
                        <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-xs font-[appfont]"
                        >
                            {story.date}
                        </Text>
                        <View className="flex-row items-center -mt-8">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text
                                style={{ color: customTheme.colors.dark }}
                                className="text-xs ml-1"
                            >
                                {story.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text
                style={{ color: customTheme.colors.dark }}
                className="text-sm mt-2 font-[appfont]"
            >
                {story.comment}
            </Text>
        </View>
    );
};

export default PatientStory;
