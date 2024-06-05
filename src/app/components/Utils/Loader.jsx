import { View, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../../../../tailwind.config";

const Loader = () => {
    return (
        <View className="flex-1 bg-light items-center justify-center">
            <ActivityIndicator color={theme.colors.primary} />
        </View>
    );
};

export default Loader;
