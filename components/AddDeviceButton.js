import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AddDeviceButton = ({ btnIcon, deviceName, onPress }) => {
    return (
        <TouchableOpacity
            sentry-label="add-device-btn-component"
            className="p-5 rounded-lg shadow-2xl border-2 border-primary items-center justify-center space-y-2 mr-3"
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
                <Image
                    style={{ height: 80, width: 80 }}
                    source={require("../assets/fitbit-icon.png")}
                />
            )}

            {/* gfit */}
            {btnIcon === "gfit" && (
                <MaterialCommunityIcons
                    name="google-fit"
                    color="#fb923c"
                    size={100}
                />
            )}

            {btnIcon === "healthConnect" && (
                <Svg
                width={100}
                height={100}
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fb923c"
                stroke="#fb923c"
              >
                <Path d="M58 142.39s1.16 1.25 1.76 1.86l3.12 3.13a46.32 46.32 0 0 0 65.5 0l34.09-34.06a46.38 46.38 0 0 0 0-65.53l-3.14-3.13a46.13 46.13 0 0 0-32.76-13.58 46.21 46.21 0 0 0-30.3 11.25l-.2.18-.22-.18a52.62 52.62 0 0 0-30.61-11.14A47.1 47.1 0 0 0 16 80.37c.62 18.74 11.26 31.35 15.81 35.9l23.54 23.55Zm-17.59-34.67C37.66 105 28.63 94.81 28.13 79.91a35 35 0 0 1 36.72-36.63 40.51 40.51 0 0 1 22.27 7.63l.23.17-27.64 27.64a46.25 46.25 0 0 0-13.52 34.37v.43l-.43-.43Zm113.46-2.94-34.05 34a34.28 34.28 0 0 1-48.39 0l-3.13-3.13c-.54-.55-1.06-1.1-1.55-1.68s-1-1.23-1.51-1.85a34.28 34.28 0 0 1 3.06-44.83l34.08-34.07a34 34 0 0 1 24.2-10.08 34.08 34.08 0 0 1 24.19 10.08l3.13 3.13a34.31 34.31 0 0 1-.03 48.43Z"/>
                <Circle cx="125.89" cy="81.02" r="6"/>
              </Svg>
            )}

            {/* garmin */}
            {btnIcon === "garmin" && (
                <MaterialCommunityIcons
                    name="triangle"
                    color="#fb923c"
                    size={100}
                />
            )}

            {/* device name */}
            <Text className="text-primary">{deviceName}</Text>
        </TouchableOpacity>
    );
};

export default AddDeviceButton;
