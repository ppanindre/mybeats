import { View, Text } from "react-native";
import React from "react";
import FormInput from "../Inputs/FormInput";
import { useNavigation } from "@react-navigation/native";

const PatientSearchInputFrame = () => {
    const navigation = useNavigation();
    return (
        <View>
            <FormInput label="Search Doctor, Health Condition, Pincode" 
            onFocus={() => navigation.navigate("searchDoctors")}/>
        </View>
    );
};

export default PatientSearchInputFrame;
