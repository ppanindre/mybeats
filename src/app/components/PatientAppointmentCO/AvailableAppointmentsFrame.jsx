import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailabilitiesByDoctorActionCreator } from "../../../../store/actions/availabilityActions";
import {
    listAppointmentsByDoctorActionCreators,
    listAvailableAppointmentsActionCreators,
} from "../../../../store/actions/appointmentActions";
import AvailableDayFrame from "./AvailableDayFrame";
import AvailableTimeFrame from "./AvailableTimeFrame";

const AvailableAppointmentsFrame = ({ doctorId = null }) => {
    const { loading, error, availableAppointments } = useSelector(
        (state) => state.appointmentListAvailableReducer
    );

    const [selectedDate, setSelectedDate] = useState();
    const [selectedSlot, setSelectedSlot] = useState();

    const dispatch = useDispatch();

    const fetchAvailableAppointments = async () => {
        await dispatch(getAvailabilitiesByDoctorActionCreator(doctorId));
        await dispatch(listAppointmentsByDoctorActionCreators(doctorId));
        dispatch(listAvailableAppointmentsActionCreators());
    };

    useEffect(() => {
        fetchAvailableAppointments();
    }, []);

    return (
        <View className="space-y-5">
            <View>
                <AvailableDayFrame
                    appointments={availableAppointments}
                    onSelectDate={(date) => setSelectedDate(date)}
                    selectedDate={selectedDate}
                />
            </View>
            {selectedDate && (
                <View>
                    <AvailableTimeFrame
                        appointments={availableAppointments}
                        selectedDate={selectedDate}
                        selectedSlot={selectedSlot}
                        onSelectSlot={(slot) => setSelectedSlot(slot)}
                    />
                </View>
            )}
        </View>
    );
};

export default AvailableAppointmentsFrame;
