import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import CustomSafeView from "../components/CustomSafeView";
import { customTheme } from "../constants/themeConstants";
import CustomButton from "../components/CustomButton";
import RNRestart from "react-native-restart";

const NoNetwork = () => {

    return (
        <CustomSafeView>
            <View className="items-center justify-center h-[100%] px-4 space-y-3">
                <MaterialCommunityIcons
                    name="access-point-network-off"
                    size={50}
                    color={customTheme.colors.primary}
                />
                <Text
                    style={{ color: customTheme.colors.primary }}
                    className="text-lg"
                >
                    Please Check your internet connection
                </Text>
                <View>
                    <CustomButton
                        variant="primary"
                        btnLabel="Try Again"
                        onPress={() => RNRestart.restart()}
                    />
                </View>
            </View>
        </CustomSafeView>
    );
};

export default NoNetwork;
