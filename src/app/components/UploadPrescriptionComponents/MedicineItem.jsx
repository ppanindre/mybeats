import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { customTheme } from '../../../../constants/themeConstants';
import { useNavigation } from '@react-navigation/native';
import CollapsibleItem from '../../../../components/CollapsibleItem';

const MedicineItem = ({ item, handleDelete, isDetailsComplete, formatDays }) => {
    const navigation = useNavigation();
    
    return (
        <View key={item.id} className="p-3 border-b border-darkSecondary">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Image
                        className="h-12 w-12 rounded-full"
                        source={require("../../assets/wellness_product.jpeg")}
                    />
                    <View className="ml-4">
                        <Text className="text-lg font-[appfont-semi]">
                            {item.name}
                        </Text>
                    </View>
                </View>
                <View className="flex-row">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('doctorPrescription', { selectedMedicine: item })
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
            </View>

            <CollapsibleItem titleComponent={
                <Text className={`text-sm font-[appfont-semi] ${isDetailsComplete(item) ? 'text-dark' : 'text-primary'}`}>
                    {isDetailsComplete(item) ? "Dosage Details" : "Dosage Details Missing"}
                </Text>
            }>
                <Text className="text-sm font-[appfont-semi] text-dark">
                    {formatDays(item.days)}
                </Text>
                <Text className="text-sm font-[appfont-semi] text-dark">
                    {item.period || "Period not specified"}
                </Text>
                {item.meals && Object.keys(item.meals).length > 0 ? (
                    <Text className="text-sm font-[appfont-semi] text-dark">
                        {Object.entries(item.meals).map(([meal, dosage], index) => (
                            `${meal} - ${dosage}`
                        )).join("\n")}
                    </Text>
                ) : (
                    <Text className="text-sm font-[appfont-semi] text-dark">
                        Dosage not specified
                    </Text>
                )}
                <Text className="text-sm font-[appfont-semi] text-dark">
                    {`Start Date: ${item.startDate ? moment(item.startDate).format('MMMM D, YYYY') : 'not specified'}`}
                </Text>
                <Text className="text-sm font-[appfont-semi] text-dark">
                    {`End Date: ${item.endDate ? moment(item.endDate).format('MMMM D, YYYY') : 'not specified'}`}
                </Text>
                {item.note ? (
                    <Text className="text-sm font-[appfont-semi] text-dark">
                        Note: {item.note}
                    </Text>
                ) : (
                    <Text className="text-sm font-[appfont-semi] text-dark">
                        Notes not specified
                    </Text>
                )}
            </CollapsibleItem>
        </View>
    );
};

export default MedicineItem;
