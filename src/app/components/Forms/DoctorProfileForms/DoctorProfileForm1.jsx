import { View} from "react-native";
import React from "react";
import ProfileImageButton from "../../Buttons/ProfileImageButton";
import FormInput from "../../Inputs/FormInput";
import PhoneInput from "../../Inputs/PhoneInput";

const DoctorProfileForm1 = () => {
    return (
        <View className="space-y-5">
            {/* Profile Image Button */}
            <View className="items-center">
                <ProfileImageButton />
            </View>

            {/* Inputs */}

            {/* Email */}
            <View>
                <FormInput label="Email" />
            </View>

            {/* First Name */}
            <View>
                <FormInput label="First Name" />
            </View>

            {/* Last Name */}
            <View>
                <FormInput label="Last Name" />
            </View>

            {/* Phone Number */}
            <View>
                <PhoneInput />
            </View>

            {/* License Number */}
            <View>
                <FormInput label="License No / Registration No" />
            </View>

            {/* UPI Id */}
            <View>
                <FormInput label="UPI ID" />
            </View>

        </View>
    );
};

export default DoctorProfileForm1;
