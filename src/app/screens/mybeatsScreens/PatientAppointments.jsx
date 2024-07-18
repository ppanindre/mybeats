import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabButton from "../../components/Buttons/TabButton";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import PatientAppointmentsFrame from "../../components/PatientAppointmentsComponents/PatientAppointmentsFrame";
import { useDispatch, useSelector } from "react-redux";
import { listAppointmentsByPatientActionCreators } from "../../../../store/actions/appointmentActions";
import Loader from "../../components/Utils/Loader";

const PatientAppointments = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { patientId } = route.params || {};

    // console.log('Route Params:', route.params);
    // console.log('Patient ID:', patientId);

    const { loading, error, appointmentsByPatient } = useSelector(
        (state) => state.appointmentsListByPatientReducer
    );

    const [selectedTab, setSelectedTab] = useState("upcoming");

    useEffect(() => {
        if (patientId) {
            dispatch(listAppointmentsByPatientActionCreators(patientId));
        }
    }, [dispatch, patientId]);

    if (loading) return <Loader />;

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
                {appointmentsByPatient && (
                    <PatientAppointmentsFrame
                        selectedTab={selectedTab}
                        appointments={appointmentsByPatient}
                    />
                )}
            </View>
        </ScreenContainer>
    );
};

export default PatientAppointments;
