import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import AppButton from "../Buttons/AppButton";

const DoctorFilters = ({ isVisible, onClose, onApply, selectedFilters, setSelectedFilters }) => {
    const filterNames = {
        "Experience": "experience",
        "Video Consultation": "videoConsultation",
        "In Person": "inPerson",
        "Distance": "distance",
        "Ratings": "ratings"
    };

    const handleFilterSelect = (filter) => {
        const key = filterNames[filter];
        setSelectedFilters({
            ...selectedFilters,
            [key]: !selectedFilters[key]
        });
    };

    const applyFilters = () => {
        onApply(selectedFilters);
    };

    // to check if any filter is selected if not then to disable apply filters
    const isAnyFilterSelected = Object.values(selectedFilters).some(Boolean);

    return (
        /* Modal for filters */ 
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={{ margin: 0 }}
            swipeDirection={["down"]}
            propagateSwipe={true}
        >
            <View className="absolute bottom-0 left-0 right-0 bg-light rounded-lg p-4 space-y-5">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-[appfont-bold]">Filter Options</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                {Object.keys(filterNames).map((filter) => (
                    <CheckBox
                        key={filter}
                        title={filter}
                        checkedColor={theme.colors.primary}
                        checked={selectedFilters[filterNames[filter]]}
                        onPress={() => handleFilterSelect(filter)}
                        textStyle={{ fontFamily: "appfont-bold" }}
                        containerStyle={{ marginTop: 10, marginLeft: 0 }}
                    />
                ))}
                <View className="flex justify-center items-center">
                    <AppButton
                        btnLabel="Apply Filters"
                        onPress={applyFilters}
                        variant={isAnyFilterSelected ? "primary" : "disabled"}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default DoctorFilters;
