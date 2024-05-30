import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../../../tailwind.config";

const FormInput = ({ value, label, secureTextEntry, onChangeText, error, editable = true }) => {
    return (
        <View className="space-y-1">
            <TextInput
                value={value}
                label={label}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                mode="outlined"
                outlineColor={editable ? theme.colors.dark : theme.colors.darkSecondary}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        error: theme.colors.error,
                    },
                }}
                textColor={!editable && theme.colors.dark}
                className={`h-[55] ${editable ? 'bg-light' : 'bg-light'}`}
                error={error}
                editable={editable}
            />
            {/* Error Message */}
            {error && <Text className="text-error">{error.message}</Text>}
        </View>
    );
};

export default FormInput;
