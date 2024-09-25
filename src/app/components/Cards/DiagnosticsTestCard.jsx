import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { theme } from "../../../../tailwind.config";
import AppButton from "../Buttons/AppButton";

const DiagnosticsTestCard = ({ testName, testDescription, testPrice, buttonText }) => {
    return (
        <View style={{ backgroundColor: theme.colors.lightPrimary }} className="w-[100%] p-5 rounded-lg shadow-lg space-y-3">
            <View className="w-[100%] items-center justify-center">
                <Image
                    source={require("../../../../src/app/assets/doc1.webp")}
                    className="h-24 w-24 rounded-full"
                />
            </View>
            <View>
                <Text className="text-lg font-[appfont-semi] text-left">
                    {testName}
                </Text>
                <Text style={{ color: theme.colors.dark }} className="text-xs font-[appfont] text-left">
                    {testDescription}
                </Text>
            </View>
            <Text className="text-xl font-[appfont-semi] text-left">
                {testPrice}
            </Text>
             <View>
                    <AppButton
                        variant="primary"
                        btnLabel={buttonText}
                    />
                </View>
        </View>
    );
};

export default DiagnosticsTestCard;