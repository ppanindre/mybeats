import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { patientData } from '../../../../constants/PatientConstants';
import PatientCard from '../../../../components/Cards/PatientCard';
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { theme } from '../../../../tailwind.config';
import { listPatientsActionCreator } from '../../../../store/actions/patientActions';
import Loader from '../../components/Utils/Loader';
import ScreenContainer from '../../components/Containers/ScreenContainer';

const Patients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listPatientsActionCreator());
    }, [dispatch]);

    const { patients, loading, error } = useSelector((state) => state.patientListReducer);

    if (loading) return <Loader/>;

    // Filter patient data based on the search query
    const lowerCaseInput = searchQuery.toLowerCase();
    const filteredPatients = patients?.filter(patient =>
        `${patient.firstname ?? ""} ${patient.lastname ?? ""}`.toLowerCase().includes(lowerCaseInput)
    ) ?? [];

    return (
        <ScreenContainer className="p-2 space-y-3">
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
            <ScrollView showsVerticalScrollIndicator="false">
                {filteredPatients.map(patient => (
                    <PatientCard key={patient.id} {...patient} />
                ))}
            </ScrollView>
        </ScreenContainer>
    );
};

export default Patients;
