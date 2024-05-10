import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomSafeView from "../../../../components/CustomSafeView";
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import NavigationCard from "../../../../components/Cards/NavigationCard";
import DoctorCard from "../../../../components/Cards/DoctorCard";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { doctorData } from "../../../../constants/doctorConstants";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import { LabData } from "../../../../constants/LabConstants";
import { customTheme } from "../../../../constants/themeConstants";
import LabCard from "../../../../components/Cards/LabCard";

const DoctorDashboard = ({ route }) => {
    // Declare navigation instance
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(
        route.params?.isLoading || false
    );

    // timer for loading the screen
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => setIsLoading(false), 3000);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator
                    size="large"
                    color={customTheme.colors.primary}
                />
            </View>
        );
    }

    return (
        <CustomSafeView>
            {/* Top navbar */}
            {/* <TopNavbar isMyBeats={true} showSync={false} /> */}

            <ScrollView
                className="py-4 bg-gray-100"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                <View className="flex-row items-center justify-between mb-4 h-[50] space-x-3 px-4">
                    {/* Modify the search input box */}
                    {/* Search Input Box */}
                    <TextInputBoxWithIcon
                        icon={
                            <Ionicons
                                name="search-outline"
                                size={24}
                                color={customTheme.colors.darkSecondary}
                            />
                        }
                        onFocus={() => navigation.navigate("searchDoctors")}
                        placeholder="Search Doctor, Health Condition, Pincode"
                    />
                </View>

                {/* Image slider component */}
                <View className="px-4 mb-4">
                    <View
                        style={{
                            backgroundColor: customTheme.colors.primary,
                        }}
                        className="h-[150] rounded-lg shadow-lg p-4"
                    >
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("consultdoctors")
                            }
                            className="h-[100%] justify-end"
                        >
                            <Text
                                className="font-[appfont-bold] text-xl"
                                style={{
                                    color: customTheme.colors.light,
                                }}
                            >
                                Consult Doctors
                            </Text>
                            <Text
                                className="font-[appfont] text-lg"
                                style={{
                                    color: customTheme.colors.light,
                                }}
                            >
                                Book an appointment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Cards VIew */}
                <View className="flex-row justify-around space-x-5 px-4 mb-4">
                    {/* First Card: Telehealth */}
                    <View className="flex-1">
                        <NavigationCard
                            cardTitle="Telehealth"
                            cardContent="Video consultation"
                        />
                    </View>

                    <View className="flex-1">
                        {/* Second Card: Diagnostics */}
                        <NavigationCard
                            cardTitle="Diagnostics"
                            cardContent="Request a lab test"
                            onPress={() => navigation.navigate("diagnostics")}
                        />
                    </View>
                </View>

                {/* Pharma card */}
                <View className="px-4 mb-4">
                    <TouchableOpacity
                        style={{
                            backgroundColor: customTheme.colors.primary,
                        }}
                        className="mt-4 flex-row items-center justify-between p-5 rounded-lg shadow-md"
                        onPress={() => navigation.navigate("medicines")}
                    >
                        <View className="flex-1">
                            <Text
                                style={{ color: customTheme.colors.light }}
                                className="text-lg font-[appfont-semi] "
                            >
                                Pharma
                            </Text>
                            <Text
                                style={{ color: customTheme.colors.light }}
                                className="text-sm font-[appfont-semi]"
                            >
                                Order via uploading prescription
                            </Text>
                        </View>

                        {/* Upload Prescription */}
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("UploadPrescription")
                            }
                            className="bg-white py-3 px-6 rounded-full shadow-md"
                        >
                            <Text className="text-black font-[appfont-semi]">
                                Upload
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {/* Doctors based on zipcode */}
                <View className="flex-row justify-between items-center px-4">
                    <Text className="text-lg font-[appfont-semi]">
                        {" "}
                        Doctors near You
                    </Text>
                    <TouchableOpacity onPress={() => toggleView()}>
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className="font-[appfont-bold]"
                        >
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Doctor data */}
                <FlatList
                    data={doctorData}
                    keyExtractor={(item, index) =>
                        item.id.toString() || index.toString()
                    }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10,
                        padding: 20,
                    }}
                    renderItem={({ item: doctor }) => (
                        <View key={doctor.id} className="w-[300]">
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        "AppointmentPage",
                                        doctor
                                    )
                                }
                            >
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
                />

                {/* Pharmacy based on the zip codes */}
                <View className="flex-row justify-between items-center px-4">
                    <Text className="text-lg font-[appfont-semi]">
                        Pharmacy near you
                    </Text>
                    <TouchableOpacity onPress={() => toggleView()}>
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className="font-[appfont-bold] text-primary"
                        >
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pharmacy Data */}
                <FlatList
                    data={pharmacyData}
                    keyExtractor={(item, index) =>
                        item.id.toString() || index.toString()
                    }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: pharmacy }) => (
                        <View key={pharmacy.id} className="w-[300]">
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        "PharmacyInfo",
                                        pharmacy
                                    )
                                }
                            >
                                <PharmacyCard
                                    pharmacyLabel={pharmacy.name}
                                    pharmacyRating={pharmacy.rating}
                                    // pharmacyZipcode={pharmacy.zipcode}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                />

                {/* Labs based on the zipcode */}
                <View className="flex-row justify-between items-center px-4">
                    <Text className="text-lg font-[appfont-semi]">
                        Labs near you
                    </Text>
                    <TouchableOpacity onPress={() => toggleView()}>
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className="font-[appfont-bold] text-primary"
                        >
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Lab Data */}
                <FlatList
                    data={LabData}
                    keyExtractor={(item, index) =>
                        item.id.toString() || index.toString()
                    }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: lab }) => (
                        <View key={lab.id} className="w-[300]">
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("LabInfo", lab)
                                }
                            >
                                <LabCard
                                    labName={lab.name}
                                    labRating={lab.rating}
                                    labStoryCount={lab.labStoryCount}
                                    labzipcode={lab.zipcode}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                />
            </ScrollView>
        </CustomSafeView>
    );
};

export default DoctorDashboard;
