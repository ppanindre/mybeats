import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { appointmentService } from "../../api/services/appointmentService";
import moment from "moment";

const AvailableAppointmentsFrame = ({
    doctorId,
    selectAppointmentSlot,
    resetAppointmentSlot,
}) => {
    // STATES
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

    /**
     * fetch the available appointments and format them
     */
    const fetchAvailableAppointments = async () => {
        const fetchedSlots = await appointmentService.appointmentSlotByDoctor(
            "4",
            "1"
        );

        setAvailableSlots(fetchedSlots);
    };

    /**
     * select the day index and reset the selected time index
     * @param {Integer} slotIndex
     */
    const selectSlot = (slotIndex) => {
        setSelectedDayIndex(slotIndex);
        setSelectedTimeIndex(null);
    };

    /**
     * select the time index and
     * select the appointment slot in the parent container
     * @param {Integer} slotIndex
     */
    const selectTimeSlot = (slotIndex) => {
        setSelectedTimeIndex(slotIndex);
        selectAppointmentSlot(
            availableSlots[selectedDayIndex].slots[slotIndex]
        );
        // setSelectedDayIndex(null);
        // setSelectedTimeIndex(null);
    };

    useEffect(() => {
        if (resetAppointmentSlot) {
            setSelectedDayIndex(null);
            setSelectedTimeIndex(null);
            fetchAvailableAppointments();
        }
    }, [resetAppointmentSlot]);

    useEffect(() => {
        fetchAvailableAppointments();
    }, []);

    return (
        <View className="space-y-5">
            <View className="space-y-3">
                <Text className="font-[appfont-semi] text-lg">Day</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row space-x-3">
                        {availableSlots.length > 0 &&
                            availableSlots.map((slot, index) => (
                                <TouchableOpacity
                                    onPress={() => selectSlot(index)}
                                    key={index}
                                    className={`h-[60] w-[100] px-5 py-2 border-dark border flex items-center justify-center rounded-full ${
                                        selectedDayIndex === index &&
                                        "bg-primary border-primary"
                                    } `}
                                >
                                    <Text
                                        className={`font-[appfont] ${
                                            selectedDayIndex === index &&
                                            "text-light"
                                        }`}
                                    >
                                        {moment(slot.date, "YYYY-MM-DD").format(
                                            "ddd"
                                        )}
                                    </Text>

                                    <Text
                                        className={`font-[appfont-semi] ${
                                            selectedDayIndex === index &&
                                            "text-light"
                                        }`}
                                    >
                                        {moment(slot.date, "YYYY-MM-DD").format(
                                            "D MMM"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </ScrollView>
            </View>

            {/* Time */}
            {selectedDayIndex !== null && (
                <View className="space-y-3">
                    <Text className="font-[appfont-semi] text-lg">Time</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View className="flex-row space-x-3">
                            {availableSlots[selectedDayIndex].slots.map(
                                (slot, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => selectTimeSlot(index)}
                                        className={`h-[60] px-5 py-2 border-dark border flex items-center justify-center rounded-full
                                        ${
                                            selectedTimeIndex === index &&
                                            "bg-primary border-primary"
                                        }`}
                                    >
                                        <Text
                                            className={`font-[appfont-semi] ${
                                                selectedTimeIndex === index &&
                                                "text-light"
                                            }`}
                                        >
                                            {moment(slot.start).format(
                                                "h:mm a"
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default AvailableAppointmentsFrame;
