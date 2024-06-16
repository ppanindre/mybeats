import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../constants/themeConstants";

const CollapsibleItem = ({ titleComponent, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="mt-2">
            <View className="flex-row items-center">
                <Text className="font-[appfont-semi]">{titleComponent}</Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    style={{ color: customTheme.colors.dark }}
                />
            </View>
            {isOpen && (
                <View className="mt-2">
                    {children}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CollapsibleItem;
