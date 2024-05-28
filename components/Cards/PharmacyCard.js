import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../../constants/themeConstants";

const PharmacyCard = ({ pharmacyLabel, pharmacyPrice, pharmacyRating }) => {
    return (
        <View className="rounded-lg shadow-md" 
        style={{backgroundColor:customTheme.colors.lightPrimary}}>
            {/* Image card */}
            <View
                style={{ backgroundColor: customTheme.colors.darkSecondary }}
                className="h-[100] w-[100%] rounded-t-lg"
            ></View>

            {/* Pharmacy Information */}
            <View className="p-4 space-y-1">
                <Text className="text-lg font-[appfont-bold]">
                    {pharmacyLabel}
                </Text>
                <Text
                    style={{ color: customTheme.colors.dark }}
                    className="font-[appfont-bold]"
                >
                    Medicine & Wellness
                </Text>

                {/* Ratings */}
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="star" color={customTheme.colors.primary} />
                    <Text
                        style={{ color: customTheme.colors.dark }}
                        className="font-[appfont] text-xs"
                    >
                        {pharmacyRating} (400+ ratings)
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PharmacyCard;
