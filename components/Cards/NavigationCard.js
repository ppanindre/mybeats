import { Text, TouchableOpacity } from "react-native";
import React from "react";

const NavigationCard = ({ onPress, cardTitle, cardContent }) => {
    return (
        <TouchableOpacity
            className="bg-lightPrimary h-40 w-[100%] rounded-lg shadow-md justify-end p-5"
            onPress={onPress}

        >
            <Text
                className="text-lg font-[appfont-semi] text-dark"
            >
                {cardTitle}
            </Text>
            <Text className="text-sm font-[appfont] text-dark">{cardContent}</Text>
        </TouchableOpacity>
    );
};

export default NavigationCard;
