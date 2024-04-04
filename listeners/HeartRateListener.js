import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import { firebaseCollections } from "../constants/firebaseCollections";
import { heartActionTypes } from "../store/HeartRateReducer/HeartRateActionTypes";

export const HeartRateListener = (dispatch, userId, currentActiveDevice) => {
  return new Promise((resolve, reject) => {
    // Get user id if available from the auth
    const currentDay = moment().format("YYYY-MM-DD");
    const date = currentDay.concat(`-${currentActiveDevice}`);
    // Listen for changes
    const unsubscribe = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(userId)
      .collection(firebaseCollections.HEART_RATE_SUBCOLLECTION)
      .doc(date)
      .collection(firebaseCollections.INTRADAY_COLLECTION)
      .doc(firebaseCollections.INTRADAY_SUBCOLLECTION)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          const heartRate = data.heartRateData;
          dispatch({
            type: heartActionTypes.SET_HEARTRATE_INTRADAY_DATA,
            payload: { heartRateIntradayData: heartRate, date: date },
          });
          resolve("success");
          return heartRate;
        } else {
          dispatch({
            type: heartActionTypes.SET_HEARTRATE_INTRADAY_DATA,
            payload: { heartRateIntradayData: [], date: date },
          });
          return [];
        }
      });
    return unsubscribe;
  });
};

export const HeartRateDataListener = (dispatch, userId, currentActiveDevice) => {
  return new Promise((resolve, reject) => {
    // Get user id if available from the auth
    const currentDay = moment().format("YYYY-MM-DD");
    const date = currentDay.concat(`-${currentActiveDevice}`);
    // Listen for changes
    const unsubscribe = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(userId)
      .collection(firebaseCollections.HEART_RATE_SUBCOLLECTION)
      .doc(date)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const heartRateData = snap.data();    
          dispatch({
            type: heartActionTypes.SET_HEARTRATE_DATA,
            payload: {
              heartRateData: heartRateData,
              date: date,
            },
          });
          return heartRateData;
        } else {
          dispatch({
            type: heartActionTypes.SET_HEARTRATE_DATA,
            payload: { heartRateData: [], date: date },
          });
          return [];
        }
      });
    return unsubscribe;
  });
}
