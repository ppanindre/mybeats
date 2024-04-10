import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
} from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import TextInputBoxWithIcon from "../../components/Utilities/TextInputBoxWithIcon";
import { customTheme } from "../../constants/themeConstants";
import { useNavigation } from "@react-navigation/native";

const Diagnostics = () => {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const labs = [
        {
            name: "Boca Biolteics LAB",
            rating: "4.5",
            labStoryCount: "(+400 Patient Story)",
            logoUrl: "../../assets/doc1.webp",
            zipcode: "11111"
        },
        {
            name: "Momentum Technology",
            rating: "3",
            labStoryCount: "(+500 Patient Story)",
            logoUrl: "../../assets/doc1.webp",
            zipcode: "22222"
        },
    ];

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            let starName = "star-outline";
            if (rating >= i) {
                starName = "star";
            } else if (rating > i - 1 && rating < i) {
                starName = "star-half-outline";
            }
            stars.push(
                <Ionicons key={i} name={starName} size={14} color="gold" />
            );
        }
        return stars;
    };

    const cardData = [
        {
            id: "1",
            title: "Save Up On Checkups",
            description: "Get 10% OFF on all tests and packages!",
            buttonText: "Order now",
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

    const Card = ({ title, description, buttonText }) => {
        return (
            <View
                className="bg-blue-200 p-4 mb-4 rounded-lg m-0.5"
                style={{
                    width: Dimensions.get("window").width * 0.915,
                    height: 200,
                    alignItems: "left",
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

    const PaginationIndicator = ({ currentIndex, length }) => {
        return (
            <View className="flex-row justify-center items-center mt-4">
                {Array.from({ length }).map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}
                        style={{ opacity: currentIndex === index ? 1 : 0.5 }}
                    />
                ))}
            </View>
        );
    };

    const diagnosticTestData = [
        {
            id: "1",
            testName: "COVID RT-PCR",
            testDescription: "Known as Qualitative Pcr Throat Swab",
            testPrice: "$30.99",
            buttonText: "Book Now",
        },
        {
            id: "2",
            testName: "Cancer Checkup",
            testDescription: "Take The First Step To Detect Cancer Checkup",
            testPrice: "$15.99",
            buttonText: "Book Now",
        },
        {
            id: "3",
            testName: "Throat Infection",
            testDescription: "Take The First Step To Detect Throat Infection",
            testPrice: "$15.99",
            buttonText: "Book Now",
        },
    ];

    const DiagnosticTestCard = ({
        testName,
        testDescription,
        testPrice,
        buttonText,
    }) => {
        return (
            <View style={{backgroundColor: customTheme.colors.light}} className="w-[100%] p-5 rounded-lg shadow-md space-y-3">
                <View className="w-[100%] items-center justify-center">
                    <Image
                        source={require("../../assets/doc1.webp")}
                        className="h-24 w-24 rounded-full"
                    />
                </View>
                <View>
                    <Text className="text-lg font-[appfont-semi] mb-2 text-left">
                        {testName}
                    </Text>
                    <Text style={{color: customTheme.colors.dark}} className="text-xs font-[appfont] text-left">
                        {testDescription}
                    </Text>
                </View>
                <Text className="text-xl font-[appfont-semi] text-left">
                    {testPrice}
                </Text>
                <TouchableOpacity style={{backgroundColor: customTheme.colors.primary}} className=" py-2 px-4 rounded-md">
                    <Text className="text-white text-sm font-[appfont-semi] text-center">
                        {buttonText}
                    </Text>
                </TouchableOpacity>
                {/* </View> */}
            </View>
        );
    };

    handleUploadPress = () => { };

    const CheckupData = [
        {
            id: "1",
            testName: "Active Professional Health Checkup",
            testDescription: "Ideal for individuals aged 41-60 years",
            testPrice: "$30.99",
            originalPrice: "$40.99",
            buttonText: "Book Now",
        },
        {
            id: "2",
            testName: "Active Professional Health Checkup",
            testDescription: "Ideal for individuals aged 41-60 years",
            testPrice: "$30.99",
            originalPrice: "$40.99",
            buttonText: "Book Now",
        },
        {
            id: "3",
            testName: "Active Professional Health Checkup",
            testDescription: "Ideal for individuals aged 41-60 years",
            testPrice: "$30.99",
            originalPrice: "$40.99",
            buttonText: "Book Now",
        },
    ];

    const CheckupCard = ({
        testName,
        testDescription,
        testPrice,
        buttonText,
        originalPrice,
    }) => {
        return (
            <View className="bg-white rounded-lg shadow-md w-[300]">
                <View className="rounded-t-lg shadow-lg">
                    <Image
                        source={require("../../assets/checkup.jpg")}
                        className="h-[250] w-[100%] rounded-t-lg shadow-lg"
                    />
                    <View className="absolute top-5 left-2 bg-white bg-opacity-80 py-1 px-2 rounded-md">
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className="font-[appfont-bold]"
                        >
                            25% OFF
                        </Text>
                    </View>
                </View>

                {/* Checkup card content */}
                <View className="p-5 space-y-3">
                    <View>
                        <Text className="text-lg font-[appfont-semi] mb-2 text-left">
                            {testName}
                        </Text>
                        <Text style={{color: customTheme.colors.dark}} className="text-xs font-[appfont] text-left">
                            {testDescription}
                        </Text>
                    </View>
                    {/* <View className="flex-row justify-between items-end"> */}
                    <View className="flex-row items-center">
                        <Text className="text-xl font-[appfont-semi] text-left mr-2">
                            {testPrice}
                        </Text>
                        <Text style={{color: customTheme.colors.dark}} className="text-md line-through">
                            {originalPrice}
                        </Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: customTheme.colors.primary}}  className="py-2 px-4 rounded-md">
                        <Text style={{color: customTheme.colors.light}} className="text-sm font-[appfont-semi] text-center">
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const navigation = useNavigation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 50,
            }}
            className="py-4 bg-gray-100"
        >
            <View className="px-4 h-[50]">
                <TextInputBoxWithIcon
                    onFocus={() => navigation.navigate("searchDiagnostics")}
                    icon={
                        <Ionicons
                            name="search-outline"
                            color={customTheme.colors.darkSecondary}
                            size={24}
                        />
                    }
                    placeholder="Search Labs, Tests, Pincode"
                />
            </View>

            <View className="mt-4 px-4">
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

            <View className="mt-4">
                <View className="flex-row justify-between px-4">
                    <Text className="text-xl font-[appfont-bold] mb-2 text-left ml-1">
                        Top Diagnostic Test
                    </Text>
                    <TouchableOpacity className="mt-2">
                        <Text style={{color: customTheme.colors.primary}} className="text-sm font-semibold text-left">
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={diagnosticTestData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="w-[180]">
                            <DiagnosticTestCard {...item} />
                        </View>
                    )}
                    contentContainerStyle={{ gap: 10, padding: 20 }}
                />
            </View>

            <View className="mt-4">
                <View className="flex-row justify-between items-center px-4">
                    <Text className="text-xl font-[appfont-bold]">
                        Checkup Packages
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className="text-sm font-[appfont-bold] text-left"
                        >
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={CheckupData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CheckupCard {...item} />}
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                />
            </View>

            <View className="px-4 mb-4">
                <View
                    style={{ backgroundColor: customTheme.colors.primary }}
                    className="mt-4 flex-row items-center justify-between p-5 rounded-lg shadow-lg"
                >
                    <View className="flex-1">
                        <Text style={{color: customTheme.colors.light}} className="text-lg font-[appfont-bold]">
                            Need help with booking your test
                        </Text>
                        <Text style={{color: customTheme.colors.light}} className="text-sm font-[appfont-semi]">
                            Our experts are here to help you
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleUploadPress}
                        className="bg-white py-3 px-6 rounded-full shadow-md"
                    >
                        <Text className="text-black font-[appfont-semi]">
                            Call now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-4 mb-2">
                <Text className="text-lg font-[appfont-semi] mb-2">
                    Our Recommended Labs
                </Text>
            </View>

            <View className="px-4 space-y-3">
                {/* Show labs based on a certain condition (e.g., zipcode) */}
                {labs.map((lab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('LabInfo', lab,)}
                        style={{backgroundColor: customTheme.colors.light}}
                        className="rounded-lg shadow-lg"
                    >
                        <View className="flex-row items-center justify-between p-5">
                            <Image
                                source={require("../../assets/doc1.webp")}
                                className="w-20 h-20 mr-4 rounded-full"
                            />
                            <View className="flex-1">
                                <Text className="text-base font-[appfont-semi]">
                                    {lab.name}
                                </Text>
                                <View className="flex-row items-center">
                                    {renderStars(lab.rating)}
                                    <Text className="text-sm ml-1">
                                        {lab.rating}
                                    </Text>
                                </View>
                                <Text className="text-sm font-[appfont]">{` ${lab.labStoryCount} `}</Text>
                            </View>
                            {/* This could be another touchable area for a different action, e.g., making a phone call */}
                            <TouchableOpacity
                                onPress={() => {
                                    /* logic to handle phone call */
                                }}
                                className="bg-green-500 rounded-full p-3 shadow-lg"
                            >
                                <Ionicons
                                    name="call-outline"
                                    size={24}
                                    style={{color: customTheme.colors.light}}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollView>
    );
};

export default Diagnostics;
