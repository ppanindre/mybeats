import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  btnLabel,
  btnLeftIcon,
  btnRightIcon,
  variant,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={variant === "disabled"}
      className={`${variant === "primary" && "bg-primary shadow-lg"} ${
        variant === "light" && "border-2 border-primary"
      } p-5 rounded-md mb-5 flex-row items-center justify-center ${
        variant === "disabled" && "bg-darkSecondary shadow-lg "
      }`}
    >

      {/* Btn left icon */}
      {btnLeftIcon}

      {/* Button Label */}
      <Text
        className={`${variant === "primary" && "text-light"} ${
          variant === "light" && "text-primary"
        } ${variant === "disabled" && "text-light"} font-bold mx-3`}
      >
        {btnLabel}
      </Text>

      {/* Btn right icon */}
      {btnRightIcon}
    </TouchableOpacity>
  );
};

export default CustomButton;
