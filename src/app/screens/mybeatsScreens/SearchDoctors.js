import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomSafeView from "../../../../components/CustomSafeView";
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import DoctorCard from "../../../../components/Cards/DoctorCard";
import { listDoctorsActionCreator } from "../../../../store/actions/doctorActions";
import { theme } from "../../../../tailwind.config";
import DoctorFilters from "../../components/PatientDashboardComponents/DoctorFilters";
import { useRoute } from "@react-navigation/native";

const SearchDoctors = () => {
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState([]);
    const [originalResults, setOriginalResults] = useState([]);
    const [searchRecommendations, setSearchRecommendations] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        experience: false,
        videoConsultation: false,
        inPerson: false,
        distance: false,
        ratings: false
    });

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { doctors } = useSelector((state) => state.doctorsListReducer);

    useEffect(() => {
        dispatch(listDoctorsActionCreator());
    }, [dispatch]);

    useEffect(() => {
        if (doctors) {
            setSearchRecommendations(doctors.slice(0, 5)); // searcy recommendations to 5 
        }
    }, [doctors]);

    useEffect(() => {
        if (route.params?.specialization && Array.isArray(doctors)) {
            const specializationFilter = route.params.specialization.toLowerCase();
    
            const filteredDoctors = doctors.filter((doctor) => {
                if (doctor.secondarySpecialization) {
                    // Splitting the comma-separated specializations and trim any extra spaces
                    const specializations = doctor.secondarySpecialization
                        .split(';')
                        .map(specialization => specialization.trim().toLowerCase());
    
                    // if any specialization matches the filter
                    return specializations.includes(specializationFilter);
                }
                return false;
            });
    
            setResults(filteredDoctors);
            setOriginalResults(filteredDoctors);
            setSearchText(route.params.specialization);
            setSearchRecommendations([]); // Clearing recommendations when filtered by specialization
        }
    }, [route.params, doctors]);
    
    const handleDoctorSelect = (doctor) => {
        const filteredData = [doctor];
        setResults(filteredData);
        setOriginalResults(filteredData);
        setSearchText(`${doctor.firstname} ${doctor.lastname}`);
        setSearchRecommendations([]);
    };

    const handleDoctorCardPress = (doctorId) => {
        navigation.navigate('appointment', { doctorId });
    };

    const handleSearchInput = (input) => {
        setSearchInput(input);
        setResults([]);
        setOriginalResults([]);
        setSelectedFilters({
            experience: false,
            videoConsultation: false,
            inPerson: false,
            distance: false,
            ratings: false
        }); // to reset filters if user starts typing

        if (input) {
            const lowerCaseSearchInput = input.toLowerCase();
            const filteredData = doctors.filter((doctor) => {
                const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
                const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";
                const secondarySpecialization = doctor.secondarySpecialization ? doctor.secondarySpecialization.toLowerCase() : "";
                return fullName.includes(lowerCaseSearchInput) || zipcode.includes(lowerCaseSearchInput) || secondarySpecialization.includes(lowerCaseSearchInput);
            });
            console.log("Filtered Recommendations:", filteredData.slice(0, 5));
            setSearchRecommendations(filteredData.slice(0, 5)); 
        } else {
            setSearchRecommendations([]);
        }
    };

    const handleSearchSubmit = () => {
        const lowerCaseSearchInput = searchInput.toLowerCase();
        const filteredData = doctors.filter((doctor) => {
            const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
            const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";
            const secondarySpecialization = doctor.secondarySpecialization ? doctor.secondarySpecialization.toLowerCase() : "";
            return fullName.includes(lowerCaseSearchInput) || zipcode.includes(lowerCaseSearchInput) || secondarySpecialization.includes(lowerCaseSearchInput);
        });
        setResults(filteredData);
        setOriginalResults(filteredData);  // Storing the original search results
        setSearchRecommendations([]);
        setSearchText(searchInput);
    };

    const parseExperience = (experience) => {
        const match = experience.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const handleApplyFilters = (filters) => {
        let filteredData = [...originalResults];  // maintaining original results state and applying filter for that 
        // since experience is in string, parsing it so that filter could be applied 
        if (filters.experience) {
            filteredData = filteredData.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience));
        }
        if (filters.videoConsultation) {
            filteredData = filteredData.filter(doctor => doctor.availableForVideoConsultation);
        }
        if (filters.inPerson) {
            filteredData = filteredData.filter(doctor => !doctor.availableForVideoConsultation || doctor.availableForVideoConsultation);
        }
        setResults(filteredData);
        setFilterModalVisible(false);
    };

    return (
        <CustomSafeView>
            <View className="relative px-5 pb-3 flex-row items-center space-x-3 border-b border-darkSecondary">
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            color={theme.colors.dark}
                            name="arrow-back"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <View className="h-[50] flex-1">
                    <TextInputBoxWithIcon
                        onChangeText={handleSearchInput}
                        value={searchInput}
                        placeholder="Search Doctor, Condition, Pincode"
                        onSubmitEditing={handleSearchSubmit}
                    />
                </View>
            </View>

            <ScrollView className="py-5 h-[100%]">
                {searchRecommendations.length > 0 && (
                    <View className="px-4">
                        <View className="rounded-lg shadow-lg space-y-3">
                            {searchRecommendations.map((recommendation) => (
                                <View
                                    key={recommendation.doctorID}
                                    className="p-4 border-b border-darkSecondary"
                                >
                                    <TouchableOpacity
                                        onPress={() => handleDoctorSelect(recommendation)}
                                    >
                                        <View className="flex-row items-center space-x-3">
                                            <Ionicons
                                                size={16}
                                                name="search-outline"
                                                color={theme.colors.dark}
                                            />
                                            <Text className="font-[appfont]">
                                                {`${recommendation.firstname} ${recommendation.lastname}`}
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
                        <View className="flex-row items-center justify-between">
                            <Text className="font-[appfont-bold] text-lg">Results for "{searchText}"</Text>
                            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                                <Ionicons
                                    size={20}
                                    name="filter"
                                    color={theme.colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        {results.map((doctor) => (
                            <TouchableOpacity
                                key={doctor.doctorID}
                                onPress={() => handleDoctorCardPress(doctor.doctorID)}
                            >
                                <DoctorCard doctor={doctor}/>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            <DoctorFilters
                isVisible={isFilterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
        </CustomSafeView>
    );
};

export default SearchDoctors;
