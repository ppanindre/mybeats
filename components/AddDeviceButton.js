import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FitbitLogo from "../assets/fitbit-icon.svg";
import { Path, Svg } from "react-native-svg";
import { customTheme } from "../constants/themeConstants";

const AddDeviceButton = ({ btnIcon, deviceName, onPress }) => {
  return (
    <TouchableOpacity
      sentry-label="add-device-btn-component"
      className="p-5 rounded-lg shadow-2xl border-2 border-orange-400 items-center justify-center space-y-2 mr-3"
      style={{
        height: 150,
      }}
      onPress={onPress}
    >
      {/* apple */}
      {btnIcon === "apple" && (
        <AntDesign name="apple1" color="#fb923c" size={100} />
      )}

      {/* fitbit */}
      {btnIcon === "fitbit" && (
        <Image style={{height: 80, width: 80}} source={require("../assets/fitbit-icon.png")} />
      )}

      {/* gfit */}
      {btnIcon === "gfit" && (
        <MaterialCommunityIcons name="google-fit" color="#fb923c" size={100} />
      )}

      {/* garmin */}
      {btnIcon === "garmin" && (
        <MaterialCommunityIcons name="triangle" color="#fb923c" size={100} />
      )}

      {/* device name */}
      <Text className="text-orange-400">{deviceName}</Text>
    </TouchableOpacity>
  );
};

export default AddDeviceButton;
