import React from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import image1 from "../../assets/doctor-consultation.jpeg";
import image2 from "../../assets/doctor-consultation.jpeg";
import image3 from "../../assets/doctor-consultation.jpeg";
import image4 from "../../assets/doctor-consultation.jpeg";
import image5 from "../../assets/doctor-consultation.jpeg";
import appicon from "../../assets/app-icon.png";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import TextInputBoxWithIcon from "../../components/Utilities/TextInputBoxWithIcon";
import { customTheme } from "../../constants/themeConstants";
import { doctorData } from "../../constants/doctorConstants";
import DoctorCard from "../../components/Cards/DoctorCard";
import { useNavigation } from "@react-navigation/native";

const ConsultDoctor = () => {
    // not using this state
    const [numColumns, setNumColumns] = useState(4);

    // why not create a component of this
    // if any modiifcations, just change in that will reflect change in all of the other screens
    const sliderRef = useRef(null);
    const slideTimer = 5000;
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // can be in constants
    const commonHealthIssues = [
        {
            id: "1",
            title: "Cold & Cough",
            currentPrice: "12.99",
            originalPrice: "20.99",
        },
        {
            id: "2",
            title: "Headache",
            currentPrice: "12.99",
            originalPrice: "20.99",
        },
        {
            id: "3",
            title: "Throat pain",
            currentPrice: "12.99",
            originalPrice: "20.99",
        },
    ];

    // no comments
    useEffect(() => {
        let interval;
        if (isAutoScroll) {
            interval = setInterval(() => {
                if (currentIndex < cardData.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    sliderRef.current.scrollToIndex({
                        index: currentIndex + 1,
                    });
                } else {
                    setCurrentIndex(0);
                    sliderRef.current.scrollToIndex({ index: 0 });
                }
            }, slideTimer);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentIndex, isAutoScroll]);

    // should be in constants
    const cardData = [
        {
            id: "1",
            title: "20% OFF on first video consultation.",
            description: "Get a special discount on your first appointment!",
            buttonText: "See Doctor Now",
        },
        {
            id: "2",
            title: "Free Follow-up Consultation",
            description:
                "Book your initial consultation and get a follow-up for free!",
            buttonText: "Book Appointment",
        },
        {
            id: "3",
            title: "Family Health Plan",
            description: "Secure your family with our tailored health plans.",
            buttonText: "Learn More",
        },
    ];

    // Should be in the componenet directory
    // The Card component
    const Card = ({ title, description, buttonText }) => {
        return (
            <View
                className="bg-blue-200 p-4 mb-4 rounded-lg m-0.5"
                style={{
                    width: Dimensions.get("window").width * 0.915,
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text className="text-lg font-[appfont-semi] mb-2 text-center">
                    {title}
                </Text>
                <Text className="text-sm font-[appfont] mb-4 text-center">
                    {description}
                </Text>
                <TouchableOpacity style={{backgroundColor: customTheme.colors.primary}} className="py-2 px-4 rounded-md">
                    <Text style={{color: customTheme.colors.light}} className="text-sm font-[appfont-semi]">
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    // The PaginationIndicator component
    const PaginationIndicator = ({ currentIndex, length }) => {
        return (
            <View className="flex-row justify-center items-center mt-4">
                {Array.from({ length }).map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 w-2 rounded-full mx-1 ${
                            currentIndex === index
                                ? "bg-blue-600"
                                : "bg-gray-300"
                        }`}
                        style={{ opacity: currentIndex === index ? 1 : 0.5 }}
                    />
                ))}
            </View>
        );
    };

    const navigation = useNavigation();

    return (
        <ScrollView
            className="py-4 bg-gray-100"
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            <View className="flex-row items-center px-4 justify-between mb-4 w-full h-[50]">
                {/* Search Container */}
                <TextInputBoxWithIcon
                    onFocus={() => navigation.navigate("searchDoctors")}
                    icon={
                        <Ionicons
                            name="search-outline"
                            color={customTheme.colors.darkSecondary}
                            size={24}
                        />
                    }
                    placeholder="Search Doctor, Condition, Pincode"
                />
            </View>

            {/* Slider section */}
            <View className="px-4 mb-4">
                <FlatList
                    ref={sliderRef}
                    data={cardData}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Card {...item} />}
                    onScroll={({ nativeEvent }) => {
                        const slide = Math.ceil(
                            nativeEvent.contentOffset.x /
                                nativeEvent.layoutMeasurement.width
                        );
                        if (slide !== currentIndex) {
                            setCurrentIndex(slide);
                        }
                    }}
                />
                <PaginationIndicator
                    currentIndex={currentIndex}
                    length={cardData.length}
                />
            </View>

            <View className="px-4 mb-4">
                <Text className="text-lg font-[appfont-semi] mb-3 mt-3 ml-1">
                    Medical Specialties
                </Text>
                <FlatList
                    data={[
                        { key: "Women’s Health", icon: appicon },
                        { key: "Skin & Hair", icon: appicon },
                        { key: "Child Specialist", icon: appicon },
                        { key: "General Physician", icon: appicon },
                        { key: "Sexology", icon: appicon },
                        { key: "Digestion", icon: appicon },
                        { key: "Psychiatry", icon: appicon },
                        { key: "View All", icon: appicon },
                    ]}
                    key={`numColumns-${numColumns}`}
                    numColumns={numColumns}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="flex-1 items-center p-2">
                            <Image
                                source={item.icon}
                                className="w-16 h-16 mb-2 rounded-md"
                            />
                            <Text className="text-xs font-[appfont-semi] text-center">
                                {item.key}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.key}
                />
            </View>

            <View className="px-4 mb-4">
                <Text className="text-lg font-[appfont-semi] text-black">
                    Common Health Issues
                </Text>
                <FlatList
                    data={commonHealthIssues}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 20,
                        gap: 10,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="p-4 rounded-lg shadow-md justify-end"
                            style={{ width: 160, height: 200, backgroundColor: customTheme.colors.light }}
                        >
                            <Text className="text-lg font-[appfont-semi]">
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <Text className="text-lg font-[appfont-semi] px-4">
                Available Doctors
            </Text>
            <FlatList
                data={doctorData}
                keyExtractor={(item, index) =>
                    item.id.toString() || index.toString()
                }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: doctor }) => (
                    <View className="w-[300]">
                        <TouchableOpacity onPress={() => navigation.navigate('AppointmentPage', doctor)}>
                            <DoctorCard
                                doctorName={doctor.name}
                                doctorHospital={doctor.hospital}
                                doctorRating={doctor.rating}
                                doctorExperience={doctor.experience}
                                doctorSpecialist={doctor.specialization}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={{ padding: 20, gap: 10 }}
            />
        </ScrollView>
    );
};

export default ConsultDoctor;