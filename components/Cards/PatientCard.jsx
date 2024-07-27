import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PatientCard = (patient) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity className="bg-lightPrimary flex flex-row p-5 m-2 rounded-lg shadow justify-between items-center"
            onPress={() => navigation.navigate('patientInfo', { patientId: patient.id })}>
            <View className="flex flex-row items-center space-x-5">
                <Image source={require('../../src/app/assets/doc1.webp')} className="h-16 w-16 rounded-xl" />
                <View>
                    <Text className="text-lg font-[appfont-bold]">{patient.firstname} {patient.lastname}</Text>
                    <View className="flex flex-row items-center space-x-1">
                        <Ionicons name="person" size={16} className="font-[appfont-semi]" />
                        <Text className="text-sm font-[appfont-semi]">{`${patient.age} `}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PatientCard;
