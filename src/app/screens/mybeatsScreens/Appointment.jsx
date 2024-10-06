import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import BookingSection from "../../../../MyCharts/Components/BookingSection";
import ActionButton from "../../components/PatientDashboardComponents/ActionButton";
import InteractiveMapView from "../../components/DoctorMaps/InteractiveMapView";
import { customTheme } from "../../../../constants/themeConstants";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import { theme } from "../../../../tailwind.config";
import PatientStory from "../../../../components/Cards/PatientStory";
import ClinicAppointmentFrame from "../../components/PatientAppointmentCO/ClinicAppointmentFrame";
import AvailableAppointmentsFrame from "../../components/PatientAppointmentCO/AvailableAppointmentsFrame";
import { createAppointmentActionCreators } from "../../../../store/actions/appointmentActions";
import { patientStoriesListByDoctorsActionCreators } from "../../../../store/actions/patientStoriesAction";
import Loader from "../../components/Utils/Loader";
import VideoAppointmentFrame from "../../components/PatientAppointmentCO/VideoAppointmentFrame";
import DoctorInfo from "../../components/PatientDashboardComponents/DoctorInfo";
import { useNavigation } from "@react-navigation/native";

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

const Appointment = ({ route }) => {
    const { doctorId } = route.params;
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const doctor = useSelector((state) => state.doctorsListReducer.doctors.find(doc => doc.doctorID === doctorId));
    const { loading: patientStoriesloading, patientStories, error: patientStriesError } = useSelector((state) => state.patientStoriesListByDoctorReducer);  // Select the patient stories

    const [videoDate, setVideoDate] = useState();
    const [videoTime, setVideoTime] = useState();

    const { loading, error, appointment } = useSelector((state) => state.appointmentCreateReducer);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentType, setAppointmentType] = useState("clinic");
    
    useEffect(() => {
        dispatch(patientStoriesListByDoctorsActionCreators(doctorId));
    }, [doctorId]);



    const bookAppointment = async () => {
        dispatch(
            createAppointmentActionCreators(
                doctor.doctorID,
                appointmentType,
                selectedSlot
            )
        );

        Alert.alert("", "Your appointment has been booked");
    };

    const selectAppointmentSlot = (appointmentType, slot) => {
        setAppointmentType(appointmentType);
        setSelectedSlot(slot);
    };

    if (patientStoriesloading) return <Loader />;
    if (loading) return <Loader />;

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    <DoctorInfo doctor={doctor} />
                    <View>
                        <ActionButton excludeId2={true} doctor={doctor} />
                    </View>

                    <View>
                        <ClinicAppointmentFrame doctor={doctor} />
                    </View>

                    <View>
                        <AvailableAppointmentsFrame onSelectSlot={(slot) => selectAppointmentSlot("clinic", slot)} reset={appointmentType === "video"} doctorId={doctor.doctorID} />
                    </View>

                    {doctor.availableForVideoConsultation && (
                        <View className="space-y-5">
                            <View>
                                <VideoAppointmentFrame doctor={doctor} />
                            </View>

                            <View>
                                <AvailableAppointmentsFrame onSelectSlot={(slot) => selectAppointmentSlot("video", slot)} reset={appointmentType === "clinic"} doctorId={doctor.doctorID} />
                            </View>
                        </View>
                    )}

                    <View className="mt-4 mb-2 p-4 rounded-lg shadow mx-2 space-y-3 bg-light">
                        <InteractiveMapView
                            name={`${doctor.firstname} ${doctor.lastname}`}
                            city={doctor.city}
                            address={doctor.address}
                            zipcode={doctor.zipcode}
                            state={doctor.state}
                        />
                        <TouchableOpacity className="mt-3 text-white rounded-md py-2 px-4 bg-primary">
                            <View className="flex-row justify-center items-center">
                                <Ionicons name="create-sharp" size={20} style={{ color: customTheme.colors.light }} />
                                <Text className="ml-2 font-[appfont-semi] text-light">Write a review</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="p-2">
                        <Text className="text-lg font-[appfont-semi]">
                            Patient Stories (+250)
                        </Text>
                        {patientStories && patientStories.length > 0 ? (
                            patientStories.map((story) => (
                                <View key={story.id} className="mt-3">
                                    <PatientStory key={story.id} story={story} />
                                </View>
                            ))
                        ) : (
                            <Text className="text-md font-[appfont]">No patient stories available.</Text>
                        )}
                    </View>

                    <View className="flex-row justify-center">
                        <Text className="font-semibol text-primary">
                            View All Stories{" "}
                        </Text>
                        <Ionicons name="chevron-forward" size={16} style={{ color: customTheme.colors.primary }} />
                    </View>

                    <View className="mt-4 mb-24 p-4 bg-white rounded-lg">
                        <CollapsibleItem title="Secondary Specializations">
                            {doctor.secondarySpecialization}
                        </CollapsibleItem>
                        <CollapsibleItem title="Education">
                            {doctor.educationExperience}
                        </CollapsibleItem>
                        <CollapsibleItem title="Awards and Recognitions">
                            {doctor.awardsRecognition}
                        </CollapsibleItem>
                    </View>
                </View>
            </ScrollView>

            <View>
                <AppButton
                    onPress={() => navigation.navigate("confirmAppointment", { doctor, selectedTime: selectedSlot, appointmentType })}
                    variant={`${selectedSlot ? "primary" : "disabled"}`}
                    btnLabel="Book"
                    btnLeftIcon={<Ionicons name="calendar" size={20} color={theme.colors.light} />}
                />
            </View>
        </ScreenContainer>
    );
};

export default Appointment;