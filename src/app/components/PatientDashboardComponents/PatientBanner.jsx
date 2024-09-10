import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PatientBanner = () => {
    const navigation = useNavigation();
    return (
        <View className="h-[150] rounded-lg shadow-lg p-5 bg-primary">
            <TouchableOpacity
                onPress={() => navigation.navigate("consultDoctor")}
                className="h-[100%] justify-end"
            >
                <Text className="font-[appfont-bold] text-xl text-light">
                    Consult Doctors
                </Text>
                <Text className="font-[appfont] text-lg text-light">
                    Book an appointment
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PatientBanner;