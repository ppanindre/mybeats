import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import FormInput from "../../Inputs/FormInput";
import AppButton from "../../Buttons/AppButton";

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

    const handlePrimarySelection = (value) => {
        setPrimarySpecialization({
            ...secondarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
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
    };

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
                        <FormInput label="Address" />
                    </View>

                    <View>
                        <FormInput label="City" />
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
                        />
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
