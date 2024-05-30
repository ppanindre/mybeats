import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { theme } from "../../../../tailwind.config";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import ModalContainer from "../../components/Containers/ModalContainer";
import AppButton from "../../components/Buttons/AppButton";
import SwitchInput from "../../components/Inputs/SwitchInput";
import CalendarInput from "../../components/Inputs/CalendarInput";
import { appointmentService } from "../../api/services/appointmentService";
import { getAllDaysOfTheYear } from "../../utils/doctorAvailaibilityUtil";
import { availabilityService } from "../../api/services/availabilityService";

const DoctorAvailability = () => {
    // STATES
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [markedDates, setMarkedDates] = useState({});
    const [isUnavailable, setIsUnavailable] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState({});
    const [endTime, setEndTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimeStart, setIsTimeStart] = useState(true); // true for start time, false for end time

    const [availabilitySlots, setAvailiablitySlots] = useState([]);

    const [dayOfWeek, setDayOfWeek] = useState("");
    const [applyScheduleToAllDays, setApplyScheduleToAllDays] = useState(false);

    //  Check if any time slots apply to all days of the week
    const allDaysScheduled = Object.values(timeSlots)
        .flat()
        .some((slot) => slot.allDays && slot.dayLabel.includes(dayOfWeek));

    /**
     * add a new time slot
     * @param {String} date
     */
    const addNewTimeSlot = (date) => {
        setShowModal(true);
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
        setEndTime(new Date(date.setHours(10, 0, 0, 0))); // default end time
        setStartTime(new Date(date.setHours(9, 0, 0, 0))); // default start time
        setShowTimePicker(true);
    };

    /**
     * function to save time
     * @param {void}
     */
    const handleSaveTime = async () => {
        let updatedTimeSlots = { ...timeSlots };
        const dayLabel =
            moment(selectedDate, "YYYY-MM-DD").format("dddd") + "s";

        if (isUnavailable) {
            if (applyScheduleToAllDays) {
                updatedTimeSlots[selectedDate] = [
                    {
                        unavailable: true,
                        allDays: true,
                        dayLabel: dayLabel,
                    },
                ];
            } else {
                // Apply 'unavailable' only to the selected date
                updatedTimeSlots[selectedDate] = [
                    { unavailable: true, dayLabel: dayLabel },
                ];
            }
        } else {
            if (applyScheduleToAllDays) {
                const datesSelected = getAllDaysOfTheYear(startTime, endTime);

                datesSelected.forEach(async (date) => {
                    console.log(
                        "date",
                        moment(date.startTime).format("YYYY-MM-DD")
                    );
                    await appointmentService.createAppointmentSlot(
                        "4",
                        "1",
                        date.startTime,
                        date.endTime
                    );
                });
            } else {
                // Apply only to the selected date
                await availabilityService.createAvailability(
                    "4",
                    startTime,
                    endTime
                );
            }
        }
        setApplyScheduleToAllDays(false); // Reset after saving
        setIsUnavailable(false); // Also reset the unavailability toggle
        setShowModal(false); // Close Modal
        Alert.alert("", "Your availability has been set");

        // Fetch availability
        await fetchAvailability();
    };

    /**
     * function to remove the time slot
     * @param {string} date
     * @param {int} index
     */
    const handleRemoveTimeSlot = async (date, index) => {
        await appointmentService.deleteAppointmentSlot(
            timeSlots[date][index].id,
            timeSlots[date][index]._version
        );

        // fetch the updated appointment slots
        await fetchAvailability();

        Alert.alert("", "Appointment slot has been deleted");
    };

    /**
     * function to handle when user changes the time
     * @param {String} selectedTime
     */
    const handleTimeChange = (event, selectedTime) => {
        // if user selects a time
        if (selectedTime) {
            // if the user selects the start time, set the start time
            if (isTimeStart) {
                setStartTime(selectedTime);
            } else {
                // set the end time when user selects end time
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

    /**
     * fetch appointment slots
     */
    const fetchAvailability = async () => {
        const fetchedAvailability =
            await availabilityService.listAvailabilities("4");

        setAvailiablitySlots(fetchedAvailability);

        console.log("availabilites", fetchedAvailability[0].slots);
    };

    /**
     *
     * @param {Integer} daySlotIndex
     * @param {Integer} timeSlotIndex
     */
    const deleteAvailability = async (daySlotIndex, timeSlotIndex) => {
        const selectedAvailability =
            availabilitySlots[daySlotIndex].slots[timeSlotIndex];

        await availabilityService.deleteAvailability(
            selectedAvailability.id,
            selectedAvailability.version
        );

        await fetchAvailability();
    };

    useEffect(() => {
        fetchAvailability();
    }, []);

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
                        btnLabel="Set availability"
                        onPress={handleSaveTime}
                    />
                </View>
            </ModalContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {/* Calendar */}
                    <CalendarInput
                        markedDates={markedDates}
                        onDayPress={handleDatePress}
                    />

                    {availabilitySlots.map((daySlot, dayIndex) => (
                        <View
                            key={dayIndex}
                            className="border-b border-dark py-5 flex-row justify-between items-center"
                        >
                            <TouchableOpacity className="flex-row space-x-2 items-center">
                                <Text className="font-[appfont-semi]">
                                    {moment(daySlot.date, "YYYY-MM-DD").format(
                                        "ddd, DD MMM"
                                    )}
                                </Text>

                                <Ionicons
                                    name="add-circle"
                                    size={20}
                                    color={theme.colors.dark}
                                />
                            </TouchableOpacity>

                            <View className="space-y-3">
                                {daySlot.slots.map(
                                    (timeSlot, timeSlotIndex) => (
                                        <TouchableOpacity
                                            key={timeSlotIndex}
                                            onPress={() =>
                                                deleteAvailability(
                                                    dayIndex,
                                                    timeSlotIndex
                                                )
                                            }
                                            className="flex-row space-x-2 items-center border border-dark p-3 rounded-full"
                                        >
                                            <Text className="text-xs">
                                                {moment(timeSlot.start).format(
                                                    "h:mm a"
                                                )}{" "}
                                                -{" "}
                                                {moment(timeSlot.end).format(
                                                    "h:mm a"
                                                )}
                                            </Text>

                                            <Ionicons
                                                name="close-circle"
                                                size={20}
                                                color={theme.colors.dark}
                                            />
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default DoctorAvailability;
