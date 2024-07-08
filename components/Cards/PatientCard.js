// PatientCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { customTheme } from '../../constants/themeConstants';
import { useNavigation } from '@react-navigation/native';

const PatientCard = ({ name, age, gender, bloodGroup, totalAppointments, pnumber, bio }) => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: customTheme.colors.light }} className="flex flex-row p-4 m-2 rounded-lg shadow justify-between items-center">
            <View className="flex flex-row items-center">
                <Image source={require('../../src/app/assets/doc1.webp')} className="h-16 w-16 rounded-xl mr-4" />
                <View>
                    <Text className="text-lg font-[appfont-bold]">{name}</Text>
                    <View className="flex flex-row items-center">
                        <Ionicons name="person" size={16} className="mr-1 font-[appfont-semi]" />
                        <Text className="ml-1 mr-2 text-sm font-[appfont-semi]">{`${age} `}</Text>
                        <Ionicons name={gender === 'Male' ? 'male' : 'female'} size={16} className="mx-2 font-[appfont-semi]" />
                        <Text className="text-sm ml-1 mr-2 font-[appfont-semi]">{gender}</Text>
                        <Ionicons name="water" size={16} className="mx-2 font-[appfont-semi]" />
                        <Text className="text-sm ml-1 font-[appfont-semi]">{bloodGroup}</Text>
                    </View>
                    <Text className="text-md font-[appfont-bold]">Total Appointments: {totalAppointments}</Text>
                </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: customTheme.colors.primary }} className="text-white py-2 px-4 rounded"
                onPress={() => navigation.navigate('patientInfo', {
                    name: name,
                    age: age,
                    gender: gender,
                    bloodGroup: bloodGroup,
                    phoneNumber: pnumber, 
                    bio: bio,
                })}>
                <Text className="text-sm font-[appfont-bold]" style={{color: customTheme.colors.light}}>View</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PatientCard;
