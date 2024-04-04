import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import { firebaseCollections } from "../constants/firebaseCollections";
import { heartActionTypes } from "../store/HeartRateReducer/HeartRateActionTypes";

export const HeartRateCollectionListener = (dispatch, userId, currentActiveDevice) => {
  return new Promise((resolve, reject) => {
    // Get user id if available from the auth
    const currentActiveDevice = "apple";
    const currentDay = moment().format("YYYY-MM-DD");
    const date = currentDay.concat(`-${currentActiveDevice}`);

    const userId = userId;

    // Listen for changes
    const unsubscribe = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(userId)
      .collection(firebaseCollections.HEART_RATE_SUBCOLLECTION)
      .doc(date)
      .onSnapshot((snap) => {
        if (snap.exists) {
          dispatch({
            type: heartActionTypes.FETCH_HEART_RATE,
            payload: { heartRate: snap.data(), date: date },
          });
          resolve("success");
        } else {
          dispatch({
            type: heartActionTypes.FETCH_HEART_RATE,
            payload: { heartRate: { max: 0, min: 0, resting: 0 }, date: date },
          });
          reject("error");
        }
      });

    return unsubscribe;
  });
};
