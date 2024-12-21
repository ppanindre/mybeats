import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { listAppointmentsByPatientActionCreators } from "../../../../store/actions/appointmentActions";
import Loader from "../../components/Utils/Loader";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import moment from "moment";

const Medications = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { patientId } = route.params || {};

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const { loading: appointmentsLoading, appointmentsByPatient } = useSelector(
    (state) => state.appointmentsListByPatientReducer
  );

  useEffect(() => {
    if (patientId) {
      dispatch(listAppointmentsByPatientActionCreators(patientId));
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (appointmentsByPatient?.length) {
      // filtering appointments
      const appointmentsWithMedications = appointmentsByPatient.filter(
        (appointment) =>
          (appointment.prescriptions?.items?.length > 0) || 
          (appointment.prescriptionImagePaths?.length > 0)
      );
      setFilteredAppointments(appointmentsWithMedications);
    }
  }, [appointmentsByPatient]);

  const handleCardPress = (appointment) => {
    if (appointment.prescriptionImagePaths?.length > 1) {
      navigation.replace("prescritionImages", {
        appointmentId: appointment.id,
      });
    } else {
      navigation.replace("prescriptionList", { appointmentId: appointment.id });
    }
  };

  const AppointmentCard = ({ item: appointment }) => (
    <TouchableOpacity
      className="relative bg-lightPrimary items-center justify-center rounded-lg shadow-lg mb-5 p-5"
      onPress={() => handleCardPress(appointment)}
    >
      <View className="flex-row space-x-3 items-center">
        <Image
          source={require("../../assets/doc1.webp")}
          className="h-16 w-16 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-[appfont-semi] text-lg">
            {appointment.doctor?.firstname} {appointment.doctor?.lastname}
          </Text>
          <Text className="font-[appfont-semi]">
            Date Attended - {moment(appointment.startTime).format("D MMM YYYY")},{" "}
            {moment(appointment.startTime).format("H:mm a")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (appointmentsLoading) return <Loader />;

  return (
    <ScreenContainer>
      <FlatList
        data={filteredAppointments}
        renderItem={AppointmentCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text className="font-[appfont-semi] text-center text-lg">No Prescriptions found</Text>
        )}
      />
    </ScreenContainer>
  );
};

export default Medications;
