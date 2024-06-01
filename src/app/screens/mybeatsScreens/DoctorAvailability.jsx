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
import { getAllDaysOfTheYear } from "../../utils/doctorAvailaibilityUtil";
import { availabilityService } from "../../api/services/availabilityService";
import { appointmentService } from "../../api/services/appointmentService";

const DoctorAvailability = () => {
    // STATES
    const [showModal, setShowModal] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const [isUnavailable, setIsUnavailable] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimeStart, setIsTimeStart] = useState(true); // true for start time, false for end time
    const [availabilitySlots, setAvailiablitySlots] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [applyScheduleToAllDays, setApplyScheduleToAllDays] = useState(false);
    const [isSlotAvailable, setIsSlotAvailable] = useState(true);
    const [nextTokenFetched, setNextTokenFetched] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    /**
     * function to save time
     * @param {void}
     */
    const handleSaveTime = async () => {
        if (applyScheduleToAllDays) {
            const datesSelected = getAllDaysOfTheYear(startTime, endTime);

            datesSelected.forEach(async (date) => {
                await availabilityService.createAvailability(
                    "4",
                    date.startTime,
                    date.endTime
                );

                // Create apointment slot
                await addAppointmentSlots(date.startTime, date.endTime);
            });
        } else {
            await availabilityService.createAvailability(
                "4",
                startTime,
                endTime
            );

            await addAppointmentSlots(startTime, endTime);
        }

        setNextTokenFetched(null);
        setApplyScheduleToAllDays(false);
        setShowModal(false); // Close Modal
        Alert.alert("", "Your availability has been set");

        // Fetch availability
        await fetchAvailability();
    };

    const addAppointmentSlots = async (start, end) => {
        const slotStart = moment(start);
        const slotEnd = moment(end);
        const intervalSlots = [];

        while (slotStart.isBefore(slotEnd)) {
            const intervalEnd = slotStart.clone().add(15, "minutes");

            // Ensure we don't go beyond the availability end time
            if (intervalEnd.isAfter(slotEnd)) break;

            intervalSlots.push({
                start: slotStart.toDate(),
                end: intervalEnd.toDate(),
            });

            slotStart.add(15, "minutes");
        }

        intervalSlots.forEach(async (slot) => {
            await appointmentService.createAppointmentSlot(
                "4",
                "null",
                slot.start,
                slot.end
            );
        });
    };

    const addAvailability = (date) => {
        // open modal
        setShowModal(true);
        setDayOfWeek(moment(date, "YYYY-MM-DD").format("dddd"));
        const newMarkedDates = {
            [date]: {
                selected: true,
                selectedColor: theme.colors.primary,
                selectedTextColor: theme.colors.light,
            },
        };
        setStartTime(
            moment(date, "YYYY-MM-DD")
                .set({ hour: 9, minute: 0, second: 0 })
                .toDate()
        );
        setEndTime(
            moment(date, "YYYY-MM-DD")
                .set({ hour: 10, minute: 0, second: 0 })
                .toDate()
        );
        setMarkedDates(newMarkedDates);
        setShowTimePicker(true);
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
        // If there is data present in the database

        // Unpack availabilities fetched and the next token
        const { fetchedAvailability, nextToken } =
            await availabilityService.availabilityByDoctor("4", null);

        // set the next token for fetching the next availabilities
        setNextTokenFetched(nextToken);

        // set availability slots
        setAvailiablitySlots(fetchedAvailability);
    };

    const loadMoreAvailabilities = () => {
        // if the data is empty, set the next token to null
        // so that it doesnt fetch duplicate data
        if (nextTokenFetched === null) {
            setHasNext(false);
        }
    };

    /**
     *
     * @param {Integer} daySlotIndex
     * @param {Integer} timeSlotIndex
     */
    const deleteAvailabilitySlot = async (daySlotIndex, timeSlotIndex) => {
        const selectedAvailability =
            availabilitySlots[daySlotIndex].slots[timeSlotIndex];

        await availabilityService.deleteAvailability(
            selectedAvailability.id,
            selectedAvailability.version
        );

        Alert.alert("", "Your availability slot has been deleted");

        await fetchAvailability();
    };

    /**
     * checks if availability exists
     * @returns {Boolean}
     */
    const checkSlotExists = () => {
        // get the date index of the available slot
        const dateIndex = availabilitySlots.findIndex(
            (slot) => slot.date === moment(startTime).format("YYYY-MM-DD")
        );

        // Check if the slot is filled
        // slot filled is true if the start time picked by the user
        // is between the start time and the end time of an already
        // available slot for that date or the end time picked by the user
        // is between the start time and the end time of an already available
        // for that date
        if (dateIndex !== -1) {
            const isSlotFilled = availabilitySlots[dateIndex].slots.some(
                (slot) => {
                    const slotStart = moment(slot.start);
                    const slotEnd = moment(slot.end);
                    const newStart = moment(startTime);
                    const newEnd = moment(endTime);

                    return (
                        newStart.isBetween(slotStart, slotEnd, null, "[)") ||
                        newEnd.isBetween(slotStart, slotEnd, null, "(]")
                    );
                }
            );

            return isSlotFilled;
        }

        return false;
    };

    useEffect(() => {
        fetchAvailability();
    }, []);

    useEffect(() => {
        const isSlotFilled = checkSlotExists();

        setIsSlotAvailable(!isSlotFilled);
    }, [startTime, endTime]);

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
                        label={`${`Use this schedule for all ${dayOfWeek}s`}`}
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
                        variant={`${isSlotAvailable ? "primary" : "disabled"}`}
                        btnLabel="Set availability"
                        onPress={handleSaveTime}
                    />
                </View>
            </ModalContainer>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={loadMoreAvailabilities}
            >
                <View>
                    {/* Calendar */}
                    <CalendarInput
                        markedDates={markedDates}
                        onDayPress={addAvailability}
                    />

                    {availabilitySlots.map((daySlot, dayIndex) => (
                        <View
                            key={dayIndex}
                            className={`border-b border-dark py-5 flex-row justify-between items-center ${
                                availabilitySlots.length - 1 === dayIndex &&
                                "border-b-0"
                            }`}
                        >
                            <TouchableOpacity
                                onPress={() => addAvailability(daySlot.date)}
                                className="flex-row space-x-2 items-center"
                            >
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
                                                deleteAvailabilitySlot(
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
