import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { deviceActionTypes } from "./DeviceActionTypes";
import { Image } from "react-native";

const initialState = {
  devicesData: [],
  deviceSelected: null,
  isSyncLoading: false
};

export const DeviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case deviceActionTypes.FETCH_DEVICES: {
      const { fetchedDevices, deviceSelected } = action.payload;

      const devicesToBeAdded = fetchedDevices.length > 0 ? fetchedDevices.map((device) => {
        if (device === "apple") {
          return {
            deviceName: "apple",
            deviceIcon: <AntDesign name="apple1" color="#fb923c" size={100} />,
            isSelected: deviceSelected === "apple",
            deviceDisplayName: "Apple"
          };
        } else if (device === "Fitbit") {
          return {
            deviceName: "Fitbit",
            deviceIcon: (
              <Image source={require("../../assets/fitbit-icon.png")} style={{height: 80, width: 80}}/>
            ),
            isSelected: deviceSelected === "Fitbit",
            deviceDisplayName: "Fitbit"
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
            deviceDisplayName: "Google Fit"
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
            deviceDisplayName: "Garmin"
          };
        }
      }) : [];

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
        deviceSelected: nextDeviceName
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
        deviceSelected: prevDeviceName
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
        isSyncLoading: syncLoading
      }
    }

    default: {
      return state;
    }
  }
};
