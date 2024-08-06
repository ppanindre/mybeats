import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import BookingSection from "../../../../MyCharts/Components/BookingSection";
import ActionButton from "../../components/PatientDashboardComponents/ActionButton";
import HorizontalLine from "../../../../MyCharts/Components/HorizontalLine";
import InteractiveMapView from "../../components/DoctorMaps/InteractiveMapView";
import { theme } from "../../../../tailwind.config";
import PatientStory from "../../../../components/Cards/PatientStory";
import { patientStoriesData } from "../../../../constants/patientStoryConstants";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";

const Pharmacy = ({ navigation }) => {
    const route = useRoute();
    const { pharmacy } = route.params;

    const [clinicDate, setClinicDate] = useState();
    const [clinicTime, setClinicTime] = useState();

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                <View className="space-y-5">
                    <View
                        style={{ backgroundColor: theme.colors.light }}
                        className="rounded-lg overflow-hidden"
                    >
                        <View className="flex-row items-center space-x-5">
                            <Image
                                source={require("../../assets/pharma.jpeg")}
                                className="w-24 h-24 rounded-full border border-primary"
                            />
                            <View className="space-y-1">
                                <Text className="text-xl font-[appfont-semi]">
                                    {pharmacy.name}
                                </Text>
                                <Text className="text-sm text-dark font-[appfont]">
                                    {pharmacy.zipcode}
                                </Text>
                                <View className="flex-row items-center space-x-1">
                                    <Ionicons name="star" size={15} color="#ffd700" />
                                    <Text
                                        style={{ color: theme.colors.dark }}
                                        className="text-s font-[appfont]"
                                    >
                                        {pharmacy.rating}(500+ Ratings)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <HorizontalLine />

                        <ActionButton excludeId3={true} />

                        <HorizontalLine />
                    </View>

                    <View
                        className="flex-row justify-between items-center bg-lightPrimary p-5 rounded-lg shadow"
                    >
                        <View className="flex-row items-center space-x-2">
                            <Ionicons
                                name="business"
                                size={24}
                                style={{ color: theme.colors.light }}
                            />
                            <Text
                                className="text-sm font-[appfont-semi] text-light"
                            >
                                Pharmacy Appointment
                            </Text>
                        </View>
                        <Text className="text-lg font-[appfont-semi] text-light">
                            $50 Fee
                        </Text>
                    </View>

                    <View className="rounded-lg">
                        <BookingSection
                            type="clinic"
                            selectedDate={clinicDate}
                            setSelectedDate={setClinicDate}
                            selectedTime={clinicTime}
                            setSelectedTime={setClinicTime}
                        />
                    </View>

                    <View className="space-y-5">
                        <View>
                            <Text className="text-lg font-[appfont-semi]">
                                Patient Stories (+250)
                            </Text>
                        </View>
                        <View className="space-y-5">
                            {patientStoriesData.map((story) => (
                                <View key={story.id}>
                                    <PatientStory story={story} />
                                </View>
                            ))}
                        </View>
                        <View className="flex-row justify-center">
                            <Text style={{ color: theme.colors.primary }} className="font-semibold">
                                View All Stories{" "}
                            </Text>
                            <Ionicons name="chevron-forward" size={15} color={theme.colors.primary} />
                        </View>
                    </View>


                    <View
                        className="rounded-lg p-4 shadow bg-light border border-lightPrimary space-y-3"
                    >
                        <Text className="text-xl font-[appfont-semi]">Pharmacy Details</Text>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                {pharmacy.zipcode}
                            </Text>
                            <View className="flex-row items-center space-x-1">
                                <Ionicons name="star" size={15} color="#ffd700" />
                                <Text className="text-md font-medium">
                                    {pharmacy.rating}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-sm font-[appfont-semi]">
                            {pharmacy.name}
                        </Text>
                        <InteractiveMapView
                            latitude={37.78825}
                            longitude={-122.4324}
                            name={pharmacy.name}
                            zipcode={pharmacy.zipcode}
                        />
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-sm font-[appfont-semi]">Timings</Text>
                                <Text className="text-sm font-[appfont]">Mon - Sun</Text>
                            </View>
                            <Text className="text-sm font-[appfont-semi]">
                                Open Today
                            </Text>
                        </View>
                        <Text className="text-sm font-[appfont]">
                            08:00 AM - 10:00 PM
                        </Text>
                        <TouchableOpacity
                            className="text-white rounded-md py-2 bg-primary"
                        >
                            <View className="flex-row justify-center items-center space-x-2">
                                <Ionicons name="call" size={20} style={{ color: theme.colors.light }} />
                                <Text className="font-[appfont-semi] text-light">
                                    Contact Pharmacy
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Overlay buttons */}
            <View className="flex-row space-x-3">
                <View className="flex-1">
                    <AppButton
                        variant="light"
                        btnLabel="Search Medicines"
                    />
                </View>

                <View className="flex-1">
                    <AppButton
                        variant="primary"
                        btnLabel="Book Appointment"
                        onPress={() => alert("Appointment Booked Sucessfully")}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

export default Pharmacy;
