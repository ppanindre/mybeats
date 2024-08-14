import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { deviceActionTypes } from "./DeviceActionTypes";
import { firebaseCollections } from "../../constants/firebaseCollections";

export const DeviceActionCreators = {
  selectNextDevice: (devicesData) => {
      return async (dispatch) => {
          const user = auth().currentUser;
          const currentIndex = devicesData.findIndex(
              (device) => device.isSelected
          );
          const nextIndex = (currentIndex + 1) % devicesData.length;
          const nextDeviceName = devicesData[nextIndex].deviceName;

          dispatch({
              type: deviceActionTypes.SELECT_NEXT_DEVICE,
              payload: { nextDeviceName },
          });
      };
  },

  selectPreviousDevice: (devicesData) => {
      return async (dispatch) => {
          const user = auth().currentUser;
          const currentIndex = devicesData.findIndex(
              (device) => device.isSelected
          );
          const prevIndex =
              (currentIndex - 1 + devicesData.length) % devicesData.length;
          const prevDeviceName = devicesData[prevIndex].deviceName;

          dispatch({
              type: deviceActionTypes.SELECT_PREVIOUS_DEVICE,
              payload: { prevDeviceName },
          });

      };
  },

  fetchDevices: () => {
      return async (dispatch) => {
          const user = auth().currentUser;
          const fetchedData = (
              await firestore()
                  .collection(firebaseCollections.USER_COLLECTION)
                  .doc(user.uid)
                  .get()
          ).data();
          const fetchedDevices = fetchedData.devices;
          const deviceSelected = fetchedData.vendor;

          console.log("fetched devices", fetchedDevices, deviceSelected);

          dispatch({
              type: deviceActionTypes.FETCH_DEVICES,
              payload: { fetchedDevices, deviceSelected },
          });
      };
  },

  removeDevice: (devicesData, deviceToRemove) => {
      return async () => {
          console.log("devices data", devicesData);
          console.log("device to remove", deviceToRemove);
      };
  },
};
