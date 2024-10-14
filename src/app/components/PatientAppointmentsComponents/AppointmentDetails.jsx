import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const AppointmentDetails = ({ doctor, appointment, isPastAppointment, getAddress }) => {
    return (
        <View>
            <Image
                source={require('../../assets/doc1.webp')}
                className="w-full h-72"
                resizeMode='contain'
            />
            <View className="flex-row justify-around space-x-12 items-center mt-[-29] mb-3 bg-lightPrimary rounded-full py-4 shadow-md">
                <View className="flex-row items-center justify-start space-x-2">
                    <Ionicons name="person" size={24} className="font-[appfont-semi]" />
                    <Text className="font-[appfont-semi] text-lg">{`${doctor.firstname} ${doctor.lastname}`}</Text>
                </View>
            </View>

            <View className="space-y-5">
                <View className="flex-row items-center justify-between">
                    <Text className="font-[appfont-semi] text-lg">Date:</Text>
                    <Text className="font-[appfont-semi] text-lg">
                        {moment(appointment.startTime).format("D MMM YYYY")}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-[appfont-semi] text-lg">Time:</Text>
                    <Text className="font-[appfont-semi] text-lg">
                        {moment(appointment.startTime).format("H:mm a")}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-[appfont-semi] text-lg">Type:</Text>
                    <Text className="font-[appfont-semi] text-lg">
                        {appointment.type || "Clinic"}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-[appfont-semi] text-lg">Phone:</Text>
                    <Text className="font-[appfont-semi] text-lg">
                        {doctor.phoneNumber}
                    </Text>
                </View>
                {!isPastAppointment && (appointment.type === "clinic" || !appointment.type) && (
                    <View className="flex-row items-start justify-between space-x-10">
                        <Text className="font-[appfont-semi] text-lg">Clinic Address: </Text>
                        <View className="flex-1">
                            <Text className="font-[appfont-semi] text-lg text-right">
                                {getAddress()}
                            </Text>
                        </View>
                    </View>
                )}
                {!isPastAppointment && appointment.type && (
                    <View className="flex-row items-center justify-between">
                        <Text className="font-[appfont-semi] text-lg">Meeting Link</Text>
                        <Text className="font-[appfont-semi] text-lg">
                            <TouchableOpacity onPress={() => { /* Meeting link */ }}>
                                <Text className="text-primary font-[appfont-semi] text-lg">Join Meeting</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default AppointmentDetails;
