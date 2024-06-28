import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { useDispatch, useSelector } from 'react-redux';
import { createPrescriptionActionCreator, listPrescriptionsActionCreator } from "../../../../store/actions/prescriptionActions";
import MedicineItem from "../../components/UploadPrescriptionComponents/MedicineItem";
import AppButton from "../../components/Buttons/AppButton";
import Loader from "../../components/Utils/Loader";

import {
    handleNewMedicineUpdate,
    useImageAnalysis,
    useClearNewMedicineOnFocus,
    handleDelete as handleDeleteUtil,
    normalizeText,
    formatDays,
    createAndSubmitPrescriptions
} from "../../utils/doctorMedicineUtils";

const DoctorMedicine = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [medicineItems, setMedicineItems] = useState([
        { id: 1, name: "Amoxxiellin" },
        { id: 2, name: "Ciprofloxacin" },
        { id: 4, name: "Dolo" },
        { id: 5, name: "Ibup" },
        { id: 6, name: "Amoxillin" },
    ]);
    const newMedicine = useSelector(state => state.medicineReducer?.newMedicine);
    const imageUri = useSelector(state => state.imageReducer?.imageUri); 
    const [userAddedMedicines, setUserAddedMedicines] = useState([]);
    const { recognizedTexts = [], loading, error } = useSelector((state) => state.imageRecognitionGetReducer);

    useEffect(() => {
        // redux dispatch to fetch medicines from backend
        dispatch(listPrescriptionsActionCreator());
    }, [dispatch]);

    
    useEffect(() => {
        handleNewMedicineUpdate(newMedicine, medicineItems, setMedicineItems, userAddedMedicines, setUserAddedMedicines);
    }, [newMedicine]);

    useImageAnalysis(imageUri, dispatch);
    useClearNewMedicineOnFocus(dispatch);

    const handleDelete = (id) => handleDeleteUtil(id, setMedicineItems, setUserAddedMedicines, dispatch);

    const normalizedRecognizedText = Array.isArray(recognizedTexts) ? recognizedTexts.map(text => normalizeText(text)) : [];
    const matchedMedicines = medicineItems.filter(item =>
        normalizedRecognizedText.some(text => text.includes(normalizeText(item.name)))
    );

    const allMedicines = [...matchedMedicines, ...userAddedMedicines];
    const isDetailsComplete = (item) => item.period && item.days && item.meals && item.startDate && item.endDate;
    const isSubmitEnabled = allMedicines.every(item => item.period && item.days && item.meals && item.startDate && item.endDate);

    const handleSubmit = async () => {
        if (isSubmitEnabled) {
            await createAndSubmitPrescriptions(allMedicines, dispatch, navigation);
        }
    };

    return (
        <ScreenContainer>
            {loading ? (
                <Loader/>
            ) : allMedicines.length > 0 ? (
                <ScrollView className="flex-1 mb-20">
                    <View className="flex-row items-center justify-between m-2">
                        <Text className="flex-1 text-xl font-[appfont-semi]">
                            List of medicines
                        </Text>
                    </View>
                    <View>
                        {allMedicines.map((item) => (
                            <MedicineItem
                                key={item.id}
                                item={item}
                                handleDelete={handleDelete}
                                isDetailsComplete={isDetailsComplete}
                                formatDays={formatDays}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-lg font-[appfont-semi] text-center">
                        Sorry! we could not find any medicines. Please try again or add medicine manually.
                    </Text>
                </View>
            )}

            {allMedicines.length > 0 ? (
                <View className="flex-row space-x-3">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Add more"
                            onPress={() => navigation.navigate('doctorPrescription')}
                            variant="light"
                        />
                    </View>
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Submit"
                            onPress={handleSubmit}
                            variant={isSubmitEnabled ? "primary" : "disabled"}
                        />
                    </View>
                </View>
            ) : (
                <AppButton
                    btnLabel="Add Medicine"
                    onPress={() => navigation.navigate('doctorPrescription')}
                    variant="primary"
                />
            )}
        </ScreenContainer>
    );
};

export default DoctorMedicine;
