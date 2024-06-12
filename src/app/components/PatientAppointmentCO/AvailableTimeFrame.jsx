import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";

const AvailableTimeFrame = ({
    appointments = {},
    selectedDate,
    onSelectSlot,
    selectedSlot,
}) => {
    return (
        <View className="space-y-3">
            <Text className="font-[appfont-bold] text-lg">Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-3">
                    {appointments[selectedDate] &&
                        appointments[selectedDate].map((slot) => (
                            <TouchableOpacity
                                onPress={() => onSelectSlot(slot)}
                                className={`border rounded-full border-dark p-5 ${
                                    selectedSlot === slot &&
                                    "bg-primary border-primary"
                                }`}
                            >
                                <Text
                                    className={`font-[appfont-bold] text-dark ${
                                        slot === selectedSlot && "text-light"
                                    }`}
                                >
                                    {moment(slot.startTime).format("h:mm a")}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default AvailableTimeFrame;
