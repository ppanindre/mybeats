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
    const patient = useSelector((state) => state.patientListReducer.patients?.find(patient => patient.id === patientId));

    const calculateBMI = (height, weight) => {
        if (!height || !weight) return 'N/A';
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2);
    };

    const healthHistory = {
        conditions: ['Hypertension', 'Diabetes'],
        procedures: [
            { procedure: 'Appendectomy', date: '15 March 2019' },
            { procedure: 'Knee Replacement', date: '22 July 2020' }
        ],
        allergies: ['Peanuts', 'Penicillin'],
        immunizations: ['Hepatitis B', 'Influenza']
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
                            <Text className="font-[appfont-semi] text-lg">
                                {patient.age ? `${patient.age} Years` : 'Age null'}
                            </Text>
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
                    <PatientHistoryCard
                        title="Appointments"
                        iconName="time-outline"
                        onPress={() => navigation.navigate('appointments', { patientId })}
                    />
                    <PatientHistoryCard
                        title="Health Tracking"
                        iconName="heart-outline"
                        onPress={() => navigation.navigate('healthTracking', {patientId})}
                    />
                    <PatientHistoryCard
                        title="Medications"
                        iconName="bandage-outline"
                        onPress={() => navigation.navigate('medications', { patientId })}
                    />
                    <PatientHistoryCard
                        title="Lab Test Results"
                        iconName="flask-outline"
                        onPress={() => navigation.navigate('doctorLabTestResults', { patientId })}
                    />
                    <PatientHistoryCard
                        title="Health history"
                        iconName="medkit-outline"
                        onPress={() => navigation.navigate('healthHistory', { history: healthHistory })}
                    />
                    <PatientHistoryCard
                        title="Payments"
                        iconName="cash-outline"
                    />
                </View>
            </ScrollView>
            <View className="flex-row justify-around space-x-3">
                <View className="flex-1">
                    <AppButton
                        onPress={() =>
                            navigation.navigate("umaChatBot", {
                            patientId: patient,
                            })
                        }
                        btnLabel={`Ask Uma about ${patient.firstname}`}
                        variant="primary"
                        btnRightIcon={
                            <Image
                              source={require('../../assets/uma_ai.png')}
                              className="w-10 h-10 ml-2"
                              resizeMode="cover"
                            />
                          }
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

export default Patient;
