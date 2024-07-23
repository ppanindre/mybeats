import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { analyzeImage } from '../../../store/actions/imageRecognitionActions';
import { clearNewMedicine } from "../../../store/actions/medicineActions";
import { clearImageUri } from '../../../store/actions/imageActions';
import * as Sentry from "@sentry/react-native";
import { createPrescriptionActionCreator } from "../../../store/actions/prescriptionActions";

// handling new medicine updates
export const handleNewMedicineUpdate = (newMedicine, medicineItems, setMedicineItems, userAddedMedicines, setUserAddedMedicines) => {
    if (newMedicine) {
        const normalizedMedicineName = newMedicine.name.toLowerCase();
        const isRecognizedMedicine = medicineItems.some(item => item.name.toLowerCase() === normalizedMedicineName);
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
};

// image analysis
export const useImageAnalysis = (imageUri, dispatch) => {
    useEffect(() => {
        if (imageUri) {
            dispatch(analyzeImage(imageUri));
        }
    }, [dispatch, imageUri]);
};

// once the user goes back, setting the medicine list to empty
export const useClearNewMedicineOnFocus = (dispatch) => {
    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(clearNewMedicine());
            };
        }, [dispatch])
    );
};

// deletion of a medicine item
export const handleDelete = (id, setMedicineItems, setUserAddedMedicines, dispatch) => {
    setMedicineItems(currentItems => currentItems.filter(item => item.id !== id));
    setUserAddedMedicines(currentItems => currentItems.filter(item => item.id !== id));
    dispatch(clearNewMedicine());
};

// normalize text
export const normalizeText = (text) => {
    return text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
};

//  format days to get it displayed user friendly 
export const formatDays = (days) => {
    if (Array.isArray(days) && days.length === 7) {
        return "Whole week";
    }
    return days ? days.join(', ') : "Days not specified";
};

// creating and submitting prescriptions
export const createAndSubmitPrescriptions = async (allMedicines, dispatch, navigation) => {
    const prescriptions = allMedicines.map(medicine => ({
        medicineName: medicine.name,
        type: medicine.type,
        dosage: medicine.period,
        days: Array.from(medicine.days).join(', '),
        dosageQuantity: JSON.stringify(medicine.meals),
        startDate: medicine.startDate,
        endDate: medicine.endDate,
        patientID: '5' // Update the patient ID
    }));

    try {
        await Promise.all(prescriptions.map(prescription =>
            dispatch(createPrescriptionActionCreator(prescription))
        ));
        alert('Prescriptions sent to Patient');
        dispatch(clearImageUri());
        dispatch(clearNewMedicine());
        navigation.navigate('doctorMedicine');
    } catch (error) {
        console.error('Error creating prescriptions:', error);
        Sentry.captureException(error);
        alert('Error creating prescriptions');
    }
};
