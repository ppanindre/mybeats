// components/PatientStory.js
import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../tailwind.config";

const PatientStory = ({ story }) => {
    return (
        <View
            style={{ backgroundColor: theme.colors.light }}
            className="rounded-lg space-y-3"
        >
            <View className="flex-row items-center space-x-5">
                <Image
                    source={require("../../src/app/assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm font-[appfont-semi]">
                            {story.name}
                        </Text>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text
                                style={{ color: theme.colors.dark }}
                                className="text-xs"
                            >
                                {story.rating}
                            </Text>
                        </View>
                    </View>
                    <Text
                        className="text-xs font-[appfont] text-dark"
                    >
                        {story.date}
                    </Text>
                </View>
            </View>
            <Text
                className="text-sm font-[appfont] text-dark"
            >
                {story.comment}
            </Text>
        </View>
    );
};

export default PatientStory;