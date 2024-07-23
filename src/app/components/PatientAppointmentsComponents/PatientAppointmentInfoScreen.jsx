import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenContainer from '../Containers/ScreenContainer';
import AppButton from '../Buttons/AppButton';
import ModalContainer from '../Containers/ModalContainer';
import MultiLineInput from '../Inputs/MultiLineInput';
import moment from 'moment';
import {
    deleteAppointmentActionCreator,
    listAppointmentsByPatientActionCreators,
} from '../../../../store/actions/appointmentActions';

const PatientAppointmentInfoScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { appointment } = route.params || {};

    const doctorList = useSelector((state) => state.doctorsListReducer);
    const { doctors } = doctorList;
    const doctor = doctors.find((doc) => doc.doctorID === appointment.doctorID);
    const isPastAppointment = moment(appointment.startTime).isBefore(moment());

    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");

    const onConfirmDeleteAppointment = async () => {
        await dispatch(
            deleteAppointmentActionCreator(appointment.id, appointment._version)
        );
        setShowModal(false);
        navigation.goBack();
        dispatch(listAppointmentsByPatientActionCreators(appointment.patientId));
    };

    const getAddress = () => {
        return `${doctor.address}, ${doctor.city}, ${doctor.state}, ${doctor.zipcode}`;
    };

    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 space-y-5"
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View>
                    <Image
                        source={require('../../assets/doc1.webp')}
                        className="w-full h-72"
                        resizeMode='contain'
                    />
                    <View className="flex-row justify-around space-x-12 items-center mt-[-29] bg-lightPrimary rounded-full py-4 shadow-md">
                        <View className="flex-row items-center justify-start space-x-2">
                            <Ionicons name="person" size={24} className="font-[appfont-semi]" />
                            <Text className="font-[appfont-semi] text-lg">{`${doctor.firstname} ${doctor.lastname}`}</Text>
                        </View>
                    </View>
                </View>

                <View className="space-y-5">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Date:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(appointment.startTime).format("D MMM YYYY")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Time:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(appointment.startTime).format("H:mm a")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Type:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {appointment.type || "Clinic"}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Phone:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {doctor.phoneNumber}
                        </Text>
                    </View>
                    {!isPastAppointment && (appointment.type === "clinic" || !appointment.type) && (
                        <View className="flex-row items-start justify-between space-x-10">
                            <Text className="font-[appfont-semi] text-lg">Clinic Address: </Text>
                            <View className="flex-1">
                            <Text className="font-[appfont-semi] text-lg text-right">
                                    {getAddress()}
                                </Text>                         
                            </View>
                        </View>
                    )}
                    {!isPastAppointment && appointment.type && (
                        <View className="flex-row items-center justify-between">
                            <Text className="font-[appfont-semi] text-lg">Meeting Link</Text>
                            <Text className="font-[appfont-semi] text-lg">
                                <TouchableOpacity onPress={() => { /* Meeting link */ }}>
                                    <Text className="text-primary font-[appfont-semi] text-lg">Join Meeting</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
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
            {!isPastAppointment ? (
                <View className="flex-row justify-around">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Cancel Appointment"
                            onPress={() => setShowModal(true)}
                            variant="primary"
                        />
                    </View>
                </View>
            ) : (
                <View className="flex-row justify-around">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="View Doctor's Notes"
                            onPress={() => { }}
                            variant="primary"
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default PatientAppointmentInfoScreen;
