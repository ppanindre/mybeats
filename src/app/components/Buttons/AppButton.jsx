import { Text, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = ({
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
      className={`${variant === "primary" && "bg-orange-400 shadow-lg"} ${
        variant === "light" && "border-2 border-orange-400"
      } p-5 rounded-md mb-5 flex-row items-center justify-center ${
        variant === "disabled" && "bg-gray-400 shadow-lg "
      } w-[100%]`}
    >

      {/* Btn left icon */}
      {btnLeftIcon}

      {/* Button Label */}
      <Text
        className={`${variant === "primary" && "text-white"} ${
          variant === "light" && "text-orange-400"
        } ${variant === "disabled" && "text-white"} font-bold mx-3`}
      >
        {btnLabel}
      </Text>

      {/* Btn right icon */}
      {btnRightIcon}
    </TouchableOpacity>
  );
};

export default AppButton;
