import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";

const AvailableDayFrame = ({
    appointments = {},
    onSelectDate,
    selectedDate,
}) => {
    const today = moment().startOf('day');

    const filteredAppointments = Object.keys(appointments).filter(date => {
        return moment(date).isSameOrAfter(today);
    });

    return (
        <View className="space-y-3">
            <Text className="font-[appfont-bold] text-lg">Day</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="space-x-3 flex-row">
                    {filteredAppointments.map((date) => (
                        <TouchableOpacity
                            key={date}
                            onPress={() => onSelectDate(date)}
                            className={`border border-dark rounded-full p-5 ${
                                date === selectedDate &&
                                "bg-primary border-primary"
                            }`}
                        >
                            <Text
                                className={`font-[appfont-bold] text-dark ${
                                    date === selectedDate && "text-light"
                                }`}
                            >
                                {moment(date, "YYYY-MM-DD").format("D MMM")}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default AvailableDayFrame;
