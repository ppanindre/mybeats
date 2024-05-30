import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { doctorAvailabilityService } from "../../api/services/doctorAvailaibiityService";
import moment from "moment";

const AvailableAppointmentsFrame = ({ doctorId, selectAppointmentSlot }) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

    const fetchAvailableAppointments = async () => {
        const slots = await doctorAvailabilityService.listAppointmentSlots(
            doctorId
        );

        let formattedSlots = [];
        for (const [date, slotArray] of Object.entries(slots)) {
            let slotDetails = slotArray
                .filter((slot) => !slot.isBooked)
                .map((slot) => ({
                    startTime: slot.start,
                    endTime: slot.end,
                    id: slot.id,
                    _version: slot._version,
                }));
            if (slotDetails.length > 0) {
                formattedSlots.push({
                    date,
                    slots: slotDetails,
                });
            }
        }

        setAvailableSlots(formattedSlots);
    };

    const selectSlot = (slotIndex) => {
        setSelectedDayIndex(slotIndex);
        setSelectedTimeIndex(null);
    };

    const selectTimeSlot = (slotIndex) => {
        setSelectedTimeIndex(slotIndex);
        selectAppointmentSlot(
            availableSlots[selectedDayIndex].slots[slotIndex]
        );
    };

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
                                            "DD MMM"
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
                                            {moment(slot.startTime).format(
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
