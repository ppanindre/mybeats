import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";
import AppButton from "../../Buttons/AppButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { secondarySpecializationList, countryStatesList } from "../../../../../constants/doctorProfileform2Constants";

// Form Schema for validation
const formSchema = z.object({
    address: z.string().min(1, "Please enter a valid address"),
    city: z.string().min(1, "Please enter a valid city"),
    zipcode: z.string().length(6, "Please enter a valid zipcode"),
    website: z.string().optional(),
});

const DoctorProfileForm2 = ({ handlePressNext, handlePressBack, initialData = {}, specializations = [] }) => {
    // STATES
    const [otherCondition, setOtherCondition] = useState(""); // State to hold the "other" condition if specified
    const [toggleOthers, setToggleOthers] = useState(false); // State to toggle the additional input field
    const [primarySpecializationErrorMessage, setPrimarySpecializationErrorMessage] = useState(null);
    const [secondarySpecialization, setSecondarySpecialization] = useState({
        value: initialData.secondarySpecialization || "",
        list: secondarySpecializationList,
        selectedList: (initialData.secondarySpecialization || "").split("; ").map(name => {
            return secondarySpecializationList.find(specialty => specialty.value === name);
        }).filter(Boolean),
    });
    const [countryStates, setCountryStates] = useState({
        value: initialData.state || "",
        list: countryStatesList,
        selectedList: initialData.state ? [countryStatesList.find(state => state.value === initialData.state)] : [],
    });
    const [countryStateErrorMessage, setCountryStateErrorMessage] = useState(null);

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            address: initialData.address || "",
            city: initialData.city || "",
            zipcode: initialData.zipcode || "",
            website: initialData.website || "",
        },
        resolver: zodResolver(formSchema),
    });

    const [primarySpecialization, setPrimarySpecialization] = useState({
        // matching the primary specialization id to the name in specializtions which is in initial data
        value: initialData.primarySpecializationId ? specializations.find(spec => spec.id === initialData.primarySpecializationId)?.name : "",
        list: specializations.map(spec => ({ _id: spec.id, value: spec.name })),
        selectedList: initialData.primarySpecializationId ? [{ _id: initialData.primarySpecializationId, value: specializations.find(spec => spec.id === initialData.primarySpecializationId)?.name }] : [],
    });

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
        if (selectedList.some((item) => item.value === "Select all")) {
            selectedList = secondarySpecializationList.filter(
                (item) => item.value !== "Others"
            );
        }

        setSecondarySpecialization({
            value: selectedList.map((item) => item.value).join("; "),
            selectedList: selectedList,
            list: secondarySpecializationList,
        });

        // if "Others" is selected
        const isOthersSelected = selectedList.some(
            (item) => item.value === "Others"
        );
        setToggleOthers(isOthersSelected);
    };

    const handleCountryStateSelection = (value) => {
        setCountryStates({
            value: value.text,
            selectedList: value.selectedList,
            list: countryStatesList,
        });
        setCountryStateErrorMessage(null);
    };

    // adding all the above updated data into to handle next and back
    const allData = (data) => {
        const combinedData = {
            ...data,
            primarySpecializationId: primarySpecialization.selectedList[0]?._id,
            state: countryStates.value,
            secondarySpecialization: toggleOthers
                ? otherCondition
                : secondarySpecialization.selectedList.map((item) => item.value).join("; "),
        };
        return combinedData;
    };

    const onSubmit = (data) => {
        // multi select error handling
        if (primarySpecialization.selectedList.length === 0) {
            setPrimarySpecializationErrorMessage("Please select a primary specialization");
        }

        if (countryStates.selectedList.length === 0) {
            setCountryStateErrorMessage("Please select a state");
        }

        // If no multi select error
        if (primarySpecialization.selectedList.length !== 0 && countryStates.selectedList.length !== 0) {
            const formData = allData(data);
            handlePressNext(formData);
        }
    };

    const onPressBack = (data) => {
        const formData = allData(data);
        handlePressBack(formData);
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
                            selectedArrayList={primarySpecialization.selectedList}
                            onSelection={(value) => handlePrimarySelection(value)}
                            error={primarySpecializationErrorMessage}
                        />
                    </View>

                    {/* Secondary Specialization */}
                    <View>
                        <MultiSelectInput
                            label="Secondary Specialization (Optional)"
                            value={secondarySpecialization.value}
                            arrayList={secondarySpecialization.list}
                            selectedArrayList={secondarySpecialization.selectedList}
                            onSelection={(value) => handleSecondarySelection(value)}
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
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                            onSelection={(value) => handleCountryStateSelection(value)}
                            error={countryStateErrorMessage}
                        />
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="zipcode"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                        onPress={handleSubmit(onPressBack)}
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