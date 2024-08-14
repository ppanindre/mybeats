import firestore from "@react-native-firebase/firestore";
import { firebaseCollections } from "../constants/firebaseCollections";
import { Alert } from "react-native";
import * as Sentry from "@sentry/react-native";

export const notificationQueries = {
  // function to fetch notifications
  fetchNotifications: async (
      user,
      notificationsData,
      appendToStart = false
  ) => {
      // get user id
      const userId = user.userId;

      // get the selected device
      const selectedDevice = user.vendor;

      // define notifications array
      const notifications = [];

      let firstNot = notificationsData[notificationsData.length - 1];

      let startBefore = 0;

      // define query for fetching only approved notifications for the selected device
      let query = firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .collection(firebaseCollections.NOTIFICATION_COLLECTION)
          .doc("summary")
          .collection("notifications")
          .where("device", "==", selectedDevice)
          .where("approved", "==", true)
          .orderBy("approvedTime", "desc");

      if (firstNot && appendToStart) {
          startBefore = firstNot.approvedTime;
          query = query.startAfter(startBefore);
      }

      try {
          // get the snap
          const snap = await query.limit(10).get();

          // if snap exists
          if (snap) {
              const docs = snap.docs;

              // Store previous notification to compare the new
              // notification and see if its the same notification
              // as before.
              let prevNotification;

              // Add notification to notifications array which are not reminders
              docs.forEach((doc) => {
                  notifications.push(doc.data());
              });
          }

          // if there are notifications to append
          if (appendToStart) {
              let not = [...notificationsData];
              not.push(...notifications);
              return not;
          } else {
              return notifications; // return the notifications
          }
      } catch (error) {
          console.log("error", error);
          Sentry.captureException(error, {
              extra: { message: "Error while fetching notifications" },
          });
      }
  },

  // function to reset the unread counter
  resetUnreadCounter: async (userId) => {
      try {
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(userId)
              .collection(firebaseCollections.NOTIFICATION_COLLECTION)
              .doc("summary")
              .set({
                  unread: 0,
              });
      } catch (error) {
          Alert.alert(
              "",
              "Oops!! Something went wrong. Please restart the app"
          );
          Sentry.captureException(error, {
              extra: { message: "Error while resetting the unread counter" },
          });
      }
  },
};

export const incrementNotificationUnread = async (userId) => {
  try {
      await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(userId)
          .collection(firebaseCollections.NOTIFICATION_COLLECTION)
          .doc("summary")
          .update({
              unread: firestore.FieldValue.increment(1),
          });
  } catch (error) {
      console.log("setting notification error", error);
  }
};
