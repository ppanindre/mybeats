import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { customTheme } from "../../../../constants/themeConstants";
import HorizontalLine from "../../../../MyCharts/Components/HorizontalLine";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import moment from "moment";
import { theme } from "../../../../tailwind.config";
import ModalContainer from "../../components/Containers/ModalContainer";
import AppButton from "../../components/Buttons/AppButton";
import SwitchInput from "../../components/Inputs/SwitchInput";
import CalendarInput from "../../components/Inputs/CalendarInput";

const DoctorAvailability = () => {
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
    const [modalContext, setModalContext] = useState(null);

    // function to format dates in a human-readable format
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    //  Check if any time slots apply to all days of the week
    const allDaysScheduled = Object.values(timeSlots)
        .flat()
        .some((slot) => slot.allDays && slot.dayLabel.includes(dayOfWeek));

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Month is 0-indexed
        const day = today.getDate();

        // Mark all past days as disabled
        const pastStyle = {
            disabled: true,
            disableTouchEvent: true,
            textColor: "#CCCCCC",
        };
        for (let d = 1; d < day; d++) {
            const pastDateString = `${year}-${
                month < 10 ? `0${month}` : month
            }-${d < 10 ? `0${d}` : d}`;
            markedDates[pastDateString] = pastStyle;
        }
        setMarkedDates(markedDates);
    }, []);

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
        const selectedDate = new Date(day.dateString);
        // if (dateNow.toISOString().split('T')[0] > day.dateString) return; // disable past dates

        const date = new Date(day.dateString);
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        const dayName = days[date.getDay()]; // Get the day name

        setDayOfWeek(dayName);
        // Update the markedDates state to only have the currently selected date marked
        const newMarkedDates = {
            [day.dateString]: {
                selected: true,
                selectedColor: customTheme.colors.primary,
                selectedTextColor: "white",
            },
        };

        setShowModal(true);
        setMarkedDates(newMarkedDates);
        setSelectedDate(day.dateString);
        setIsUnavailable(false); // reset availability switch
        setEndTime(new Date(selectedDate.setHours(17, 0, 0, 0))); // default end time
        setStartTime(new Date(selectedDate.setHours(9, 0, 0, 0))); // default start time
        setShowTimePicker(true);
    };

    // to save updated time slots
    const handleSaveTime = () => {
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
        setApplyScheduleToAllDays(false); // Reset after saving
        setIsUnavailable(false); // Also reset the unavailability toggle
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
                                    style={
                                        isTimeStart
                                            ? {
                                                  color: theme,
                                              }
                                            : null
                                    }
                                    className="text-xl font-[appfont-semi]"
                                >
                                    {modalContext === "availableHours"
                                        ? "Set Start time"
                                        : "Start time"}
                                </Text>
                                <Text
                                    style={
                                        isTimeStart
                                            ? {
                                                  color: customTheme.colors
                                                      .primary,
                                              }
                                            : null
                                    }
                                    className="text-md font-[appfont-semi]"
                                >
                                    {startTime.toLocaleTimeString()}
                                </Text>
                            </TouchableOpacity>
                            <Text>-</Text>
                            <TouchableOpacity
                                onPress={() => setIsTimeStart(false)}
                                className="items-center"
                            >
                                <Text
                                    style={
                                        !isTimeStart
                                            ? {
                                                  color: customTheme.colors
                                                      .primary,
                                              }
                                            : null
                                    }
                                    className="text-xl font-[appfont-semi]"
                                >
                                    {modalContext === "availableHours"
                                        ? "Set End time"
                                        : "End time"}
                                </Text>
                                <Text
                                    style={
                                        !isTimeStart
                                            ? {
                                                  color: customTheme.colors
                                                      .primary,
                                              }
                                            : null
                                    }
                                    className="text-md font-[appfont-semi]"
                                >
                                    {endTime.toLocaleTimeString()}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showTimePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={isTimeStart ? startTime : endTime}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onChange={handleTimeChange}
                                className="w-full"
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
                    <>
                        <View key={dateIndex} className="flex-row mb-2 mt-3">
                            <View className="flex-row justify-between items-center p-2">
                                <Text className="text-base font-[appfont-semi] my-2 mx-1 w-28">
                                    {slots[0].allDays
                                        ? slots[0].dayLabel
                                        : formatDate(date)}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => addNewTimeSlot(date)}
                                    className="flex-row justify-center items-center p-2 my-1 mr-12"
                                >
                                    <Ionicons
                                        name="add-circle"
                                        size={20}
                                        color="#000000"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View className="relative top-0 right-0">
                                {slots.map((slot, slotIndex) => (
                                    <View
                                        key={slotIndex}
                                        className="flex-row justify-between items-center p-2 border border-gray-300 rounded-lg my-1 bg-light"
                                    >
                                        <Text className="flex-row items-center w-[136] text-center">
                                            {slot.unavailable
                                                ? "Unavailable"
                                                : `${new Date(
                                                      slot.start
                                                  ).toLocaleTimeString(
                                                      "en-US",
                                                      {
                                                          hour: "numeric",
                                                          minute: "numeric",
                                                          hour12: true,
                                                      }
                                                  )} - ${new Date(
                                                      slot.end
                                                  ).toLocaleTimeString(
                                                      "en-US",
                                                      {
                                                          hour: "numeric",
                                                          minute: "numeric",
                                                          hour12: true,
                                                      }
                                                  )}`}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleRemoveTimeSlot(
                                                    date,
                                                    slotIndex
                                                )
                                            }
                                            className="p-2"
                                        >
                                            <Ionicons
                                                name="close-circle"
                                                size={22}
                                                style={{
                                                    color: customTheme.colors
                                                        .dark,
                                                    marginTop: 2,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <View
                                style={{
                                    borderBottomColor:
                                        customTheme.colors.darkSecondary,
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                }}
                            />
                        </View>
                        <HorizontalLine></HorizontalLine>
                    </>
                ))}

                <View style={{ display: "none" }}></View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default DoctorAvailability;
