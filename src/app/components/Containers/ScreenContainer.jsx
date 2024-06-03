import { View } from "react-native";
import React from "react";

const ScreenContainer = ({ children }) => {
    return (
        <View className="relative pt-5 px-5 h-full bg-background space-y-5">
            {children}
        </View>
    );
};

export default ScreenContainer;
