import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import moment from "moment";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import ModalContainer from "../../components/Containers/ModalContainer";
import CalendarInput from "../../components/Inputs/CalendarInput";
import AvailabilityTimePicker from "../../components/DoctorAvailabilityComponents/AvailabilityTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
    createAvailabilityActionCreator,
    createAvailabilityForAllDaysActionCreator,
    deleteAvailabilitiesActionCreator,
    getAvailabilitiesByDoctorActionCreator,
} from "../../../../store/actions/availabilityActions";
import AvailabilitySlotFrame from "../../components/DoctorAvailabilityComponents/AvailabilitySlotFrame";
import Loader from "../../components/Utils/Loader";
import AvailabilitySwitchFrame from "../../components/DoctorAvailabilityComponents/AvailabilitySwitchFrame";
import showConfirmAlert from "../../utils/showConfirmAlert";

const DoctorAvailability = () => {
    // STATES
    const [showModal, setShowModal] = useState(false);

    const { error: createError } = useSelector(
        (state) => state.availabilityCreateReducer
    );

    const { error, loading, availabilities } = useSelector(
        (state) => state.availabilitesByDoctorReducer
    );

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedChoice, setSelectedChoice] = useState(null);

    const handleDayPress = (date) => {
        setSelectedDate(moment(date, "YYYY-MM-DD"));
        setShowModal(true);
    };

    const onConfirmDeleteAvailability = () => {
        dispatch(deleteAvailabilitiesActionCreator(selectedDate));
    };

    const handleSave = async (startTime, endTime) => {
        if (selectedChoice === "unavailable") {
            showConfirmAlert(
                "Are you sure you want to delete your availabilities and appointments for this day?",
                () => onConfirmDeleteAvailability()
            );
        } else if (selectedChoice === "allDays") {
            dispatch(
                createAvailabilityForAllDaysActionCreator(startTime, endTime)
            );
            Alert.alert("", "Schedule has been updated");
        } else {
            dispatch(createAvailabilityActionCreator(startTime, endTime));
        }
        setShowModal(false);
        setSelectedChoice(null);
    };

    useEffect(() => {
        dispatch(getAvailabilitiesByDoctorActionCreator());
    }, []);

    if (loading) return <Loader />;

    return (
        <ScreenContainer>
            <ModalContainer
                onClose={() => setShowModal(false)}
                visible={showModal}
            >
                <AvailabilitySwitchFrame
                    selectChoice={(choice) => setSelectedChoice(choice)}
                    selectedChoice={selectedChoice}
                    availabilities={availabilities}
                    selectedDate={selectedDate}
                />
                <View>
                    <AvailabilityTimePicker
                        showTimePicker={selectedChoice !== "unavailable"}
                        selectedDate={selectedDate}
                        onSave={handleSave}
                    />
                </View>
            </ModalContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    <View>
                        <CalendarInput onDayPress={handleDayPress} />
                    </View>
                    <AvailabilitySlotFrame
                        onAdd={handleDayPress}
                        availabilities={availabilities}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default DoctorAvailability;
