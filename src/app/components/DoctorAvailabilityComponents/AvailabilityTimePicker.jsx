import { View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../Buttons/AppButton";
import AvailabilityTimeButton from "./AvailabilityTimeButton";

const AvailabilityTimePicker = ({ onSave, selectedDate }) => {

    const getDefaultTime = (timeLabel) => {
        const date = new Date(selectedDate);
        if (timeLabel === "start") {
            date.setHours(9, 0, 0, 0);
        } else {
            date.setHours(10, 0, 0, 0);
        }
        return date;
    };

    const [startTime, setStartTime] = useState(getDefaultTime("start"));
    const [endTime, setEndTime] = useState(getDefaultTime("end"));
    const [selectedTime, setSelectedTime] = useState("start");

    const handleTimeChange = (_, time) => {
        if (selectedTime === "start") {
            setStartTime(time);
        } else {
            setEndTime(time);
        }
    };

    return (
        <View className="space-y-5">
            <View className="flex-row justify-between items-center">
                <AvailabilityTimeButton
                    id="start"
                    label="Start Time"
                    value={startTime}
                    handlePress={(timeSelected) =>
                        setSelectedTime(timeSelected)
                    }
                    isSelected={selectedTime === "start"}
                />
                <AvailabilityTimeButton
                    id="end"
                    label="End Time"
                    value={endTime}
                    handlePress={(timeSelected) =>
                        setSelectedTime(timeSelected)
                    }
                    isSelected={selectedTime === "end"}
                />
            </View>

            <View>
                <DateTimePicker
                    onChange={handleTimeChange}
                    value={selectedTime === "start" ? startTime : endTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                />
            </View>

            <View>
                <AppButton
                    variant="primary"
                    btnLabel="Save"
                    onPress={() => onSave(startTime, endTime)}
                />
            </View>
        </View>
    );
};

export default AvailabilityTimePicker;
