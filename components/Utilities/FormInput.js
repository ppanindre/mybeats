import { View, Text, TextInput } from "react-native";
import React from "react";

const FormInput = ({ placeholder, onChangeText, value }) => {
    return (
        <TextInput
            className="bg-white px-2 h-[40] rounded-lg shadow-lg font-[appfont]"
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export default FormInput;
