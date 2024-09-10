import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";

const LabCard = ({ lab, renderStars }) => {
    return (
        <View className="flex-row items-center justify-between p-5 space-x-5 bg-lightPrimary">
            <Image
                source={require("../../../../src/app/assets/doc1.webp")}
                className="w-20 h-20 rounded-full"
            />
            <View className="flex-1">
                <Text className="text-base font-[appfont-semi]">
                    {lab.name}
                </Text>
                <View className="flex-row items-center space-x-1">
                    {renderStars(lab.rating)}
                    <Text className="text-sm">
                        {lab.rating}
                    </Text>
                </View>
                <Text className="text-sm font-[appfont]">{` ${lab.labStoryCount} `}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    /*  */
                }}
                className="bg-light rounded-full p-3 shadow-lg"
            >
                <Ionicons
                    name="call-outline"
                    size={24}
                    style={{ color: theme.colors.dark }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default LabCard;