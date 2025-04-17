import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorCard from "../Cards/DoctorCard";
import Loader from "../Utils/Loader";

const DoctorScrollView = () => {
    const { loading, error, doctors } = useSelector(
        (state) => state.doctorsListReducer
    );

    const { loading: primaryLoading, specializations } = useSelector(
        (state) => state.primarySpecializationReducer || {}
    );

    if (loading || primaryLoading) return <Loader />;

    return (
        <View className="space-y-3">
            <View className="flex-row justify-between items-center">
                <Text className="font-[appfont-bold] text-lg">
                    Doctors Near you
                </Text>
                <TouchableOpacity>
                    <Text className="text-primary font-[appfont-bold]">
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <View className="flex-row space-x-3">
                    {doctors &&
                        doctors.map((doctor) => (
                            <View key={doctor.doctorID}> 
                                <DoctorCard doctor={doctor} specializations={specializations}/>
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default DoctorScrollView;