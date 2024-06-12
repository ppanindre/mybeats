import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import moment from "moment";
import showConfirmAlert from "../../utils/showConfirmAlert";
import { useDispatch } from "react-redux";
import {
    deleteAppointmentActionCreator,
    listAppointmentsByDoctorActionCreators,
} from "../../../../store/actions/appointmentActions";

const ICON_SIZE = 20;

const AppointmentCard = ({ appointment, patient }) => {
    const dispatch = useDispatch();

    const onConfirmDeleteAppointment = async () => {
        await dispatch(
            deleteAppointmentActionCreator(appointment.id, appointment._version)
        );
        dispatch(listAppointmentsByDoctorActionCreators());
    };

    const deleteAppointment = () => {
        showConfirmAlert(
            "Are you sure you want to cancel this appointment",
            () => onConfirmDeleteAppointment()
        );
    };

    return (
        <View className="relative bg-light p-5 items-center justify-center rounded-lg shadow-lg">
            <View className="absolute p-1 bottom-3 z-[30] left-2 border rounded-full bg-primary border-primary flex-row items-center space-x-1">
                {appointment.type === "video" ? (
                    <Ionicons
                        name="videocam"
                        size={ICON_SIZE}
                        color={theme.colors.light}
                    />
                ) : (
                    <FontAwesome5
                        name="hospital"
                        size={ICON_SIZE}
                        color={theme.colors.light}
                    />
                )}
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
                        {moment(appointment.startTime).format("D MMM")}
                    </Text>
                    <Text className="font-[appfont]">
                        {moment(appointment.startTime).format("H:mm a")}
                    </Text>
                </View>

                <TouchableOpacity onPress={deleteAppointment}>
                    <Ionicons
                        name="close-circle"
                        size={20}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentCard;
