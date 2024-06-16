import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as Sentry from "@sentry/react-native";

import { firebaseCollections } from "../../../constants/firebaseCollections";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomInput from "../../../components/CustomInput";
import DatePicker from "../../../components/DatePicker";
import CustomButton from "../../../components/CustomButton";
import MultiSelect from "../../../components/MultiSelect";

const EditProfile = () => {
  const user = useSelector((state) => state.UserReducer); // get user listener

  // define navigation instance
  const navigation = useNavigation();
  const [toggleOthers, setToggleOthers] = useState(false);
  const [firstName, setFirstName] = useState(user.profileData?.firstName); // first name
  const [lastName, setLastName] = useState(user.profileData?.lastName); // last name
  const [otherCondition, setOtherCondition] = useState(
    user.profileData?.otherCondition
  );
  const [weight, setWeight] = useState(user.profileData?.weight); //  weight
  const [height, setHeight] = useState(user.profileData?.height); // height
  const [dob, setDob] = useState(user.profileData?.dob); // date of birth
  const [gender, setGender] = useState({
    value: user.profileData?.gender ?? "",
    list: [
      { _id: "1", value: "Male" },
      { _id: "2", value: "Female" },
      { _id: "3", value: "Others" },
    ],
    selectedList: [],
    error: "",
  }); // gender

  const [profession, setProfession] = useState({
    value: user.profileData?.selectedProfessionValue ?? "",
    list: [
      { _id: "1", value: "Firefighter" },
      { _id: "2", value: "EMT/Paramedic" },
      { _id: "3", value: "Police Officer" },
      { _id: "4", value: "Military" },
      { _id: "5", value: "Hazmat" },
    ],
    selectedList: user.profileData?.selectedProfessionList ?? [],
    error: "",
  }); // profession

  const [conditions, setConditions] = useState({
    value: user.profileData?.selectedConditionsValue ?? "",
    list: [
      { _id: "1", value: "Cardiomegaly" },
      { _id: "2", value: "Arrhythmia" },
      { _id: "3", value: "Heart stroke" },
      { _id: "4", value: "Atrial fibrillation" },
      { _id: "5", value: "Other" },
    ],
    selectedList: user.profileData?.selectedConditionsList ?? [],
    error: "",
  }); // conditions

  const setProfileDataOnFirebase = async (profileData) => {
    const userId = auth().currentUser.uid;

    // Set profile profileData to firebase
    try {
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(userId)
        .update({
          profileData,
        });
      Alert.alert("", "Your profile has been saved");
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while saving profile in edit profile" },
      }); // capture error
    }
  };

  const createProfile = async () => {
    const profile = {
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
    };

    await setProfileDataOnFirebase(profile);
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

  return (
    <CustomSafeView sentry-label="edit-profile">
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ height: "100%" }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* Header */}
            <View className="p-5 border-b-2 border-gray-200 flex-row items-center justify-between">
              <View className="flex-row items-center justify-between gap-2">
                <TouchableOpacity
                  sentry-label="edit-profile-back-btn"
                  onPress={() => navigation.navigate("profile")}
                >
                  <ChevronLeftIcon color="#000000" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">Edit Profile</Text>
              </View>
            </View>

            <View className="p-5" style={{ width: "100%" }}>
              {/* Avatar Selection */}
              <View className="items-center justify-center mb-3">
                <TouchableOpacity
                  sentry-label="edit-profile-add-avatar-btn"
                  onPress={() => navigation.navigate("addAvatar")}
                >
                  {/* if user has selected avatar, show avatar, otherwise an icon with add avatar button */}
                  {user.avatar ? (
                    <View className="p-5 bg-gray-100 rounded-full ">
                      <Image
                        source={user.avatar.imgSrc}
                        style={{ height: 120, width: 120 }}
                      />
                    </View>
                  ) : (
                    <View
                      className="relative"
                      style={{ height: 120, width: 120 }}
                    >
                      <Image
                        source={require("../assets/add-avatar.png")}
                        style={{ height: 120, width: 120 }}
                      />
                      <View
                        className="absolute z-30 bg-orange-400 rounded-md p-1"
                        style={{ top: 48, left: 20 }}
                      >
                        <Text className="text-white">Add Avatar</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* User Form */}
              <View className="items-center justify-center">
                {/* Email */}
                <View className="mb-3 w-[325]">
                  <CustomInput
                    sentry-label="edit-profile-email"
                    placeholder="Email"
                    value={user.email}
                    isDisabled={true}
                  />
                </View>

                {/* First Name */}
                <View className="mb-3 w-[325]">
                  <CustomInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                  />
                </View>

                {/* Last Name */}
                <View className="mb-3 w-[325]">
                  <CustomInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                  />
                </View>

                {/* Date of Birth Handler */}
                <View className="mb-3 w-[325]">
                  <DatePicker label="Date Of Birth" onConfirm={(dob) => setDob(dob)} currVal={dob} mode="dob"/>
                </View>

                {/* Gender */}
                <View className="mb-6" style={{ height: 50, width: 325 }}>
                  <MultiSelect
                    sentry-label="edit-profile-gender"
                    label="Gender"
                    value={gender.value}
                    onSelection={(value) =>
                      setGender({
                        ...gender,
                        value: value.text,
                        selectedList: value.selectedList,
                        error: "",
                      })
                    }
                    arrayList={[...gender.list]}
                    selectedArrayList={gender.selectedList}
                    multiEnable={false}
                  />
                </View>

                {/* Weight */}
                <View className="mb-3 w-[325]">
                  <CustomInput
                    placeholder="Weight (lb)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                  />
                </View>

                {/* Height */}
                <View className="mb-3 w-[325]">
                  <CustomInput
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
                        selectedList: value.selectedList,
                        error: "",
                      })
                    }
                    arrayList={[...profession.list]}
                    selectedArrayList={profession.selectedList}
                    multiEnable={true}
                  />
                </View>

                {/* Underlying conditions */}
                <View className="mb-2" style={{ width: 325 }}>
                  <MultiSelect
                    sentry-label="edit-profile-underlyingconditions"
                    label="Underlying Conditions"
                    value={conditions.value}
                    onSelection={(value) =>
                      setConditions({
                        ...conditions,
                        value: value.text,
                        selectedList: value.selectedList,
                        error: "",
                      })
                    }
                    arrayList={[...conditions.list]}
                    selectedArrayList={[...conditions.selectedList]}
                    multiEnable={true}
                  />
                </View>

                {toggleOthers && (
                  <View className="mb-3 w-[325]">
                    <CustomInput
                      placeholder="If other, please specify"
                      value={otherCondition}
                      onChangeText={(text) => setOtherCondition(text)}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View className="px-8 mt-4">
        <CustomButton
          sentry-label="edit-profile-save-btn"
          variant="primary"
          btnLabel="Save"
          onPress={createProfile}
        />
      </View>
    </CustomSafeView>
  );
};

export default EditProfile;
