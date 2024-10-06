import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
import { createPatientStoryActionCreator } from '../../../../store/actions/patientStoriesAction';
import { Rating } from 'react-native-ratings';
import { theme } from "../../../../tailwind.config";
import Loader from '../Utils/Loader';

const PatientAppointmentInfoScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.UserReducer);
    const patientName = `${user.profileData.firstName} ${user.profileData.lastName}`;
    const { appointment } = route.params || {};
    const [showReviewModal, setshowReviewModal] = useState(false)
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const doctorList = useSelector((state) => state.doctorsListReducer);
    const { doctors } = doctorList;
    const doctor = doctors.find((doc) => doc.doctorID === appointment.doctorID);
    const { loading, success, error } = useSelector((state) => state.patientStoryCreateReducer);
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

    const onSubmitReview = async () => {

        dispatch(createPatientStoryActionCreator(
            appointment.doctorID, 
            appointment.patientId, 
            patientName, 
            rating.toString(), 
            review
        ));

        setshowReviewModal(false);

        if (success) {
            Alert.alert('Success', 'Your review has been submitted');
        }

        if (error) {
            Alert.alert('Error', 'Something went wrong while submitting the review');
        }
    };

    if (loading) return <Loader />


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
            <ModalContainer
                visible={showReviewModal}
                onClose={() => setshowReviewModal(false)}
            >
                <View className="space-y-5">
                    <View className="flex-row items-center justify-between">
                        <Rating
                            type='custom'
                            ratingCount={5}
                            imageSize={35}
                            startingValue={rating}
                            onFinishRating={(rating) => setRating(rating)}
                            ratingColor={theme.colors.primary}
                            ratingBackgroundColor={theme.colors.darkSecondary}
                        />
                        <Text className="text-lg font-[appfont-semi] text-dark">Rating: {rating}</Text>
                    </View>

                    <View>
                        <MultiLineInput
                            onChangeText={(text) => setReview(text)}
                            value={review}
                            label="Write your review"
                        />
                    </View>

                    <View>
                        {rating ? (
                            <AppButton
                                variant="primary"
                                btnLabel="Submit"
                                onPress={onSubmitReview}
                            />
                        ) : (
                            <AppButton
                                variant="disabled"
                                btnLabel="Submit"
                            />

                        )}
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
                <View className="flex-row justify-around space-x-5">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="View Doctor's Notes"
                            onPress={() => { }}
                            variant="primary"
                        />
                    </View>
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Write a review"
                            onPress={() => setshowReviewModal(true)}
                            variant="primary"
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default PatientAppointmentInfoScreen;
