import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import BookingSection from '../Components/BookingSection';
import ActionButton from '../Components/ActionButton'
import HorizontalLine from '../Components/HorizontalLine'
import CustomSafeView from '../../components/CustomSafeView'
import InteractiveMapView from '../Components/InteractiveMapView';
import { customTheme } from '../../constants/themeConstants';

const PatientStory = ({ story }) => {
    return (
        <View style={{backgroundColor: customTheme.colors.light}} className="p-2 rounded-lg mb-4">
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-4 flex-1">
                    <Text className="text-sm font-[appfont-semi]">{story.name}</Text>
                    <View className="flex-row items-center space-x-40">
                        <Text style={{color: customTheme.colors.dark}} className="text-xs font-[appfont]">{story.date}</Text>
                        <View className="flex-row items-center -mt-8">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text style={{color: customTheme.colors.dark}} className="text-xs ml-1">{story.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{color: customTheme.colors.dark}} className="text-sm mt-2 font-[appfont]">{story.comment}</Text>
        </View>
    );
};



export default LabInfo = ({ route, navigation }) => {
    const { name, rating, labStoryCount, zipcode } = route.params

    // State for clinic bookings
    const [clinicDate, setClinicDate] = useState();
    const [clinicTime, setClinicTime] = useState();

    // dummy patient stories
    const patientStories = [
        {
            id: '1',
            name: 'Raj',
            date: '5 days ago',
            rating: '4.9',
            comment: 'This doctor has been a beacon of hope for my family and me through some challenging times. His exceptional expertise in internal medicine, combined with her warm and empathetic bedside manner, made each consultation comforting. His ability to explain complex health issues in simple terms is remarkable.',
        },
        {
            id: '2',
            name: 'Revanth',
            date: '7 days ago',
            rating: '4.0',
            comment: 'This doctor has been a beacon of hope for my family and me through some challenging times. His exceptional expertise in internal medicine, combined with her warm and empathetic bedside manner, made each consultation comforting. His ability to explain complex health issues in simple terms is remarkable.',
        },
    ];

    return (
        // lab profile
        <View className="relative h-full">
            <ScrollView className="p-2 bg-white mb-12">
                <View style={{backgroundColor: customTheme.colors.light}} className="mx-1 my-1 rounded-lg overflow-hidden">
                    <View className="flex-row items-center px-4 py-2">
                        <Image
                            source={require("../../assets/pharma.jpeg")}
                            className="w-24 h-24 rounded-full border border-gray-100"
                        />
                        <View className="ml-6">
                            <Text className="text-xl font-[appfont-semi]">{`${name}`}</Text>
                            {/* <Text className="text-sm text-gray-500 font-[appfont]">{specialization}</Text> */}
                            <Text className="text-sm text-gray-500 font-[appfont]">{`${zipcode}`}</Text>
                            <View className="flex-row items-center mt-1">
                                <Ionicons name="star" size={15} color="#ffd700" />
                                <Text style={{color: customTheme.colors.dark}} className="text-s ml-1 mr-6 font-[appfont]">{rating} {labStoryCount}</Text>
                                {/* <Ionicons name="time" size={15} color="#4b5563" className="ml-2" /> */}
                                {/* <Text className="text-gray-700 text-s ml-1 font-[appfont]">{`${experience} Year Exp`}</Text> */}
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4">

                    {/* Horizontal Line Component */}
                    <HorizontalLine />
                    
                    {/* Action Button Component */}
                    <ActionButton excludeId3={true} />

                    {/* Horizontal Line Component */}
                    <HorizontalLine />
                </View>

                {/* Clinic Appointment Section */}
                <View className="flex-row justify-between items-center mt-5 bg-cyan-100 p-5 rounded-lg shadow mx-4">
                    <View className="flex-row items-center">
                        <Ionicons name="business" size={24} color="#3b82f6" className="bg-blue-100 p-1 rounded-full" />
                        <Text className="text-black-600 text-sm ml-2 font-[appfont-semi]">Lab Appointment</Text>
                    </View>
                    <Text className="text-lg font-[appfont-semi] text-gray-800">{`$50 Fee`}</Text>
                </View>

                {/* Clinic Appointment Time Slots */}
                <View className="mt-1 bg-white p-3 rounded-lg  mx-4">
                    <BookingSection
                        type="clinic"
                        selectedDate={clinicDate}
                        setSelectedDate={setClinicDate}
                        selectedTime={clinicTime}
                        setSelectedTime={setClinicTime}
                    />

                    <View className="mt-6">
                        <Text className="text-lg mt-2 font-[appfont-semi]">Patient Stories (+250)</Text>
                        {patientStories.map((story) => (
                            <PatientStory key={story.id} story={story} />
                        ))}
                    </View>
                </View>

                <View className="flex-row justify-center -mt-3 mb-4">
                    <Text style={{color: customTheme.colors.primary}} className="font-semibold">View All Stories </Text>
                    <Ionicons name="chevron-forward" size={15} color="#3b82f6" />
                </View>

                {/* Clinic Details Section */}
                <View style={{backgroundColor: customTheme.colors.light}} className="mt-4 mb-12 p-4 rounded-lg shadow mx-4">
                    <Text className="text-xl mb-3 font-[appfont-semi]">Lab Details</Text>

                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-lg font-[appfont-semi]">{`${zipcode}`}</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={15} color="#ffd700" />
                            <Text className="text-md font-medium ml-1">{rating}</Text>
                        </View>
                    </View>

                    <Text className="text-sm font-[appfont-semi] text-gray-500 mt-1">{`${name}`}</Text>

                    {/* Map Section */}
                    <InteractiveMapView
                        latitude={37.78825}
                        longitude={-122.1212}
                        name={name}
                        zipcode={zipcode}
                    />

                    <View className="flex-row justify-between items-center mt-3">
                        <View>
                            <Text className="text-sm font-[appfont-semi]">Timings</Text>
                            <Text className="text-sm font-[appfont]">Mon - Sun</Text>
                        </View>
                        <Text className="text-sm font-[appfont-semi] text-green-600">Open Today</Text>
                    </View>

                    <Text className="text-sm font-[appfont] mt-1">08:00 AM - 10:00 PM</Text>

                    <TouchableOpacity style={{backgroundColor: customTheme.colors.primary}} className="mt-3 text-white rounded-md py-2 px-4">
                        <View className="flex-row justify-center items-center">
                            <Ionicons name="call" size={20} style={{color: customTheme.colors.light}} />
                            <Text style={{color: customTheme.colors.light}} className="ml-2 font-[appfont-semi]">Contact Lab</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between mx-6 py-3 bg-white">
                <TouchableOpacity style={{backgroundColor: customTheme.colors.primary}} className="flex-1 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    <Ionicons name="search" size={20} style={{color: customTheme.colors.light}} />
                    <Text style={{color: customTheme.colors.light}} className="ml-2 font-[appfont-semi]">Search Tests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: customTheme.colors.lightPrimary}}
                    onPress={() => alert("Appointment Booked Sucessfully")}
                    className="flex-1 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    <Ionicons name="calendar" size={20} style={{color: customTheme.colors.light}} />
                    <Text style={{color: customTheme.colors.light}} className="ml-2 font-[appfont-semi]">Book Appointment</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};
