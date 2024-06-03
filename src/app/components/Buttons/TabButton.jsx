import { Text, TouchableOpacity } from "react-native";
import React from "react";

const TabButton = ({ isActive, label, onPress, isLeftTab }) => {
    return (
        <TouchableOpacity
            className={`bg-light flex-1 p-5 items-center border border-primary shadow-lg ${
                isLeftTab ? "rounded-l-lg" : "rounded-r-lg"
            } ${isActive && "bg-primary"}`}
            onPress={onPress}
        >
            <Text
                className={`font-[appfont-semi] ${
                    isActive ? "text-light" : "text-primary"
                }`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TabButton;
