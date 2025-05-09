import React, { useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScreenContainer from "../Containers/ScreenContainer";
import { theme } from "../../../../tailwind.config";
import { listAppointmentsByDoctorActionCreators } from "../../../../store/actions/appointmentActions";
import Loader from "../Utils/Loader";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const DoctorPaymentsHistory = ({ route }) => {
  const { patient, bmi } = route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const ICON_SIZE = 24;

  const { appointmentsByDoctor, loading } = useSelector(
    (state) => state.appointmentsListByDoctorReducer
  );

  useEffect(() => {
    dispatch(listAppointmentsByDoctorActionCreators());
  }, [dispatch]);

  if (loading) return <Loader />;

  const patientAppointments = appointmentsByDoctor
    ?.filter((a) => a.patientId === patient.id)
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6" contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Patient Info Header */}
        <View className="flex-row items-center space-x-4 mb-4">
          <Image
            source={
              patient.profileImage
                ? { uri: patient.profileImage }
                : require("../../assets/add-avatar.png")
            }
            className="w-12 h-12 rounded-xl"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-bold">
              {patient.firstname} {patient.lastname}
            </Text>
            <Text className="text-sm text-dark font-medium">
              BMI: {bmi} | Age: {patient.age ? `${patient.age} Years` : "N/A"}
            </Text>
          </View>
        </View>

        {/* Appointment Cards */}
        {patientAppointments?.map((appt) => (
          <View
            key={appt.id}
            className="flex-row items-center bg-lightPrimary rounded-xl p-3 space-x-4"
          >
            <View className="w-16 h-16 bg-light rounded-full items-center justify-center">
              {appt.type === "video" ? (
                <Ionicons
                  name="videocam"
                  size={ICON_SIZE}
                  color={theme.colors.primary}
                />
              ) : (
                <FontAwesome5
                  name="hospital"
                  size={ICON_SIZE}
                  color={theme.colors.primary}
                />
              )}
            </View>
            <View>
              <Text className="text-base font-[appfont-bold]">
                Fee Amount: ₹{appt.doctor?.feeForVideoConsultation || "N/A"}
              </Text>
                <Text className="font-[appfont-semi] text-sm">
                    Transaction Date: {new Date(appt.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}              
                </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

export default DoctorPaymentsHistory;
