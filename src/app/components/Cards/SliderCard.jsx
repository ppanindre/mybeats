import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from "../../../../tailwind.config";

const SliderCard = ({ title, description, buttonText }) => {
    return (
        <View
            className="p-4 rounded-lg m-0.5 bg-lightPrimary space-y-5"
            style={{
                width: Dimensions.get("window").width * 0.9,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text className="text-lg font-[appfont-semi] text-center">
                {title}
            </Text>
            <Text className="text-sm font-[appfont]text-center">
                {description}
            </Text>
            <TouchableOpacity style={{backgroundColor: theme.colors.primary}} className="py-2 px-4 rounded-md">
                <Text style={{color: theme.colors.light}} className="text-sm font-[appfont-semi]">
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SliderCard;