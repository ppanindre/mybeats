import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import moment from "moment";

const AppointmentCard = ({ patientName, appointmentType, appointmentTime }) => {
    return (
        <View className="bg-light p-5 items-center justify-center rounded-lg shadow-lg">
            <View className="flex-row space-x-3 items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="h-16 w-16 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-[appfont-semi] text-lg">
                        {patientName}
                    </Text>
                    <Text className="font-[appfont]">
                        {moment(appointmentTime).format("H:mm a")}
                    </Text>
                    <Text className="font-[appfont]">{appointmentType}</Text>
                </View>
                <Ionicons
                    name="videocam"
                    size={20}
                    color={theme.colors.primary}
                />
            </View>
        </View>
    );
};

export default AppointmentCard;
