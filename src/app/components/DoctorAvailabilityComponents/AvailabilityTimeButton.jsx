import { Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";

const AvailabilityTimeButton = ({
    id,
    label,
    value,
    isSelected,
    handlePress,
}) => {
    return (
        <TouchableOpacity
            className="items-center"
            onPress={() => handlePress(id)}
        >
            <Text
                className={`text-lg font-[appfont-bold] ${
                    isSelected && "text-primary"
                }`}
            >
                {label}
            </Text>
            <Text
                className={`text-xl font-[appfont-bold] ${
                    isSelected && "text-primary"
                }`}
            >
                {moment(value).format("h:mm a")}
            </Text>
        </TouchableOpacity>
    );
};

export default AvailabilityTimeButton;
