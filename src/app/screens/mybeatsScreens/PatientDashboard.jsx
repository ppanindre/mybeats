import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { generateClient } from "aws-amplify/api";
import { listDoctors, listSpecialties, listDoctorSpecialties } from "../../../graphql/queries";
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
import ScreenContainer from "../../components/Containers/ScreenContainer";

const PatientDashboard = () => {
    // Declare navigation instance
    const navigation = useNavigation();

    const client = generateClient();

    const [doctors, setDoctors] = useState([]);

    const [specialties, setSpecialties] = useState([]);
    const [doctorSpecialties, setDoctorSpecialties] = useState([]);

    const fetchDoctors = async () => {
        try {
            const response = await client.graphql({
                query: listDoctors,
            });
            const doctors = response.data.listDoctors.items.map((doctor, index) => ({
                ...doctor,
                id: doctor.id || index.toString(),
            }));
            setDoctors(doctors);
        } catch (error) {
            console.error("Error fetching doctors", error);
        }
    };

    const fetchSpecialties = async () => {
        try {
            const response = await client.graphql({
                query: listSpecialties,
            });
            const specialties = response.data.listSpecialties.items;
            setSpecialties(specialties);
        } catch (error) {
            console.error("Error fetching specialties", error);
        }
    };

    const fetchDoctorSpecialties = async () => {
        try {
            const response = await client.graphql({
                query: listDoctorSpecialties,
            });
            const doctorSpecialties = response.data.listDoctorSpecialties.items;
            setDoctorSpecialties(doctorSpecialties);
        } catch (error) {
            console.error("Error fetching doctor specialties", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchSpecialties();
        fetchDoctorSpecialties();
    }, []);

    const getDoctorSpecialty = (doctorId) => {
        const docSpecialty = doctorSpecialties.find(ds => ds.doctorDoctorID === doctorId);
        if (docSpecialty) {
            const specialty = specialties.find(s => s.id === docSpecialty.specialtyId);
            return specialty ? specialty.name : "No specialty";
        }
        return "No specialty";
    };

    return (
        // Replace with ScreenContainer
        <CustomSafeView>
            <TopNavbar showSync={false} isMyBeats={true} />

            <ScreenContainer>
                <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}>
                    <View className="space-y-5">
                        <View>
                            <FormInput label="Search Doctor, Health Condition, Pincode" />
                        </View>

                        {/* Create a NavigationBanner */}
                        <View>
                            <View className="h-[150] rounded-lg shadow-lg p-5 bg-primary">
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("consultDoctor")
                                    }
                                    className="h-[100%] justify-end"
                                >
                                    <Text className="font-[appfont-bold] text-xl text-light">
                                        Consult Doctors
                                    </Text>
                                    <Text className="font-[appfont] text-lg text-light">
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
                                    <Text className="text-lg font-[appfont-semi] text-light">
                                        Pharma
                                    </Text>
                                    <Text className="text-sm font-[appfont-semi] text-light">
                                        Order via uploading prescription
                                    </Text>
                                </View>

                                {/* Upload Prescription */}
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            "UploadPrescription"
                                        )
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
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                {" "}
                                Doctors near You
                            </Text>
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text
                                    style={{
                                        color: customTheme.colors.primary,
                                    }}
                                    className="font-[appfont-bold]"
                                >
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>

                         {/* Doctor data */}
                         <FlatList
                            data={doctors}
                            keyExtractor={(item) =>
                                item.id.toString()
                            }
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                gap: 10,
                                padding: 5,
                            }}
                            renderItem={({ item: doctor }) => (
                                <View key={doctor.id} className="w-[300]">
                                    <TouchableOpacity
                                       onPress={() =>
                                        navigation.navigate(
                                            "appointment",
                                            {
                                                name: `${doctor.firstname} ${doctor.lastname}`,
                                                specialization: doctor.specialization,
                                                zipcode: doctor.zipcode,
                                                rating: doctor.rating,
                                                experience: doctor.experience,
                                                city: doctor.city,
                                                specialization: getDoctorSpecialty(doctor.id)
                                            }
                                        )
                                    }
                                    >
                                        <DoctorCard
                                            doctorName={`${doctor.firstname} ${doctor.lastname}`}
                                            doctorHospital={doctor.zipcode}
                                            doctorRating={doctor.rating}
                                            doctorExperience={doctor.experience}
                                            doctorSpecialist={getDoctorSpecialty(doctor.id)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {/* Pharmacy based on the zip codes */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                Pharmacy near you
                            </Text>
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text
                                    style={{
                                        color: customTheme.colors.primary,
                                    }}
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
                                <View key={pharmacy.id} className="w-[300] border rounded-lg" style={{borderColor:customTheme.colors.darkSecondary}}>
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
                            contentContainerStyle={{ padding: 5, gap: 10 }}
                        />

                        {/* Labs based on the zipcode */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                Labs near you
                            </Text>
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text
                                    style={{
                                        color: customTheme.colors.primary,
                                    }}
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
                            contentContainerStyle={{ padding: 5, gap: 10 }}
                        />
                    </View>
                </ScrollView>
            </ScreenContainer>
        </CustomSafeView>
    );
};

export default PatientDashboard;
