import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { customTheme } from "../../../../constants/themeConstants";

const PrescriptionDatepicker = ({ label, currVal, onConfirm, minDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    onConfirm(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minDate}
      />
      <View>
        <TextInput
          label={label}
          value={currVal ? moment(currVal).format("MMMM D, YYYY") : ""}
          outlineColor={customTheme.colors.dark}
          onFocus={showDatePicker}
          mode="outlined"
          keyboardAppearance="dark"
          theme={{
            colors: { primary: customTheme.colors.primary, error: "#E32A17" },
          }}
          style={{
            height: 55,
            width: '100%',
            backgroundColor: customTheme.colors.light,
          }}
        />
      </View>
    </View>
  );
};

export default PrescriptionDatepicker;
