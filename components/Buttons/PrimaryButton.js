import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { customTheme } from "../../constants/themeConstants";

const PrimaryButton = ({ btnLabel, onPress }) => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: customTheme.colors.primary }}
            className="rounded-lg shadow-lg h-[50] items-center justify-center"
            onPress={onPress}
        >
            {btnLabel}
        </TouchableOpacity>
    );
};

export default PrimaryButton;
