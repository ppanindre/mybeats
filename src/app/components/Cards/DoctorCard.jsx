import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../../../tailwind.config";
import { useNavigation } from "@react-navigation/native";

const ICON_SIZE = 20;

const DoctorCard = ({ doctor }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("appointment", {
                    doctor: doctor,
                })
            }
            className="rounded-lg  bg-white p-5 h-[150] w-[300] justify-center shadow-lg bg-lightPrimary"
        >
            <View className="space-y-3">
                {/* Doctor Information */}
                <View className="flex-row items-center space-x-3">
                    {/* Doctor Image */}

                    {/* Doctor Name */}
                    <View className="flex-1">
                        <Text className="text-lg font-[appfont-bold]">
                            {doctor.firstname} {doctor.lastname}
                        </Text>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-md font-[appfont-bold] text-dark">
                                {doctor.specialization}
                            </Text>
                            {doctor.isAvailableForVideoConsultation && (
                                <Ionicons
                                    name="videocam"
                                    size={ICON_SIZE}
                                    color={theme.colors.primary}
                                />
                            )}
                        </View>
                    </View>
                </View>

                {/* Doctor Ratings and experience */}
                <View className="flex-row justify-between">
                    {/* Ratings */}
                    <View className="flex-row space-x-2">
                        <Ionicons
                            name="star"
                            color={theme.colors.primary}
                            size={14}
                        />
                        <Text className="text-xs font-[appfont]">
                            {doctor.rating} (500+ ratings)
                        </Text>
                    </View>

                    {/* Years of experience */}
                    <View className="flex-row space-x-2">
                        <Ionicons
                            name="time"
                            color={theme.colors.dark}
                            size={14}
                        />
                        <Text className="text-xs font-[appfont]">
                            {doctor.experience} years
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DoctorCard;
