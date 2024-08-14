import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { deviceActionTypes } from "./DeviceActionTypes";
import { Image } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";

const initialState = {
  devicesData: [],
  deviceSelected: null,
  isSyncLoading: false,
};

export const DeviceReducer = (state = initialState, action) => {
  switch (action.type) {
      case deviceActionTypes.FETCH_DEVICES: {
          const { fetchedDevices, deviceSelected } = action.payload;

          const devicesToBeAdded =
              fetchedDevices.length > 0
                  ? fetchedDevices.map((device) => {
                        if (device === "apple") {
                            return {
                                deviceName: "apple",
                                deviceIcon: (
                                    <AntDesign
                                        name="apple1"
                                        color="#fb923c"
                                        size={100}
                                    />
                                ),
                                isSelected: deviceSelected === "apple",
                                deviceDisplayName: "Apple",
                            };
                        } else if (device === "Fitbit") {
                            return {
                                deviceName: "Fitbit",
                                deviceIcon: (
                                    <Image
                                        source={require("../../assets/fitbit-icon.png")}
                                        style={{ height: 80, width: 80 }}
                                    />
                                ),
                                isSelected: deviceSelected === "Fitbit",
                                deviceDisplayName: "Fitbit",
                            };
                        } else if (device === "gfit") {
                            return {
                                deviceName: "gfit",
                                deviceIcon: (
                                    <MaterialCommunityIcons
                                        name="google-fit"
                                        color="#fb923c"
                                        size={100}
                                    />
                                ),
                                isSelected: deviceSelected === "gfit",
                                deviceDisplayName: "Google Fit",
                            };
                        } else if (device === "garmin") {
                            return {
                                deviceName: "garmin",
                                deviceIcon: (
                                    <MaterialCommunityIcons
                                        name="triangle"
                                        color="#fb923c"
                                        size={100}
                                    />
                                ),
                                isSelected: deviceSelected === "garmin",
                                deviceDisplayName: "Garmin",
                            };
                        } else if (device === "healthConnect") {
                            return {
                                deviceName: "healthConnect",
                                deviceIcon: (
                                    <Svg
                                        width={100}
                                        height={100}
                                        viewBox="0 0 192 192"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#fb923c"
                                        stroke="#fb923c"
                                    >
                                        <Path d="M58 142.39s1.16 1.25 1.76 1.86l3.12 3.13a46.32 46.32 0 0 0 65.5 0l34.09-34.06a46.38 46.38 0 0 0 0-65.53l-3.14-3.13a46.13 46.13 0 0 0-32.76-13.58 46.21 46.21 0 0 0-30.3 11.25l-.2.18-.22-.18a52.62 52.62 0 0 0-30.61-11.14A47.1 47.1 0 0 0 16 80.37c.62 18.74 11.26 31.35 15.81 35.9l23.54 23.55Zm-17.59-34.67C37.66 105 28.63 94.81 28.13 79.91a35 35 0 0 1 36.72-36.63 40.51 40.51 0 0 1 22.27 7.63l.23.17-27.64 27.64a46.25 46.25 0 0 0-13.52 34.37v.43l-.43-.43Zm113.46-2.94-34.05 34a34.28 34.28 0 0 1-48.39 0l-3.13-3.13c-.54-.55-1.06-1.1-1.55-1.68s-1-1.23-1.51-1.85a34.28 34.28 0 0 1 3.06-44.83l34.08-34.07a34 34 0 0 1 24.2-10.08 34.08 34.08 0 0 1 24.19 10.08l3.13 3.13a34.31 34.31 0 0 1-.03 48.43Z" />
                                        <Circle
                                            cx="125.89"
                                            cy="81.02"
                                            r="6"
                                        />
                                    </Svg>
                                ),
                                isSelected:
                                    deviceSelected === "healthConnect",
                                deviceDisplayName: "Health Connect",
                            };
                        }
                    })
                  : [];

          return {
              ...state,
              devicesData: devicesToBeAdded,
              deviceSelected: deviceSelected,
          };
      }

      case deviceActionTypes.SELECT_NEXT_DEVICE: {
          const { nextDeviceName } = action.payload;

          const updatedDevicesData = state.devicesData.map((data) => ({
              ...data,
              isSelected: data.deviceName === nextDeviceName,
          }));

          return {
              ...state,
              devicesData: updatedDevicesData,
              deviceSelected: nextDeviceName,
          };
      }

      case deviceActionTypes.SELECT_PREVIOUS_DEVICE: {
          const { prevDeviceName } = action.payload;

          const updatedDevicesData = state.devicesData.map((data) => ({
              ...data,
              isSelected: data.deviceName === prevDeviceName,
          }));

          return {
              ...state,
              devicesData: updatedDevicesData,
              deviceSelected: prevDeviceName,
          };
      }

      case deviceActionTypes.SET_DEVICES: {
          const { updatedDevicesData, deviceSelected } = action.payload;
          return {
              ...state,
              devicesData: updatedDevicesData,
              deviceSelected: deviceSelected,
          };
      }

      case deviceActionTypes.SET_SYNC_LOADING: {
          const { syncLoading } = action.payload;
          return {
              ...state,
              isSyncLoading: syncLoading,
          };
      }

      default: {
          return state;
      }
  }
};
