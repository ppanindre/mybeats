import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../../tailwind.config';

const PatientHistoryCard = ({ title, iconName, onPress }) => {
    return (
        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 my-2 bg-lightPrimary rounded-lg shadow"
        onPress={onPress}>
            <View className="flex-row items-center">
                <View className={`rounded-md p-2 mr-3`}>
                    <Ionicons name={iconName} size={24}/>
                </View>
                <View>
                    <Text className="font-[appfont-semi] text-lg">{title}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={24} style={{color: theme.colors.dark}} />
        </TouchableOpacity>
    );
};

export default PatientHistoryCard;
