import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../../../tailwind.config";

const MultiLineInput = ({ label, value, onChangeText }) => {
    return (
        <TextInput
            multiline={true}
            label={label}
            value={value}
            onChangeText={onChangeText}
            mode="outlined"
            outlineColor={theme.colors.dark}
            theme={{
                colors: {
                    primary: theme.colors.primary
                }
            }}
            className="h-[150] bg-light"
        />
    );
};

export default MultiLineInput;
