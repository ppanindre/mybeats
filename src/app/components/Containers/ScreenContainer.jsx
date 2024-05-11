import { View} from "react-native";
import React from "react";

const ScreenContainer = ({ children }) => {
    return <View className="relative p-5 h-full bg-white">{children}</View>;
};

export default ScreenContainer;
