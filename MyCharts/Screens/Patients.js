import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { patientData } from '../../constants/PatientConstants';
import PatientCard from '../../components/Cards/PatientCard';
import TextInputBoxWithIcon from "../../components/Utilities/TextInputBoxWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from '../../constants/themeConstants';

const Patients = () => {

    const [searchQuery, setSearchQuery] = useState('');

    // Filter patient data based on the search query
    const filteredPatients = patientData.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView className="p-2">
            <View className="flex-row items-center justify-between mt-2 mb-4 h-[50] space-x-3 px-2">
                {/* Search Input Box */}
                <TextInputBoxWithIcon
                    icon={
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={customTheme.colors.darkSecondary}
                        />
                    }
                    placeholder="Type name"
                    onChangeText={setSearchQuery}  // Set the search query to the state
                    value={searchQuery}
                />
            </View>
            {filteredPatients.map(patient => (
                <PatientCard key={patient.id} {...patient} />
            ))}
        </ScrollView>
    );
};

export default Patients;
