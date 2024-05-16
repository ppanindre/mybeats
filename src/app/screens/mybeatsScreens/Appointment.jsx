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
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import BookingSection from "../../../../MyCharts/Components/BookingSection";
import ActionButton from "../../../../MyCharts/Components/ActionButton";
import HorizontalLine from "../../../../MyCharts/Components/HorizontalLine";
import InteractiveMapView from "../../../../MyCharts/Components/InteractiveMapView";
import { customTheme } from "../../../../constants/themeConstants";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import { theme } from "../../../../tailwind.config";

// we dont need this function
const generateTimeSlots = (startHour, endHour) => {
    const slots = [];
    let currentTime = new Date().setHours(startHour, 0, 0, 0);

    while (new Date(currentTime).getHours() < endHour) {
        let timeString = new Date(currentTime).toLocaleTimeString([], {
            timeStyle: "short",
        });
        slots.push(timeString);
        currentTime += 30 * 60 * 1000;
    }

    return slots;
};

// Create a component place it inside components folder
const PatientStory = ({ story }) => {
    return (
        <View
            style={{ backgroundColor: customTheme.colors.light }}
            className="p-2 rounded-lg mb-4"
        >
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-4 flex-1">
                    <Text className="text-sm font-[appfont-semi]">
                        {story.name}
                    </Text>
                    <View className="flex-row items-center space-x-40">
                        <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-xs font-[appfont]"
                        >
                            {story.date}
                        </Text>
                        <View className="flex-row items-center -mt-8">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text
                                style={{ color: customTheme.colors.dark }}
                                className="text-xs ml-1"
                            >
                                {story.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text
                style={{ color: customTheme.colors.dark }}
                className="text-sm mt-2 font-[appfont]"
            >
                {story.comment}
            </Text>
        </View>
    );
};

const CollapsibleItem = ({ title }) => {
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
                    <Text className="text-sm font-[appfont]">
                        Details about {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Appointment = ({ route, navigation }) => {
    // use amplify to fetch the doctor

    // dont need it
    const { name, specialization, zipcode, rating, experience, hospital } =
        route.params;
    // doint need it

    // State for clinic bookings
    const [clinicDate, setClinicDate] = useState();
    const [clinicTime, setClinicTime] = useState();

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

    const getSlotsForSelectedDay = (type) => {
        if (type === "video") {
            return selectedDay === "today" ? todaySlots : tomorrowSlots;
        } else {
            return selectedClinicDay === "today"
                ? clinicTodaySlots
                : clinicTomorrowSlots;
        }
    };
    return (
        <ScreenContainer>
            <ScrollView style={{ backgroundColor: customTheme.colors.light }}>
                <View style={{ backgroundColor: customTheme.colors.light }}>
                    <View className="flex-row items-center px-4 py-2">
                        <Image
                            source={require("../../assets/doc1.webp")}
                            className="w-24 h-24 rounded-full border border-gray-100"
                        />
                        <View className="ml-6">
                            <Text className="text-xl font-[appfont-semi]">{`${name}`}</Text>
                            <Text
                                style={{ color: customTheme.colors.dark }}
                                className="text-sm text-gray-500 font-[appfont]"
                            >
                                {specialization}
                            </Text>
                            <Text
                                style={{ color: customTheme.colors.dark }}
                                className="text-sm text-gray-500 font-[appfont]"
                            >{`${zipcode}`}</Text>
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
                                    style={{ color: customTheme.colors.dark }}
                                    className="text-s ml-1 font-[appfont]"
                                >{`${experience} Year Exp`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4">
                    {/* <HorizontalLine /> */}
                    <ActionButton excludeId3={false} />
                    {/* <HorizontalLine /> */}
                </View>

                <View
                    className="flex-row justify-between items-center mt-3  p-5 rounded-lg shadow mx-4"
                    style={{ backgroundColor: customTheme.colors.lightPrimary }}
                >
                    <View className="flex-row items-center">
                        <Ionicons
                            name="videocam"
                            size={24}
                            style={{ color: customTheme.colors.light }}
                            className="bg-blue-100 p-1 rounded-full"
                        />
                        <Text
                            className="text-sm ml-2 font-[appfont-semi]"
                            style={{ color: customTheme.colors.light }}
                        >
                            Video Consultation
                        </Text>
                    </View>
                    <Text
                        className="text-lg font-[appfont-semi] text-gray-800"
                        style={{ color: customTheme.colors.light }}
                    >{`$50 Fee`}</Text>
                </View>

                <View
                    style={{ backgroundColor: customTheme.colors.light }}
                    className="mt-4 p-4 rounded-lg mx-4"
                >
                    <BookingSection
                        type="video"
                        selectedDate={videoDate}
                        setSelectedDate={setVideoDate}
                        selectedTime={videoTime}
                        setSelectedTime={setVideoTime}
                    />
                </View>

                {/* Clinic Appointment Section */}
                <View
                    className="flex-row justify-between items-center mt-5 bg-cyan-100 p-5 rounded-lg shadow mx-4"
                    style={{ backgroundColor: customTheme.colors.primary }}
                >
                    <View className="flex-row items-center">
                        <Ionicons
                            name="business"
                            size={24}
                            style={{ color: customTheme.colors.light }}
                            className="bg-blue-100 p-1 rounded-full"
                        />
                        <Text
                            className="text-sm ml-2 font-[appfont-semi]"
                            style={{ color: customTheme.colors.light }}
                        >
                            Clinic Appointment
                        </Text>
                    </View>
                    <Text
                        className="text-lg font-[appfont-semi] text-gray-800"
                        style={{ color: customTheme.colors.light }}
                    >{`$50 Fee`}</Text>
                </View>

                <View>
                    <Text className="text-lg text-black-500 font-[appfont-semi]">{`${zipcode}`}</Text>
                    <Text
                        style={{ color: customTheme.colors.dark }}
                        className="text-md font-[appfont-semi]"
                    >{`${hospital}`}</Text>
                </View>

                {/* Clinic Appointment Time Slots */}
                <View style={{ backgroundColor: customTheme.colors.light }}>
                    <BookingSection
                        type="clinic"
                        selectedDate={clinicDate}
                        setSelectedDate={setClinicDate}
                        selectedTime={clinicTime}
                        setSelectedTime={setClinicTime}
                    />

                    {/* Patient Stories Section */}
                    <View>
                        <Text className="text-lg mt-2 font-[appfont-semi]">
                            Patient Stories (+250)
                        </Text>
                        {patientStories.map((story) => (
                            <PatientStory key={story.id} story={story} />
                        ))}
                    </View>
                </View>

                <View className="flex-row justify-center -mt-3 mb-4">
                    <Text
                        style={{ color: customTheme.colors.primary }}
                        className="font-semibold"
                    >
                        View All Stories{" "}
                    </Text>
                    <Ionicons
                        name="chevron-forward"
                        size={15}
                        color="#3b82f6"
                    />
                </View>

                {/* Clinic Details Section */}
                <View
                    style={{ backgroundColor: customTheme.colors.light }}
                    className="mt-4 mb-2 p-4 rounded-lg shadow mx-4"
                >
                    <Text className="text-xl mb-3 font-[appfont-semi]">
                        Clinic Details
                    </Text>

                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-lg font-[appfont-semi]">{`${zipcode}`}</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={15} color="#ffd700" />
                            <Text className="text-md font-medium ml-1">
                                4.5
                            </Text>
                        </View>
                    </View>

                    <Text className="text-sm font-[appfont-semi] text-gray-500 mt-1">{`${hospital}`}</Text>

                    {/* Map Section */}
                    <InteractiveMapView
                        latitude={37.78825}
                        longitude={-122.4324}
                        name={name}
                        zipcode={zipcode}
                    />

                    <View className="flex-row justify-between items-center mt-3">
                        <View>
                            <Text className="text-sm font-[appfont-semi]">
                                Timings
                            </Text>
                            <Text className="text-sm font-[appfont]">
                                Mon - Sun
                            </Text>
                        </View>
                        <Text className="text-sm font-[appfont-semi] text-green-600">
                            Open Today
                        </Text>
                    </View>

                    <Text className="text-sm font-[appfont] mt-1">
                        08:00 AM - 10:00 PM
                    </Text>

                    <TouchableOpacity
                        style={{ backgroundColor: customTheme.colors.primary }}
                        className="mt-3 text-white rounded-md py-2 px-4"
                    >
                        <View className="flex-row justify-center items-center">
                            <Ionicons
                                name="call"
                                size={20}
                                style={{ color: customTheme.colors.light }}
                            />
                            <Text
                                style={{ color: customTheme.colors.light }}
                                className="ml-2 font-[appfont-semi]"
                            >
                                Contact Clinic
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mt-4 mb-24 p-4 bg-white rounded-lg  mx-4">
                    {/* <Text className="text-lg font-semibold">Doctor Details</Text> */}

                    <CollapsibleItem title="Specializations" />
                    <CollapsibleItem title="Education" />
                    <CollapsibleItem title="Experience" />
                    <CollapsibleItem title="Awards And Recognitions" />
                </View>
            </ScrollView>

            <View className="flex-row bg-light space-x-3">
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

                <View className="flex-1">
                    <AppButton
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
