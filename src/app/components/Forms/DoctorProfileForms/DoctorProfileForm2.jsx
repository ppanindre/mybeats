import { View, Text } from "react-native";
import React from "react";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";

const DoctorProfileForm2 = () => {
    return (
        <View className="space-y-5">
            {/* Inputs */}

            {/* Primary Specialization */}
            <View>
                <MultiSelectInput label="Primary Specialization" />
            </View>

            {/* Secondary Specialization */}
            <View>
                <MultiSelectInput label="Secondary Specialization (Optional)" />
            </View>

            {/* Address */}
            <View>
                <FormInput label="Address" />
            </View>

            <View>
                <FormInput label="City" />
            </View>

            <View>
                <MultiSelectInput label="State" />
            </View>

            <View>
                <FormInput label="Zipcode" />
            </View>

            <View>
                <FormInput label="Website(Optional)" />
            </View>
        </View>
    );
};

export default DoctorProfileForm2;
