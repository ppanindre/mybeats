import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { customTheme } from '../../constants/themeConstants';
import HorizontalLine from '../Components/HorizontalLine';

const WorkingHoursScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [isUnavailable, setIsUnavailable] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimeStart, setIsTimeStart] = useState(true); // true for start time, false for end time
    const [timeSlots, setTimeSlots] = useState({});
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [applyScheduleToAllDays, setApplyScheduleToAllDays] = useState(false);
    const [modalContext, setModalContext] = useState(null);

    // function to format dates in a human-readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    //  Check if any time slots apply to all days of the week
    const allDaysScheduled = Object.values(timeSlots).flat().some(slot => slot.allDays && slot.dayLabel.includes(dayOfWeek));



    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Month is 0-indexed
        const day = today.getDate();
        const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

        // Mark all past days as disabled
        const pastStyle = { disabled: true, disableTouchEvent: true, textColor: '#CCCCCC' };
        for (let d = 1; d < day; d++) {
            const pastDateString = `${year}-${month < 10 ? `0${month}` : month}-${d < 10 ? `0${d}` : d}`;
            markedDates[pastDateString] = pastStyle;
        }
        setMarkedDates(markedDates);
    }, []);


    // Function to handle adding a new time slot
    const addNewTimeSlot = (date) => {
        // Set the selectedDate to the date for which the new slot is being added
        setSelectedDate(date);
        const newStartTime = new Date(selectedDate);
        newStartTime.setHours(newStartTime.getHours() + 1, 0, 0, 0);
        const newEndTime = new Date(newStartTime);
        newEndTime.setHours(newEndTime.getHours() + 1, 0, 0, 0);

        // state to show the modal inputs
        setStartTime(newStartTime);
        setEndTime(newEndTime);

        // Indicate which slot is being edited/added
        setIsTimeStart(true);

        // Show the modal for the user to confirm or adjust the times
        setShowTimePicker(true);
    };




    // Function to handle date selection from calendar
    const handleDatePress = (day) => {

        const dateNow = new Date();
        const selectedDate = new Date(day.dateString);
        // if (dateNow.toISOString().split('T')[0] > day.dateString) return; // disable past dates

        const date = new Date(day.dateString);
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayName = days[date.getDay()]; // Get the day name

        setDayOfWeek(dayName);
        // Update the markedDates state to only have the currently selected date marked
        const newMarkedDates = {
            [day.dateString]: { selected: true, selectedColor: customTheme.colors.primary, selectedTextColor: 'white' },
        };

        setMarkedDates(newMarkedDates);
        setSelectedDate(day.dateString);
        setIsUnavailable(false); // reset availability switch
        setEndTime(new Date(selectedDate.setHours(17, 0, 0, 0))); // default end time
        setStartTime(new Date(selectedDate.setHours(9, 0, 0, 0))); // default start time
        setShowTimePicker(true);
    };

    // to save updated time slots
    const handleSaveTime = () => {
        let updatedTimeSlots = { ...timeSlots };
        const selectedDay = new Date(selectedDate);
        const dayIndex = selectedDay.getDay();
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayLabel = days[dayIndex] + 's'; // This will give  "Sundays", "Mondays", etc.


        if (isUnavailable) {
            if (applyScheduleToAllDays) {
                // Create unavailable slots for all days of the week if they don't exist
                for (let i = 0; i < 6; i++) { // Loop through the next six days to find all matching weekdays
                    const newDate = new Date(selectedDay);
                    newDate.setDate(newDate.getDate() + i);
                    if (newDate.getDay() === dayIndex) {
                        const dateString = newDate.toISOString().split('T')[0];
                        updatedTimeSlots[dateString] = [{ unavailable: true, allDays: true, dayLabel: dayLabel }];
                    }
                }
            } else {
                // Apply 'unavailable' only to the selected date
                updatedTimeSlots[selectedDate] = [{ unavailable: true, dayLabel: dayLabel }];
            }
        } else {
            if (applyScheduleToAllDays) {
                // Create time slots for all days of the week if they don't exist
                for (let i = 0; i < 6; i++) { // Loop through the next six days to find all matching weekdays
                    const newDate = new Date(selectedDay);
                    newDate.setDate(newDate.getDate() + i);
                    if (newDate.getDay() === dayIndex) {
                        const dateString = newDate.toISOString().split('T')[0];
                        updatedTimeSlots[dateString] = [{ start: startTime, end: endTime, allDays: true, dayLabel: dayLabel }];
                    }
                }
            } else {
                // Apply only to the selected date
                updatedTimeSlots[selectedDate] = [
                    ...(updatedTimeSlots[selectedDate] || []),
                    { start: startTime, end: endTime, dayLabel: dayLabel }
                ];
            }
        }

        setTimeSlots(updatedTimeSlots);
        setShowTimePicker(false);
        setApplyScheduleToAllDays(false); // Reset after saving
        setIsUnavailable(false); // Also reset the unavailability toggle
    };


    // Function to remove a specific time slot
    const handleRemoveTimeSlot = (date, index) => {
        const newTimeSlots = { ...timeSlots };
        newTimeSlots[date].splice(index, 1);
        if (newTimeSlots[date].length === 0) {
            delete newTimeSlots[date];
        }
        setTimeSlots(newTimeSlots);
    };

    // Function to handle time changes from picker
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            if (isTimeStart) {
                setStartTime(selectedTime);
            } else {
                setEndTime(selectedTime);
            }
        }
    };

    return (
        <ScrollView className="flex-1">
            
            {/* Calendar */}
            <Calendar
                minDate={new Date().toISOString().split('T')[0]}
                onDayPress={handleDatePress}
                markedDates={markedDates}
            />
            
            {/* displaying the selected days and time slots in UI */}
            {Object.entries(timeSlots).map(([date, slots], dateIndex) => (
                <>
                <View key={dateIndex} className="flex-row mb-2 mt-3">
                    <View className="flex-row justify-between items-center p-2">
                        <Text className="text-base font-[appfont-semi] my-2 mx-1 w-28">
                            {slots[0].allDays ? slots[0].dayLabel : formatDate(date)}
                        </Text>
                        <TouchableOpacity onPress={() => addNewTimeSlot(date)} className="flex-row justify-center items-center p-2 my-1 mr-12">
                            <Ionicons name="add-circle" size={20} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    <View className="relative top-0 right-0">
                        {slots.map((slot, slotIndex) => (
                            <View key={slotIndex} className="flex-row justify-between items-center p-2 border border-gray-300 rounded-lg my-1 bg-white">
                                <Text className="flex-row items-center w-[136] text-center">
                                    {slot.unavailable ? 'Unavailable' :
                                        `${new Date(slot.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - ${new Date(slot.end).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
                                </Text>
                                <TouchableOpacity onPress={() => handleRemoveTimeSlot(date, slotIndex)} className="p-2">
                                    <Ionicons name="close-circle" size={22} style={{ color: customTheme.colors.dark, marginTop: 2 }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <View style={{ borderBottomColor: customTheme.colors.darkSecondary, borderBottomWidth: 1, marginVertical: 10 }} />
                </View>
                <HorizontalLine></HorizontalLine>
                </>
            ))}



            {/* Modal for time selection */}
            <Modal
                animationType="slide"
                style={{ margin: 0 }}
                swipeDirection={['down']}
                propagateSwipe={true}
                visible={showTimePicker}
                onRequestClose={() => setShowTimePicker(false)}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }} className="flex-1 justify-end">
                    <View className="bg-white rounded-2xl p-5 min-h-60 shadow-default">
                        {/* Conditionally render the unavailable switch only for date overrides */}
                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-lg font-[appfont-semi]">Mark me as unavailable this day</Text>
                            <Switch
                                onValueChange={setIsUnavailable}
                                value={isUnavailable}
                                className=""
                                trackColor={{ false: customTheme.colors.darkSecondary, true: customTheme.colors.primary }}
                            />
                        </View>

                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-lg font-[appfont-semi]">
                                {allDaysScheduled
                                    ? `All ${dayOfWeek}s schedule have been updated`
                                    : `Use this schedule for all ${dayOfWeek}s`}
                            </Text>
                            {!allDaysScheduled && (
                                <Switch
                                    onValueChange={setApplyScheduleToAllDays}
                                    value={applyScheduleToAllDays}
                                    className=""
                                    trackColor={{ false: customTheme.colors.darkSecondary, true: customTheme.colors.primary }}
                                />
                            )}
                        </View>

                        {!isUnavailable && (
                            <>
                                <View className="flex-row justify-between items-center mb-5">
                                    <TouchableOpacity onPress={() => setIsTimeStart(true)} className="items-center">
                                        <Text style={isTimeStart ? { color: customTheme.colors.primary } : null} className="text-xl font-[appfont-semi]">{modalContext === 'availableHours' ? 'Set Start time' : 'Start time'}</Text>
                                        <Text style={isTimeStart ? { color: customTheme.colors.primary } : null} className="text-md font-[appfont-semi]">{startTime.toLocaleTimeString()}</Text>
                                    </TouchableOpacity>
                                    <Text>-</Text>
                                    <TouchableOpacity onPress={() => setIsTimeStart(false)} className="items-center">
                                        <Text style={!isTimeStart ? { color: customTheme.colors.primary } : null} className="text-xl font-[appfont-semi]">{modalContext === 'availableHours' ? 'Set End time' : 'End time'}</Text>
                                        <Text style={!isTimeStart ? { color: customTheme.colors.primary } : null} className="text-md font-[appfont-semi]">{endTime.toLocaleTimeString()}</Text>
                                    </TouchableOpacity>
                                </View>

                                {showTimePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={isTimeStart ? startTime : endTime}
                                        mode="time"
                                        is24Hour={true}
                                        display="spinner"
                                        onChange={handleTimeChange}
                                        className="w-full"
                                    />
                                )}
                            </>
                        )}

                        <View className="mt-5">
                            <TouchableOpacity
                                onPress={handleSaveTime}
                                style={{
                                    backgroundColor: customTheme.colors.primary
                                }}
                                className=" rounded-lg p-3 mb-3 items-center"
                            >
                                <Text className="text-lg text-white font-[appfont-semi]">Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setShowTimePicker(false)}
                                className="p-4 items-center"
                            >
                                <Text className="text-lg font-[appfont-semi]">Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


        </ScrollView>
    );
};

export default WorkingHoursScreen;