import { ActivityIndicator, View } from "react-native";
import React from "react";
import { theme } from "../../../../tailwind.config";

const ScreenContainer = ({ children, isLoading = false }) => {
    return (
        <View className="relative pt-5 px-5 h-full bg-light space-y-5">
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color={theme.colors.primary} size={20} />
                </View>
            ) : (
                children
            )}
        </View>
    );
};

export default ScreenContainer;
