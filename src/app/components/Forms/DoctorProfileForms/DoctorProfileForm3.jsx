import { View, Text, ScrollView } from "react-native";
import React from "react";
import MultiLineInput from "../../Inputs/MultiLineInput";
import AppButton from "../../Buttons/AppButton";

const DoctorProfileForm3 = ({ handlePressSubmit, handlePressBack }) => {
    const onPressSubmit = () => {
      handlePressSubmit();
    };

    const onPressBack = () => {
      handlePressBack();
    };

    return (
        <View className="space-y-5 h-[100%]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {/* Inputs */}
                    <View>
                        <MultiLineInput label="Education (Optional)" />
                    </View>

                    <View>
                        <MultiLineInput label="Experience (Optional)" />
                    </View>

                    <View>
                        <MultiLineInput label="Awards and Achievements (Optional)" />
                    </View>
                </View>
            </ScrollView>

            {/* Overlay button */}
            <View className="flex-row space-x-3">
                <View className="flex-1">
                    <AppButton
                        variant="light"
                        btnLabel="Back"
                        onPress={onPressBack}
                    />
                </View>

                <View className="flex-1">
                    <AppButton
                        variant="primary"
                        btnLabel="Save"
                        onPress={onPressSubmit}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoctorProfileForm3;
