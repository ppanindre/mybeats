import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import AppButton from "../Buttons/AppButton";

const DiagnosticsPromotionalCard = ({ title, description, buttonText }) => {
    return (
        <View
            className="bg-lightPrimary p-4 rounded-lg m-0.5 space-y-3"
            style={{
                width: Dimensions.get("window").width * 0.9,
                height: 200,
                alignItems: "left",
                justifyContent: "center",
            }}
        >
            <Text className="text-lg font-[appfont-semi] text-center">
                {title}
            </Text>
            <Text className="text-sm font-[appfont] text-left">
                {description}
            </Text>
            <View>
                <AppButton btnLabel={buttonText} variant="primary"
                />
            </View>
        </View>
    );
};

export default DiagnosticsPromotionalCard;