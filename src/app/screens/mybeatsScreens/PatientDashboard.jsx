import React from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import NavigationCard from "../../../../components/Cards/NavigationCard";
import DoctorCard from "../../../../components/Cards/DoctorCard";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { doctorData } from "../../../../constants/doctorConstants";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import { LabData } from "../../../../constants/LabConstants";
import { customTheme } from "../../../../constants/themeConstants";
import LabCard from "../../../../components/Cards/LabCard";
import FormInput from "../../components/Inputs/FormInput";
import CustomSafeView from "../../../../components/CustomSafeView";
import TopNavbar from "../../components/Utils/TopNavbar";

const PatientDashboard = () => {
    // Declare navigation instance
    const navigation = useNavigation();

    return (
        // Replace with ScreenContainer
        <CustomSafeView> 
            <TopNavbar showSync={false} isMyBeats={true} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">

                    <View>
                        <FormInput label="Search Doctor, Health Condition, Pincode"/>
                    </View>

                    {/* Create a NavigationBanner */}
                    <View>
                        <View
                            className="h-[150] rounded-lg shadow-lg p-5 bg-primary"
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("consultDoctor")
                                }
                                className="h-[100%] justify-end"
                            >
                                <Text
                                    className="font-[appfont-bold] text-xl text-light"
                                >
                                    Consult Doctors
                                </Text>
                                <Text
                                    className="font-[appfont] text-lg text-light"
                                >
                                    Book an appointment
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Cards VIew */}
                    <View className="flex-row justify-around space-x-5">
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
                                onPress={() =>
                                    navigation.navigate("diagnostics")
                                }
                            />
                        </View>
                    </View>

                    {/* Pharma card */}
                    <View>
                        <TouchableOpacity
                            className="flex-row items-center justify-between p-5 rounded-lg shadow-md bg-primary"
                            onPress={() => navigation.navigate("medicines")}
                        >
                            <View className="flex-1">
                                <Text
                                    className="text-lg font-[appfont-semi] text-light"
                                >
                                    Pharma
                                </Text>
                                <Text
                                    className="text-sm font-[appfont-semi] text-light"
                                >
                                    Order via uploading prescription
                                </Text>
                            </View>

                            {/* Upload Prescription */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("UploadPrescription")
                                }
                                className="py-3 px-6 rounded-full shadow-md bg-light"
                            >
                                <Text className="font-[appfont-semi] text-dark">
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
                </View>
            </ScrollView>
        </CustomSafeView>
    );
};

export default PatientDashboard;
