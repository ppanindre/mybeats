import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import BookingSection from "../../../../MyCharts/Components/BookingSection";
import ActionButton from "../../../../MyCharts/Components/ActionButton";
import InteractiveMapView from "../../../../MyCharts/Components/InteractiveMapView";
import { customTheme } from "../../../../constants/themeConstants";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import { theme } from "../../../../tailwind.config";
import PatientStory from "../../../../components/Cards/PatientStory";
import AvailableAppointmentsFrame from "../../components/Frames/AvailableAppointmentsFrame";
import { appointmentService } from "../../api/services/appointmentService";

const CollapsibleItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="mt-2">
            <View className="flex-row justify-between items-center">
                <Text className="text-xl font-[appfont-semi]">{title}</Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="black"
                />
            </View>
            {isOpen && (
                <View className="mt-2">
                    <Text className="text-sm font-[appfont]">{children}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Appointment = ({ route, navigation }) => {
    // use amplify to fetch the doctor

    // dont need it
    const {
        // id - required
        name,
        specialization,
        zipcode,
        rating,
        experience,
        city,
        address,
        secondarySpecialization,
        educationExperience,
        awardsRecognition,
        availableForVideoConsultation,
        feeForVideoConsultation,
        website,
        state
    } = route.params;
    // doint need it

    // State for clinic bookings
    const [clinicDate, setClinicDate] = useState();
    const [clinicTime, setClinicTime] = useState();
    const [appointmentSlot, setAppointmentSlot] = useState(null);

    // State for video consultation bookings
    const [videoDate, setVideoDate] = useState();
    const [videoTime, setVideoTime] = useState();

    const patientStories = [
        {
            id: "1",
            name: "Raj",
            date: "5 days ago",
            rating: "4.9",
            comment:
                "This doctor has been a beacon of hope for my family and me through some challenging times. His exceptional expertise in internal medicine, combined with her warm and empathetic bedside manner, made each consultation comforting. His ability to explain complex health issues in simple terms is remarkable.",
        },
        {
            id: "2",
            name: "Revanth",
            date: "7 days ago",
            rating: "4.0",
            comment:
                "This doctor has been a beacon of hope for my family and me through some challenging times. His exceptional expertise in internal medicine, combined with her warm and empathetic bedside manner, made each consultation comforting. His ability to explain complex health issues in simple terms is remarkable.",
        },
    ];

    const handleSelectAppointmentSlot = (slot) => {
        setAppointmentSlot(slot);
    };

    const bookAppointment = async () => {
        await appointmentService.bookAppointmentSlot(
            appointmentSlot.id,
            appointmentSlot._version
        );

        Alert.alert("", "Your appointment has been booked!");
    };

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    <View>
                        <View className="flex-row items-center">
                            <Image
                                source={require("../../assets/doc1.webp")}
                                className="w-24 h-24 rounded-full border border-primary"
                            />
                            <View style={{ flex: 1 }} className="ml-6">
                                <Text className="text-xl font-[appfont-semi]">{`${name}`}</Text>
                                <Text
                                    className="text-sm text-gray-500 font-[appfont] text-dark"
                                >
                                    {specialization}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Ionicons
                                        name="star"
                                        size={15}
                                        color="#ffd700"
                                    />
                                    <Text className="text-dark text-s ml-1 mr-6 font-[appfont]">
                                        {rating}(500+ Ratings)
                                    </Text>
                                    <Ionicons
                                        name="time"
                                        size={15}
                                        color="#4b5563"
                                        className="ml-2"
                                    />
                                    <Text
                                        className="text-s ml-1 font-[appfont] text-dark"
                                    >{`${experience} Year Exp`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <ActionButton website={website} />
                    </View>

                    <View>
                        {/* Clinic Appointment Section */}
                        <View
                            className="flex-row justify-between items-center bg-cyan-100 p-5 rounded-lg shadow bg-primary">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="business"
                                    size={24}
                                    style={{ color: customTheme.colors.light }}
                                    className="bg-blue-100 p-1 rounded-full"
                                />
                                <Text
                                    className="text-sm ml-2 font-[appfont-semi] text-light"
                                >
                                    Clinic Appointment
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Clinic Appointment Time Slots */}
                    <View>
                        <AvailableAppointmentsFrame
                            doctorId="4"
                            selectAppointmentSlot={handleSelectAppointmentSlot}
                        />
                    </View>

                    <View>
                        {availableForVideoConsultation && (
                            <>
                                <View
                                    className="flex-row justify-between items-center mt-3  p-5 rounded-lg shadow bg-lightPrimary"
                                >
                                    <View className="flex-row items-center">
                                        <Ionicons
                                            name="videocam"
                                            size={24}
                                            style={{
                                                color: customTheme.colors.light,
                                            }}
                                            className="bg-blue-100 p-1 rounded-full"
                                        />
                                        <Text
                                            className="text-sm ml-2 font-[appfont-semi] text-light"
                                        >
                                            Video Consultation
                                        </Text>
                                    </View>
                                    <Text
                                        className="text-lg font-[appfont-semi] text-gray-800 text-light"
                                    >{`$${feeForVideoConsultation} Fee`}</Text>
                                </View>
                                <View
                                    className=" p-2 rounded-lg bg-light"
                                >
                                    <BookingSection
                                        type="video"
                                        selectedDate={videoDate}
                                        setSelectedDate={setVideoDate}
                                        selectedTime={videoTime}
                                        setSelectedTime={setVideoTime}
                                    />
                                </View>
                            </>
                        )}
                    </View>

                    {/* Clinic Details Section */}
                    <View
                        className="mt-4 mb-2 p-4 rounded-lg shadow mx-2 space-y-3 bg-light"
                    >
                        <Text className="text-xl mb-3 font-[appfont-semi]">
                            Clinic Location
                        </Text>

                        {/* Map Section */}
                        <InteractiveMapView
                            name={name}
                            city={city}
                            address={address}
                            zipcode={zipcode}
                            state={state}
                        />

                        <TouchableOpacity
                            className="mt-3 text-white rounded-md py-2 px-4 bg-primary"
                        >
                            <View className="flex-row justify-center items-center">
                                <Ionicons
                                    name="create-sharp"
                                    size={20}
                                    style={{ color: customTheme.colors.light }}
                                />
                                <Text
                                    className="ml-2 font-[appfont-semi] text-light"
                                >
                                    Write a review
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Patient Stories Section */}
                    <View className="p-2">
                        <Text className="text-lg mt-5 font-[appfont-semi]">
                            Patient Stories (+250)
                        </Text>
                        {patientStories.map((story) => (
                            <PatientStory key={story.id} story={story} />
                        ))}
                    </View>

                    <View className="flex-row justify-center mb-4">
                        <Text
                            className="font-semibol text-primary"
                        >
                            View All Stories{" "}
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            style={{ color: customTheme.colors.primary }}
                        />
                    </View>

                    <View className="mt-4 mb-24 p-4 bg-white rounded-lg">
                        <CollapsibleItem title="Secondary Specializations">
                            {secondarySpecialization}
                        </CollapsibleItem>
                        <CollapsibleItem title="Education">
                            {educationExperience}
                        </CollapsibleItem>
                        <CollapsibleItem title="Awards and Recognitions">
                            {awardsRecognition}
                        </CollapsibleItem>
                    </View>
                </View>
            </ScrollView>

            <View className="flex-row bg-light space-x-3">
                {availableForVideoConsultation && (
                    <View className="flex-1">
                        <AppButton
                            variant="light"
                            btnLabel="Video"
                            btnLeftIcon={
                                <Ionicons
                                    name="videocam"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            }
                        />
                    </View>
                )}

                <View className="flex-1">
                    <AppButton
                        onPress={bookAppointment}
                        variant="primary"
                        btnLabel="Book"
                        btnLeftIcon={
                            <Ionicons
                                name="calendar"
                                size={20}
                                color={theme.colors.light}
                            />
                        }
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};
