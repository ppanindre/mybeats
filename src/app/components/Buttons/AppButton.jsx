import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../../../../tailwind.config";

const AppButton = ({
  btnLabel,
  btnLeftIcon,
  btnRightIcon,
  variant,
  onPress,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      isLoading={isLoading}
      disabled={variant === "disabled"}
      className={`${variant === "primary" && "bg-primary shadow-lg"} ${
        variant === "light" && "border-2 border-primary"
      } p-5 rounded-md mb-5 flex-row items-center justify-center ${
        variant === "disabled" && "bg-darkSecondary shadow-lg"
      } ${variant === "noborder" && "m-0 p-0"}`}
    >
      {/* Btn left icon */}
      {btnLeftIcon}

      {isLoading ? (
        <ActivityIndicator color={theme.colors.light} />
      ) : (
        <Text
          className={`${variant === "primary" && "text-light"} ${
            variant === "light" && "text-primary"
          } ${variant === "disabled" && "text-light"} font-bold
          ${variant==="noborder" && "text-primary"}`}
        >
          {btnLabel}
        </Text>
      )}

      {/* Btn right icon */}
      {btnRightIcon}
    </TouchableOpacity>
  );
};

export default AppButton;
