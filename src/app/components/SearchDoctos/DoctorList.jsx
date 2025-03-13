import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import DoctorCard from "../../../../components/Cards/DoctorCard";
import { theme } from "../../../../tailwind.config";

const DoctorList = ({ doctors, searchText, onDoctorPress, onFilterPress }) => {
  if (doctors.length === 0) return null;

  return (
    <View className="space-y-3 px-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-[appfont-bold] text-md">
          Results for "{searchText}"
        </Text>
        <TouchableOpacity onPress={onFilterPress}>
          <Ionicons size={20} name="filter" color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {doctors.map((doctor) => (
        <TouchableOpacity key={doctor.doctorID} onPress={() => onDoctorPress(doctor.doctorID)}>
          <DoctorCard doctor={doctor} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DoctorList;
