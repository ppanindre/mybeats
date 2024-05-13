import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import ProfileImageButton from "../../Buttons/ProfileImageButton";
import FormInput from "../../Inputs/FormInput";
import PhoneInput from "../../Inputs/PhoneInput";
import AppButton from "../../Buttons/AppButton";

const DoctorProfileForm1 = ({ handlePressNext }) => {
    // STATES
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [upiId, setUpiId] = useState("");

    /**
     * function to handle when user presses next
     */
    const onPressNext = () => {
        const doctorProfileData1 = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            licenseNumber: licenseNumber,
            upiId: upiId,
        };

        handlePressNext(doctorProfileData1);
    };

    return (
        <View className="h-[100%] space-y-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {/* Profile Image Button */}
                    <View className="items-center">
                        <ProfileImageButton />
                    </View>

                    {/* Inputs */}

                    {/* Email */}
                    <View>
                        <FormInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            label="Email"
                        />
                    </View>

                    {/* First Name */}
                    <View>
                        <FormInput
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            label="First Name"
                        />
                    </View>

                    {/* Last Name */}
                    <View>
                        <FormInput
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            label="Last Name"
                        />
                    </View>

                    {/* Phone Number */}
                    <View>
                        <PhoneInput
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>

                    {/* License Number */}
                    <View>
                        <FormInput
                            value={licenseNumber}
                            onChangeText={(text) => setLicenseNumber(text)}
                            label="License No / Registration No"
                        />
                    </View>

                    {/* UPI Id */}
                    <View>
                        <FormInput
                            value={upiId}
                            onChangeText={(text) => setUpiId(text)}
                            label="UPI ID"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Overlay button */}
            <View>
                <AppButton
                    variant="primary"
                    btnLabel="Next"
                    onPress={onPressNext}
                />
            </View>
        </View>
    );
};

export default DoctorProfileForm1;
