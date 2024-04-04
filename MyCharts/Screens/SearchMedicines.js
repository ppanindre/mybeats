import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import CustomSafeView from "../../components/CustomSafeView";
import TextInputBoxWithIcon from "../../components/Utilities/TextInputBoxWithIcon";
import { customTheme } from "../../constants/themeConstants";
import { useNavigation } from "@react-navigation/native";
import DoctorCard from "../../components/Cards/DoctorCard";
import { doctorData } from "../../constants/doctorConstants";

const recommendationsData = [
    {
        id: 1,
        name: "John Doe",
        specialization: "Cardiology",
        hospital: "Southern California Hospital",
        zipcode: "12345",
        rating: 4.8,
        experience: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        specialization: "Neurology",
        hospital: "Northern California Hospital",
        zipcode: "67890",
        rating: 4.5,
        experience: 2,
    },
    {
        id: 3,
        name: "Jane Doe",
        hospital: "New York Hospital",
        specialization: "Neurology",
        zipcode: "67390",
        rating: 3.1,
        experience: 3,
    },
];

const SearchMedicines = () => {
    // STATES
    const [results, setResults] = useState([]); // set the search results here
    const [searchRecommendations, setSearchRecommendations] =
        useState(recommendationsData); // set search recommendations

    // Declare navigation instance
    const navigation = useNavigation();

    const handleSearchInput = (searchInput) => {
        setResults([]);
        // Convert the search input to lower case
        const lowerCaseSearchInput = searchInput.toLowerCase();

        // Filter the dummy data to match any attribute
        const filteredData = recommendationsData.filter((doctor) => {
            return (
                doctor.name.toLowerCase().includes(lowerCaseSearchInput) ||
                doctor.specialization
                    .toLowerCase()
                    .includes(lowerCaseSearchInput) ||
                doctor.pinCode == searchInput
            );

            // set the filtered results
        });
        setSearchRecommendations(filteredData);
    };

    // Function to display result search
    const displayResult = (query) => {
        const filteredData = doctorData.filter((doctor) => {
            return (
                doctor.name.toLowerCase().includes(query.name) ||
                doctor.specialization.includes(query.specialization)
            );
        });

        setSearchRecommendations([]);

        setResults(filteredData);
    };

    console.log("results", results);

    return (
        <CustomSafeView>
            {/* Header */}
            <View className="relative px-5 pb-3 flex-row items-center space-x-3 border-b border-gray-300">
                {/* Go back button */}
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            color={customTheme.colors.dark}
                            name="arrow-back"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                {/* Search Input Box */}
                <View className="h-[50] flex-1">
                    <TextInputBoxWithIcon
                        onChangeText={(searchInput) =>
                            handleSearchInput(searchInput)
                        }
                        placeholder="Search Pharmacy, Medicines, Pincode"
                    />
                </View>
            </View>

            {/* View to render the searched items */}
            <ScrollView className="py-5 h-[100%] bg-gray-100">
                {/* Dropdown */}
                {recommendationsData.length > 0 && (
                    <View className="px-4">
                        <View className="bg-white rounded-lg shadow-lg">
                            {searchRecommendations.map((recommendation) => (
                                <View className="p-4 border-b border-gray-100">
                                    <TouchableOpacity
                                        onPress={() =>
                                            displayResult(recommendation)
                                        }
                                    >
                                        <View className="flex-row items-center space-x-3">
                                            <Ionicons
                                                size={16}
                                                name="search-outline"
                                                color={customTheme.colors.dark}
                                            />
                                            <Text className="font-[appfont]">
                                                {recommendation.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                {results.length > 0 && (
                    <View className="space-y-3 px-4">
                        {results.length > 0 &&
                            results.map((doctor) => (
                                <View>
                                    <DoctorCard
                                        doctorName={doctor.name}
                                        doctorHospital={doctor.hospital}
                                        doctorRating={doctor.rating}
                                        doctorExperience={doctor.experience}
                                        doctorSpecialist={doctor.specialization}
                                    />
                                </View>
                            ))}
                    </View>
                )}
            </ScrollView>
        </CustomSafeView>
    );
};

export default SearchMedicines;
