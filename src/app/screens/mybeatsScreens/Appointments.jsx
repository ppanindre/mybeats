import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabButton from "../../components/Buttons/TabButton";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import AppButton from "../../components/Buttons/AppButton";
import DoctorAppointmentsFrame from "../../components/DoctorAppointmentsComponents/DoctorAppointmentsFrame";
import { useDispatch, useSelector } from "react-redux";
import { listAppointmentsByDoctorActionCreators } from "../../../../store/actions/appointmentActions";
import Loader from "../../components/Utils/Loader";

const Appointments = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { patientId } = route.params || {};

    const { loading, error, appointmentsByDoctor } = useSelector(
        (state) => state.appointmentsListByDoctorReducer
    );

    const [selectedTab, setSelectedTab] = useState("upcoming");

    useEffect(() => {
        dispatch(listAppointmentsByDoctorActionCreators());
    }, [dispatch]);

    if (loading) return <Loader />;

    const filteredAppointments = patientId && appointmentsByDoctor
        ? appointmentsByDoctor.filter((appointment) => appointment.patientId === patientId)
        : appointmentsByDoctor;

    return (
        <ScreenContainer>
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
                {filteredAppointments && (
                    <DoctorAppointmentsFrame
                        selectedTab={selectedTab}
                        appointments={filteredAppointments}
                    />
                )}
            </View>

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
