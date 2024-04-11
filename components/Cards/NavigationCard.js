import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { customTheme } from "../../constants/themeConstants";

const NavigationCard = ({ onPress, cardTitle, cardContent }) => {
    return (
        <TouchableOpacity
            className={`h-40 w-[100%] rounded-lg shadow-md justify-end p-4`}
            onPress={onPress}
            style={{backgroundColor: customTheme.colors.lightPrimary}}
        >
            <Text
                style={{ color: customTheme.colors.dark }}
                className="text-lg font-[appfont-semi]"
            >
                {cardTitle}
            </Text>
            <Text className="text-sm font-[appfont]">{cardContent}</Text>
        </TouchableOpacity>
    );
};

export default NavigationCard;
