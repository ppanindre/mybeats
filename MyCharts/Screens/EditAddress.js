import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import CustomSafeView from "../../components/CustomSafeView";
import { useNavigation } from "@react-navigation/native";

const EditAddress = () => {
  const navigation = useNavigation();

    return (
        <CustomSafeView>
            {/* Header */}
            <View className="px-4 py-2 border-b border-gray-300">
                <View className="flex-row items-center space-x-3">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons size={24} name="arrow-back" />
                    </TouchableOpacity>

                    {/* Header title */}
                    <View>
                        <Text className="text-xl font-[appfont-bold]">
                            Edit Address
                        </Text>
                    </View>
                </View>
            </View>
        </CustomSafeView>
    );
};

export default EditAddress;
