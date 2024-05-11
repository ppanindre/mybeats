import { View, ScrollView } from "react-native";
import React from "react";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";
import AppButton from "../../Buttons/AppButton";

const DoctorProfileForm2 = ({ handlePressNext, handlePressBack }) => {
    const onPressNext = () => {
        handlePressNext();
    };

    const onPressBack = () => {
        handlePressBack();
    };

    return (
        <View className="space-y-5 h-[100%]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {/* Inputs */}

                    {/* Primary Specialization */}
                    <View>
                        <MultiSelectInput label="Primary Specialization" />
                    </View>

                    {/* Secondary Specialization */}
                    <View>
                        <MultiSelectInput label="Secondary Specialization (Optional)" />
                    </View>

                    {/* Address */}
                    <View>
                        <FormInput label="Address" />
                    </View>

                    <View>
                        <FormInput label="City" />
                    </View>

                    <View>
                        <MultiSelectInput label="State" />
                    </View>

                    <View>
                        <FormInput label="Zipcode" />
                    </View>

                    <View>
                        <FormInput label="Website(Optional)" />
                    </View>
                </View>
            </ScrollView>

            {/* Overlay buttons */}
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
                        btnLabel="Next"
                        onPress={onPressNext}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoctorProfileForm2;
