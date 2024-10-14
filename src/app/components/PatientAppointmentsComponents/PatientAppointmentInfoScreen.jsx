import React, { useState, useEffect } from 'react';
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
import { createPatientStoryActionCreator, getPatientStoryActionCreator } from '../../../../store/actions/patientStoriesAction';
import { Rating } from 'react-native-ratings';
import { theme } from "../../../../tailwind.config";
import Loader from '../Utils/Loader';
import AppointmentDetails from './AppointmentDetails';

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

    const patientStoryState = useSelector((state) => state.patientStoryGetReducer);
    const { storyloading, patientStory, storysuccess } = patientStoryState;

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

    useEffect(() => {
        if (success) {
            dispatch(getPatientStoryActionCreator(appointment.id));
        }
    }, [success, appointment.id, dispatch]);

    // Set review and rating when patient story updates
    useEffect(() => {
        if (patientStory) {
            setReview(patientStory.story);
            setRating(Number(patientStory.rating));
        }
    }, [patientStory]);

     const handleShowReviewModal = () => {
        if (!patientStory) {
            // If no story exists, reset the review and rating for a new submission
            setReview("");
            setRating(0);
        } else {
            // If a story exists, load it for viewing in read-only mode
            setReview(patientStory.story);
            setRating(Number(patientStory.rating));
        }
        setshowReviewModal(true);
    };

    const onSubmitReview = async () => {

        dispatch(createPatientStoryActionCreator(
            appointment.doctorID,
            appointment.patientId,
            patientName,
            rating.toString(),
            review,
            appointment.id
        ));

        setshowReviewModal(false);

        if (success) {

            Alert.alert('Success', 'Your review has been submitted');
            dispatch(getPatientStoryActionCreator(appointment.id));
        }

        if (error) {
            Alert.alert('Error', 'Something went wrong while submitting the review');
        }
    };

    if (loading || storyloading) return <Loader />


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
                <AppointmentDetails
                    doctor={doctor}
                    appointment={appointment}
                    isPastAppointment={isPastAppointment}
                    getAddress={getAddress}
                />
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
            <ModalContainer visible={showReviewModal} onClose={() => setshowReviewModal(false)}>
                <View className="space-y-5">
                    <View className="flex-row items-center justify-between">
                        <Rating
                            type="custom"
                            ratingCount={5}
                            imageSize={35}
                            startingValue={rating}
                            onFinishRating={(rating) => setRating(rating)}
                            ratingColor={theme.colors.primary}
                            ratingBackgroundColor={theme.colors.darkSecondary}
                            readonly={!!patientStory} // Read-only if the story already exists
                        />
                        <Text className="text-lg font-[appfont-semi] text-dark">Rating: {rating}</Text>
                    </View>

                    <View>
                        <MultiLineInput
                            onChangeText={(text) => setReview(text)}
                            value={review}
                            label={patientStory ? "Your review" : "Write your review"} 
                            editable={!patientStory} // Noneditable if story already exists
                        />
                    </View>

                    <View>
                        {!patientStory && (
                            <AppButton
                                variant="primary"
                                btnLabel="Submit"
                                onPress={onSubmitReview}
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
                            variant="primary"
                            btnLabel={patientStory ? "View review" : "Write a review"}
                            onPress={handleShowReviewModal}
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default PatientAppointmentInfoScreen;
