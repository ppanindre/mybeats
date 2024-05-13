import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";
import AppButton from "../../Buttons/AppButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Form Schema for validation
const formSchema = z.object({
    address: z.string().min(1, "Please enter a valid address"),
    city: z.string().min(1, "Please enter a valid city"),
    zipcode: z.string().length(5, "Please enter a valid zipcode"),
    website: z.string().optional(),
});

const DoctorProfileForm2 = ({ handlePressNext, handlePressBack }) => {
    // STATES
    const [primarySpecialization, setPrimarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Cardiology" },
            { _id: "2", value: "Neurology" },
            { _id: "3", value: "Orthopedics" },
        ],
        selectedList: [],
    });
    const [
        primarySpecializationErrorMessage,
        setPrimarySpecializationErrorMessage,
    ] = useState(null);
    const [secondarySpecialization, setSecondarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Surgery" },
            { _id: "2", value: "Pediatrics" },
            { _id: "3", value: "General Medicine" },
            { _id: "4", value: "Others" },
        ],
        selectedList: [],
    });
    const [countryStates, setCountryStates] = useState({
        value: "",
        list: [
            { _id: "1", value: "Andhra Pradesh" },
            { _id: "2", value: "Arunachal Pradesh" },
            { _id: "3", value: "Assam" },
            { _id: "4", value: "Bihar" },
            { _id: "5", value: "Chhattisgarh" },
            { _id: "6", value: "Goa" },
            { _id: "7", value: "Gujarat" },
            { _id: "8", value: "Haryana" },
            { _id: "9", value: "Himachal Pradesh" },
            { _id: "10", value: "Jharkhand" },
            { _id: "11", value: "Karnataka" },
            { _id: "12", value: "Kerala" },
            { _id: "13", value: "Madhya Pradesh" },
            { _id: "14", value: "Maharashtra" },
            { _id: "15", value: "Manipur" },
            { _id: "16", value: "Meghalaya" },
            { _id: "17", value: "Mizoram" },
            { _id: "18", value: "Nagaland" },
            { _id: "19", value: "Odisha" },
            { _id: "20", value: "Punjab" },
            { _id: "21", value: "Rajasthan" },
            { _id: "22", value: "Sikkim" },
            { _id: "23", value: "Tamil Nadu" },
            { _id: "24", value: "Telangana" },
            { _id: "25", value: "Tripura" },
            { _id: "26", value: "Uttar Pradesh" },
            { _id: "27", value: "Uttarakhand" },
            { _id: "28", value: "West Bengal" },
        ],
        selectedList: [],
    });
    const [countryStateErrorMessage, setCountryStateErrorMessage] =
        useState(null);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            address: "",
            city: "",
            zipcode: "",
            website: "",
        },
        resolver: zodResolver(formSchema),
    });

    const handlePrimarySelection = (value) => {
        setPrimarySpecialization({
            ...secondarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
        setPrimarySpecializationErrorMessage(null);
    };

    const handleSecondarySelection = (value) => {
        setSecondarySpecialization({
            ...secondarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
    };

    const handleCountryStateSelection = (value) => {
        setCountryStates({
            ...countryStates,
            value: value.text,
            selectedList: value.selectedList,
        });
        setCountryStateErrorMessage(null);
    };

    const onSubmit = (data) => {
        // multi select error handling
        if (primarySpecialization.selectedList.length === 0) {
            setPrimarySpecializationErrorMessage(
                "Please select a primary specialization"
            );
        }

        if (countryStates.selectedList.length === 0) {
            setCountryStateErrorMessage("Please select a state");
        }

        // If no multi select error
        if (
            primarySpecialization.selectedList.length !== 0 &&
            countryStates.selectedList.length !== 0
        ) {
            // consolidate the doctor data into one object
            const formData = {
                primarySpecialization: primarySpecialization.value,
                countryState: countryStates.value,
                secondarySpecialization: secondarySpecialization.value,
                ...data,
            };

            // send back the form data to the parent component
            handlePressNext(formData);
        }
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
                        <MultiSelectInput
                            label="Primary Specialization"
                            value={primarySpecialization.value}
                            arrayList={primarySpecialization.list}
                            selectedArrayList={
                                primarySpecialization.selectedList
                            }
                            onSelection={(value) =>
                                handlePrimarySelection(value)
                            }
                            error={primarySpecializationErrorMessage}
                        />
                    </View>

                    {/* Secondary Specialization */}
                    <View>
                        <MultiSelectInput
                            label="Secondary Specialization (Optional)"
                            value={secondarySpecialization.value}
                            arrayList={secondarySpecialization.list}
                            selectedArrayList={
                                secondarySpecialization.selectedList
                            }
                            onSelection={(value) =>
                                handleSecondarySelection(value)
                            }
                        />
                    </View>

                    {/* Address */}
                    <View>
                        <Controller
                            control={control}
                            name="address"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Address"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="city"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="City"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    <View>
                        <MultiSelectInput
                            label="State"
                            value={countryStates.value}
                            arrayList={countryStates.list}
                            selectedArrayList={countryStates.selectedList}
                            onSelection={(value) =>
                                handleCountryStateSelection(value)
                            }
                            error={countryStateErrorMessage}
                        />
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="zipcode"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Zipcode"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="website"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Website(Optional)"
                                    error={error}
                                />
                            )}
                        />
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
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoctorProfileForm2;
