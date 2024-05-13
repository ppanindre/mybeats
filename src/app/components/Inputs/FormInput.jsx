import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../../../tailwind.config";

const FormInput = ({ value, label, secureTextEntry, onChangeText, error }) => {
    return (
        <View className="space-y-1">
            <TextInput
                value={value}
                label={label}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                mode="outlined"
                outlineColor={theme.colors.dark}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        error: theme.colors.error,
                    },
                }}
                className="h-[55] bg-light"
                error={error}
            />

            {/* Error Message */}
            {error && <Text className="text-error">{error.message}</Text>}
        </View>
    );
};

export default FormInput;
