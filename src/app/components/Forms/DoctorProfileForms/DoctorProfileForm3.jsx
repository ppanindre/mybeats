import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MultiLineInput from "../../Inputs/MultiLineInput";
import AppButton from "../../Buttons/AppButton";
import FormInput from "../../Inputs/FormInput";
import SwitchInput from "../../Inputs/SwitchInput";

const DoctorProfileForm3 = ({ handlePressSubmit, handlePressBack, initialData }) => {
    const [isAvailable, setIsAvailable] = useState(initialData.availableForVideoConsultation || false);

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            experience: initialData.experience || "",
            feeForVideoConsultation: initialData.feeForVideoConsultation || "",
            educationExperience: initialData.educationExperience || "",
            awardsRecognition: initialData.awardsRecognition || "",
        },
    });

    // useEffect(() => {
    //     if (initialData.availableForVideoConsultation) {
    //         setIsAvailable(initialData.availableForVideoConsultation);
    //     }
    // }, [initialData.availableForVideoConsultation]);

    const onPressSubmit = (data) => {
        const finalData = {
            ...data,
            availableForVideoConsultation: isAvailable,
        };
        handlePressSubmit(finalData);
    };

    const onPressBack = () => {
        const data = getValues(); //  current form data
        handlePressBack({ ...data, availableForVideoConsultation: isAvailable });
    };

    return (
        <View className="space-y-5 h-[100%]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    <View>
                        <SwitchInput
                            label="Available for video consultations"
                            onValueChange={() => setIsAvailable(!isAvailable)}
                            value={isAvailable}
                        />
                    </View>

                    {isAvailable && (
                        <View>
                            <Controller
                                control={control}
                                name="feeForVideoConsultation"
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <FormInput
                                        value={value}
                                        onChangeText={onChange}
                                        label="Fee for video consultations"
                                        error={error}
                                    />
                                )}
                            />
                        </View>
                    )}

                    <View>
                        <Controller
                            control={control}
                            name="experience"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                        <Controller
                            control={control}
                            name="educationExperience"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <MultiLineInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Education (Optional)"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="awardsRecognition"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <MultiLineInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Awards and Achievements (Optional)"
                                    error={error}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>

            <View className="flex-row space-x-3">
                <View className="flex-1">
                    <AppButton variant="light" btnLabel="Back" onPress={onPressBack} />
                </View>

                <View className="flex-1">
                    <AppButton variant="primary" btnLabel="Save" onPress={handleSubmit(onPressSubmit)} />
                </View>
            </View>
        </View>
    );
};

export default DoctorProfileForm3;
