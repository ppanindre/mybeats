import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DoctorInfo = ({ doctor }) => {
    return (
        <View>
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/doc1.webp")}
                    className="w-24 h-24 rounded-full border border-primary"
                />
                <View style={{ flex: 1 }} className="ml-6">
                    <Text className="text-xl font-[appfont-semi]">{`${doctor.firstname} ${doctor.lastname}`}</Text>
                    <Text className="text-sm text-gray-500 font-[appfont] text-dark">
                        {doctor.secondarySpecialization}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={15} color="#ffd700" />
                        <Text className="text-dark text-s ml-1 mr-6 font-[appfont]">
                            {doctor.rating}(500+ Ratings)
                        </Text>
                        <Ionicons name="time" size={15} color="#4b5563" className="ml-2" />
                        <Text className="text-s ml-1 font-[appfont] text-dark">{`${doctor.experience} Year Exp`}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DoctorInfo;
