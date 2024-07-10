import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import TextInputBoxWithIcon from '../../../../components/Utilities/TextInputBoxWithIcon';
import CustomSafeView from '../../../../components/CustomSafeView';
import { listPatientsActionCreator } from '../../../../store/actions/patientActions';
import { theme } from '../../../../tailwind.config';
import PatientCard from '../../components/Cards/PatientCard';

const SearchPatients = () => {
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState([]);
    const [searchRecommendations, setSearchRecommendations] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { patients, loading, error } = useSelector((state) => state.patientListReducer);
    console.log(patients);

    useEffect(() => {
        dispatch(listPatientsActionCreator());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !error && patients) {
            setSearchRecommendations(patients.slice(0, 5)); // Limit search recommendations to 5 initially
        }
    }, [patients, loading, error]);

    const handleDoctorCardPress = (patientId) => {
        navigation.navigate('patientInfo', { patientId });
    };

    const handlePatientSelect = (patient) => {
        const filteredData = [patient];
        setResults(filteredData);
        setSearchInput(`${patient.firstname} ${patient.lastname}`);
        setSearchRecommendations([]);
    };

    const handleSearchInput = (input) => {
        setSearchInput(input);
        setResults([]);
        
        if (input) {
            const lowerCaseInput = input.toLowerCase();
            const filteredData = patients.filter((patient) =>
                `${patient.firstname ?? ""} ${patient.lastname ?? ""} ${patient.zipcode ?? ""}`.toLowerCase().includes(lowerCaseInput)
            );
            setSearchRecommendations(filteredData.slice(0, 5));
        } else {
            setSearchRecommendations([]);
        }
    };

    const handleSearchSubmit = () => {
        const lowerCaseInput = searchInput.toLowerCase();
        const filteredData = patients.filter((patient) =>
            `${patient.firstname ?? ""} ${patient.lastname ?? ""} ${patient.zipcode ?? ""}`.toLowerCase().includes(lowerCaseInput)
        );
        setResults(filteredData);
        setSearchRecommendations([]);
    };

    return (
        <CustomSafeView>
            <View className="relative px-5 pb-3 flex-row items-center space-x-3 border-b border-darkSecondary">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <TextInputBoxWithIcon
                    onChangeText={handleSearchInput}
                    value={searchInput}
                    placeholder="Search patients by name"
                    onSubmitEditing={handleSearchSubmit}
                />
            </View>
            <ScrollView className="py-5">
                {searchRecommendations.length > 0 && (
                    <View className="px-4">
                        {searchRecommendations.map((patient) => (
                            <View
                                key={patient.id}
                                className="p-4 border-b border-darkSecondary"
                            >
                                <TouchableOpacity
                                    onPress={() => handlePatientSelect(patient)}
                                >
                                    <View className="flex-row items-center space-x-3">
                                        <Ionicons
                                            size={16}
                                            name="search-outline"
                                            color={theme.colors.dark}
                                        />
                                        <Text className="font-[appfont]">
                                            {`${patient.firstname} ${patient.lastname}`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
                {results.length > 0 && (
                    <View className="px-4 space-y-5 pb-10">
                        <Text className="text-lg font-bold">Results for "{searchInput}"</Text>
                        {results.map((patient) => (
                            <TouchableOpacity
                                key={patient.id}
                                onPress={() => handleDoctorCardPress(patient.id)}
                            >
                                <PatientCard
                                     patientName={`${patient.firstname ?? ""} ${patient.lastname ?? ""}`}
                                     patientAge={patient.age}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

            </ScrollView>
        </CustomSafeView>
    );
};

export default SearchPatients;
