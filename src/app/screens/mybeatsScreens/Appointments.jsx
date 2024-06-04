import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import TabButton from "../../components/Buttons/TabButton";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import { appointmentService } from "../../api/services/appointmentService";
import AppointmentCard from "../../components/Cards/AppointmentCard";
const Appointments = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("upcoming");
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const fetchUpcomingAppointments = async () => {
        const today = moment();

        const appointments = await appointmentService.appointmentSlotByDoctor(
            "4",
            true
        );

        const past = appointments.filter((appointment) =>
            moment(appointment.date).isBefore(today, "day")
        );
        const upcoming = appointments.filter((appointment) =>
            moment(appointment.date).isSameOrAfter(today, "day")
        );

        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
    };

    useEffect(() => {
        fetchUpcomingAppointments();
    }, []);

    return (
        <ScreenContainer>
            {/* Tab Selector */}
            <View className="flex-row">
                <TabButton
                    label="Upcoming"
                    isLeftTab={true}
                    isActive={selectedTab === "upcoming"}
                    onPress={() => setSelectedTab("upcoming")}
                />

                <TabButton
                    label="Past"
                    isLeftTab={false}
                    isActive={selectedTab === "past"}
                    onPress={() => setSelectedTab("past")}
                />
            </View>

            {/* Appointments */}
            <View className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="space-y-5">
                        {selectedTab === "upcoming" &&
                            upcomingAppointments.map((appointment, index) => (
                                <View key={index} className="space-y-3">
                                    <Text className="font-[appfont-semi] text-lg">
                                        {moment(
                                            appointment.date,
                                            "YYYY-MM-DD"
                                        ).format("D MMM, YYYY")}
                                    </Text>

                                    {appointment.slots.map((slot) => (
                                        <View>
                                            <AppointmentCard
                                                patientName="John Doe"
                                                appointmentTime={slot.start}
                                                appointmentType="Video"
                                            />
                                        </View>
                                    ))}
                                </View>
                            ))}

                        {selectedTab === "past" &&
                            pastAppointments.map((appointment, index) => (
                                <View key={index} className="space-y-3">
                                    <Text className="font-[appfont-semi] text-lg">
                                        {moment(
                                            appointment.date,
                                            "YYYY-MM-DD"
                                        ).format("D MMM, YYYY")}
                                    </Text>

                                    {appointment.slots.map((slot) => (
                                        <View>
                                            <AppointmentCard
                                                patientName="John Doe"
                                                appointmentTime={slot.start}
                                                appointmentType="Video"
                                            />
                                        </View>
                                    ))}
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>

            {/* Set Availability Button */}
            <View>
                <AppButton
                    btnLabel="Set availability"
                    variant="primary"
                    onPress={() => navigation.navigate("doctorAvailability")}
                />
            </View>
        </ScreenContainer>
    );
};

export default Appointments;
