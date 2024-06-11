import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import moment from "moment";

const AppointmentCard = ({ appointmentTime, appointmentType, patient }) => {
    return (
        <View className="relative bg-light p-5 items-center justify-center rounded-lg shadow-lg">
            <View className="absolute p-1 bottom-3 z-[30] left-2 border rounded-full border-primary flex-row items-center space-x-1">
                <Ionicons
                    name="videocam"
                    size={15}
                    color={theme.colors.primary}
                />
                {/* <Text className="font-[appfont] text-xs text-primary">
                    Video
                </Text> */}
            </View>

            <View className="flex-row space-x-3 items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="h-16 w-16 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-[appfont-semi] text-lg">
                        {patient.firstname} {patient.lastname}
                    </Text>
                    <Text className="font-[appfont-semi]">
                        {moment(appointmentTime).format("D MMM")}
                    </Text>
                    <Text className="font-[appfont]">
                        {moment(appointmentTime).format("H:mm a")}
                    </Text>
                </View>
                {appointmentType === "video" && (
                    <Ionicons
                        name="videocam"
                        size={20}
                        color={theme.colors.primary}
                    />
                )}
                <Ionicons
                    name="close-circle"
                    size={20}
                    color={theme.colors.primary}
                />
            </View>
        </View>
    );
};

export default AppointmentCard;
