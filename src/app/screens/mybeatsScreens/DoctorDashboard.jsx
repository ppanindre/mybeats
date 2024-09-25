import React, { useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { getDoctorActionCreator } from "../../../../store/actions/doctorActions";
import CustomSafeView from "../../../../components/CustomSafeView";
import NavigationCard from "../../../../components/Cards/NavigationCard";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import { LabData } from "../../../../constants/LabConstants";
import LabCard from "../../../../components/Cards/LabCard";
import TopNavbar from "../../components/Utils/TopNavbar";
import FormInput from "../../components/Inputs/FormInput";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import Loader from "../../components/Utils/Loader";

const DoctorDashboard = () => {
    const { loading, doctor, error } = useSelector(
        (state) => state.doctorGetReducer
    );

    // Declare navigation instance
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDoctorActionCreator());
    }, []);

    if (loading) {
        return <Loader />;
    };

    if (error || doctor === null) {
        navigation.navigate("doctorProfile");
    }


    return (
        <CustomSafeView>
            {/* Top navbar */}
            <TopNavbar isMyBeats={true} showSync={false} />
            <ScreenContainer>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                    <View className="space-y-5">
                        <View>
                            <FormInput label="Search Patient"
                             onFocus={() => navigation.navigate("searchPatients")}/>
                        </View>

                        {/* Image slider component */}
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("appointments")
                                }
                                className="h-[150] bg-primary rounded-lg justify-center p-5 shadow-lg"
                            >
                                <Text className="font-[appfont-bold] text-xl text-light">
                                    Appointments
                                </Text>
                                <Text className="font-[appfont] text-lg text-light">
                                    Manage Your Appointments
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Cards View */}
                        <View className="flex-row justify-around space-x-5">
                            {/* First Card: Telehealth */}
                            <View className="flex-1">
                                <NavigationCard
                                    cardTitle="Profile"
                                    cardContent="Upate your Information"
                                    onPress={() =>
                                        navigation.navigate("doctorProfile")
                                    }
                                />
                            </View>

                            <View className="flex-1">
                                {/* Second Card: Patients */}
                                <NavigationCard
                                    cardTitle="Patients"
                                    cardContent="Know your patients"
                                    onPress={() =>
                                        navigation.navigate("patients")
                                    }
                                />
                            </View>
                        </View>

                        {/* Pharma card */}
                        <View>
                            <TouchableOpacity
                                className="bg-primary flex-row items-center justify-between p-5 rounded-lg"
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
                                            "uploadPrescription"
                                        )
                                    }
                                    className="bg-light py-3 px-6 rounded-full shadow-lg"
                                >
                                    <Text className="text-dark font-[appfont-semi]">
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>

                        {/* Pharmacy based on the zip codes */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                Pharmacy near you
                            </Text>
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text className="font-[appfont-bold] text-primary">
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
                                <View id={pharmacy.id} className="w-[300]">
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "pharmacyInfo",
                                                {pharmacy}
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
                            contentContainerStyle={{ gap: 10 }}
                        />

                        {/* Labs based on the zipcode */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-[appfont-semi]">
                                Labs near you
                            </Text>
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text className="font-[appfont-bold] text-primary">
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
                                <View id={lab.id} className="w-[300]">
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("labInfo", {lab} )
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
                            contentContainerStyle={{ gap: 10 }}
                        />
                    </View>
                </ScrollView>
            </ScreenContainer>
        </CustomSafeView>
    );
};

export default DoctorDashboard;