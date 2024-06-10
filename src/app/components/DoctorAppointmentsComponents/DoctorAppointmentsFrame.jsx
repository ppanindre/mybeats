import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import AppointmentCard from "../Cards/AppointmentCard";

const DoctorAppointmentsFrame = ({ selectedTab, appointments = [] }) => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const divideAppointments = () => {
        const currentTime = moment();

        // Filter upcoming and past appointments
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
    }, []);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {selectedTab === "upcoming" &&
                        upcomingAppointments.map((appointment) => (
                            <View>
                                <AppointmentCard
                                    appointmentTime={appointment.startTime}
                                    appointmentType={appointment.type}
                                    patient={appointment.patient}
                                />
                            </View>
                        ))}

                    {selectedTab === "past" &&
                        pastAppointments.map((appointment) => (
                            <View>
                                <AppointmentCard
                                    appointmentTime={appointment.startTime}
                                    appointmentType={appointment.type}
                                />
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default DoctorAppointmentsFrame;
