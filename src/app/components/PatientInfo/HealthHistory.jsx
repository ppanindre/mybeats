import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../Containers/ScreenContainer';
import { theme } from '../../../../tailwind.config';

const HealthHistory = ({ route }) => {
    const { history } = route.params;
    const [showConditions, setShowConditions] = useState(false);
    const [showProcedures, setShowProcedures] = useState(false);
    const [showAllergies, setShowAllergies] = useState(false);
    const [showImmunizations, setShowImmunizations] = useState(false);

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="space-y-5">
                    <View className="space-y-2 p-4 bg-lightPrimary rounded-md">
                        <TouchableOpacity onPress={() => setShowConditions(!showConditions)} className="space-x-3 flex-row items-center justify-between">
                            <Text className="font-[appfont-semi] text-lg">Underlying Conditions</Text>
                            <Ionicons style={{ color: theme.colors.dark }} name={showConditions ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </TouchableOpacity>
                        {showConditions && history.conditions.map((condition, index) => (
                            <Text key={index} className="font-[appfont-semi] text-dark">{condition}</Text>
                        ))}
                    </View>

                    <View className="space-y-2 p-4 bg-lightPrimary rounded-md">
                        <TouchableOpacity onPress={() => setShowProcedures(!showProcedures)} className="space-x-3 flex-row items-center justify-between">
                            <Text className="font-[appfont-semi] text-lg">Previous Procedures</Text>
                            <Ionicons style={{ color: theme.colors.dark }} name={showProcedures ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </TouchableOpacity>
                        {showProcedures && history.procedures.map((procedure, index) => (
                            <View key={index} className="flex-row justify-between">
                                <Text className="font-[appfont-semi] text-dark">{procedure.procedure}</Text>
                                <Text className="font-[appfont-semi] text-dark">{procedure.date}</Text>
                            </View>
                        ))}
                    </View>


                    <View className="space-y-2 p-4 bg-lightPrimary rounded-md">
                        <TouchableOpacity onPress={() => setShowAllergies(!showAllergies)} className="space-x-3 flex-row items-center justify-between">
                            <Text className="font-[appfont-semi] text-lg">Allergies</Text>
                            <Ionicons style={{ color: theme.colors.dark }} name={showAllergies ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </TouchableOpacity>
                        {showAllergies && history.allergies.map((allergy, index) => (
                            <Text key={index} className="font-[appfont-semi] text-dark">{allergy}</Text>
                        ))}
                    </View>

                    <View className="space-y-2 p-4 bg-lightPrimary rounded-md">
                        <TouchableOpacity onPress={() => setShowImmunizations(!showImmunizations)} className="space-x-3 flex-row items-center justify-between">
                            <Text className="font-[appfont-semi] text-lg">Immunizations</Text>
                            <Ionicons style={{ color: theme.colors.dark }} name={showImmunizations ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} />
                        </TouchableOpacity>
                        {showImmunizations && history.immunizations.map((immunization, index) => (
                            <Text key={index} className="font-[appfont-semi] text-dark">{immunization}</Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default HealthHistory;
