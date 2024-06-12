import { View, Text } from "react-native";
import React from "react";
import NavigationCard from "../../../../components/Cards/NavigationCard";
import { useNavigation } from "@react-navigation/native";

const PatientNavigationFrame = () => {
    const navigation = useNavigation();

    return (
        <View className="flex-row justify-around space-x-5">
            {/* First Card: Telehealth */}
            <View className="flex-1">
                <NavigationCard
                    cardTitle="Telehealth"
                    cardContent="Video consultation"
                />
            </View>

            <View className="flex-1">
                {/* Second Card: Diagnostics */}
                <NavigationCard
                    cardTitle="Diagnostics"
                    cardContent="Request a lab test"
                    onPress={() => navigation.navigate("diagnostics")}
                />
            </View>
        </View>
    );
};

export default PatientNavigationFrame;
