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
import { listDoctors, listSpecialties } from "../../../graphql/queries";
import NavigationCard from "../../../../components/Cards/NavigationCard";
import DoctorCard from "../../../../components/Cards/DoctorCard";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import { LabData } from "../../../../constants/LabConstants";
import { customTheme } from "../../../../constants/themeConstants";
import LabCard from "../../../../components/Cards/LabCard";
import FormInput from "../../components/Inputs/FormInput";
import CustomSafeView from "../../../../components/CustomSafeView";
import TopNavbar from "../../components/Utils/TopNavbar";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { patientService } from "../../api/services/patientService";
import { useDispatch, useSelector } from "react-redux";

const PatientDashboard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const client = generateClient();

    const [patient, setPatient] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    const user = useSelector((state) => state.UserReducer);
    const patientStore = useSelector((state) => state.PatientReducer);

    const fetchDoctors = async () => {
        try {
            const response = await client.graphql({
                query: listDoctors,
            });
            const doctors = response.data.listDoctors.items
                .filter((doctor) => doctor.primarySpecializationId)
                .map((doctor, index) => ({
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

    useEffect(() => {
        fetchDoctors();
        fetchSpecialties();
    }, []);

    const getDoctorPrimarySpecialization = (specialtyId) => {
        if (!specialtyId) {
            return "No specialization";
        }
        const specialty = specialties.find((s) => s.id === specialtyId);
        return specialty ? specialty.name : "No specialization";
    };

    const fetchPatient = async () => {
        await patientService.getPatient(user.userId, dispatch, patientStore);
    };

    useEffect(() => {
        if (patientStore.id === null) {
            fetchPatient();
        }
    }, []);


    return (
        <CustomSafeView>
            <TopNavbar showSync={false} isMyBeats={true} />
            <ScreenContainer>
                {patient !== null ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <View className="space-y-5">
                            <View>
                                <FormInput label="Search Doctor, Health Condition, Pincode" />
                            </View>

                            {/* NavigationBanner */}
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

                            {/* Cards View */}
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
                                    onPress={() =>
                                        navigation.navigate("medicines")
                                    }
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
                                keyExtractor={(item) => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 10, padding: 5 }}
                                renderItem={({ item: doctor }) => (
                                    <View key={doctor.id} className="w-[300]">
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    "appointment",
                                                    {
                                                        name: `${doctor.firstname} ${doctor.lastname}`,
                                                        specialization:
                                                            getDoctorPrimarySpecialization(
                                                                doctor.primarySpecializationId
                                                            ),
                                                        zipcode: doctor.zipcode,
                                                        rating: doctor.rating,
                                                        experience:
                                                            doctor.experience,
                                                        city: doctor.city,
                                                        address: doctor.address,
                                                        secondarySpecialization:
                                                            doctor.secondarySpecialization,
                                                        educationExperience:
                                                            doctor.educationExperience,
                                                        awardsRecognition:
                                                            doctor.awardsRecognition,
                                                        availableForVideoConsultation:
                                                            doctor.availableForVideoConsultation,
                                                        feeForVideoConsultation:
                                                            doctor.feeForVideoConsultation,
                                                        website: doctor.website,
                                                    }
                                                )
                                            }
                                        >
                                            <DoctorCard
                                                doctorName={`${doctor.firstname} ${doctor.lastname}`}
                                                doctorHospital={doctor.zipcode}
                                                doctorRating={doctor.rating}
                                                doctorExperience={
                                                    doctor.experience
                                                }
                                                doctorSpecialist={getDoctorPrimarySpecialization(
                                                    doctor.primarySpecializationId
                                                )}
                                                doctoravailableforVideoConsultation={
                                                    doctor.availableForVideoConsultation
                                                }
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
                                    <View
                                        key={pharmacy.id}
                                        className="w-[300] border rounded-lg"
                                        style={{
                                            borderColor:
                                                customTheme.colors
                                                    .darkSecondary,
                                        }}
                                    >
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
                                                navigation.navigate(
                                                    "LabInfo",
                                                    lab
                                                )
                                            }
                                        >
                                            <LabCard
                                                labName={lab.name}
                                                labRating={lab.rating}
                                                labStoryCount={
                                                    lab.labStoryCount
                                                }
                                                labzipcode={lab.zipcode}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                contentContainerStyle={{ padding: 5, gap: 10 }}
                            />
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-1 bg-background items-center justify-center">
                        <Text className="font-[appfont-bold] text-lg">
                            Please save your profile data
                        </Text>
                    </View>
                )}
            </ScreenContainer>
        </CustomSafeView>
    );
};

export default PatientDashboard;
