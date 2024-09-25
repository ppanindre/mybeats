import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import DoctorInfo from "../../components/PatientDashboardComponents/DoctorInfo";
import HorizontalLine from "../../../../MyCharts/Components/HorizontalLine";
import { theme } from "../../../../tailwind.config";
import { TouchableOpacity } from "react-native";
import AppButton from "../../components/Buttons/AppButton";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { createAppointmentActionCreators } from "../../../../store/actions/appointmentActions";
import { Alert } from "react-native";

const ConfirmAppointment = ({ route }) => {
    const { doctor, selectedTime, appointmentType } = route.params;
    console.log(selectedTime)

    const [paymentMethod, setPaymentMethod] = useState("Pay At Clinic");

    const dispatch = useDispatch();

    const bookAppointment = async () => {
        dispatch(
            createAppointmentActionCreators(
                doctor.doctorID,
                appointmentType,
                selectedTime
            )
        );

        Alert.alert("", "Your appointment has been booked");
    };

   
    const appointmentTime = moment(selectedTime.startTime);  // selected time to moment 

    return (
        <ScreenContainer >
            <ScrollView className="space-y-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View>
                    <DoctorInfo doctor={doctor} />
                </View>

                <View className="border border-primary"></View>

                <View>
                    {/* <HorizontalLine /> */}
                    <View className="flex-row items-center space-x-3">
                        <Ionicons name="time-outline" size={20} color={theme.colors.dark} />
                        <Text className="text-lg text-dark font-[appfont-semi]">
                           {appointmentType =="video" ? "Video" : "In Person"} - Appointment time
                        </Text>
                    </View>

                    <View className="flex-row flex-wrap">
                        <Text className="text-lg text-dark font-[appfont-semi]">
                            {appointmentTime.format("ddd, DD MMM hh:mm A")} 
                        </Text>
                    </View>
                </View>

                <View className="border border-primary"></View>


                <View>
                    <View className="flex-row items-center space-x-3">
                        <Ionicons name="business" size={20} color={theme.colors.dark} />
                        <Text className="text-lg text-dark font-[appfont-semi]">
                            Clinic Details
                        </Text>
                    </View>
                    <View className="flex-row flex-wrap">
                        <Text className="text-lg text-dark font-[appfont-semi]">
                            {doctor.address}, {doctor.city}, {doctor.state} - {doctor.zipcode}
                        </Text>
                    </View>
                </View>

                <View className="border border-primary"></View>


                <View className="space-y-5">
                    <Text className="text-lg text-dark font-[appfont-semi]">
                        Choose a mode of payment
                    </Text>

                    {/* Pay Online Option */}
                    <TouchableOpacity
                        className="flex-row justify-between items-center"
                        onPress={() => setPaymentMethod("Pay Online")}
                    >
                        <View className="flex-row items-center space-x-3">
                            <Ionicons
                                name={paymentMethod === "Pay Online" ? "radio-button-on" : "radio-button-off"}
                                size={20}
                                color={theme.colors.dark}
                            />
                            <Text className="text-lg text-dark font-[appfont-semi]">Pay Online</Text>
                        </View>
                        <View className="flex-row items-center space-x-2">
                            <Text className="text-lg line-through text-gray-400">₹ {doctor.feeForVideoConsultation}</Text>
                            <Text className="text-lg text-dark font-[appfont-semi]">₹ {doctor.feeForVideoConsultation}</Text>
                        </View>
                    </TouchableOpacity>

                    <HorizontalLine />

                    {/* Pay At Clinic Option */}
                    <TouchableOpacity
                        className="flex-row justify-between items-center"
                        onPress={() => setPaymentMethod("Pay At Clinic")}
                    >
                        <View className="flex-row items-center space-x-3">
                            <Ionicons
                                name={paymentMethod === "Pay At Clinic" ? "radio-button-on" : "radio-button-off"}
                                size={20}
                                color={theme.colors.dark}
                            />
                            <Text className="text-lg text-dark font-[appfont-semi]">Pay At Clinic</Text>
                        </View>
                        <Text className="text-lg text-dark font-[appfont-semi]">₹ {doctor.feeForVideoConsultation}</Text>
                    </TouchableOpacity>

                </View>

                <View className="border border-primary"></View>

                <View className="space-y-5">
                    <View className="space-y-3">
                        <Text className="text-lg font-[appfont-bold] text-dark">
                            Bill Details
                        </Text>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-[appfont] text-darkGrey" style={{color: theme.colors.darkGrey}}>
                                Consultation Fee
                            </Text>
                            <Text className="text-lg font-[appfont] text-darkGrey" style={{color: theme.colors.darkGrey}}>
                                ₹ {doctor.feeForVideoConsultation}
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-[appfont] text-darkGrey" style={{color: theme.colors.darkGrey}}>
                                Service Fee & Tax
                            </Text>
                            <Text className="text-lg font-[appfont] text-darkGrey" style={{color: theme.colors.darkGrey}}>
                                Free
                            </Text>
                        </View>

                        <HorizontalLine />

                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-[appfont-semi] text-dark">
                                Total Payable
                            </Text>
                            <Text className="text-lg font-[appfont-semi] text-dark">
                                ₹ {doctor.feeForVideoConsultation}
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        className="flex-row items-center justify-between p-5 rounded-lg shadow-md bg-darkSecondary"
                        onPress={() => navigation.navigate("medicines")}
                    >
                        <View className="flex-1">
                            <Text className="text-lg font-[appfont-bold] text-dark">
                                Apply Coupons
                            </Text>
                            <Text className="text-sm font-[appfont-bold] text-dark">
                                Unlock offers with coupon codes
                            </Text>
                        </View>

                        {/* Apply coupon */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("uploadPrescription")}
                            className="py-3 px-6 rounded-full shadow-md bg-light"
                        >
                            <Text className="font-[appfont-bold] text-dark">
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>


            </ScrollView>

            <View>
                <AppButton
                    onPress={bookAppointment}
                    variant="primary"
                    btnLabel={(
                        <View className="flex-row justify-between items-center w-full">
                            <Text className="text-lg text-light font-[appfont-bold]">
                                ₹ {doctor.feeForVideoConsultation}
                            </Text>

                            <Text className="text-lg text-light font-[appfont-bold]">
                                Confirm Appointment
                            </Text>
                        </View>
                    )}
                />
            </View>

        </ScreenContainer>
    );
};

export default ConfirmAppointment;
