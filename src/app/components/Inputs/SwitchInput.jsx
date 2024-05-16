import { View, Text, Switch } from "react-native";
import React from "react";
import { theme } from "../../../../tailwind.config";

const SwitchInput = ({ label, value, onValueChange }) => {
    return (
        <View className="flex-row justify-between items-center w-[100%]">
            <Text className="text-[appfont]">{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: theme.colors.dark,
                    true: theme.colors.primary,
                }}
            />
        </View>
    );
};

export default SwitchInput;
