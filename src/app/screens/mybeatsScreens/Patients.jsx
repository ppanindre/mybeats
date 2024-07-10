import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { patientData } from '../../../../constants/PatientConstants';
import PatientCard from '../../../../components/Cards/PatientCard';
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { theme } from '../../../../tailwind.config';

const Patients = () => {

    const [searchQuery, setSearchQuery] = useState('');

    // Filter patient data based on the search query
    const filteredPatients = patientData.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView className="p-2 space-y-3">
            <View className="flex-row items-center justify-between h-[50] space-x-3 px-2">
                {/* Search Input Box */}
                <TextInputBoxWithIcon
                    icon={
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={theme.colors.darkSecondary}
                        />
                    }
                    placeholder="Type name"
                    onChangeText={setSearchQuery}  
                    value={searchQuery}
                />
            </View>
            <View>
                {filteredPatients.map(patient => (
                    <PatientCard key={patient.id} {...patient} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Patients;
