import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import { useDispatch } from "react-redux";
import { deleteAvailabilityActionCreator } from "../../../../store/actions/availabilityActions";

const ICON_SIZE = 20;

const AvailabilitySlotFrame = ({ availabilities = {}, onAdd }) => {
    const dispatch = useDispatch();

    const deleteAvailability = (slot) => {
        dispatch(deleteAvailabilityActionCreator(slot.id, slot.version));
    };

    return (
        <View>
            {Object.keys(availabilities).map((date) => (
                <View
                    key={date}
                    className="flex-row justify-between items-center border-b border-dark py-5"
                >
                    <TouchableOpacity
                        onPress={() => onAdd(date)}
                        className="flex-row space-x-2 items-center"
                    >
                        <Text className="text-lg font-[appfont-bold]">
                            {moment(date, "YYYY-MM-DD").format("D MMM")}
                        </Text>

                        <Ionicons
                            name="add-circle"
                            size={ICON_SIZE}
                            color={theme.colors.dark}
                        />
                    </TouchableOpacity>

                    <View className="space-y-2">
                        {availabilities[date].map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => deleteAvailability(slot)}
                                className="w-[180] border border-dark rounded-full p-3 flex-row items-center justify-center space-x-2"
                            >
                                <Text className="font-[appfont] text-sm">
                                    {moment(slot.startTime).format("h:mm a")}-
                                    {moment(slot.endTime).format("h:mm a")}
                                </Text>
                                <Ionicons
                                    name="close-circle"
                                    size={ICON_SIZE}
                                    color={theme.colors.dark}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

export default AvailabilitySlotFrame;
