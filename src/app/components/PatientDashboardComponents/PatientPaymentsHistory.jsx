import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenContainer from "../Containers/ScreenContainer";
import Loader from "../../components/Utils/Loader";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { listAppointmentsByPatientActionCreators } from "../../../../store/actions/appointmentActions";
import { theme } from "../../../../tailwind.config";

const ICON_SIZE = 20;

const PatientPaymentsHistory = ({ route }) => {
  const { patientId } = route.params;
  const dispatch = useDispatch();

  const { loading, appointmentsByPatient } = useSelector(
    (state) => state.appointmentsListByPatientReducer
  );

  useEffect(() => {
    if (patientId) {
      dispatch(listAppointmentsByPatientActionCreators(patientId));
    }
  }, [dispatch, patientId]);

  if (loading) return <Loader />;

  const sortedAppointments = appointmentsByPatient
    ?.slice()
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-5"   contentContainerStyle={{ paddingBottom: 50 }}>
        {sortedAppointments?.map((appt) => {
          const doctor = appt.doctor;
          const isVideo = appt.type === "video";

          return (
            <View
              key={appt.id}
              className="bg-lightPrimary p-5 rounded-lg space-y-5"
            >
              {/* Doctor Info Row */}
              <View className="flex-row items-center space-x-3">
                <Image
                  source={
                    doctor?.profileImage
                      ? { uri: doctor.profileImage }
                      : require("../../assets/doc1.webp")
                  }
                  className="w-16 h-16 rounded-full border border-primary"
                />
                <View className="flex-1">
                  <Text className="text-lg font-[appfont-bold]">
                    {doctor?.firstname} {doctor?.lastname}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-[appfont-bold] text-dark">
                      {doctor?.primarySpecialization?.name || "Specialist"}
                    </Text>
                    {isVideo ? (
                      <Ionicons
                        name="videocam"
                        size={ICON_SIZE}
                        color={theme.colors.light}
                      />
                    ) : (
                      <FontAwesome5
                        name="hospital"
                        size={ICON_SIZE}
                        color={theme.colors.light}
                      />
                    )}
                  </View>
                </View>
              </View>

              {/* Date & Fee Row */}
              <View className="flex-row justify-between px-1">
                <Text className="text-sm font-[appfont-semi]">
                    Transaction Date: {new Date(appt.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}                
                </Text>
                <Text className="text-sm font-[appfont-bold]">
                  Fees: ₹{doctor?.feeForVideoConsultation || "N/A"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

export default PatientPaymentsHistory;
