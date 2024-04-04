import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { customTheme } from "../../constants/themeConstants";

const TextInputBoxWithIcon = ({ placeholder, icon, onFocus, onChangeText }) => {
    // STATES
    const [isFocused, setIsFocused] = useState(false); // is focused state

    const handleOnFocus = () => {
        // set focused to true whenever the user touches the input box
        setIsFocused(true);
        // Any extra functionality when input is in on focus
        onFocus && onFocus();
    }

    return (
        <View
            className="flex-row items-center p-2 rounded-lg flex-1 bg-white shadow-lg h-[100%]"
            style={{
                borderWidth: 0,
                // if input box is focused, change the color to blue
                borderColor: isFocused
                    ? customTheme.colors.primary
                    : customTheme.colors.darkSecondary,
            }}
        >
            {/* Left Icon */}
            {icon}

            {/* Input box */}
            <TextInput
                onChangeText={onChangeText}
                onFocus={handleOnFocus}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="flex-1 font-[appfont] mx-2"
            />
        </View>
    );
};

export default TextInputBoxWithIcon;
