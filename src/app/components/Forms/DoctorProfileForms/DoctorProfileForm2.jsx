import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";
import AppButton from "../../Buttons/AppButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tr } from "react-native-paper-dates";

// Form Schema for validation
const formSchema = z.object({
    address: z.string().min(1, "Please enter a valid address"),
    city: z.string().min(1, "Please enter a valid city"),
    zipcode: z.string().length(6, "Please enter a valid zipcode"),
    website: z.string().optional(),
});

const DoctorProfileForm2 = ({ handlePressNext, handlePressBack, specialties, initialData = {} }) => {
    // STATES
    const [otherCondition, setOtherCondition] = useState(''); // State to hold the "other" condition if specified
    const [toggleOthers, setToggleOthers] = useState(false); // State to toggle the additional input field
    const [primarySpecialization, setPrimarySpecialization] = useState({
        value: "",
        list: specialties,
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
            address: initialData.address || "",
            city: initialData.city || "",
            zipcode: initialData.zipcode || "",
            website: initialData.website || "",
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (initialData.primarySpecialization) {
            const selectedSpecialization = specialties.find(specialty => specialty._id === initialData.primarySpecialization);
            if (selectedSpecialization) {
                setPrimarySpecialization({
                    ...primarySpecialization,
                    value: selectedSpecialization.value,
                    selectedList: [selectedSpecialization],
                });
            }
        }

        if (initialData.secondarySpecialization) {
            const selectedList = initialData.secondarySpecialization.split("; ").map(name => {
                return secondarySpecialization.list.find(specialty => specialty.value === name);
            }).filter(Boolean);
            setSecondarySpecialization({
                ...secondarySpecialization,
                value: selectedList.map(item => item.value).join("; "),
                selectedList,
            });
        }

        if (initialData.state) {
            const selectedState = countryStates.list.find(state => state.value === initialData.state);
            if (selectedState) {
                setCountryStates({
                    ...countryStates,
                    value: selectedState.value,
                    selectedList: [selectedState],
                });
            }
        }
    }, [initialData, specialties]);

    const handlePrimarySelection = (value) => {
        setPrimarySpecialization({
            ...primarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
        setPrimarySpecializationErrorMessage(null);
    };

    const handleSecondarySelection = (value) => {
        let selectedList = value.selectedList;

        // Handling "Select All"
        if (selectedList.some(item => item.value === "Select all")) {
            selectedList = secondarySpecialization.list.filter(item => item.value !== "Others");
        }

        setSecondarySpecialization({
            ...secondarySpecialization,
            value: selectedList.map(item => item.value).join("; "),
            selectedList: selectedList,
        });

        // if "Others" is selected
        const isOthersSelected = selectedList.some(item => item.value === "Others");
        setToggleOthers(isOthersSelected);
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
                primarySpecialization: primarySpecialization.selectedList[0]._id, // Assume single selection for primary
                state: countryStates.value,
                secondarySpecialization: toggleOthers ? otherCondition : secondarySpecialization.selectedList.map(item => item.value).join("; "),
                ...data,
            };

            // send back the form data to the parent component
            handlePressNext(formData);
        }
    };

    const onPressBack = (data) => {
        handlePressBack(data);
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
                            multiEnable={true}
                        />
                        {toggleOthers && (
                            <View className="mt-4">
                                <FormInput
                                    label="If other, please specify"
                                    value={otherCondition}
                                    onChangeText={setOtherCondition}
                                />
                            </View>
                        )}
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
