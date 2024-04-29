// PatientInfo.js
import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { customTheme } from '../../constants/themeConstants';

const HistoryCard = ({ title, date, iconName, iconBgColor }) => {
    return (
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 my-2 bg-white rounded-lg shadow">
            <View className="flex-row items-center">
                <View className={`rounded-md ${iconBgColor} p-2 mr-3`}>
                    <Ionicons name={iconName} size={24}/>
                </View>
                <View>
                    <Text className="font-[appfont-semi] text-lg">{title}</Text>
                    <Text className="font-[appfont]" style={{color: customTheme.colors.dark}} >{date}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={24} style={{color: customTheme.colors.dark}} />
        </TouchableOpacity>
    );
};

const PatientInfo = ({ route }) => {
    const navigation = useNavigation();
    const { name, age, gender, bloodGroup, phoneNumber, bio } = route.params;

    return (
        <SafeAreaView className="relative h-full">
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1" style={{ backgroundColor: customTheme.colors.light }} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="" style={{ backgroundColor: customTheme.colors.light }}>
                    <Image
                        source={require('../../assets/patient.avif')}
                        className="w-full h-72"
                    //   resizeMode="contain"
                    />
                    <View className="flex-row justify-around space-x-12 items-center mt-[-29] mx-1 bg-white rounded-full py-4 shadow-md">
                        <View className="flex-row items-center justify-start">
                            <Ionicons name="person" size={24} className="font-[appfont-semi]" />
                            <Text className="ml-2 font-[appfont-semi] text-lg">{`${age} Years`}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="water" size={24} className="font-[appfont-semi]" />
                            <Text className="ml-2 font-[appfont-semi] text-lg">{bloodGroup}</Text>
                        </View>
                    </View>
                </View>

                <View className="p-6 -mb-5">
                    <Text className="text-xl font-[appfont-bold]">{name}</Text>
                    <View className="flex-row items-center">
                        <Ionicons name={gender === 'Male' ? 'male' : 'female'} size={16} className="mx-2 font-[appfont-semi]" />
                        <Text className="text-lg font-[appfont-semi] ml-2">{gender}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons name="call" size={16} className="mx-2 font-[appfont-semi]" />
                        <Text className="text-lg font-[appfont-semi] ml-2">{phoneNumber}</Text>
                    </View>
                    {/* <View className="border-t border-gray-300 my-3" /> */}
                    {/* <Text className="text-xl font-[appfont-semi]">About {name}</Text> */}
                    {/* <Text className="text-md font-[appfont] ">{bio}</Text> */}
                </View>

                {/* history card section */}
                <View className="p-6">
                    <Text className="text-lg font-[appfont-bold] mb-2">Current diagnosis</Text>
                    <HistoryCard 
                        title="Septic embolization" 
                        date="24 May 2021" 
                        iconName="medkit-outline" 
                        iconBgColor="bg-blue-100" 
                    />

                    <Text className="text-lg font-[appfont-bold] mt-4 mb-2">History of survey</Text>
                    <HistoryCard 
                        title="Blood Pressure" 
                        date="21 May 2021" 
                        iconName="heart-outline" 
                        iconBgColor="bg-red-100" 
                    />
                    <HistoryCard 
                        title="Laboratory tests" 
                        date="18 May 2021" 
                        iconName="flask-outline" 
                        iconBgColor="bg-blue-100" 
                    />
                    <HistoryCard 
                        title="Body Temperature" 
                        date="12 May 2021" 
                        iconName="thermometer" 
                        iconBgColor="bg-yellow-100" 
                    />
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between mx-5 py-3"
                style={{ backgroundColor: customTheme.colors.light }}>
                <TouchableOpacity
                    onPress={() => ''}
                    style={{ backgroundColor: customTheme.colors.primary }}
                    className="flex-1 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    <Text style={{ color: customTheme.colors.light }} className="ml-2 font-[appfont-semi]">Request Lab Test</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('DoctorPrescription')}
                style={{backgroundColor: customTheme.colors.lightPrimary}}
                className="flex-1 m-1 py-4 rounded-lg flex-row justify-center items-center">
                    {/* <Ionicons name="md-medkit" size={20} style={{color: customTheme.colors.light}} /> */}
                    <Text style={{color: customTheme.colors.light}} className="ml-2 font-[appfont-semi]">Write Prescription</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PatientInfo;
