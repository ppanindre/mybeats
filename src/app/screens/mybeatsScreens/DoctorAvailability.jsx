import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import moment from "moment";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import ModalContainer from "../../components/Containers/ModalContainer";
import CalendarInput from "../../components/Inputs/CalendarInput";
import AvailabilityTimePicker from "../../components/DoctorAvailabilityComponents/AvailabilityTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
    createAvailabilityActionCreator,
    deleteAvailabilitiesActionCreator,
    getAvailabilitiesByDoctorActionCreator,
} from "../../../../store/actions/availabilityActions";
import AvailabilitySlotFrame from "../../components/DoctorAvailabilityComponents/AvailabilitySlotFrame";
import Loader from "../../components/Utils/Loader";
import AvailabilitySwitchFrame from "../../components/DoctorAvailabilityComponents/AvailabilitySwitchFrame";

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

    const handleSave = (startTime, endTime) => {
        if (selectedChoice === "unavailable") {
            dispatch(deleteAvailabilitiesActionCreator(selectedDate));
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
                <AvailabilityTimePicker
                    showTimePicker={selectedChoice !== "unavailable"}
                    selectedDate={selectedDate}
                    onSave={handleSave}
                />
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
