import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { customTheme } from '../../../../constants/themeConstants';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import MedicineSelector from '../../../../components/MedicineSelector';

const DoctorPrescription = ({ route }) => {
    const navigation = useNavigation()
    const { selectedMedicine: initialSelectedMedicine } = route.params || {};
    const [searchInput, setSearchInput] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedDays, setSelectedDays] = useState(new Set());
    const [selectedMeals, setSelectedMeals] = useState(new Set());
    const [note, setNote] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMeal, setCurrentMeal] = useState(null);
    const [mealDosage, setMealDosage] = useState({});
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]); // State to track recent searches
    const [newMedicines, setNewMedicines] = useState([]); // State to track new medicines being added
    const [calendarType, setCalendarType] = useState('start');
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (initialSelectedMedicine) {
            setSelectedMedicine(initialSelectedMedicine);
            setSelectedPeriod(initialSelectedMedicine.period || null);
            setSelectedType(initialSelectedMedicine.type || null);
            setSelectedDays(new Set(initialSelectedMedicine.days || []));
            setMealDosage(initialSelectedMedicine.meals || {});
            setStartDate(initialSelectedMedicine.startDate || null);
            setEndDate(initialSelectedMedicine.endDate || null);
            setNote(initialSelectedMedicine.note || '');
        }
    }, [initialSelectedMedicine]);

    const dosageOptionsMap = {
        'Liquid': ['1 spoon', '2 spoons', '3 spoons', 'None'],
        'Pills': ['1 pill', '2 pills', '3 pills', 'None'],
    };

    // Dummy medicines data
    const medicines = [
        { id: 1, name: 'Paracetamol' },
        { id: 2, name: 'Amoxicillin' },
        { id: 3, name: 'Ibuprofen' },
        { id: 4, name: 'Penicillin' },
        { id: 5, name: "Dolo" }
    ];


    const selectMedicine = medicine => {
        setSelectedMedicine(medicine);
        setSearchInput('');
        // Update recent searches, avoiding duplicates
        setRecentSearches(recent => [medicine, ...recent.filter(m => m.id !== medicine.id)].slice(0, 5));

    };

    // Form  Completion Update
    const isFormComplete = () => {
        return selectedMedicine && selectedType && selectedPeriod && selectedDays.size > 0 && Object.values(mealDosage).some(dosage => dosage) && startDate && endDate;
    };

    // SubmitButton
    const SubmitButton = (isEnabled) => ({
        backgroundColor: isEnabled ? customTheme.colors.primary : customTheme.colors.primary,
        opacity: isEnabled ? 1 : 0.5,
        cursor: isEnabled ? 'pointer' : 'not-allowed'
    });


    const handleDosageSelection = (meal, dosage) => {
        setModalVisible(false);
        if (dosage === 'None') {
            const newMealDosage = { ...mealDosage };
            delete newMealDosage[meal];
            setMealDosage(newMealDosage);
        } else {
            setMealDosage({ ...mealDosage, [meal]: dosage });
        }
    };

    const handleAddMedicine = () => {
        const newMedicine = { id: Date.now(), name: searchInput };
        setSelectedMedicine(newMedicine);
        setNewMedicines([...newMedicines, newMedicine]);
        setSearchInput('');
    };

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'All'];
   

    const handleSubmit = () => {
        if (isFormComplete()) {
            const newMedicine = {
                id: Date.now(), // Generate a new unique id
                name: selectedMedicine.name,
                type: selectedType,
                period: selectedPeriod,
                days: Array.from(selectedDays),
                meals: mealDosage,
                note,
                startDate,
                endDate,
            };
            navigation.navigate('doctorMedicine', { newMedicine });
        }
    };

    return (
        <>
            <ScrollView className="bg-gray-100 p-4" contentContainerStyle={{ paddingBottom: 120 }}>
                <MedicineSelector
                    searchInput={searchInput} setSearchInput={setSearchInput}
                    selectedMedicine={selectedMedicine} setSelectedMedicine={setSelectedMedicine}
                    selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod}
                    selectedDays={selectedDays} setSelectedDays={setSelectedDays}
                    selectedType={selectedType} setSelectedType={setSelectedType}
                    mealDosage={mealDosage} setMealDosage={setMealDosage}
                    medicines={medicines} selectMedicine={selectMedicine}
                    handleAddMedicine={handleAddMedicine}
                    days={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'All']}
                    meals={['Breakfast', 'Lunch', 'Dinner']}
                    modalVisible={modalVisible} setModalVisible={setModalVisible}
                    currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}
                    handleDosageSelection={handleDosageSelection}
                    dosageOptionsMap={dosageOptionsMap}
                    startDate={startDate} setStartDate={setStartDate}
                    endDate={endDate} setEndDate={setEndDate}
                    calendarModalVisible={calendarModalVisible} setCalendarModalVisible={setCalendarModalVisible}
                    calendarType={calendarType} setCalendarType={setCalendarType}
                    note={note} setNote={setNote}
                />
            </ScrollView>


            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between py-3 bg-light">
                {selectedMedicine ? (
                    <>
                        <TouchableOpacity
                            disabled={!isFormComplete()}
                            style={SubmitButton(isFormComplete())}
                            onPress={handleSubmit}
                            className="flex-1 m-1 mx-5 py-4 rounded-lg flex-row justify-center items-center mr-4">
                            <Text className="ml-2 font-[appfont-semi] text-light">Submit</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('uploadPrescription')}
                        className="flex-1 m-1 mx-5 py-4 rounded-lg flex-row justify-center items-center mr-4 bg-primary">
                        <Text className="ml-2 font-[appfont-semi] text-light">Upload Prescription</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

export default DoctorPrescription;
