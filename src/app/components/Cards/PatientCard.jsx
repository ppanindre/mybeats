import { View, Text, Image } from "react-native";
import React from "react";
import { theme } from "../../../../tailwind.config";
import { TouchableOpacity } from "react-native-gesture-handler";

const PatientCard = ({
    patientName,
    patientAge
}) => {
    return (
        <View className="rounded-lg p-5 h-[150] w-[100%] justify-center shadow-md"
            style={{ backgroundColor: theme.colors.lightPrimary }}>
            <TouchableOpacity className="space-y-3">
                {/* Patient Information */}
                <View className="flex-row items-center space-x-3">
                    {/* Patient Image */}
                    <Image
                        source={require("../../assets/doc1.webp")}
                        className="w-20 h-20 mr-1 rounded-full"
                    />
                    {/* Patient Name */}
                    <View className="flex-1">
                        <Text className="text-lg font-[appfont-bold]"
                            numberOfLines={1}>
                            {patientName}
                        </Text>
                        <Text className="font-[appfont]">Age: {patientAge}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PatientCard;