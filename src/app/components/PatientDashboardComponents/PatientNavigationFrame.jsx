import { View } from "react-native";
import React from "react";
import NavigationCard from "../../../../components/Cards/NavigationCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const PatientNavigationFrame = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.UserReducer);
    const patientId = user.userId;

    return (
        <View className="flex-row justify-around space-x-3">
            <View className="flex-1">
                <NavigationCard
                    cardTitle="Appointments"
                    cardContent="Manage Appointments"
                    onPress={() => navigation.navigate('patientAppointments', { patientId })}
                    />
            </View>
            <View className="flex-1">
                {/* Second Card: Diagnostics */}
                {/* <NavigationCard
                    cardTitle="Diagnostics"
                    cardContent="Request a lab test"
                    onPress={() => navigation.navigate("diagnostics")}
                /> */}
                 <NavigationCard
                    cardTitle="Payments"
                    cardContent="Manage Payments"
                    onPress={() => navigation.navigate("payment")}                />
            </View>
        </View>
    );
};

export default PatientNavigationFrame;
