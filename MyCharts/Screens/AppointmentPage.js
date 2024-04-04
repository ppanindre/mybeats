import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import BookingSection from '../Components/BookingSection';
import ActionButton from '../Components/ActionButton'
import HorizontalLine from '../Components/HorizontalLine'

const generateTimeSlots = (startHour, endHour) => {
    const slots = [];
    let currentTime = new Date().setHours(startHour, 0, 0, 0);

    while (new Date(currentTime).getHours() < endHour) {
        let timeString = new Date(currentTime).toLocaleTimeString([], { timeStyle: 'short' });
        slots.push(timeString);
        currentTime += 30 * 60 * 1000;
    }

    return slots;
};

const PatientStory = ({ story }) => {
    return (
        <View className="bg-white p-2 rounded-lg mb-4">
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-4 flex-1">
                    <Text className="text-sm font-[appfont-semi]">{story.name}</Text>
                    <View className="flex-row items-center space-x-40">
                        <Text className="text-xs text-gray-400 font-[appfont]">{story.date}</Text>
                        <View className="flex-row items-center -mt-8">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text className="text-xs text-gray-500 ml-1">{story.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text className="text-sm text-gray-500 mt-2 font-[appfont]">{story.comment}</Text>
        </View>
    );
};

const CollapsibleItem = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="mt-2">
            <View className="flex-row justify-between items-center">
                <Text className="text-xl font-[appfont-semi]">{title}</Text>
                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="black" />
            </View>
            {isOpen && (
                <View className="mt-2">
                    <Text className="text-sm font-[appfont]">Details about {title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};


export default AppointmentPage = ({ route, navigation }) => {
    const { doctorId, firstname, lastname, specialization, zipcode, rating, experience, address } = route.params;
    const { doctor } = route.params;
    // const param = useRoute().params;
    // // Video consultation
    // const [selectedDay, setSelectedDay] = useState('today');
    // const [selectedSlot, setSelectedSlot] = useState(null);
    // const todaySlots = generateTimeSlots(9, 17);
    // const tomorrowSlots = generateTimeSlots(9, 17);

    // // Clinic appointment
    // const [selectedClinicDay, setSelectedClinicDay] = useState('today');
    // const [selectedClinicSlot, setSelectedClinicSlot] = useState(null);
    // const clinicTodaySlots = generateTimeSlots(8, 17);
    // const clinicTomorrowSlots = generateTimeSlots(8, 17);

    // State for clinic bookings
    const [clinicDate, setClinicDate] = useState();
    const [clinicTime, setClinicTime] = useState();

    // State for video consultation bookings
    const [videoDate, setVideoDate] = useState();
    const [videoTime, setVideoTime] = useState();

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

    const getSlotsForSelectedDay = (type) => {
        if (type === 'video') {
            return selectedDay === 'today' ? todaySlots : tomorrowSlots;
        } else {
            return selectedClinicDay === 'today' ? clinicTodaySlots : clinicTomorrowSlots;
        }
    };
    return (

        <View className="relative h-full">
            <ScrollView className="p-2 bg-white">
                <View className="bg-white mx-1 my-1 rounded-lg overflow-hidden">
                    <View className="flex-row items-center px-4 py-2">
                        <Image
                            source={require("../../assets/doc1.webp")}
                            className="w-24 h-24 rounded-full border border-gray-100"
                        />
                        <View className="ml-6">
                            <Text className="text-xl font-[appfont-semi]">{`${firstname} ${lastname}`}</Text>
                            <Text className="text-sm text-gray-500 font-[appfont]">{specialization}</Text>
                            <Text className="text-sm text-gray-500 font-[appfont]">{`${zipcode}`}</Text>
                            <View className="flex-row items-center mt-1">
                                <Ionicons name="star" size={15} color="#ffd700" />
                                <Text className="text-black text-s ml-1 mr-6 font-[appfont]">{rating}(500+ Ratings)</Text>
                                <Ionicons name="time" size={15} color="#4b5563" className="ml-2" />
                                <Text className="text-gray-700 text-s ml-1 font-[appfont]">{`${experience} Year Exp`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4">
                    <HorizontalLine />
                    <ActionButton />
                    <HorizontalLine />
                </View>
                <View className="flex-row justify-between items-center mt-3 bg-blue-100 p-5 rounded-lg shadow mx-4">
                    <View className="flex-row items-center">
                        <Ionicons name="videocam" size={24} color="#3b82f6" className="bg-blue-100 p-1 rounded-full" />
                        <Text className="text-black-600 text-sm ml-2 font-[appfont-semi]">Video Consultation</Text>
                    </View>
                    <Text className="text-lg font-[appfont-semi] text-gray-800">{`$50 Fee`}</Text>
                </View>

                <View className="mt-4 bg-white p-4 rounded-lg  mx-4">
                    <BookingSection
                        type="video"
                        selectedDate={videoDate}
                        setSelectedDate={setVideoDate}
                        selectedTime={videoTime}
                        setSelectedTime={setVideoTime}
                    />
                    {/* <View className="flex-row justify-between mb-3">
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedDay('today');
                                setSelectedSlot(null);
                            }}
                            className={`flex-row justify-center items-center ${selectedDay === 'today' ? 'border-b-2 border-blue-600' : ''}`}
                        >
                            <Text className={`text-lg font-[appfont-semi] ml-5 mb-2 ${selectedDay === 'today' ? 'text-blue-600' : 'text-gray-500'}`}>Today</Text>
                            <Text className="text-sm text-green-600 ml-3 mr-6 mb-2 ">{`${todaySlots.length} Slots`}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setSelectedDay('tomorrow');
                                setSelectedSlot(null);
                            }}
                            className={`flex-row justify-center items-center ${selectedDay === 'tomorrow' ? 'border-b-2 border-blue-600' : ''}`}
                        >
                            <Text className={`text-lg font-[appfont-semi]  ml-6 mb-2 ${selectedDay === 'tomorrow' ? 'text-blue-600' : 'text-gray-500'}`}>Tomorrow</Text>
                            <Text className="text-sm text-green-600 ml-3 mr-6 mb-2">{`${tomorrowSlots.length} Slots`}</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Slots ScrollView */}
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-2">
                        {getSlotsForSelectedDay('video').map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedSlot(slot)}
                                className={`border rounded-lg py-3 px-4 mr-2 mb-2 border-gray-300 ${selectedSlot === slot ? 'bg-blue-600' : 'bg-white'}`}
                            >
                                <Text className={`text-lg font-[appfont-semi] ${selectedSlot === slot ? 'text-white' : 'text-gray-500'}`}>{slot}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View className="flex-row justify-center mt-4">
                        <Text className="text-blue-600 font-semibold">View All Slots </Text>
                        <Ionicons name="chevron-forward" size={15} color="#3b82f6" />
                    </View> */}
                </View>

                {/* Clinic Appointment Section */}
                <View className="flex-row justify-between items-center mt-5 bg-cyan-100 p-5 rounded-lg shadow mx-4">
                    <View className="flex-row items-center">
                        <Ionicons name="business" size={24} color="#3b82f6" className="bg-blue-100 p-1 rounded-full" />
                        <Text className="text-black-600 text-sm ml-2 font-[appfont-semi]">Clinic Appointment</Text>
                    </View>
                    <Text className="text-lg font-[appfont-semi] text-gray-800">{`$50 Fee`}</Text>
                </View>

                <View className="mt-2 p-4 ml-2">
                    <Text className="text-lg text-black-500 font-[appfont-semi]">{`${zipcode}`}</Text>
                    <Text className="text-md text-gray-500 font-[appfont-semi]">{`${address}`}</Text>
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

                    {/* <View className="flex-row justify-between mb-3">
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedClinicDay('today');
                                setSelectedClinicSlot(null);
                            }}
                            className={`flex-row justify-center items-center ${selectedClinicDay === 'today' ? 'border-b-2 border-blue-600' : ''}`}
                        >
                            <Text className={`text-lg font-[appfont-semi] ml-5 mb-2 ${selectedClinicDay === 'today' ? 'text-blue-600' : 'text-gray-500'}`}>Today</Text>
                            <Text className="text-sm text-green-600 ml-3 mr-6 mb-2 ">{`${clinicTodaySlots.length} Slots`}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setSelectedClinicDay('tomorrow');
                                setSelectedClinicSlot(null);
                            }}
                            className={`flex-row justify-center items-center ${selectedClinicDay === 'tomorrow' ? 'border-b-2 border-blue-600' : ''}`}
                        >
                            <Text className={`text-lg font-[appfont-semi]  ml-6 mb-2 ${selectedClinicDay === 'tomorrow' ? 'text-blue-600' : 'text-gray-500'}`}>Tomorrow</Text>
                            <Text className="text-sm text-green-600 ml-3 mr-6 mb-2">{`${clinicTomorrowSlots.length} Slots`}</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Clinic Slots ScrollView */}
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-2">
                        {getSlotsForSelectedDay('clinic').map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedClinicSlot(slot)}
                                className={`border rounded-lg py-3 px-4 mr-2 mb-2 border-gray-300 ${selectedClinicSlot === slot ? 'bg-blue-600' : 'bg-white'}`}
                            >
                                <Text className={`text-lg font-[appfont-semi] ${selectedClinicSlot === slot ? 'text-white' : 'text-gray-500'}`}>{slot}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView> */}
                    {/* <View className="flex-row justify-center mt-4">
                        <Text className="text-blue-600 font-semibold">View All Slots </Text>
                        <Ionicons name="chevron-forward" size={15} color="#3b82f6" />
                    </View> */}

                    {/* Patient Stories Section */}
                    <View className="mt-6">
                        <Text className="text-lg mt-2 font-[appfont-semi]">Patient Stories (+250)</Text>
                        {patientStories.map((story) => (
                            <PatientStory key={story.id} story={story} />
                        ))}
                    </View>
                </View>

                <View className="flex-row justify-center -mt-3 mb-4">
                    <Text className="text-blue-600 font-semibold">View All Stories </Text>
                    <Ionicons name="chevron-forward" size={15} color="#3b82f6" />
                </View>

                {/* Clinic Details Section */}
                <View className="mt-4 mb-2 p-4 bg-white rounded-lg shadow mx-4">
                    <Text className="text-xl mb-3 font-[appfont-semi]">Clinic Details</Text>

                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-lg font-[appfont-semi]">{`${zipcode}`}</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={15} color="#ffd700" />
                            <Text className="text-md font-medium ml-1">4.5</Text>
                        </View>
                    </View>

                    <Text className="text-sm font-[appfont-semi] text-gray-500 mt-1">{`${address}`}</Text>

                    <View className="flex-row justify-between items-center mt-3">
                        <View>
                            <Text className="text-sm font-[appfont-semi]">Timings</Text>
                            <Text className="text-sm font-[appfont]">Mon - Sun</Text>
                        </View>
                        <Text className="text-sm font-[appfont-semi] text-green-600">Open Today</Text>
                    </View>

                    <Text className="text-sm font-[appfont] mt-1">08:00 AM - 10:00 PM</Text>

                    <TouchableOpacity className="mt-3 bg-blue-600 text-white rounded-md py-2 px-4">
                        <View className="flex-row justify-center items-center">
                            <Ionicons name="call" size={20} color="white" />
                            <Text className="text-white ml-2 font-[appfont-semi]">Contact Clinic</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mt-4 mb-24 p-4 bg-white rounded-lg  mx-4">
                    {/* <Text className="text-lg font-semibold">Doctor Details</Text> */}

                    <CollapsibleItem title="Specializations" />
                    <CollapsibleItem title="Education" />
                    <CollapsibleItem title="Experience" />
                    <CollapsibleItem title="Awards And Recognitions" />
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between mx-6 py-3 bg-white">
                <TouchableOpacity className="flex-1 bg-blue-600 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    <Ionicons name="videocam" size={20} color="white" />
                    <Text className="text-white ml-2 font-[appfont-semi]">Video Consult</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-cyan-500 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    <Ionicons name="calendar" size={20} color="white" />
                    <Text className="text-white ml-2 font-[appfont-semi]">Book Appointment</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};
