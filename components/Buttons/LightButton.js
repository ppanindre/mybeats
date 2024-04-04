import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { customTheme } from "../../constants/themeConstants";

const LightButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row h-[50] items-center justify-center rounded-lg bg-blue-200 shadow-lg space-x-2">
            {children}
        </TouchableOpacity>
    );
};

export default LightButton;
