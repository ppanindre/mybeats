import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../../../../constants/themeConstants";
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from "../../components/Containers/ScreenContainer";
import imageRecognitionService from "../../api/services/imageRecognitionService";

const CollapsibleItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="mt-2">
            <View className="flex-row items-center">
                <Text className="text- font-[appfont-semi]">{title}</Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    style={{ color: customTheme.colors.dark }}
                />
            </View>
            {isOpen && (
                <View className="mt-2">
                    {children}
                </View>
            )}
        </TouchableOpacity>
    );
};

const DoctorMedicine = ({ route }) => {
    const { newMedicine } = route.params || {};
    const { imageUri } = route.params;
    const [medicineItems, setMedicineItems] = useState([
        { id: 1, name: "Amoxxiellin" },
        { id: 2, name: "Ciprofloxacin" },
        // { id: 3, name: "Ibuprofen" },
        { id: 4, name: "Dolo" },
        { id: 5, name: "Ibup" },
        { id: 6, name: "Amoxillin" },
    ]);

    const [userAddedMedicines, setUserAddedMedicines] = useState([]);



    const [recognizedText, setRecognizedText] = useState([]);
    const [analyzing, setAnalyzing] = useState(false);
    const navigation = useNavigation();

    // Function to analyze image using Google Vision API
    const analyzeImageHandler = async () => {
        setAnalyzing(true);
        try {
            const recognizedTexts = await imageRecognitionService.analyzeImage(imageUri);
            setRecognizedText(recognizedTexts);
            if (recognizedTexts.length === 0) {
                Alert.alert('No text detected.');
            }
        } catch (error) {
            Alert.alert('Error analyzing image. Please try again later.');
        } finally {
            setAnalyzing(false);
        }
    };

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
            analyzeImageHandler();
        }
    }, [imageUri]);

    // Function to handle deletion of a medicine item
    const handleDelete = (id) => {
        setMedicineItems(currentItems => currentItems.filter(item => item.id !== id));
        setUserAddedMedicines(currentItems => currentItems.filter(item => item.id !== id));
    };

    // Function to normalize text by removing special characters and converting to lowercase
    const normalizeText = (text) => {
        return text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    };

    const normalizedRecognizedText = recognizedText.map(text => normalizeText(text));

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
    const SubmitButton = (isEnabled) => ({
        backgroundColor: isEnabled ? customTheme.colors.primary : customTheme.colors.primary,
        opacity: isEnabled ? 1 : 0.5,
        cursor: isEnabled ? 'pointer' : 'not-allowed'
    });


    return (
        <ScreenContainer>
            {analyzing ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={customTheme.colors.primary} />
                </View>
            ) : allMedicines.length > 0 ? (
                <ScrollView className="bg-light flex-1 mb-20">
                    <View className="flex-row items-center justify-between m-2">
                        <Text className="flex-1 text-xl font-[appfont-semi]">
                            List of medicines
                        </Text>
                    </View>
                    <View className="bg-light">

                        {allMedicines.map((item) => (
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
                                            <Text className={`text-sm font-[appfont-semi] ${isDetailsComplete(item) ? 'text-dark' : 'text-primary'}`}>
                                                {isDetailsComplete(item) ? "Details specified" : "Details Missing"}
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

                                <CollapsibleItem title="Details">
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
                                            )).join("; ")}
                                        </Text>
                                    ) : (
                                        <Text className="text-sm font-[appfont-semi] text-dark">
                                            Dosage not specified
                                        </Text>
                                    )}
                                    <Text className="text-sm font-[appfont-semi] text-dark">
                                        {`Start Date: ${item.startDate ? new Date(item.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'not specified'}`} - {`End Date: ${item.endDate ? new Date(item.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'not specified'}`}
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
            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between py-3 bg-white">
                {allMedicines.length > 0 ? (
                    <>
                        <TouchableOpacity
                            className="flex-1 m-1 mx-5 py-4 rounded-lg flex-row justify-center items-center mr-2 bg-lightPrimary"
                            onPress={() => navigation.navigate('doctorPrescription')}
                        >
                            <Text className=" ml-2 font-[appfont-semi] text-light">
                                Add more
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => alert('Prescription has been sent to the patient and pharmacy')}
                            className="flex-1 m-1 mx-5 py-3 rounded-lg flex-row justify-center items-center bg-primary"
                            style={SubmitButton(isSubmitEnabled)}
                            disabled={!isSubmitEnabled}
                        >
                            <Text className="text-center text-lg font-[appfont-semi] text-light">
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('doctorPrescription')}
                        className="flex-1 m-1 mx-5 py-3 rounded-lg flex-row justify-center items-center bg-primary"
                    >
                        <Text className="text-center text-lg font-[appfont-semi] text-light">
                            Add Medicine
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScreenContainer>
    );
};

export default DoctorMedicine;
