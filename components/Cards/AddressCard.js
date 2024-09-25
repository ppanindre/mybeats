import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../tailwind.config";

const AddressCard = ({ type, address, phone, onPress, isSelected, onEdit }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderWidth: 2,
                borderColor: isSelected ? theme.colors.primary :theme.colors.darkSecondary,
            }}
            className="bg-white shadow-lg p-3 rounded-lg space-y-3"
        >
            <View className="flex-row items-center space-x-3">
                <Ionicons
                    name="home"
                    color={theme.colors.primary}
                    size={30}
                />
                <Text className="font-[appfont-bold]">Home</Text>
            </View>

            <View>
                <Text className="font-[appfont]">{address}</Text>
            </View>

            <View>
                <Text className="font-[appfont] ">+1 {phone}</Text>
            </View>

            <TouchableOpacity onPress={onEdit}>
                <Text
                    className="font-[appfont-bold]"
                    style={{ color: theme.colors.primary }}
                >
                    Edit
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default AddressCard;