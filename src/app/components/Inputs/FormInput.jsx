import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../../../tailwind.config";

const FormInput = ({ value, label, secureTextEntry, onChangeText }) => {
    return (
        <TextInput
            value={value}
            label={label}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            mode="outlined"
            outlineColor={theme.colors.dark}
            theme={{
                colors: {
                    primary: theme.colors.primary
                }
            }}
            className="h-[55] bg-light"
        />
    );
};

export default FormInput;
