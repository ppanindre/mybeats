import { View, Text } from "react-native";
import React from "react";
import FormInput from "../Inputs/FormInput";

const PatientSearchInputFrame = () => {
    return (
        <View>
            <FormInput label="Search Doctor, Health Condition, Pincode" />
        </View>
    );
};

export default PatientSearchInputFrame;
