import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabButton from "../../components/Buttons/TabButton";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import DoctorAppointmentsFrame from "../../components/DoctorAppointmentsComponents/DoctorAppointmentsFrame";
import { useDispatch, useSelector } from "react-redux";
import { listAppointmentsByDoctorActionCreators } from "../../../../store/actions/appointmentActions";
const Appointments = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading, error, appointmentsByDoctor } = useSelector(
        (state) => state.appointmentsListByDoctorReducer
    );

    const [selectedTab, setSelectedTab] = useState("upcoming");

    useEffect(() => {
        dispatch(listAppointmentsByDoctorActionCreators());
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

            <View className="flex-1">
                {appointmentsByDoctor && (
                    <DoctorAppointmentsFrame
                        selectedTab={selectedTab}
                        appointments={appointmentsByDoctor}
                    />
                )}
            </View>

            {/* <View className="flex-1">
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
                                                patientId={slot.patientId}
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
                                                patientId={slot.patientId}
                                                appointmentTime={slot.start}
                                                appointmentType={slot.type}
                                            />
                                        </View>
                                    ))}
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View> */}

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
