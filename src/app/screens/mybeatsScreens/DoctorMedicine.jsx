import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { useDispatch, useSelector } from 'react-redux';
import { createDoctorPrescriptionActionCreator, listDoctorPrescriptionsByAppointmentActionCreator } from "../../../../store/actions/prescriptionActions";
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
} from "../../utils/doctorMedicineUtils";
import { deleteDoctorPrescriptionActionCreator } from "../../../../store/actions/prescriptionActions";

const DoctorMedicine = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const newMedicine = useSelector(state => state.medicineReducer?.newMedicine);
    const imageUri = useSelector(state => state.imageReducer?.imageUri);
    const prescriptionList = useSelector((state) => state.prescriptionList);

    const { appointmentId, patientId } = route.params;

    const [medicineItems, setMedicineItems] = useState([]);
    const [userAddedMedicines, setUserAddedMedicines] = useState([]);

    // helper function to parse days and dosageQuantity fields
    const parsePrescriptionData = (prescriptions) => {
        return prescriptions
            .filter(prescription => !prescription._deleted)
            .map(prescription => {
                const formattedDosageQuantity = prescription.dosageQuantity
                    ? Object.fromEntries(
                        prescription.dosageQuantity
                            .replace(/{|}/g, '')
                            .split(', ')
                            .map(entry => entry.split('='))
                    )
                    : {};

                const formattedDays = prescription.days
                    ? prescription.days.replace(/[\[\]"]/g, '').split(', ')
                    : [];

                return {
                    ...prescription,
                    name: prescription.medicineName,
                    meals: formattedDosageQuantity,
                    days: formattedDays,
                    period: prescription.dosage
                };
            });
    };

    // prescriptions for this appointment
    useEffect(() => {
        if (appointmentId) {
            dispatch(listDoctorPrescriptionsByAppointmentActionCreator(appointmentId));
        }
    }, [dispatch, appointmentId]);

    // initializing with existing prescriptions if any
    useEffect(() => {
        if (prescriptionList.prescriptions && prescriptionList.prescriptions.length > 0) {
            const parsedPrescriptions = parsePrescriptionData(prescriptionList.prescriptions);
            setMedicineItems(parsedPrescriptions);
        }
    }, [prescriptionList]);

    // medicine list with new medicines
    useEffect(() => {
        handleNewMedicineUpdate(newMedicine, medicineItems, setMedicineItems, userAddedMedicines, setUserAddedMedicines);
    }, [newMedicine]);

    useImageAnalysis(imageUri, dispatch);
    useClearNewMedicineOnFocus(dispatch);

    const handleDelete = (id, isBackendItem = false, version = null) => {
        if (isBackendItem) {
            Alert.alert(
                "Delete Confirmation",
                "Are you sure you want to delete this prescription?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        onPress: async () => {
                            const result = await dispatch(deleteDoctorPrescriptionActionCreator(id, version));
                            if (result?.success) {
                                // updating UI
                                setMedicineItems((currentItems) =>
                                    currentItems.filter((item) => item.id !== id)
                                );
    
                                // fetching data after deletion
                                await dispatch(listDoctorPrescriptionsByAppointmentActionCreator(appointmentId));
                            } else {
                                Alert.alert("Error", "Failed to delete the prescription.");
                            }
                        },
                        style: "destructive"
                    }
                ],
                { cancelable: true }
            );
        } else {
            handleDeleteUtil(id, setMedicineItems, setUserAddedMedicines, dispatch);
        }
    };

    const allMedicines = [...medicineItems, ...userAddedMedicines];
    const isDetailsComplete = (item) => item.period && item.days && item.meals && item.startDate && item.endDate;
    const isSubmitEnabled = userAddedMedicines.length > 0 && userAddedMedicines.every(isDetailsComplete);

    const handleSubmit = async () => {
        if (isSubmitEnabled) {
            await dispatch(createDoctorPrescriptionActionCreator(userAddedMedicines, appointmentId, patientId));
            navigation.navigate('doctorDashboard');
        } else {
            Alert.alert("Please complete all new medicine details before submitting.");
        }
    };

    return (
        <ScreenContainer>
            {prescriptionList.loading ? (
                <Loader />
            ) : allMedicines.length > 0 ? (
                <ScrollView className="flex-1 mb-20">
                    <View className="flex-row items-center justify-between m-2">
                        <Text className="flex-1 text-xl font-[appfont-semi]">
                            List of Medicines
                        </Text>
                    </View>
                    <View>
                        {allMedicines.map((item) => (
                            <MedicineItem
                                appointmentId={appointmentId}
                                patientId={patientId}
                                key={item.id}
                                item={item}
                                handleDelete={() => handleDelete(item.id, Boolean(item._version), item._version)}
                                isDetailsComplete={isDetailsComplete}
                                formatDays={formatDays}
                                isUserAdded={!item._version}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-lg font-[appfont-semi] text-center">
                        Medicine List is Empty. Please add Medicines
                    </Text>
                </View>
            )}

            {allMedicines.length > 0 ? (
                <View className="flex-row space-x-3">
                    <View className="flex-1">
                        <AppButton
                            btnLabel="Add More"
                            onPress={() => navigation.navigate('doctorPrescription', { appointmentId, patientId })}
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
                    onPress={() => navigation.navigate('doctorPrescription', { appointmentId, patientId })}
                    variant="primary"
                />
            )}
        </ScreenContainer>
    );
};

export default DoctorMedicine;