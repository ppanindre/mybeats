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
// import AvailableAppointmentsFrame from "../../components/Frames/AvailableAppointmentsFrame";
import { appointmentService } from "../../api/services/appointmentService";
import { useDispatch, useSelector } from "react-redux";
import ClinicAppointmentFrame from "../../components/PatientAppointmentCO/ClinicAppointmentFrame";
import AvailableAppointmentsFrame from "../../components/PatientAppointmentCO/AvailableAppointmentsFrame";
import {
    createAppointmentActionCreators,
    listAvailableAppointmentsActionCreators,
} from "../../../../store/actions/appointmentActions";

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

export default Appointment = ({ route }) => {
    const patientStore = useSelector((state) => state.PatientReducer);

    // use amplify to fetch the doctor

    // dont need it
    const {
        doctor,
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
    } = route.params;
    // doint need it

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

    const [selectedSlot, setSelectedSlot] = useState(null);

    const dispatch = useDispatch();

    const bookAppointment = async () => {
        await dispatch(
            createAppointmentActionCreators(
                doctor.doctorID,
                "clinic",
                selectedSlot
            )
        );
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
                                    style={{ color: customTheme.colors.dark }}
                                    className="text-sm text-gray-500 font-[appfont]"
                                >
                                    {specialization}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Ionicons
                                        name="star"
                                        size={15}
                                        color="#ffd700"
                                    />
                                    <Text className="text-black text-s ml-1 mr-6 font-[appfont]">
                                        {rating}(500+ Ratings)
                                    </Text>
                                    <Ionicons
                                        name="time"
                                        size={15}
                                        color="#4b5563"
                                        className="ml-2"
                                    />
                                    <Text
                                        style={{
                                            color: customTheme.colors.dark,
                                        }}
                                        className="text-s ml-1 font-[appfont]"
                                    >{`${experience} Year Exp`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <ActionButton website={website} />
                    </View>

                    <View>
                        <ClinicAppointmentFrame />
                    </View>

                    <View>
                        <AvailableAppointmentsFrame
                            onSelectSlot={(slot) => setSelectedSlot(slot)}
                            doctorId={doctor.doctorID}
                        />
                    </View>

                    <View>
                        {availableForVideoConsultation && (
                            <>
                                <View
                                    className="flex-row justify-between items-center mt-3  p-5 rounded-lg shadow"
                                    style={{
                                        backgroundColor:
                                            customTheme.colors.lightPrimary,
                                    }}
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
                                            className="text-sm ml-2 font-[appfont-semi]"
                                            style={{
                                                color: customTheme.colors.light,
                                            }}
                                        >
                                            Video Consultation
                                        </Text>
                                    </View>
                                    <Text
                                        className="text-lg font-[appfont-semi] text-gray-800"
                                        style={{
                                            color: customTheme.colors.light,
                                        }}
                                    >{`$${feeForVideoConsultation} Fee`}</Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor:
                                            customTheme.colors.light,
                                    }}
                                    className=" p-2 rounded-lg"
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
                        style={{ backgroundColor: customTheme.colors.light }}
                        className="mt-4 mb-2 p-4 rounded-lg shadow mx-2 space-y-3"
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
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: customTheme.colors.primary,
                            }}
                            className="mt-3 text-white rounded-md py-2 px-4"
                        >
                            <View className="flex-row justify-center items-center">
                                <Ionicons
                                    name="create-sharp"
                                    size={20}
                                    style={{ color: customTheme.colors.light }}
                                />
                                <Text
                                    style={{ color: customTheme.colors.light }}
                                    className="ml-2 font-[appfont-semi]"
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
                            style={{ color: customTheme.colors.primary }}
                            className="font-semibold"
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

            <View>
                <AppButton
                    onPress={bookAppointment}
                    variant={`${selectedSlot ? "primary" : "disabled"}`}
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
        </ScreenContainer>
    );
};
