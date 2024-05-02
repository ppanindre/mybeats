import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import TextInputBoxWithIcon from '../../components/Utilities/TextInputBoxWithIcon';
import { customTheme } from '../../constants/themeConstants';
import { Ionicons } from "@expo/vector-icons";

function DoctorProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [selectedPrimary, setSelectedPrimary] = useState(null);
    const secondarySpecializations = ['Surgery', 'Pediatrics', 'General Medicine'];
    const [selectedSecondaries, setSelectedSecondaries] = useState([]);
    const [addressfield1, setAddressfield1] = useState('');
    const [addressfield2, setAddressfield2] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [awards, setAwards] = useState('');
    const [website, setWebsite] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const allFieldsFilled = firstName && lastName && licenseNo;
    const mandatoryFieldsFilled = addressfield1 && email && phoneNumber;  // Mandatory for proceeding to page 4


    const handleNext = () => {
        if (currentPage === 2 && !selectedPrimary) {
            alert('Please select a primary specialization.');
            return;
        }
        if (currentPage === 3 && !mandatoryFieldsFilled) {
            alert('Please fill in all mandatory fields.');
            return;
        }
        setCurrentPage(currentPage + 1);
    };



    const toggleSecondary = (item) => {
        setSelectedSecondaries(prev => {
            if (prev.includes(item)) {
                return prev.filter(s => s !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <ScrollView className="p-4">
            <View className="flex-row items-center">
                {currentPage > 1 && (
                    <TouchableOpacity onPress={handleBack} className="">
                        <Ionicons name="arrow-back" size={24} style={{ color: customTheme.colors.primary }} />
                    </TouchableOpacity>
                )}
                <Text className="text-base ml-3 text-lg font-[appfont-bold]" style={{ color: customTheme.colors.primary }}>{`Step ${currentPage}/5`}</Text>
            </View>
            {currentPage === 1 && (
                <>
                    <View className="mb-5 items-center">
                        <Image
                            source={imageUri ? { uri: imageUri } : require('../../assets/doc1.webp')}
                            className="w-28 h-28 rounded-full mb-2 mt-5 bg-gray-300"
                        />
                        <TouchableOpacity
                            onPress={() => {/* Implement image picker */ }}
                            className="py-2 px-4 rounded-xl shadow-md mb-5"
                            style={{ backgroundColor: customTheme.colors.primary }}
                        >
                            <Text className="text-white text-center font-[appfont-bold]">Upload Image</Text>
                        </TouchableOpacity>
                        <View className="space-y-10 mt-5 w-full">
                            <View className="h-[50]">
                                <TextInputBoxWithIcon
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View className="h-[50]">
                                <TextInputBoxWithIcon
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>
                            <View className="h-[50]">
                                <TextInputBoxWithIcon
                                    placeholder="License No / Registration No"
                                    value={licenseNo}
                                    onChangeText={setLicenseNo}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={!allFieldsFilled}
                        className={`py-3 rounded-md shadow-md my-8 ${!allFieldsFilled ? "opacity-50" : ""}`}
                        style={{
                            backgroundColor: customTheme.colors.primary
                        }}

                    >
                        <Text className="text-white text-center font-[appfont-bold]">Next</Text>
                    </TouchableOpacity>
                </>
            )}
            {currentPage === 2 && (
                <View className="flex-1 p-4 space-y-8">
                    <Text className="text-lg mb-2 font-[appfont-bold]">Primary Specialization</Text>
                    {['Cardiology', 'Neurology', 'Orthopedics'].map(spec => (
                        <CheckBox
                            key={spec}
                            title={spec}
                            checked={selectedPrimary === spec}
                            checkedColor={customTheme.colors.primary}
                            textStyle={{
                                fontFamily: 'appfont-bold'
                            }}
                            containerStyle={{
                                marginTop: 10,
                                marginLeft: 0,
                                borderRadius: 5
                            }}
                            onPress={() => setSelectedPrimary(spec)}
                        />
                    ))}
                    <Text className="text-lg mb-2 font-[appfont-bold]">Secondary Specialization</Text>
                    {secondarySpecializations.map(spec => (
                        <CheckBox
                            key={spec}
                            title={spec}
                            checkedColor={customTheme.colors.primary}
                            textStyle={{
                                fontFamily: 'appfont-bold'
                            }}
                            containerStyle={{
                                marginTop: 10,
                                marginLeft: 0,
                                borderRadius: 5
                            }}
                            checked={selectedSecondaries.includes(spec)}
                            onPress={() => toggleSecondary(spec)}
                        />
                    ))}
                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={!selectedPrimary}
                        className={`py-3 px-10 rounded-md shadow-md my-8 ${!selectedPrimary ? "opacity-50" : ""}`}
                        style={{ backgroundColor: customTheme.colors.primary }}
                    >
                        <Text className="text-white text-center font-[appfont-bold]">Next</Text>
                    </TouchableOpacity>
                </View>
            )}
            {currentPage === 3 && (
                <View className="flex-1 p-2 mt-5 space-y-10">
                    <View className="h-[50]">
                        <TextInputBoxWithIcon
                            placeholder="Address field 1"
                            value={addressfield1}
                            onChangeText={setAddressfield1}
                        />
                    </View>

                    <View className="h-[50]">
                        <TextInputBoxWithIcon
                            placeholder="Address field2"
                            value={addressfield2}
                            onChangeText={setAddressfield2}
                        />
                    </View>

                    <View className="h-[50]">
                        <TextInputBoxWithIcon
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View className="h-[50]">
                        <TextInputBoxWithIcon
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    <View className="h-[50]">
                        <TextInputBoxWithIcon
                            placeholder="Website"
                            value={website}
                            onChangeText={setWebsite}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={!mandatoryFieldsFilled}
                        className={`py-3 px-10 rounded-md shadow-md my-8 ${!mandatoryFieldsFilled ? "opacity-50" : ""}`}
                        style={{ backgroundColor: customTheme.colors.primary }}
                    >
                        <Text className="text-white text-center font-[appfont-bold]">Next</Text>
                    </TouchableOpacity>
                </View>
            )}
            {currentPage === 4 && (
                <View className="flex-1 p-4 space-y-8">
                    <TextInput
                        placeholder="Education"
                        value={education}
                        onChangeText={setEducation}
                        className="h-[150] p-4 rounded shadow-lg"
                        style={{ backgroundColor: customTheme.colors.light }}
                        multiline={true}
                    />
                    <TextInput
                        placeholder="Experience"
                        value={experience}
                        onChangeText={setExperience}
                        className="h-[150] p-4 rounded shadow-lg"
                        style={{ backgroundColor: customTheme.colors.light }}
                        multiline={true}
                    />
                    <TextInput
                        placeholder="Awards and Recognition"
                        value={awards}
                        onChangeText={setAwards}
                        className="h-[150] p-4 rounded shadow-lg"
                        style={{ backgroundColor: customTheme.colors.light }}
                        multiline={true}
                    />
                </View>
            )}
        </ScrollView>
    );
}

export default DoctorProfile;
