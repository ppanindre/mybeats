import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";

const VideoAppointmentFrame = ({ doctor }) => {
    return (
        <View>
            <View>
                <View className="flex-row justify-between items-center bg-lightPrimary p-5 rounded-lg shadow-lg">
                    <View className="flex-row items-center"> 
                        <Ionicons
                            name="videocam"
                            size={24}
                            color={theme.colors.light}
                        />
                        <Text className="text-sm ml-2 font-[appfont-semi] text-light">
                            Video Appointment
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm ml-2 font-[appfont-semi] text-light">
                            Fee : ₹ {doctor.feeForVideoConsultation}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default VideoAppointmentFrame;
