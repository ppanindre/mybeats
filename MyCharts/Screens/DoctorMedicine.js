import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HorizontalLine from "../Components/HorizontalLine";
import { customTheme } from "../../constants/themeConstants";
import { useNavigation } from '@react-navigation/native';

const DoctorMedicine = () => {
    const [medicineItems, setMedicineItems] = useState([
        { id: 1, name: "Amoxicillin", quantity: "200ml" },
        { id: 2, name: "Ciprofloxacin", quantity: "300ml" },
        { id: 3, name: "Ibuprofen", quantity: "250ml" },
        { id: 4, name: "Dolo", quantity: "250ml" },
        { id: 5, name: "Ibup", quantity: "250ml" }
    ]);

    const navigation = useNavigation();

    const handleDelete = (id) => {
        setMedicineItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    return (
        <>
            <ScrollView className="bg-white p-6">
                <View className="flex-row items-center justify-between p-2 m-2">
                    {medicineItems.length > 0 ? (
                        <Text className="flex-1 text-xl font-[appfont-semi] ml-2">
                            Medicines
                        </Text>
                    ) : (
                        <Text className="flex-1 text-lg font-[appfont-semi] ml-2">
                            List Empty
                        </Text>
                    )}
                </View>

                <HorizontalLine />

                <View className="bg-white">
                    {medicineItems.map((item, index) => (
                        <View key={item.id} className="flex-row items-center justify-between p-5 border-b border-gray-300">
                            <Image
                                className="h-12 w-12 rounded-full"
                                source={require("../../assets/wellness_product.jpeg")}
                            />
                            <View className="flex-1 mx-5">
                                <Text className="text-lg font-[appfont-semi]">
                                    {item.name}
                                </Text>
                                <Text className="text-sm font-[appfont-semi]"
                                    style={{ color: customTheme.colors.green }}
                                >
                                    {item.quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('DoctorPrescription')
                                }}
                                className="p-2"
                            >
                                <Ionicons
                                    name="pencil"
                                    style={{ color: customTheme.colors.primary }}
                                    size={24}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                                className="p-2"
                            >
                                <Ionicons
                                    name="trash"
                                    style={{ color: customTheme.colors.primary }}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between py-3 bg-white">
                {medicineItems.length > 0 ? (
                    <TouchableOpacity
                        onPress={() => alert('Medicines sent to patient')}
                        style={{ backgroundColor: customTheme.colors.primary }}
                        className="flex-1 m-1 mx-5 py-3 rounded-lg flex-row justify-center items-center"
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Submit
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DoctorPrescription')}
                        style={{ backgroundColor: customTheme.colors.primary }}
                        className="flex-1 m-1 mx-5 py-3 rounded-lg flex-row justify-center items-center"
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Add Medicine
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

export default DoctorMedicine;
