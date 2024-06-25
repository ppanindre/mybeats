import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { useDispatch, useSelector } from 'react-redux';
import { analyzeImage } from "../../../../store/actions/imageRecognitionActions";
import * as Sentry from "@sentry/react-native";
import { createPrescriptionActionCreator, listPrescriptionsActionCreator } from "../../../../store/actions/prescriptionActions";
import MedicineItem from "../../components/UploadPrescriptionComponents/MedicineItem";
import AppButton from "../../components/Buttons/AppButton";
import Loader from "../../components/Utils/Loader";
import { clearImageUri } from '../../../../store/actions/imageActions';
import { clearNewMedicine } from "../../../../store/actions/medicineActions";

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
        if (newMedicine) {
            const normalizedMedicineName = newMedicine.name.toLowerCase();
            // Check if the medicine is already in the recognized list
            const isRecognizedMedicine = medicineItems.some(item => item.name.toLowerCase() === normalizedMedicineName);
            // Check if the medicine is already in the user-added list
            const isUserAddedMedicine = userAddedMedicines.some(item => item.name.toLowerCase() === normalizedMedicineName);
            if (isRecognizedMedicine) {
                setMedicineItems(prevItems =>
                    prevItems.map(item =>
                        item.name.toLowerCase() === normalizedMedicineName ? { ...item, ...newMedicine } : item
                    )
                );
            } else if (isUserAddedMedicine) {
                setUserAddedMedicines(prevItems =>
                    prevItems.map(item =>
                        item.name.toLowerCase() === normalizedMedicineName ? { ...item, ...newMedicine } : item
                    )
                );
            } else {
                setUserAddedMedicines(prevItems => [...prevItems, { ...newMedicine, id: Date.now() }]);
            }
        }
    }, [newMedicine]);

    // To analyze image when component mounts
    useEffect(() => {
        if (imageUri) {
            dispatch(analyzeImage(imageUri));
        }
    }, [dispatch, imageUri]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(clearNewMedicine());
            };
        }, [dispatch])
    );

    // Function to handle deletion of a medicine item
    const handleDelete = (id) => {
        setMedicineItems(currentItems => currentItems.filter(item => item.id !== id));
        setUserAddedMedicines(currentItems => currentItems.filter(item => item.id !== id));
        dispatch(clearNewMedicine()); 
    };

    // Function to normalize text by removing special characters and converting to lowercase
    const normalizeText = (text) => {
        return text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    };

    //  mappingp recognizedTexts
    const normalizedRecognizedText = Array.isArray(recognizedTexts) ? recognizedTexts.map(text => normalizeText(text)) : [];

    // Filtering medicines that match recognized text
    const matchedMedicines = medicineItems.filter(item =>
        normalizedRecognizedText.some(text => text.includes(normalizeText(item.name)))
    );

    const allMedicines = [...matchedMedicines, ...userAddedMedicines];

    // Function to format days with commas or "All" if all days are selected
    const formatDays = (days) => {
        if (Array.isArray(days) && days.length === 7) {
            return "Whole week";
        }
        return days ? days.join(', ') : "Days not specified";
    };

    console.log('Matched Medicines:', matchedMedicines);
    const isDetailsComplete = (item) => item.period && item.days && item.meals && item.startDate && item.endDate;
    const isSubmitEnabled = allMedicines.every(item => item.period && item.days && item.meals && item.startDate && item.endDate);

    const handleSubmit = async () => {
        if (isSubmitEnabled) {
            const prescriptions = allMedicines.map(medicine => ({
                medicineName: medicine.name,
                type: medicine.type,
                dosage: medicine.period,
                days: Array.from(medicine.days).join(', '),
                dosageQuantity: JSON.stringify(medicine.meals),
                startDate: medicine.startDate,
                endDate: medicine.endDate,
                doctorID: '5', // Update the doctor ID
                patientID: '5' // Update the patient ID
            }));

            try {
                await Promise.all(prescriptions.map(prescription =>
                    dispatch(createPrescriptionActionCreator(prescription))
                ));
                alert('Prescriptions sent to Patient');
                dispatch(clearImageUri()); // Clearing the image URI after submission
                dispatch(clearNewMedicine()); // clearing the medicine list after submission
                navigation.navigate('doctorMedicine');
            } catch (error) {
                console.error('Error creating prescriptions:', error);
                Sentry.captureException(error);
                alert('Error creating prescriptions');
            }
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
