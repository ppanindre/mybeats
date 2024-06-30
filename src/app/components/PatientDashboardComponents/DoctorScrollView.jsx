import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorsActionCreator } from "../../../../store/actions/doctorActions";
import DoctorCard from "../Cards/DoctorCard";

const DoctorScrollView = () => {
    const { loading, error, doctors } = useSelector(
        (state) => state.doctorsListReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listDoctorsActionCreator());
    }, []);

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
                            <View>
                                <DoctorCard doctor={doctor} />
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default DoctorScrollView;
