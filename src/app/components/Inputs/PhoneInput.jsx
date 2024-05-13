import { View, Text } from "react-native";
import PhoneNumberInput from "react-native-phone-number-input";
import React from "react";
import { theme } from "../../../../tailwind.config";

const PhoneInput = ({ value, onChangeText, error }) => {
    return (
        <View className="space-y-1">
            <PhoneNumberInput
                value={value}
                onChangeText={onChangeText}
                containerStyle={{
                    marginVertical: 4,
                    width: "100%",
                    height: 55,
                    backgroundColor: theme.colors.light,
                    borderWidth: error ? 2 : 1,
                    borderColor: error ? theme.colors.error : theme.colors.dark,
                    borderRadius: 4,
                }}
                textContainerStyle={{
                    backgroundColor: theme.colors.light,
                }}
            />

            {/* Error */}
            {error && <Text className="text-error">{error.message}</Text>}
        </View>
    );
};

export default PhoneInput;
