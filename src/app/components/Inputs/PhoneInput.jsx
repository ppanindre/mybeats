import PhoneNumberInput from "react-native-phone-number-input";
import React from "react";
import { theme } from "../../../../tailwind.config";

const PhoneInput = ({ value, onChangeText }) => {
    return (
        <PhoneNumberInput
            value={value}
            onChangeText={onChangeText}
            containerStyle={{
                marginVertical: 4,
                width: "100%",
                height: 55,
                backgroundColor: theme.colors.light,
                borderWidth: 1,
                borderColor: theme.colors.dark,
                borderRadius: 4,                
            }}
            textContainerStyle={{
                backgroundColor: theme.colors.light
            }}
        />
    );
};

export default PhoneInput;
