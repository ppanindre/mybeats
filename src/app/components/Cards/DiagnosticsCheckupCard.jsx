import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { theme } from "../../../../tailwind.config";
import AppButton from "../Buttons/AppButton";

const DiagnosticsCheckupCard = ({ testName, testDescription, testPrice, buttonText, originalPrice }) => {
    return (
        <View className="bg-lightPrimary rounded-lg shadow-md w-[300]">
            <View className="rounded-t-lg shadow-lg">
                <Image
                    source={require("../../../../src/app/assets/checkup.jpg")}
                    className="h-[200] w-[100%] rounded-t-lg shadow-lg"
                />
                <View className="absolute top-3 left-3 bg-light px-2 rounded-md">
                    <Text
                        style={{ color: theme.colors.primary }}
                        className="font-[appfont-bold]"
                    >
                        25% OFF
                    </Text>
                </View>
            </View>

            {/* Checkup card content */}
            <View className="p-5 space-y-5">
                <View>
                    <Text className="text-lg font-[appfont-semi] text-left">
                        {testName}
                    </Text>
                    <Text style={{ color: theme.colors.dark }} className="text-xs font-[appfont] text-left">
                        {testDescription}
                    </Text>
                </View>
                <View className="flex-row items-center space-x-2">
                    <Text className="text-xl font-[appfont-semi] text-left">
                        {testPrice}
                    </Text>
                    <Text style={{ color: theme.colors.dark }} className="text-md line-through">
                        {originalPrice}
                    </Text>
                </View>
                <View>
                    <AppButton
                        variant="primary"
                        btnLabel={buttonText}
                    />
                </View>
            </View>
        </View>
    );
};

export default DiagnosticsCheckupCard;