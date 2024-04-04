import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import auth from "@react-native-firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import moment from "moment";

export const CustomDateComponent = ({
  disableLeft,
  disableRight,
  date,
  swipeFunction,
  datePickerFunction,
}) => {
  const leftColor = disableLeft ? "white" : "#fb923c";
  const color = disableRight ? "white" : "#fb923c";

  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDateNavigation = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateNavigation = (date) => {
    datePickerFunction(date);
    setShowDatePicker(false);
  };

  return (
    <View className="flex-row items-center justify-between">
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => handleDateNavigation(date)}
        onCancel={toggleDateNavigation}
        maximumDate={new Date(moment().add(1, "days").format("YYYY-MM-DD"))}
        minimumDate={
          new Date(
            moment(auth().currentUser?.metadata.creationTime).add(1, "day").format(
              "YYYY-MM-DD"
            )
          )
        }
      />

      <TouchableOpacity
        onPress={() => (disableLeft ? null : swipeFunction("left"))}
      >
        <ChevronLeftIcon name="caretleft" color={leftColor} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={toggleDateNavigation}>
          <Text className="text-lg font-bold">{date}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          disableRight ? null : swipeFunction("right");
        }}
      >
        <ChevronRightIcon name="caretright" color={color} />
      </TouchableOpacity>
    </View>
  );
};
