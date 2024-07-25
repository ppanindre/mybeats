import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import PatientAppointmentCard from "./PatientAppointmentCard";

const PatientAppointmentsFrame = ({ selectedTab, appointments = [] }) => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const divideAppointments = () => {
        const currentTime = moment();

        const upcomingAppointments = appointments.filter((appointment) =>
            moment(appointment.startTime).isAfter(currentTime)
        );
        const pastAppointments = appointments.filter((appointment) =>
            moment(appointment.startTime).isBefore(currentTime)
        );

        setUpcomingAppointments(upcomingAppointments);
        setPastAppointments(pastAppointments);
    };

    useEffect(() => {
        divideAppointments();
    }, [appointments]);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {selectedTab === "upcoming" &&
                        upcomingAppointments.map((appointment) => (
                            <View key={appointment.id}>
                                <PatientAppointmentCard
                                    appointment={appointment}
                                    isPast={false}
                                />
                            </View>
                        ))}

                    {selectedTab === "past" &&
                        pastAppointments.map((appointment) => (
                            <View key={appointment.id}>
                                <PatientAppointmentCard
                                    appointment={appointment}
                                    isPast={true}
                                />
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default PatientAppointmentsFrame;
