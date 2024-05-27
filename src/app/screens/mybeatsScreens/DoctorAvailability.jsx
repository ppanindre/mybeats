import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createAppointmentSlot } from "../../../graphql/mutations";
import { theme } from "../../../../tailwind.config";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import ModalContainer from "../../components/Containers/ModalContainer";
import AppButton from "../../components/Buttons/AppButton";
import SwitchInput from "../../components/Inputs/SwitchInput";
import CalendarInput from "../../components/Inputs/CalendarInput";
import { generateClient } from "aws-amplify/api";

const DoctorAvailability = () => {
    const client = generateClient();

    // STATES
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [markedDates, setMarkedDates] = useState({});
    const [isUnavailable, setIsUnavailable] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimeStart, setIsTimeStart] = useState(true); // true for start time, false for end time
    const [timeSlots, setTimeSlots] = useState({});
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [applyScheduleToAllDays, setApplyScheduleToAllDays] = useState(false);

    //  Check if any time slots apply to all days of the week
    const allDaysScheduled = Object.values(timeSlots)
        .flat()
        .some((slot) => slot.allDays && slot.dayLabel.includes(dayOfWeek));

    // Function to handle adding a new time slot
    const addNewTimeSlot = (date) => {
        // Set the selectedDate to the date for which the new slot is being added
        setSelectedDate(date);
        const newStartTime = new Date(selectedDate);
        newStartTime.setHours(newStartTime.getHours() + 1, 0, 0, 0);
        const newEndTime = new Date(newStartTime);
        newEndTime.setHours(newEndTime.getHours() + 1, 0, 0, 0);

        // state to show the modal inputs
        setStartTime(newStartTime);
        setEndTime(newEndTime);

        // Indicate which slot is being edited/added
        setIsTimeStart(true);

        // Show the modal for the user to confirm or adjust the times
        setShowTimePicker(true);
    };

    // Function to handle date selection from calendar
    const handleDatePress = (day) => {
        const date = new Date(day.dateString);
        const dayName = moment(day.dateString, "YYYY-MM-DD").format("dddd"); // Get the day name

        setDayOfWeek(dayName);
        // Update the markedDates state to only have the currently selected date marked
        const newMarkedDates = {
            [day.dateString]: {
                selected: true,
                selectedColor: theme.colors.primary,
                selectedTextColor: theme.colors.light,
            },
        };

        setShowModal(true);
        setMarkedDates(newMarkedDates);
        setSelectedDate(day.dateString);
        setIsUnavailable(false); // reset availability switch
        setEndTime(new Date(date.setHours(17, 0, 0, 0))); // default end time
        setStartTime(new Date(date.setHours(9, 0, 0, 0))); // default start time
        setShowTimePicker(true);
    };

    // to save updated time slots
    const handleSaveTime = async () => {
        let updatedTimeSlots = { ...timeSlots };
        const selectedDay = new Date(selectedDate);
        const dayIndex = selectedDay.getDay();
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        const dayLabel = days[dayIndex] + "s"; // This will give  "Sundays", "Mondays", etc.

        if (isUnavailable) {
            if (applyScheduleToAllDays) {
                // Create unavailable slots for all days of the week if they don't exist
                for (let i = 0; i < 6; i++) {
                    // Loop through the next six days to find all matching weekdays
                    const newDate = new Date(selectedDay);
                    newDate.setDate(newDate.getDate() + i);
                    if (newDate.getDay() === dayIndex) {
                        const dateString = newDate.toISOString().split("T")[0];
                        updatedTimeSlots[dateString] = [
                            {
                                unavailable: true,
                                allDays: true,
                                dayLabel: dayLabel,
                            },
                        ];
                    }
                }
            } else {
                // Apply 'unavailable' only to the selected date
                updatedTimeSlots[selectedDate] = [
                    { unavailable: true, dayLabel: dayLabel },
                ];
            }
        } else {
            if (applyScheduleToAllDays) {
                // Create time slots for all days of the week if they don't exist
                for (let i = 0; i < 6; i++) {
                    // Loop through the next six days to find all matching weekdays
                    const newDate = new Date(selectedDay);
                    newDate.setDate(newDate.getDate() + i);
                    if (newDate.getDay() === dayIndex) {
                        const dateString = newDate.toISOString().split("T")[0];
                        updatedTimeSlots[dateString] = [
                            {
                                start: startTime,
                                end: endTime,
                                allDays: true,
                                dayLabel: dayLabel,
                            },
                        ];
                    }
                }
            } else {
                // Apply only to the selected date
                updatedTimeSlots[selectedDate] = [
                    ...(updatedTimeSlots[selectedDate] || []),
                    { start: startTime, end: endTime, dayLabel: dayLabel },
                ];
            }
        }

        setTimeSlots(updatedTimeSlots);
        setShowTimePicker(false);

        // CLose modal
        setShowModal(false);

        setApplyScheduleToAllDays(false); // Reset after saving
        setIsUnavailable(false); // Also reset the unavailability toggle

        // console.log("time slots", selectedDate, startTime, endTime);

        // Create an appointment
        try {
            const response = await client.graphql({
                query: createAppointmentSlot,
                variables: {
                    input: {
                        doctorID: "4", // change the doctor id
                        patientId: "1",
                        startTime: startTime,
                        endTime: endTime,
                        isBooked: false,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while creating appointment", error);
        }
    };

    // Function to remove a specific time slot
    const handleRemoveTimeSlot = (date, index) => {
        const newTimeSlots = { ...timeSlots };
        newTimeSlots[date].splice(index, 1);
        if (newTimeSlots[date].length === 0) {
            delete newTimeSlots[date];
        }
        setTimeSlots(newTimeSlots);
    };

    // Function to handle time changes from picker
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === "ios");
        if (selectedTime) {
            if (isTimeStart) {
                setStartTime(selectedTime);
            } else {
                setEndTime(selectedTime);
            }
        }
    };

    /**
     * function to close the modal container
     * @param {void}
     * @returns {void}
     */
    const handleOnClose = () => {
        setShowModal(false);
    };

    return (
        <ScreenContainer>
            {/* Calendar */}
            {/* Modal for time selection */}
            <ModalContainer onClose={handleOnClose} visible={showModal}>
                {/* Conditionally render the unavailable switch only for date overrides */}
                <View className="flex-row justify-between items-center">
                    <SwitchInput
                        label="Mark me as unavailable this day"
                        value={isUnavailable}
                        onValueChange={setIsUnavailable}
                    />
                </View>

                <View>
                    <SwitchInput
                        label={`${
                            allDaysScheduled
                                ? `All ${dayOfWeek}s schedule have been updated`
                                : `Use this schedule for all ${dayOfWeek}s`
                        }`}
                        value={applyScheduleToAllDays}
                        onValueChange={setApplyScheduleToAllDays}
                    />
                </View>

                {!isUnavailable && (
                    <>
                        <View className="flex-row justify-between items-center">
                            <TouchableOpacity
                                onPress={() => setIsTimeStart(true)}
                                className="items-center"
                            >
                                <Text
                                    className={`text-lg font-[appfont-semi] ${
                                        isTimeStart && "text-primary"
                                    }`}
                                >
                                    Start Time
                                </Text>
                                <Text
                                    className={`text-lg font-[appfont-semi] ${
                                        isTimeStart && "text-primary"
                                    }`}
                                >
                                    {moment(startTime).format("h:mm a")}
                                </Text>
                            </TouchableOpacity>

                            <Text>-</Text>

                            <TouchableOpacity
                                onPress={() => setIsTimeStart(false)}
                                className="items-center"
                            >
                                <Text
                                    className={`text-lg font-[appfont-semi] ${
                                        !isTimeStart && "text-primary"
                                    }`}
                                >
                                    End Time
                                </Text>
                                <Text
                                    className={`text-lg font-[appfont-semi] ${
                                        !isTimeStart && "text-primary"
                                    }`}
                                >
                                    {moment(endTime).format("h:mm a")}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showTimePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                onChange={handleTimeChange}
                                value={isTimeStart ? startTime : endTime}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                            />
                        )}
                    </>
                )}

                <View>
                    <AppButton
                        variant="primary"
                        btnLabel="Update"
                        onPress={handleSaveTime}
                    />
                </View>

                <View>
                    <AppButton
                        variant="light"
                        btnLabel="Close Modal"
                        onPress={handleOnClose}
                    />
                </View>
            </ModalContainer>

            <ScrollView>
                <CalendarInput
                    markedDates={markedDates}
                    onDayPress={handleDatePress}
                />

                {/* displaying the selected days and time slots in UI */}
                {Object.entries(timeSlots).map(([date, slots], dateIndex) => (
                    <View
                        key={dateIndex}
                        className="flex-row items-center justify-between border-b border-dark py-5"
                    >
                        <View className="flex-row items-center space-x-2 flex-1">
                            <Text className="font-[appfont-semi]">
                                {slots[0].allDays
                                    ? slots[0].dayLabel
                                    : moment(date).format("ddd DD, YYYY")}
                            </Text>
                            <TouchableOpacity
                                onPress={() => addNewTimeSlot(date)}
                            >
                                <Ionicons
                                    name="add-circle"
                                    size={20}
                                    color={theme.colors.dark}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-1">
                            {slots.map((slot, slotIndex) => (
                                <View
                                    key={slotIndex}
                                    className="flex-row justify-between items-center border border-dark rounded-lg p-3"
                                >
                                    <Text className="flex-row items-center">
                                        {slot.unavailable
                                            ? "Unavailable"
                                            : `${moment(slot.start).format(
                                                  "h:mm A"
                                              )} - ${moment(slot.end).format(
                                                  "h:mm A"
                                              )}`}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleRemoveTimeSlot(
                                                date,
                                                slotIndex
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="close-circle"
                                            size={22}
                                            style={{
                                                color: theme.colors.dark,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View />
                    </View>
                ))}
            </ScrollView>
        </ScreenContainer>
    );
};

export default DoctorAvailability;