import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import * as Sentry from "@sentry/react-native";

import { firebaseCollections } from "../constants/firebaseCollections";
import { incrementNotificationUnread } from "./notificationQueries";

// device queries
export const deviceQueries = {
  // remove device from firebase
  removeDeviceFromFirebase: async (devicesData, deviceSelected, user) => {
    const userId = auth().currentUser.uid; // get user id

    switch (deviceSelected) {

      // fitbit
      case "Fitbit": {
        await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .update({
            Fitbit_accesstoken: firestore.FieldValue.delete(),
            Fitbit_refreshToken: firestore.FieldValue.delete(),
          });
        break;
      }

      // gfit
      case "gfit": {
        await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .update({
            deviceSyncTime_gfit: firestore.FieldValue.delete(),
            gfit_accesstoken: firestore.FieldValue.delete(),
            gfit_refreshToken: firestore.FieldValue.delete(),
          });
        break;
      }

      // apple
      case "apple": {
        await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .update({
            deviceSyncTime_apple: firestore.FieldValue.delete(),
          });
        break;
      }

      // garmin
      case "garmin": {
        await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .update({
            deviceSyncTime_garmin: firestore.FieldValue.delete(),
            garmin_accesstoken: firestore.FieldValue.delete(),
            garmin_refreshToken: firestore.FieldValue.delete(),
          });
        break;
      }

      default: {
        break;
      }
    }

    if (devicesData.length > 0) {
      const devices = devicesData.map((device) => device.deviceName);
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(userId)
        .update({
          vendor: deviceSelected,
          devices: devices,
        });
    } else {
      const devices = [];
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(userId)
        .update({
          vendor: null,
          devices: devices,
        });
    }
  },

  // add device data to firebase
  addVendorToFirebase: async (user, vendorData) => {
    vendorData.devices = firestore.FieldValue.arrayUnion(vendorData.vendor); // add device to devices

    try {
      // set vendor data
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(user.uid)
        .update(vendorData);

      // add notification
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(user.uid)
        .collection(firebaseCollections.NOTIFICATION_COLLECTION)
        .doc("summary")
        .collection("notifications")
        .add({
          approved: true,
          device: vendorData.vendor,
          message: "Your device has been added succesfully!",
          timestamp: moment().toDate().getTime(),
        });

      // increment notification unread
      await incrementNotificationUnread(user.uid);
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          message: "Error while adding vendor data to firebase",
          vendor: vendorData?.device,
        },
      });
    }
  },
};
