import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import moment from "moment";

const AvailableDayFrame = ({
    appointments = {},
    onSelectDate,
    selectedDate,
}) => {
    return (
        <View className="space-y-3">
            <Text className="font-[appfont-bold] text-lg">Day</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="space-x-3 flex-row">
                    {Object.keys(appointments).map((date) => (
                        <TouchableOpacity
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
