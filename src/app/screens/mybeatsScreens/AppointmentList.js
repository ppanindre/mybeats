import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { customTheme } from '../../../../constants/themeConstants';
import { useNavigation } from "@react-navigation/native";

// Tab selector for previous and upcoming apppointments 
const TabSelector = ({ isActive, text, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: isActive ? customTheme.colors.primary : customTheme.colors.light,
            }}
            className={isActive ? "flex-1 justify-center py-4" : "flex-1 justify-center py-2"}
        >
            <Text
                style={{
                    color: isActive ? customTheme.colors.light : customTheme.colors.primary,
                }}
                className={isActive ? "text-center  font-[appfont-bold]" : "text-center font-[appfont-bold]"}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

// Appointment Card Component
const AppointmentCard = ({ name, type, time }) => {
    const iconName = type.includes('Video') ? 'videocam' : 'chatbubbles';

    return (
        <View className="bg-white m-2 p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <Image
                    source={require('../../assets/doc1.webp')}
                    className="h-16 w-16 rounded-full mr-4"
                />
                <View className="flex-1">
                    <Text className="font-[appfont-semi] text-lg">{name}</Text>
                    <Text className="font-[appfont] text-gray-600">{type}</Text>
                    <Text className="font-[appfont] text-gray-500">{time}</Text>
                </View>
                <Ionicons name={iconName} size={24} style={{ color: customTheme.colors.primary }} />
            </View>
        </View>
    );
};

const AppointmentList = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('upcoming');
    
    // upcoming appointments dummy data
    const upcomingAppointments = [
        {
            id: '1',
            date: '19 Jan 2023',
            name: 'Joshep Williamson',
            type: 'Video Call - Accepted',
            time: '07:10 AM - 08:00',
        },
        {
            id: '2',
            date: '19 Jan 2023',
            name: 'Freya Davies',
            type: 'Voice Call - Accepted',
            time: '08:10 PM - 08:30',
        },
        {
            id: '3',
            date: '21 Jan 2023',
            name: 'John',
            type: 'Video Call - Accepted',
            time: '08:10 PM - 08:30',
        },
        {
            id: '4',
            date: '23 Jan 2023',
            name: 'David',
            type: 'Voice Call - Accepted',
            time: '08:10 PM - 08:30',
        },
        {
            id: '5',
            date: '23 Jan 2023',
            name: 'Dane',
            type: 'Voice Call - Accepted',
            time: '08:10 PM - 08:30',
        },
    ];
    
    // past appointments dummy data 
    const pastAppointments = [
        {
            id: '1',
            date: '13 March 2022',
            name: 'Dreshal Son',
            type: 'Video Call ',
            time: '10:10 AM - 12:00',
        },
        {
            id: '2',
            date: '13 March 2022',
            name: 'Sarah Glenn',
            type: 'Voice Call',
            time: '01:10 AM - 02:00',
        },
        {
            id: '3',
            date: '10 March 2022',
            name: 'Sarah Glenn',
            type: 'Voice Call',
            time: '01:10 AM - 02:00',
        },
        {
            id: '4',
            date: '9 March 2022',
            name: 'Sarah Glenn',
            type: 'Voice Call',
            time: '01:10 AM - 02:00',
        },
    ];

    const appointmentsData = selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

    return (
        <View className="flex-1 p-4" >

            {/* Tab Navigation */}
            <View
                style={{
                    backgroundColor: customTheme.colors.primary
                }}
                className="flex-row">
                <TabSelector
                    isActive={selectedTab === 'upcoming'}
                    text="Upcoming"
                    onPress={() => setSelectedTab('upcoming')}
                />
                <TabSelector
                    isActive={selectedTab === 'past'}
                    text="Past"
                    onPress={() => setSelectedTab('past')}
                />
            </View>

            {/* Appointments List */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                className="bg-gray-100">
                {appointmentsData.map((appointment, index) => (
                    <View key={appointment.id}>
                        {index === 0 || appointmentsData[index - 1].date !== appointment.date ? (
                            <Text className="px-4 pt-4 pb-2 font-[appfont-bold] text-gray-800">
                                {appointment.date}
                            </Text>
                        ) : null}
                        <AppointmentCard {...appointment} />
                    </View>
                ))}
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between mx py-3"
                style={{ backgroundColor: customTheme.colors.light }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DoctorAvailability')}
                    style={{ backgroundColor: customTheme.colors.primary }}
                    className="flex-1 mx-5 py-4 rounded-lg flex-row justify-center items-center">
                    <Text style={{ color: customTheme.colors.light }} className="ml-2 font-[appfont-semi]">Set your availabilty</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentList;
