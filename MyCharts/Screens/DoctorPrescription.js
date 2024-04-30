import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { customTheme } from '../../constants/themeConstants';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

const DoctorPrescription = () => {
    const navigation = useNavigation()
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



    const dosageOptionsMap = {
        'Liquid': ['1 spoon', '2 spoons', '3 spoons', 'None'],
        'Pills': ['1 pill', '2 pills', '3 pills', 'None'],
    };

    // Dummy medicines data
    const medicines = [
        { id: 1, name: 'Paracetamol' },
        { id: 2, name: 'Amoxicillin' },
        { id: 3, name: 'Ibuprofen' },
        { id: 4, name: 'Penicillin' }
    ];

    // Filter medicines based on search input
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    const selectMedicine = medicine => {
        setSelectedMedicine(medicine);
        setSearchInput('');
        // Update recent searches, avoiding duplicates
        setRecentSearches(recent => [medicine, ...recent.filter(m => m.id !== medicine.id)].slice(0, 5));

    };

    const handleMealSelect = (meal) => {
        setCurrentMeal(meal);
        setModalVisible(true);
    };

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

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'All'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    const toggleDay = day => {
        const newSelectedDays = new Set(selectedDays);
        if (day === 'All') {
            if (selectedDays.size === 7) {
                setSelectedDays(new Set());
            } else {
                days.slice(0, -1).forEach(d => newSelectedDays.add(d)); // Exclude 'All' and add all others
            }
        } else {
            if (newSelectedDays.has(day)) {
                newSelectedDays.delete(day);
            } else {
                newSelectedDays.add(day);
            }
        }
        setSelectedDays(newSelectedDays);
    };

    const toggleMeal = meal => {
        const newSelectedMeals = new Set(selectedMeals);
        if (newSelectedMeals.has(meal)) {
            newSelectedMeals.delete(meal);
        } else {
            newSelectedMeals.add(meal);
        }
        setSelectedMeals(newSelectedMeals);
    };

    return (
        <>
            <ScrollView className="bg-gray-100 p-4" contentContainerStyle={{ paddingBottom: 120 }}>
                <View className="mb-4">
                    <TextInput
                        placeholder="Search or enter a medicine name"
                        onChangeText={text => {
                            setSearchInput(text);
                            if (text) {
                                setSelectedMedicine(null);
                                setSelectedPeriod(null);
                                setSelectedDays(new Set());
                                setSelectedMeals(new Set());
                                setSelectedType(null);
                                setMealDosage({});
                                setNote('');
                            }
                        }}
                        value={searchInput}
                        className="rounded-lg shadow-lg"
                        style={{ backgroundColor: customTheme.colors.light, paddingHorizontal: 10, paddingVertical: 15, borderColor: customTheme.colors.darkSecondary }}
                    />
                </View>

                {/* Display search results */}
                {!selectedMedicine && (
                    <View className="">
                        <View className="bg-white rounded-lg shadow-lg">
                            <FlatList
                                data={filteredMedicines}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => selectMedicine(item)}
                                        className="p-4 border-b border-gray-100"
                                    >
                                         <View className="flex-row items-center space-x-3">
                                            <Ionicons
                                                size={16}
                                                name="search-outline"
                                                color={customTheme.colors.dark}
                                            />
                                            <Text className="font-[appfont]">
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                )}


                {selectedMedicine && (
                    <View className="p-4 rounded-lg shadow" style={{ backgroundColor: customTheme.colors.light }}>

                        <Text className="text-lg font-[appfont-semi] mb-3">{selectedMedicine.name}</Text>

                        <Text className="text-md font-semibold font-[appfont-semi] mb-2">Type:</Text>


                        <View className="flex-row mb-4">
                            {['Liquid', 'Pills'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    className={`flex-1 py-4 rounded-lg mr-2`}
                                    style={{ backgroundColor: selectedType === type ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                    onPress={() => setSelectedType(selectedType === type ? null : type)}>
                                    <Text className={`text-center text-md font-[appfont-semi] ${selectedType === type ? 'text-white' : 'text-black'}`}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {selectedType && (
                            <>
                                <Text className="text-md font-semibold font-[appfont-semi] mb-2">Dosage:</Text>

                                <View className="flex-row mb-8">
                                    {['Before Eating', 'After Eating'].map((period) => (
                                        <TouchableOpacity
                                            key={period}
                                            className={`flex-1 py-4 rounded-lg mr-2`}
                                            style={{ backgroundColor: selectedPeriod === period ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                            onPress={() => setSelectedPeriod(selectedPeriod === period ? null : period)}>
                                            <Text className={`text-center text-md font-[appfont-semi] ${selectedPeriod === period ? 'text-white' : 'text-black'}`}>{period}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View className="flex-row flex-wrap mb-8">
                                    {days.map((day, index) => (
                                        <TouchableOpacity
                                            key={day}
                                            className={`w-1/5 py-4  ${selectedDays.has(day) ? 'bg-green-500' : 'bg-gray-200'} rounded-lg mr-2 mb-2 ${index % 4 === 0 ? 'ml-1' : 'ml-3'}`}
                                            style={{ backgroundColor: selectedDays.has(day) ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                            onPress={() => toggleDay(day)}>
                                            <Text className={`text-center text-md font-[appfont-semi] ${selectedDays.has(day) ? 'text-white' : 'text-black'}`}>{day}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>


                                <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                                    <View className="bg-white p-5 rounded-lg shadow w-full">
                                        <View className="flex-row items-center justify-between mb-3">
                                            <Text className="font-[appfont-semi]">Select Quantity</Text>
                                            <TouchableOpacity
                                                className=""
                                                onPress={() => setModalVisible(false)}>
                                                <Ionicons name="close-circle" size={24} style={{ color: customTheme.colors.dark }} />
                                            </TouchableOpacity>
                                        </View>
                                        {selectedType ? (
                                            dosageOptionsMap[selectedType]?.map((option, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    className="flex-row items-center mb-1"
                                                    onPress={() => handleDosageSelection(currentMeal, option)}
                                                >
                                                    <CheckBox
                                                        checked={mealDosage[currentMeal] === option}
                                                        onPress={() => handleDosageSelection(currentMeal, option)}
                                                    />
                                                    <Text className="ml-1 font-[appfont]">{option}</Text>
                                                </TouchableOpacity>
                                            ))
                                        ) : (
                                            <Text className="font-[appfont]">Please select a type to load the Quantity.</Text>
                                        )}
                                    </View>
                                </Modal>

                                {meals.map((meal, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ backgroundColor: mealDosage[meal] ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                        className={`py-4 rounded-lg mb-3 }`}
                                        onPress={() => handleMealSelect(meal)}>
                                        <Text
                                            // style={{ color: mealDosage[meal] ? customTheme.colors.light : customTheme.colors.dark }}
                                            className={`text-center font-[appfont-bold] text-md ${mealDosage[meal] ? 'text-white' : 'text-black'
                                                }`}>
                                            {meal} {mealDosage[meal] ? `- ${mealDosage[meal]}` : ''}
                                        </Text>
                                    </TouchableOpacity>


                                ))}
                                <TextInput
                                    className="py-3 px-4 bg-gray-200 rounded-lg mb-8 mt-8 font-[appfont]"
                                    style={{ backgroundColor: customTheme.colors.darkSecondary }}
                                    placeholder="Add Note"
                                    value={note}
                                    onChangeText={setNote}
                                    multiline
                                />
                            </>
                        )}



                    </View>
                )}


            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 flex-row justify-between py-3 bg-white">
                {selectedMedicine ? (
                    <>
                        <TouchableOpacity style={{ backgroundColor: customTheme.colors.primary }} className="flex-1 m-1 mx-5 py-4 rounded-lg flex-row justify-center items-center mr-2">
                            <Text style={{ color: customTheme.colors.light }} className=" ml-2 font-[appfont-semi]">Add another Prescription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: customTheme.colors.lightPrimary }}
                            className="flex-1 m-1 mx-2 py-4 rounded-lg flex-row justify-center items-center mr-4">
                            <Text style={{ color: customTheme.colors.light }} className="ml-2 font-[appfont-semi]">Submit</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UploadPrescription')}
                        style={{ backgroundColor: customTheme.colors.primary }}
                        className="flex-1 m-1 mx-5 py-4 rounded-lg flex-row justify-center items-center mr-4">
                        <Text style={{ color: customTheme.colors.light }} className="ml-2 font-[appfont-semi]">Upload Prescription</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

export default DoctorPrescription;
