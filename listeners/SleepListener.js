import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import { firebaseCollections } from "../constants/firebaseCollections";
import { SleepActionTypes } from "../store/SleepReducer/SleepActionTypes";

export const SleepListener = (dispatch) => {
  return new Promise((resolve, reject) => {
    // Get user id if available from the auth
    const currentActiveDevice = "apple";
    const currentDay = moment().format("YYYY-MM-DD");
    const date = currentDay.concat(`-${currentActiveDevice}`);

    const userId = auth().currentUser.uid;

    // Listen for changes
    const unsubscribe = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(userId)
      .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
      .doc(date)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          const details = data.details;

          let modifiedDetails = details.map((value) => {
            const dataTime = moment(value.time, "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            );
            const ignore = moment("20:00:00", "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            );
            if (dataTime > ignore) {
              return null;
            }
            //axlert(ignore)
            // ignore values greater than
            return {
              x: dataTime,
              y: parseInt(value.sleepType),
            };
          });

          dispatch({
            type: SleepActionTypes.SET_SLEEP_DATA,
            payload: {
              sleepData: {
                ...data,
                details: modifiedDetails,
              },
              date,
            },
          });
        } else {
          dispatch({
            type: SleepActionTypes.SET_SLEEP_DATA,
            payload: {
              sleepData: {
                details: []
              },
              date,
            },
          });
        }
      });

    return unsubscribe;
  });
};
