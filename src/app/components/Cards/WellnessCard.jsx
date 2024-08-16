import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WellnessCard = ({ id, testName, testPrice, originalPrice, addclick }) => {
    return (
        <View className="space-y-3 p-5 rounded-lg border border-primary w-[200]">
            <View className="w-[100%] items-center justify-center">
                <Image
                    source={require("../../assets/wellness_product.jpeg")}
                    className="h-32 w-40 rounded"
                />
                <View className="absolute top-1.5 left-1.5 bg-opacity-80 py-1 px-1 rounded-md bg-light">
                    <Text className="text-xs font-bold">25% OFF</Text>
                </View>
            </View>
            <View>
                <Text className="text-md font-[appfont-semi] text-left">
                    {testName}
                </Text>
            </View>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-3">
                    <Text className="text-mg font-[appfont-semi] text-left">
                        {testPrice}
                    </Text>
                    <Text className="text-s line-through text-dark">
                        {originalPrice}
                    </Text>
                </View>
                <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color="#808080"
                    onPress={() => addclick({
                        id: id,
                        name: testName,
                        price: testPrice.replace('$', ''),
                        quantity: 1
                    })}
                />
            </View>
        </View>
    );
};

export default WellnessCard;
