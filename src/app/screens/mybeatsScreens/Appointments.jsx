import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { customTheme } from "../../../../constants/themeConstants";
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
        const appointmentSlots =
            await appointmentService.appointmentSlotByDoctor("4", true);
        setUpcomingAppointments(appointmentSlots);
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
