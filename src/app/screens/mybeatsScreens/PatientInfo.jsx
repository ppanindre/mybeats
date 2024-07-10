// PatientInfo.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import PatientHistoryCard from '../../components/Cards/PatientHistoryCard';
import AppButton from '../../components/Buttons/AppButton';
import ScreenContainer from '../../components/Containers/ScreenContainer';


const Patient = ({ route }) => {
    const navigation = useNavigation();
    const { patientId } = route.params;
    const patient = useSelector((state) => state.patientListReducer.patients.find(patient => patient.id === patientId));

    const calculateBMI = (height, weight) => {
        if (!height || !weight) return 'N/A';
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2); 
    };
    
    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 space-y-5" contentContainerStyle={{ paddingBottom: 20 }}>
                <View >
                    <Image
                        source={require('../../assets/patient.avif')}
                        className="w-full h-72"
                    //   resizeMode="contain"
                    />
                    <View className="flex-row justify-around space-x-12 items-center mt-[-29] bg-lightPrimary rounded-full py-4 shadow-md">
                        <View className="flex-row items-center justify-start space-x-2">
                            <Ionicons name="person" size={24} className="font-[appfont-semi]" />
                            <Text className="font-[appfont-semi] text-lg">{`${patient.age} Years`}</Text>
                        </View>
                        <View className="flex-row items-center space-x-2">
                            {/* <Ionicons name="water" size={24} className="font-[appfont-semi]" /> */}
                            <Text className="font-[appfont-semi] text-lg">BMI: {calculateBMI(patient.height, patient.weight)}</Text>
                        </View>
                    </View>
                </View>

                <View className="">
                    <Text className="text-xl font-[appfont-bold]">{patient.firstname} {patient.lastname}</Text>
                    <View className="flex-row items-center">
                        {/* <Ionicons name={gender === 'Male' ? 'male' : 'female'} size={16} className="mx-2 font-[appfont-semi]" /> */}
                        {/* <Text className="text-lg font-[appfont-semi]">{gender}</Text> */}
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Ionicons name="call" size={16} className="font-[appfont-semi]" />
                        <Text className="text-lg font-[appfont-semi]">{patient.phoneNumber}</Text>
                    </View>
                </View>

                {/* history card section */}
                <View className="space-y-5">
                    <Text className="text-lg font-[appfont-bold]">Current diagnosis</Text>
                    <PatientHistoryCard
                        title="Septic embolization"
                        date="24 May 2021"
                        iconName="medkit-outline"
                        iconBgColor="bg-blue-100"
                    />

                    <Text className="text-lg font-[appfont-bold]">History of survey</Text>
                    <PatientHistoryCard
                        title="Blood Pressure"
                        date="21 May 2021"
                        iconName="heart-outline"
                        iconBgColor="bg-red-100"
                    />
                    <PatientHistoryCard
                        title="Laboratory tests"
                        date="18 May 2021"
                        iconName="flask-outline"
                        iconBgColor="bg-blue-100"
                    />
                    <PatientHistoryCard
                        title="Body Temperature"
                        date="12 May 2021"
                        iconName="thermometer"
                        iconBgColor="bg-yellow-100"
                    />
                </View>
            </ScrollView>
            <View className="flex-row justify-around space-x-3">
                <View className="flex-1">
                    <AppButton
                        btnLabel="Request lab test"
                        variant="light"
                    />
                </View>
                <View className="flex-1">
                    <AppButton
                        btnLabel="Give Prescription"
                        onPress={() => navigation.navigate('doctorPrescription')}
                        variant="primary"
                        // btnLeftIcon={<Ionicons name="pencil" size={20} style={{ color: theme.colors.light }} />}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

export default Patient;
