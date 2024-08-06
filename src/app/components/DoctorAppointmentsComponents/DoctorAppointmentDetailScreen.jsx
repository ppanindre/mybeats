import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenContainer from '../Containers/ScreenContainer';
import AppButton from '../Buttons/AppButton';
import ModalContainer from '../Containers/ModalContainer';
import MultiLineInput from '../Inputs/MultiLineInput';
import moment from 'moment';
import {
    deleteAppointmentActionCreator,
    listAppointmentsByDoctorActionCreators,
    getAppointmentAction,
} from '../../../../store/actions/appointmentActions';
import Loader from '../Utils/Loader';

const DoctorAppointmentDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { appointment, patient } = route.params;

    const { appointment: updatedAppointment, loading } = useSelector(state => state.appointmentGetReducer);

    const isPastAppointment = moment(updatedAppointment?.startTime || appointment.startTime).isBefore(moment());

    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");

    useEffect(() => {
        dispatch(getAppointmentAction(appointment.id));
    }, [dispatch, appointment.id]);

    const onConfirmDeleteAppointment = async () => {
        await dispatch(
            deleteAppointmentActionCreator(appointment.id, appointment._version)
        );
        setShowModal(false);
        dispatch(listAppointmentsByDoctorActionCreators());
        navigation.goBack();
    };

    if (loading) return <Loader />;

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
                    <TouchableOpacity className="flex-row justify-around space-x-12 items-center mt-[-29] bg-lightPrimary rounded-full py-4 shadow-md"
                        onPress={() => navigation.navigate('patientInfo', { patientId: patient.id })}>
                        <View className="flex-row items-center justify-start space-x-2">
                            <Ionicons name="person" size={24} className="font-[appfont-semi]" />
                            <Text className="font-[appfont-semi] text-lg">{`${patient.firstname} ${patient.lastname}`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="space-y-5">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Date:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(updatedAppointment?.startTime || appointment.startTime).format("D MMM YYYY")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Time:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(updatedAppointment?.startTime || appointment.startTime).format("H:mm a")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Type:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {updatedAppointment?.type || appointment.type || "Clinic"}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Phone:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {patient.phoneNumber}
                        </Text>
                    </View>
                    {updatedAppointment?.doctorNotes && (
                        <View className="space-y-2">
                            <Text className="font-[appfont-semi] text-lg">Your Notes:</Text>
                            <Text className="font-[appfont-semi] text-md">{updatedAppointment.doctorNotes}</Text>
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
                <View className="flex-row">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Cancel Appointment"
                            onPress={() => setShowModal(true)}
                            variant="primary"
                        />
                    </View>
                </View>
            ) : (
                <View className="flex-row">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Write Doctor's notes"
                            onPress={() => navigation.navigate('doctorAppointmentNotes', { appointment })}
                            variant="primary"
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default DoctorAppointmentDetailScreen;
