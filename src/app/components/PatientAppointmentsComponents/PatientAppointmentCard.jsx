import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
    deleteAppointmentActionCreator,
    listAppointmentsByPatientActionCreators,
} from "../../../../store/actions/appointmentActions";
import ModalContainer from "../Containers/ModalContainer";
import MultiLineInput from "../Inputs/MultiLineInput";
import AppButton from "../Buttons/AppButton";
import { useNavigation } from '@react-navigation/native';


const ICON_SIZE = 20;

const PatientAppointmentCard = ({ appointment, isPast }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");

    const onConfirmDeleteAppointment = async () => {
        await dispatch(
            deleteAppointmentActionCreator(appointment.id, appointment._version)
        );
        dispatch(listAppointmentsByPatientActionCreators(appointment.patientId));
    };

    const deleteAppointment = () => {
        setShowModal(true);
    };

    const goToAppointmentInfo = () => {
        navigation.navigate('appointmentInfo', { appointment });
    };

    return (
        <TouchableOpacity className="relative bg-lightPrimary p-5 items-center justify-center rounded-lg shadow-lg"
            onPress={goToAppointmentInfo}>
            <ModalContainer
                visible={showModal}
                onClose={() => setShowModal(false)}
            >
                <View className="space-y-5">
                    <View>
                        <MultiLineInput
                            onChangeText={(text) => setReason(text)}
                            value={reason}
                            label="Reason for canceling appointment"
                        />
                    </View>

                    <View>
                        <AppButton
                            onPress={onConfirmDeleteAppointment}
                            variant="primary"
                            btnLabel="Cancel Appointment"
                        />
                    </View>
                </View>
            </ModalContainer>

            <View className="absolute p-1 bottom-3 z-[30] left-2 border rounded-full bg-primary border-primary flex-row items-center space-x-1">
                {appointment.type === "video" ? (
                    <Ionicons
                        name="videocam-outline"
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
                        {appointment.doctor?.firstname} {appointment.doctor?.lastname}
                    </Text>
                    <Text className="font-[appfont-semi]">
                        {moment(appointment.startTime).format("D MMM YYYY")}, {moment(appointment.startTime).format("H:mm a")}
                    </Text>
                </View>
                {!isPast && (
                    <TouchableOpacity onPress={deleteAppointment}>
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color={theme.colors.light}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default PatientAppointmentCard;
