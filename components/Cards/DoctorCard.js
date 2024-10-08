import { View, Text, Touchable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../tailwind.config";
import { TouchableOpacity } from "react-native-gesture-handler";

const DoctorCard = ({
    doctorName,
    doctorSpecialist,
    doctorRating,
    doctorExperience,
    doctoravailableforVideoConsultation
}) => {
    return (
        <View className="rounded-lg p-5 h-[150] w-[100%] justify-center shadow-md"
            style={{ backgroundColor: theme.colors.lightPrimary }}>
            <TouchableOpacity className="space-y-3">
                {/* Doctor Information */}
                <View className="flex-row items-center space-x-3">
                    {/* Doctor Image */}
                    <Image
                        source={require("../../src/app/assets/doc1.webp")}
                        className="w-20 h-20 mr-1 rounded-full"
                    />
                    {/* Doctor Name */}
                    <View style={{ flex: 1 }}>
                        <Text className="flex text-black text-lg font-[appfont-bold]"
                            numberOfLines={1}>
                            {doctorName}
                        </Text>
                    <View className="flex-row justify-between items-center">
                        <Text
                            style={{ color: theme.colors.dark }}
                            className="text-md font-[appfont-bold]"
                        >
                            {doctorSpecialist}
                        </Text>
                        {doctoravailableforVideoConsultation && (
                        <Ionicons name="videocam" size={24} style={{ color: theme.colors.light }} />
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
                        <Text
                            className="text-xs font-[appfont]"
                        >
                            {doctorRating} (500+ ratings)
                        </Text>
                    </View>

                    {/* Years of experience */}
                    <View className="flex-row space-x-2">
                        <Ionicons
                            name="time"
                            color={theme.colors.dark}
                            size={14}
                        />
                        <Text
                            style={{ color: theme.colors.dark }}
                            className="text-xs font-[appfont]"
                        >
                            {doctorExperience} years
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default DoctorCard;
