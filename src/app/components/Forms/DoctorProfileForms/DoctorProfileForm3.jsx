import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MultiLineInput from "../../Inputs/MultiLineInput";
import AppButton from "../../Buttons/AppButton";
import FormInput from "../../Inputs/FormInput";
import SwitchInput from "../../Inputs/SwitchInput";

const DoctorProfileForm3 = ({ handlePressSubmit, handlePressBack }) => {
    const [isAvailable, setIsAvailable] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            experience: "",
        },
    });

    const onPressSubmit = (data) => {
        handlePressSubmit(data);
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
                        <SwitchInput
                            label="Available for video consultations"
                            onValueChange={() => setIsAvailable(!isAvailable)}
                            value={isAvailable}
                        />
                    </View>

                    {isAvailable && (
                        <View>
                            <FormInput label="Fee for video consultations" />
                        </View>
                    )}

                    <View>
                        <Controller
                            control={control}
                            name="experience"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Years of experience"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    <View>
                        <MultiLineInput label="Education (Optional)" />
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
                        onPress={handleSubmit(onPressSubmit)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoctorProfileForm3;
