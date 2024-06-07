import { View } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../Buttons/AppButton";
import AvailabilityTimeButton from "./AvailabilityTimeButton";
import { useDispatch, useSelector } from "react-redux";
import { availabilityExistsActionCreator } from "../../../../store/actions/availabilityActions";

const AvailabilityTimePicker = ({ onSave, selectedDate, showTimePicker }) => {
    const { availabilityExists } = useSelector(
        (state) => state.availabilityExistsReducer
    );

    const getDefaultTime = (timeLabel) => {
        const date = new Date(selectedDate);
        if (timeLabel === "start") {
            date.setHours(9, 0, 0, 0);
        } else {
            date.setHours(10, 0, 0, 0);
        }
        return date;
    };

    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(
            availabilityExistsActionCreator(startTime, endTime, selectedDate)
        );
    }, [startTime, endTime]);

    return (
        <View className="space-y-5">
            {showTimePicker && (
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
            )}

            {showTimePicker && (
                <View>
                    <DateTimePicker
                        onChange={handleTimeChange}
                        value={selectedTime === "start" ? startTime : endTime}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                    />
                </View>
            )}

            <View>
                <AppButton
                    variant={`${availabilityExists || !showTimePicker ? "primary" : "disabled"}`}
                    btnLabel="Save"
                    onPress={() => onSave(startTime, endTime)}
                />
            </View>
        </View>
    );
};

export default AvailabilityTimePicker;
