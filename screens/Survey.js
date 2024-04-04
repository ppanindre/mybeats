import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import CustomSafeView from "../components/CustomSafeView";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

const surveyData = [
  {
    id: 0,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 1,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 2,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 3,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 4,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 5,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 6,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 7,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 8,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
  {
    id: 9,
    content:
      "We would like you to rate the app’s user interface, experience, ease-of-use, helpfulness, and overall project using the rating scale provided below. Circle a number for each item that best reflects how you feel. That is, circle 1 if you strongly disagree, 5 if you strongly agree with the statement, or",
  },
];

const Survey = () => {
  const radioButtons = [
    {
      id: 1,
      name: 1,
      isSelected: false,
    },
    {
      id: 2,
      name: 2,
      isSelected: false,
    },
    {
      id: 3,
      name: 3,
      isSelected: false,
    },
    {
      id: 4,
      name: 4,
      isSelected: false,
    },
    {
      id: 5,
      name: 5,
      isSelected: false,
    },
  ];

  const [radioButtonsData, setRadioButtonsData] = useState(radioButtons);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const selectButton = (id) => {
    setRadioButtonsData((prevData) =>
      prevData.map((data) =>
        id === data.id
          ? { ...data, isSelected: true }
          : { ...data, isSelected: false }
      )
    );
  };

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
        <TouchableOpacity onPress={goBack}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Survey</Text>
      </View>

      {/* Survey Content */}
      <View className="p-5">
        <Text className="text-lg mb-4">
          We would like you to rate the app’s user interface, experience,
          ease-of-use, helpfulness, and overall project using the rating scale
          provided below. Circle a number for each item that best reflects how
          you feel. That is, circle 1 if you strongly disagree, 5 if you
          strongly agree with the statement, or
        </Text>

        {/* Survey screen */}
        <View className="flex-row items-center justify-center gap-3 mb-5">
          {radioButtonsData.map((data) => (
            <View key={data.id} className="items-center">
              <TouchableOpacity
                onPress={() => selectButton(data.id)}
                className={`p-3 border-4 border-orange-400 rounded-full border-double ${
                  data.isSelected && "bg-orange-400"
                }`}
              />
              <Text>{data.name}</Text>
            </View>
          ))}
        </View>

        {/* Text area */}
        <View className="mb-5">
          <Text className="mb-3 text-lg">Give us your feedback</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-3 text-lg"
            multiline={true}
            numberOfLines={10}
            style={{ height: 200, textAlignVertical: "top" }}
          />
        </View>

        {/* Primary Button */}
        <CustomButton
          variant="primary"
          btnLabel="Send FeedBack"
        />
      </View>
    </CustomSafeView>
  );
};

export default Survey;
