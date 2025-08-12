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
    <View className="flex flex-row justify-around space-x-3">
      <View className="flex-1">
        <NavigationCard
          className="h-full" // makes the card fill parent's height
          cardTitle="Appointments"
          cardContent="Manage Appointments"
          onPress={() =>
            navigation.navigate("patientAppointments", { patientId })
          }
        />
      </View>
      <View className="flex-1">
        <NavigationCard
          className="h-full" // makes the card fill parent's height
          cardTitle="Payments"
          cardContent="Payments History"
          onPress={() => navigation.navigate("patientPayments", { patientId })}
        />
      </View>
    </View>
  );
};

export default PatientNavigationFrame;
