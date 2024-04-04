import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import auth from "@react-native-firebase/auth";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import moment from "moment";

const CustomDateComponentForFood = (props) => {
  let leftColor = props.disableLeft ? "white" : "orange";
  let color = props.disableRight ? "white" : "orange";

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const toggleDateNavigation = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateNavigation = (date) => {
    props.datePickerFunction(date);
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
            moment(auth().currentUser?.metadata.creationTime).add(1, "days").format(
              "YYYY-MM-DD"
            )
          )
        }
      />
      <TouchableOpacity
        onPress={() => (props.disableLeft ? null : props.swipeFunction("left"))}
      >
        <ChevronLeftIcon name="caretleft" color={leftColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleDateNavigation}>
        <View>
          <Text className="text-lg font-bold">{props.date}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.disableRight ? null : props.swipeFunction("right");
        }}
      >
        <ChevronRightIcon name="caretright" color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDateComponentForFood;
