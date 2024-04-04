import { TextInput } from "react-native-paper";
import React from "react";

import { customTheme } from "../constants/themeConstants";

const CustomInput = ({
  maxLength,
  placeholder,
  isSecureTextEntry,
  keyboardType,
  onChangeText,
  value,
  error,
  isDisabled,
}) => {
  
  return (
    <TextInput
      className="mb-1"
      textAlign={"center"}
      label={placeholder} // label for the input
      keyboardType={keyboardType} // keyboard type can be numeric or text
      secureTextEntry={isSecureTextEntry} // secure entry for passwords
      onChangeText={onChangeText} // function to handle change of texts
      value={value} // value for the input
      editable={!isDisabled} // if the input is disabled, the input should not be editable
      maxLength={maxLength} // set max length og the input
      mode="outlined"
      outlineColor={customTheme.colors.dark}
      contentStyle={{
        color: customTheme.colors.dark,
      }}
      style={{
        height: 55,
        width: 325,
        backgroundColor: customTheme.colors.light,
        fontSize: 16,
      }}
      theme={{
        colors: { primary: customTheme.colors.primary, error: "#E32A17" },
      }}
      error={error}
    />
  );
};

export default CustomInput;
