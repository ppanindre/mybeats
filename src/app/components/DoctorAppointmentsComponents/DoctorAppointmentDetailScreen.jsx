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
} from '../../../../store/actions/appointmentActions';
import { listDoctorPrescriptionsByAppointmentActionCreator } from '../../../../store/actions/prescriptionActions';
import { getDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';
import { getPrescriptionImageActionCreator } from '../../../../store/actions/prescriptionImageActions';


const DoctorAppointmentDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { appointment, patient } = route.params;

    const isPastAppointment = appointment?.startTime ? moment(appointment.startTime).isBefore(moment()) : false;

    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");

    const onConfirmDeleteAppointment = async () => {
        await dispatch(
            deleteAppointmentActionCreator(appointment.id, appointment._version)
        );
        setShowModal(false);
        navigation.goBack();
        dispatch(listAppointmentsByDoctorActionCreators());
    };

    // doctors notes from Redux
    const doctorNotes = useSelector((state) => state.doctorNoteGetReducer.doctorNote);
    const doctorImages = useSelector((state) => state.doctorNoteGetReducer.imageUrls);
    const prescription = useSelector((state) => state.prescriptionList)
    const prescriptionImages = useSelector((state) => state.prescriptionImageGetReducer.imageUrls);

    // console.log(prescription)
    // console.log(prescriptionImages)

    useEffect(() => {
        if (appointment.id) {
            dispatch(getDoctorNoteActionCreator(appointment.id));
            dispatch(listDoctorPrescriptionsByAppointmentActionCreator(appointment.id));
            dispatch(getPrescriptionImageActionCreator(appointment.id));
        }
    }, [dispatch, appointment.id]);

    const handleWriteNotesPress = () => {
        navigation.navigate('doctorAppointmentNotes', {
            appointmentId: appointment.id
        });
    };

    const handlePrescriptionPress = () => {
        if (prescription.prescriptions && prescription.prescriptions.length > 0) {
            navigation.navigate('doctorMedicine', { appointmentId: appointment.id, patientId: appointment.patientId });
        }
        else if (prescriptionImages && prescriptionImages.length > 0) {
            navigation.navigate('uploadPrescription', { appointmentId: appointment.id, patientId: appointment.patientId });
        }
        else {
            navigation.navigate('uploadPrescription', { appointmentId: appointment.id, patientId: appointment.patientId });
        }
    };

    const hasManualPrescription = prescription.prescriptions && prescription.prescriptions.length > 0;
    const hasPrescriptionImages = prescriptionImages && prescriptionImages.length > 0;

    // console.log("Manual Prescriptions:", prescription.prescriptions);
    console.log("Prescription Images:", prescriptionImages);

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
                            <Text className="font-[appfont-semi] text-lg">{`${patient?.firstname} ${patient?.lastname}`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="space-y-5">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Date:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(appointment?.startTime).format("D MMM YYYY")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Time:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {moment(appointment?.startTime).format("H:mm a")}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Type:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {appointment?.type || "Clinic"}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Phone:</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            {patient?.phoneNumber}
                        </Text>
                    </View>
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
                <View className="flex-row space-x-5">
                    <View className="flex-1">
                        <AppButton
                            btnLabel={(doctorNotes !== "" || (doctorImages && doctorImages.length > 0)) ? "View/edit your notes" : "Write Doctor's notes"}
                            onPress={handleWriteNotesPress}
                            variant="primary"
                        />
                    </View>
                    <View className="flex-1">
                        <AppButton
                            btnLabel={hasManualPrescription ? "View Prescription" : hasPrescriptionImages ? "View Prescription" : "Give Prescription"}
                            onPress={handlePrescriptionPress}
                            variant="primary"
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default DoctorAppointmentDetailScreen;