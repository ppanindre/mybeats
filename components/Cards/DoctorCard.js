import { View, Text, Touchable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { customTheme } from "../../constants/themeConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

const DoctorCard = ({
    doctorImage,
    doctorName,
    doctorSpecialist,
    doctorHospital,
    doctorRating,
    doctorExperience,
}) => {
    return (
        <View className="rounded-lg bg-white p-5 h-[150] w-[100%] justify-center shadow-md">
            <TouchableOpacity className="space-y-3">
                {/* Doctor Information */}
                <View className="flex-row items-center space-x-3">
                    {/* Doctor Image */}
                    <Image
                        source={require("../../assets/doc1.webp")}
                        className="w-20 h-20 mr-1 rounded-full"
                    />
                    {/* Doctor Name */}
                    <View>
                        <Text className="text-black text-lg font-[appfont-bold]">
                            {doctorName}
                        </Text>
                        <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-md font-[appfont-bold]"
                        >
                            {doctorSpecialist}
                        </Text>
                        <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-xs font-[appfont]"
                        >
                            {doctorHospital}
                        </Text>
                    </View>
                </View>

                {/* Doctor Ratings and experience */}
                <View className="flex-row justify-between">
                    {/* Ratings */}
                    <View className="flex-row space-x-2">
                        <Ionicons
                            name="star"
                            color={customTheme.colors.primary}
                            size={14}
                        />
                        <Text
                            style={{ color: customTheme.colors.dark }}
                            className="text-xs font-[appfont]"
                        >
                            {doctorRating} (500+ ratings)
                        </Text>
                    </View>

                    {/* Years of experience */}
                    <View className="flex-row space-x-2">
                        <Ionicons
                            name="time"
                            color={customTheme.colors.dark}
                            size={14}
                        />
                        <Text
                            style={{ color: customTheme.colors.dark }}
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
