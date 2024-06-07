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
    getAvailabilitiesByDoctorActionCreator,
} from "../../../../store/actions/availabilityActions";

const DoctorAvailability = () => {
    // STATES
    const [showModal, setShowModal] = useState(false);

    const { error: createError, availability: availabilityCreated } =
        useSelector((state) => state.availabilityCreateReducer);

    const { error, loading, availabilities } = useSelector(
        (state) => state.availabilitesByDoctorReducer
    );

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(moment());

    const handleDayPress = (date) => {
        setSelectedDate(moment(date.dateString, "YYYY-MM-DD"));
        setShowModal(true);
    };

    const handleSave = (startTime, endTime) => {
        dispatch(createAvailabilityActionCreator(startTime, endTime));
        setShowModal(false);
    };

    useEffect(() => {
        dispatch(getAvailabilitiesByDoctorActionCreator());
    }, []);

    return (
        <ScreenContainer>
            {/* Modal for time selection */}

            <ModalContainer
                onClose={() => setShowModal(false)}
                visible={showModal}
            >
                <AvailabilityTimePicker
                    selectedDate={selectedDate}
                    onSave={handleSave}
                />
            </ModalContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {/* Calendar */}
                    <CalendarInput onDayPress={handleDayPress} />
                </View>

                <View>
                    
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default DoctorAvailability;
