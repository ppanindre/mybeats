import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import { customTheme } from "../constants/themeConstants";

const DatePicker = (props) => {
  let date = props.currVal;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // is date picker visible

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {    
    setDatePickerVisibility(false);
  };

  // Handle confirm
  const handleConfirm = (date_) => {
    hideDatePicker();
    date_ = date_.toString().split(" ");
    props.onConfirm(date_[1] + " " + date_[2] + ", " + date_[3]);
  };

  // Handle change
  const handleChange = (event) => {
    props.onchange(event.target.value);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(text) => {
          handleConfirm(text);
        }}
        onCancel={hideDatePicker}
        maximumDate={new Date(moment().format("YYYY-MM-DD"))}
      />
      <View>
        <TextInput
          label="Date Of Birth"
          value={date}
          outlineColor={customTheme.colors.dark}
          onFocus={showDatePicker}
          mode="outlined"
          keyboardAppearance="dark"
          theme={{
            colors: { primary: customTheme.colors.primary, error: "#E32A17" },
          }}
          onChange={handleChange}
          contentStyle={{
            color: customTheme.colors.dark,
          }}
          style={{
            height: 55,
            width: 325,
            backgroundColor: customTheme.colors.light,
          }}
        />
      </View>
    </View>
  );
};

export default DatePicker;
