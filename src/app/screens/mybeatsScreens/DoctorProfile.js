import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import TextInputBoxWithIcon from '../../../../components/Utilities/TextInputBoxWithIcon';
import { customTheme } from '../../../../constants/themeConstants';
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../../../components/CustomInput";
import MultiSelect from '../../../../components/MultiSelect';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from "react-native";
import PhoneNumberInput from 'react-native-phone-number-input';
import { useSelector } from 'react-redux';
import { isValidNumber } from 'react-native-phone-number-input';

function DoctorProfile() {

    const user = useSelector((state) => state.UserReducer);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [upiID, setupiID] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [primarySpecialization, setPrimarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Cardiology" },
            { _id: "2", value: "Neurology" },
            { _id: "3", value: "Orthopedics" }
        ],
        selectedList: []
    });
    const [secondarySpecialization, setSecondarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Surgery" },
            { _id: "2", value: "Pediatrics" },
            { _id: "3", value: "General Medicine" },
            { _id: "4", value: "Others" }
        ],
        selectedList: []
    });
    const [state, setState] = useState({
        value: "",
        list: [
            { _id: "1", value: "Andhra Pradesh" },
            { _id: "2", value: "Arunachal Pradesh" },
            { _id: "3", value: "Assam" },
            { _id: "4", value: "Bihar" },
            { _id: "5", value: "Chhattisgarh" },
            { _id: "6", value: "Goa" },
            { _id: "7", value: "Gujarat" },
            { _id: "8", value: "Haryana" },
            { _id: "9", value: "Himachal Pradesh" },
            { _id: "10", value: "Jharkhand" },
            { _id: "11", value: "Karnataka" },
            { _id: "12", value: "Kerala" },
            { _id: "13", value: "Madhya Pradesh" },
            { _id: "14", value: "Maharashtra" },
            { _id: "15", value: "Manipur" },
            { _id: "16", value: "Meghalaya" },
            { _id: "17", value: "Mizoram" },
            { _id: "18", value: "Nagaland" },
            { _id: "19", value: "Odisha" },
            { _id: "20", value: "Punjab" },
            { _id: "21", value: "Rajasthan" },
            { _id: "22", value: "Sikkim" },
            { _id: "23", value: "Tamil Nadu" },
            { _id: "24", value: "Telangana" },
            { _id: "25", value: "Tripura" },
            { _id: "26", value: "Uttar Pradesh" },
            { _id: "27", value: "Uttarakhand" },
            { _id: "28", value: "West Bengal" }
        ],
        selectedList: []
    });

    const [addressfield, setAddressfield] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [awards, setAwards] = useState('');
    const [website, setWebsite] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [otherCondition, setOtherCondition] = useState(''); // State to hold the "other" condition if specified
    const [toggleOthers, setToggleOthers] = useState(false); // State to toggle the additional input field
    const [focusedInput, setFocusedInput] = useState('');


    // Regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const licenseRegex = /^D-?\d{5,7}$/;
    const upiIDRegex = /^[A-Za-z0-9.\-]{2,256}@[A-Za-z]{2,64}$/;
    const zipRegex = /^\d{5,6}$/;
    const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;


    // Track validity for fields
    const [emailError, setEmailError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [licenseNoError, setLicenseNoError] = useState(false);
    const [upiIDError, setUpiIDError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipcodeError, setZipcodeError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);


    useEffect(() => {
        if (email === '') {
            setEmailError(false);
        } else {
            setEmailError(!emailRegex.test(email));
        }
    }, [email]);

    useEffect(() => {
        if (firstName === '') {
            setFirstNameError(false);
        } else {
            setFirstNameError(!nameRegex.test(firstName));
        }
    }, [firstName]);

    useEffect(() => {
        if (lastName === '') {
            setLastNameError(false);
        } else {
            setLastNameError(!nameRegex.test(lastName));
        }
    }, [lastName]);

    // Phone number validation
    useEffect(() => {
        if (phoneNumber == '') {
            setPhoneNumberError(false)
        }
        else {
            setPhoneNumberError(phoneNumber === '' || !isValidNumber(phoneNumber));
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (licenseNo === '') {
            setLicenseNoError(false);
        } else {
            setLicenseNoError(!licenseRegex.test(licenseNo));
        }
    }, [licenseNo]);

    useEffect(() => {
        if (upiID === '') {
            setUpiIDError(false);
        } else {
            setUpiIDError(!upiIDRegex.test(upiID));
        }
    }, [upiID]);

    useEffect(() => {
        if (city === '') {
            setCityError(false);
        } else {
            setCityError(!nameRegex.test(city));
        }
    }, [city]);

    useEffect(() => {
        if (zipcode === '') {
            setZipcodeError(false);
        } else {
            setZipcodeError(!zipRegex.test(zipcode));
        }
    }, [zipcode]);

    useEffect(() => {
        if (website === '') {
            setWebsiteError(false);
        } else {
            setWebsiteError(!websiteRegex.test(website));
        }
    }, [website]);

    const isFirstPageFieldsFilled =
        email && firstName && lastName && licenseNo && upiID && phoneNumber &&
        !emailError && !firstNameError && !lastNameError && !phoneNumberError &&
        !licenseNoError && !upiIDError;
    ;

    const isSecondPageFieldsFilled =
        primarySpecialization.selectedList.length > 0 && addressfield && city && state.selectedList.length > 0 &&
        zipcode && !cityError && !zipcodeError && !websiteError;


    const handleNext = () => {
        if (currentPage === 1 && isFirstPageFieldsFilled) {
            setCurrentPage(2);
        } else if (currentPage === 2 && isSecondPageFieldsFilled) {
            setCurrentPage(3);
        }
    };

    const getNextButtonStyle = () => ({
        backgroundColor: currentPage === 1 && !isFirstPageFieldsFilled || currentPage === 2 && !isSecondPageFieldsFilled ? customTheme.colors.lightPrimary : customTheme.colors.primary,
        opacity: currentPage === 1 && !isFirstPageFieldsFilled || currentPage === 2 && !isSecondPageFieldsFilled ? 0.5 : 1,
        cursor: currentPage === 1 && !isFirstPageFieldsFilled || currentPage === 2 && !isSecondPageFieldsFilled ? 'not-allowed' : 'pointer',
    });

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSecondarySelection = (value) => {
        setSecondarySpecialization({
            ...secondarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
        // if "Others" is selected
        const isOthersSelected = value.selectedList.some(item => item.value === "Others");
        setToggleOthers(isOthersSelected);
    };

    const selectImage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
            }
        });
    };

    const handleSubmit = () => {
        Alert.alert("Profile updated")
    };

    const renderButton = () => {
        if (currentPage < 3) {
            return (
                <TouchableOpacity
                    style={getNextButtonStyle()}
                    onPress={handleNext}
                    disabled={currentPage === 1 && !isFirstPageFieldsFilled || currentPage === 2 && !isSecondPageFieldsFilled}
                    className="flex-1 mx-3 py-4 rounded-lg flex-row justify-center items-center">
                    <Text style={{ color: customTheme.colors.light }}>Next</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={getNextButtonStyle()}
                    onPress={handleSubmit}
                    className="flex-1 mx-3 py-4 rounded-lg flex-row justify-center items-center">
                    <Text style={{ color: customTheme.colors.light }}>Submit</Text>
                </TouchableOpacity>
            );
        }
    };


    return (
        <View className="relative h-full">
            <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 100 }}>
                {currentPage === 1 && (
                    <>
                        <View className="mb-5 items-center">
                            <Image
                                source={imageUri ? { uri: imageUri } : require('../../assets/doc1.webp')}
                                className="w-28 h-28 rounded-full mb-2 bg-gray-300"
                            />
                            <TouchableOpacity
                                onPress={selectImage}
                                className="py-2 px-4 rounded-xl shadow-md"
                                style={{ backgroundColor: customTheme.colors.primary }}
                            >
                                <Text className="text-white text-center font-[appfont-bold]">Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="space-y-6 mt-3">

                            <View className="h-[50]">
                                <CustomInput
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    error={emailError}
                                    outlineColor={emailError ? customTheme.colors.error : 'gray'}
                                />
                            </View>
                            <View className="h-[50]">
                                <CustomInput
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    error={firstNameError}
                                    outlineColor={firstNameError ? customTheme.colors.error : 'gray'}
                                />
                            </View>
                            <View className="h-[50] mb-2">
                                <CustomInput
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    error={lastNameError}
                                    outlineColor={lastNameError ? customTheme.colors.error : 'gray'}
                                />
                            </View>
                            <View className="h-[50]">
                                <PhoneNumberInput
                                    defaultCode="US"
                                    value={phoneNumber}
                                    onChangeFormattedText={(text) => {
                                        setPhoneNumber(text);
                                        setPhoneNumberError(!isValidNumber(text));
                                    }}
                                    containerStyle={{
                                        width: '100%',
                                        height: 60,
                                        backgroundColor: customTheme.colors.light,
                                        borderWidth: phoneNumberError ? 2 : 1,
                                        borderColor: phoneNumberError ? 'red' : 'gray',
                                        borderRadius: 5,
                                        padding: 1
                                    }}
                                    textContainerStyle={{ paddingVertical: 10 }}
                                // autoFocus
                                />
                            </View>
                            <View className="h-[50]">
                                <CustomInput
                                    placeholder="License No / Registration No"
                                    value={licenseNo}
                                    onChangeText={setLicenseNo}
                                    error={licenseNoError}
                                    outlineColor={licenseNoError ? customTheme.colors.error : 'gray'}
                                />
                            </View>
                            <View className="h-[50]">
                                <CustomInput
                                    placeholder="UPI ID"
                                    value={upiID}
                                    onChangeText={setupiID}
                                    error={upiIDError}
                                    outlineColor={upiIDError ? customTheme.colors.error : 'gray'}
                                />
                            </View>
                        </View>
                    </>
                )}
                {currentPage === 2 && (
                    <View className="flex-1 p-4 space-y-3">
                        <View className="">
                            <MultiSelect
                                label="Primary Specialization"
                                value={primarySpecialization.value}
                                onSelection={(value) =>
                                    setPrimarySpecialization({
                                        ...primarySpecialization,
                                        value: value.text,
                                        selectedList: value.selectedList,
                                    })
                                }
                                arrayList={primarySpecialization.list}
                                selectedArrayList={primarySpecialization.selectedList}
                                multiEnable={false}
                            />
                        </View>
                        <View className="">
                            <MultiSelect
                                label="Secondary Specialization (Optional)"
                                value={secondarySpecialization.value}
                                onSelection={handleSecondarySelection}
                                arrayList={secondarySpecialization.list}
                                selectedArrayList={secondarySpecialization.selectedList}
                                multiEnable={true}
                            />
                            {toggleOthers && (
                                <View className="mt-2">
                                    <CustomInput
                                        placeholder="If other, please specify"
                                        value={otherCondition}
                                        onChangeText={setOtherCondition}
                                    />
                                </View>
                            )}
                        </View>

                        <View className="h-[50] mb-4">
                            <CustomInput
                                placeholder="Address field 1"
                                value={addressfield}
                                onChangeText={setAddressfield}
                            />
                        </View>

                        <View className="h-[50] mb-4">
                            <CustomInput
                                placeholder="City"
                                value={city}
                                onChangeText={setCity}
                                error={cityError}
                                outlineColor={cityError ? customTheme.colors.error : 'gray'}
                            />
                        </View>

                        <View className="">
                            <MultiSelect
                                label="State"
                                value={state.value}
                                onSelection={(value) =>
                                    setState({
                                        ...state,
                                        value: value.text,
                                        selectedList: value.selectedList,
                                    })
                                }
                                arrayList={state.list}
                                selectedArrayList={state.selectedList}
                                multiEnable={false}
                            />
                        </View>

                        <View className="h-[50] mb-4">
                            <CustomInput
                                placeholder="Zipcode"
                                value={zipcode}
                                onChangeText={setZipcode}
                                error={zipcodeError}
                                outlineColor={zipcodeError ? customTheme.colors.error : 'gray'}
                            />
                        </View>


                        <View className="h-[50] mb-3">
                            <CustomInput
                                placeholder="Website (Optional)"
                                value={website}
                                onChangeText={setWebsite}
                                error={websiteError}
                                outlineColor={websiteError ? customTheme.colors.error : 'gray'}
                            />
                        </View>
                    </View>
                )}
                {currentPage === 3 && (
                    <View className="flex-1 p-4 space-y-8">
                        <TextInput
                            placeholder="Education (Optional)"
                            value={education}
                            onChangeText={setEducation}
                            onFocus={() => setFocusedInput('education')}
                            onBlur={() => setFocusedInput('')}
                            className="border-2 rounded-lg p-3 text-lg"
                            style={{
                                backgroundColor: customTheme.colors.light,
                                height: 180,
                                textAlignVertical: "top",
                                borderColor: focusedInput === 'education' ? customTheme.colors.primary : customTheme.colors.darkSecondary,
                            }}
                            multiline={true}
                        />
                        <TextInput
                            placeholder="Experience (Optional)"
                            value={experience}
                            onChangeText={setExperience}
                            onFocus={() => setFocusedInput('experience')}
                            onBlur={() => setFocusedInput('')}
                            className="border-2 rounded-lg p-3 text-lg"
                            style={{
                                backgroundColor: customTheme.colors.light,
                                height: 180,
                                textAlignVertical: "top",
                                borderColor: focusedInput === 'experience' ? customTheme.colors.primary : customTheme.colors.darkSecondary,
                            }}
                            multiline={true}
                        />
                        <TextInput
                            placeholder="Awards and Recognition (Optional)"
                            value={awards}
                            onChangeText={setAwards}
                            onFocus={() => setFocusedInput('awards')}
                            onBlur={() => setFocusedInput('')}
                            className="border-2 rounded-lg p-3 text-lg"
                            style={{
                                backgroundColor: customTheme.colors.light,
                                height: 180,
                                textAlignVertical: "top",
                                borderColor: focusedInput === 'awards' ? customTheme.colors.primary : customTheme.colors.darkSecondary,
                            }}
                            multiline={true}
                        />
                    </View>
                )}
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between py-3 bg-white">
                {currentPage > 1 && (
                    <TouchableOpacity style={{ backgroundColor: customTheme.colors.lightPrimary }} className="flex-1 mx-3 py-4 rounded-lg flex-row justify-center items-center"
                        onPress={handleBack}
                    >
                        <Text style={{ color: customTheme.colors.light }} className="ml-2 font-[appfont-semi]">Back</Text>
                    </TouchableOpacity>
                )}


                {renderButton()}

            </View>
        </View>
    );
}

export default DoctorProfile;

