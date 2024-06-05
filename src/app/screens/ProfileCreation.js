import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomInput from "../../../components/CustomInput";
import DatePicker from "../../../components/DatePicker";
import CustomButton from "../../../components/CustomButton";
import MultiSelect from "../../../components/MultiSelect";

import { userQueries } from "../../../apis/userQueries";
import { createPatientActionCreator } from "../../../store/actions/patientActions";

const ProfileCreation = () => {
    const { selectedAvatar } = useSelector((state) => state.ProfileReducer); // get selected avatar from reducer
    const { loading, error, success } = useSelector(
        (state) => state.patientCreateReducer
    );

    // define navigation instance
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // define states
    const [firstName, setFirstName] = useState(""); // first name field
    const [lastName, setLastName] = useState(""); // last name field
    const [otherCondition, setOtherCondition] = useState(""); // other profession
    const [weight, setWeight] = useState(); // weight field
    const [height, setHeight] = useState(); // height field
    const [dob, setDob] = useState(); // date of birth field
    const [toggleOthers, setToggleOthers] = useState(false);
    const [gender, setGender] = useState({
        value: "",
        list: [
            { _id: "1", value: "Male" },
            { _id: "2", value: "Female" },
            { _id: "3", value: "Others" },
        ],
        selectedList: [],
        error: "",
    }); // gender multi select state
    const [conditions, setConditions] = useState({
        value: "",
        list: [
            { _id: "1", value: "Cardiomegaly" },
            { _id: "2", value: "Arrhythmia" },
            { _id: "3", value: "Heart stroke" },
            { _id: "4", value: "Atrial fibrillation" },
            { _id: "5", value: "Other" },
        ],
        selectedList: [],
        error: "",
    }); // conditions multi select state
    const [profession, setProfession] = useState({
        value: "",
        list: [
            { _id: "1", value: "Firefighter" },
            { _id: "2", value: "EMT/Paramedic" },
            { _id: "3", value: "Police Officer" },
            { _id: "4", value: "Military" },
            { _id: "5", value: "Hazmat" },
            { _id: "6", value: "Other first responder" },
        ],
        selectedList: [],
        error: "",
    }); // profession multi select state

    // function to create profile
    const createProfile = async () => {
        const profileData = {
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            weight: weight ?? "",
            height: height ?? "",
            gender: gender.value ?? "",
            dob: dob ?? "",
            selectedConditionsList: conditions.selectedList ?? [],
            selectedConditionsValue: conditions.value ?? "",
            selectedProfessionList: profession.selectedList ?? [],
            selectedProfessionValue: profession.value ?? "",
            otherCondition: otherCondition ?? "",
        }; // profile data based on inputs entered
        await userQueries.setProfileDataOnFirebase(profileData, selectedAvatar); // set profile data on firebase
        dispatch(createPatientActionCreator(profileData)); // create patient
    };

    useEffect(() => {
        let toShowOthers = false;
        conditions.selectedList.forEach((item) => {
            if (item.value === "Other") {
                toShowOthers = true;
                return;
            } else {
                toShowOthers = false;
            }
        });

        if (toShowOthers) {
            setToggleOthers(true);
        } else {
            setToggleOthers(false);
        }
    }, [conditions]);

    useEffect(() => {
      if (success) {
        navigation.navigate("welcome")
      }
    }, [loading])

    return (
        <CustomSafeView sentry-label="profile-creation">
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()} // dismiss the keyboard if user touches anywhere in the screen
                style={{ height: "100%" }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {/* Header */}
                        <View className="p-5 border-b-2 border-gray-200 flex-row items-center justify-between">
                            {/* Create Profile Heading */}
                            <View className="">
                                <Text className="text-2xl font-bold">
                                    Create Profile
                                </Text>
                            </View>

                            {/* Skip Button */}
                            <TouchableOpacity
                                sentry-label="profile-creation-skip-btn"
                                onPress={createProfile}
                            >
                                <Text className="text-lg text-orange-400 font-bold">
                                    Skip
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="p-5" style={{ width: "100%" }}>
                            {/* Avatar Selection */}
                            <View className="items-center justify-center mb-3">
                                {/* Button for add avatar */}
                                <TouchableOpacity
                                    sentry-label="profile-creation-add-avatar-btn"
                                    onPress={() =>
                                        navigation.navigate(
                                            "addAvatarForProfileCreation"
                                        )
                                    }
                                >
                                    {selectedAvatar ? (
                                        // if user has selected an avatar, show the avatar
                                        <View className="p-5 bg-gray-100 rounded-full ">
                                            <Image
                                                source={selectedAvatar.imgSrc}
                                                style={{
                                                    height: 120,
                                                    width: 120,
                                                }}
                                            />
                                        </View>
                                    ) : (
                                        // if user does not have a selected avatar, show the add avatar button
                                        <View
                                            className="relative"
                                            style={{ height: 120, width: 120 }}
                                        >
                                            <Image
                                                source={require("../assets/add-avatar.png")}
                                                style={{
                                                    height: 120,
                                                    width: 120,
                                                }}
                                            />
                                            <View
                                                className="absolute z-30 bg-orange-400 rounded-md p-1"
                                                style={{ top: 48, left: 20 }}
                                            >
                                                <Text className="text-white">
                                                    Add Avatar
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            {/* User Form */}
                            <View className="items-center justify-center">
                                <View className="mb-3">
                                    {/* First Name */}
                                    <CustomInput
                                        sentry-label="profile-creation-first-name"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChangeText={(text) =>
                                            setFirstName(text)
                                        }
                                    />
                                </View>

                                {/* Last Name */}
                                <View className="mb-3">
                                    <CustomInput
                                        sentry-label="profile-creation-last-name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChangeText={(text) =>
                                            setLastName(text)
                                        }
                                    />
                                </View>

                                {/* Date of birth */}
                                <View className="mb-3">
                                    <DatePicker
                                        sentry-label="profile-creation-dob"
                                        onConfirm={(dob) => setDob(dob)}
                                        currVal={dob}
                                    />
                                </View>

                                {/* Gender component */}
                                <View
                                    className="mb-6"
                                    style={{ height: 50, width: 325 }}
                                >
                                    <MultiSelect
                                        sentry-label="profile-creation-gender"
                                        label="Gender"
                                        value={gender.value}
                                        onSelection={(value) =>
                                            setGender({
                                                ...gender,
                                                value: value.text,
                                                selectedList:
                                                    value.selectedList,
                                                error: "",
                                            })
                                        }
                                        arrayList={[...gender.list]}
                                        selectedArrayList={gender.selectedList}
                                        multiEnable={false}
                                    />
                                </View>

                                {/* Weight */}
                                <View className="mb-3">
                                    <CustomInput
                                        sentry-label="profile-creation-weight-input"
                                        placeholder="Weight (lb)"
                                        keyboardType="numeric"
                                        value={weight}
                                        onChangeText={(text) => setWeight(text)}
                                    />
                                </View>

                                {/* Height */}
                                <View className="mb-3">
                                    <CustomInput
                                        sentry-label="profile-creation-height"
                                        placeholder="Height (inch)"
                                        keyboardType="numeric"
                                        value={height}
                                        onChangeText={(text) => setHeight(text)}
                                    />
                                </View>

                                {/* Profession */}
                                <View className="mb-3" style={{ width: 325 }}>
                                    <MultiSelect
                                        sentry-label="edit-profile-profession"
                                        label="Profession"
                                        value={profession.value}
                                        onSelection={(value) =>
                                            setProfession({
                                                ...profession,
                                                value: value.text,
                                                selectedList:
                                                    value.selectedList,
                                                error: "",
                                            })
                                        }
                                        arrayList={[...profession.list]}
                                        selectedArrayList={
                                            profession.selectedList
                                        }
                                        multiEnable={true}
                                    />
                                </View>

                                {/* Underlying conditions */}
                                <View className="mb-3" style={{ width: 325 }}>
                                    <MultiSelect
                                        sentry-label="underlying-conditions"
                                        label="Underlying Conditions"
                                        value={conditions.value}
                                        onSelection={(value) =>
                                            setConditions({
                                                ...conditions,
                                                value: value.text,
                                                selectedList:
                                                    value.selectedList,
                                                error: "",
                                            })
                                        }
                                        arrayList={[...conditions.list]}
                                        selectedArrayList={[
                                            ...conditions.selectedList,
                                        ]}
                                        multiEnable={true}
                                    />
                                </View>

                                {toggleOthers && (
                                    <View className="mb-3">
                                        <CustomInput
                                            placeholder="If other, please specify"
                                            value={otherCondition}
                                            onChangeText={(text) =>
                                                setOtherCondition(text)
                                            }
                                        />
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            {/* Save Button */}
            <View className="px-8 mt-4">
                <CustomButton
                    sentry-label="profile-creation-save-profile-btn"
                    variant="primary"
                    btnLabel="Save"
                    onPress={createProfile}
                />
            </View>
        </CustomSafeView>
    );
};

export default ProfileCreation;
