import React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import MultiLineInput from '../Inputs/MultiLineInput';
import DatePicker from '../../../../components/DatePicker';
import { customTheme } from '../../../../constants/themeConstants';
const MedicineSelector = ({
    searchInput, setSearchInput, // Props for search input state
    selectedMedicine, setSelectedMedicine, // Props for selected medicine state
    selectedPeriod, setSelectedPeriod, // Props for selected period state
    selectedDays, setSelectedDays, // Props for selected days state
    selectedType, setSelectedType, // Props for selected type state
    mealDosage, setMealDosage, // Props for meal dosage state
    medicines, selectMedicine, // Props for medicines list and select medicine function
    handleAddMedicine, // Prop for adding new medicine function
    days, meals, // Props for days and meals lists
    modalVisible, setModalVisible, // Props for modal visibility state
    currentMeal, setCurrentMeal, // Props for current meal state
    handleDosageSelection, // Prop for handling dosage selection
    dosageOptionsMap, // Prop for dosage options map
    startDate, setStartDate, // Props for start date state
    endDate, setEndDate, // Props for end date state
    calendarModalVisible, setCalendarModalVisible, // Props for calendar modal visibility state
    calendarType, setCalendarType, // Props for calendar type state
    note, setNote // Props for note state
}) => {

    // Filtering out medicines based on search input
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    // Function to handle meal selection and show modal
    const handleMealSelect = (meal) => {
        setCurrentMeal(meal);
        setModalVisible(true);
    };

    // Function to toggle selected days
    const toggleDay = day => {
        const newSelectedDays = new Set(selectedDays);
        if (day === 'All') {
            if (selectedDays.size === 7) {
                setSelectedDays(new Set());
            } else {
                days.slice(0, -1).forEach(d => newSelectedDays.add(d));
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

    return (
        <View>
            {/* Search Input */}
            <View className="mb-4">
                <TextInput
                    placeholder="Search or enter a medicine name"
                    returnKeyType="search"
                    onChangeText={text => {
                        setSearchInput(text);
                        if (text) {
                            setSelectedMedicine(null);
                            setSelectedPeriod(null);
                            setSelectedDays(new Set());
                            setSelectedType(null);
                            setMealDosage({});
                        }
                    }}
                    onSubmitEditing={handleAddMedicine}
                    value={searchInput}
                    className="rounded-lg shadow-lg"
                    style={{ backgroundColor: customTheme.colors.light, paddingHorizontal: 10, paddingVertical: 15, borderColor: customTheme.colors.darkSecondary }}
                />
                <Ionicons
                    name="search-outline"
                    size={20}
                    color={customTheme.colors.dark}
                    style={{ position: 'absolute', top: 13, right: 14 }}
                />
            </View>

            {/* Display search results */}
            {!selectedMedicine && (
                <View className="bg-light rounded-lg shadow-lg">
                    <FlatList
                        data={filteredMedicines}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => selectMedicine(item)}
                                className="p-4 border-b border-darkSecondary"
                            >
                                <View className="flex-row items-center space-x-3">
                                    <Ionicons size={16} name="search-outline" color={customTheme.colors.dark} />
                                    <Text className="font-[appfont]">{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

            {/* Medicine Details */}
            {selectedMedicine && (
                <View className="p-4 bg-light rounded-lg shadow">
                    <Text className="text-lg font-[appfont-semi] mb-3">{selectedMedicine.name}</Text>
                    <Text className="text-md font-semibold font-[appfont-semi] mb-2">Type:</Text>

                    {/* Medicine Type Selection */}
                    <View className="flex-row mb-4">
                        {['Liquid', 'Pills'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                className={`flex-1 py-4 rounded-lg mr-2`}
                                style={{ backgroundColor: selectedType === type ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                onPress={() => setSelectedType(selectedType === type ? null : type)}>
                                <Text className={`text-center text-md font-[appfont-semi] ${selectedType === type ? 'text-light' : 'text-black'}`}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedType && (
                        <>
                            {/* Dosage Period Selection */}
                            <Text className="text-md font-semibold font-[appfont-semi] mb-2">Dosage:</Text>
                            <View className="flex-row mb-8">
                                {['Before Eating', 'After Eating'].map((period) => (
                                    <TouchableOpacity
                                        key={period}
                                        className={`flex-1 py-4 rounded-lg mr-2`}
                                        style={{ backgroundColor: selectedPeriod === period ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                        onPress={() => setSelectedPeriod(selectedPeriod === period ? null : period)}>
                                        <Text className={`text-center text-md font-[appfont-semi] ${selectedPeriod === period ? 'text-light' : 'text-black'}`}>{period}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Day Selection */}
                            <View className="flex-row flex-wrap mb-8">
                                {days.map((day, index) => (
                                    <TouchableOpacity
                                        key={day}
                                        className={`w-1/5 py-4 ${selectedDays.has(day) ? 'bg-primary' : 'bg-darkSecondary'} rounded-lg mr-2 mb-2 ${index % 4 === 0 ? 'ml-1' : 'ml-3'}`}
                                        style={{ backgroundColor: selectedDays.has(day) ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                        onPress={() => toggleDay(day)}>
                                        <Text className={`text-center text-md font-[appfont-semi] ${selectedDays.has(day) ? 'text-light' : 'text-black'}`}>{day}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Dosage Quantity Selection Modal */}
                            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                                <View className="bg-light p-5 rounded-lg shadow w-full">
                                    <View className="flex-row items-center justify-between mb-3">
                                        <Text className="font-[appfont-semi]">Select Quantity</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
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

                            {/* Meal Dosage Selection */}
                            {meals.map((meal, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ backgroundColor: mealDosage[meal] ? customTheme.colors.primary : customTheme.colors.darkSecondary }}
                                    className={`py-4 rounded-lg mb-3`}
                                    onPress={() => handleMealSelect(meal)}>
                                    <Text className={`text-center font-[appfont-bold] text-md ${mealDosage[meal] ? 'text-light' : 'text-dark'}`}>
                                        {meal} {mealDosage[meal] ? `- ${mealDosage[meal]}` : ''}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            {/* Start Date Picker */}
                            <View className="mb-4 mt-6">
                                <DatePicker
                                    label="Start Date"
                                    currVal={startDate}
                                    onConfirm={setStartDate}
                                    minDate={new Date()}
                                    mode="prescription"
                                />
                            </View>
                            
                            {/* End Date Picker */}
                            {startDate && (
                                <View className="mb-3">
                                    <DatePicker
                                        label="End Date"
                                        currVal={endDate}
                                        onConfirm={setEndDate}
                                        minDate={new Date(startDate)}
                                        mode="prescription"
                                    />
                                </View>
                            )}

                            {/* Calendar Modal */}
                            <Modal isVisible={calendarModalVisible} onBackdropPress={() => setCalendarModalVisible(false)}>
                                <View className="bg-light p-5 rounded-lg shadow w-full">
                                    <Calendar
                                        minDate={calendarType === 'end' ? startDate : new Date().toISOString().split('T')[0]}
                                        onDayPress={(day) => {
                                            if (calendarType === 'start') {
                                                setStartDate(day.dateString);
                                            } else {
                                                setEndDate(day.dateString);
                                            }
                                            setCalendarModalVisible(false);
                                        }}
                                    />
                                </View>
                            </Modal>

                            {/* Notes Section */}
                            <View className="mt-8">
                                <MultiLineInput value={note} onChangeText={setNote} label="Add Notes (Optional)" />
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

export default MedicineSelector;
