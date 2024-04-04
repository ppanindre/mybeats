import * as Localization from "expo-localization";
import appleHealthKit from "react-native-health";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import axios from "axios";
import { firebaseCollections } from "../constants/firebaseCollections";
import { deviceActionTypes } from "../store/DeviceReducer/DeviceActionTypes";

const BACK_END_FUNCTION_ENDPOINT =
  "https://us-central1-firebeats-43aaf.cloudfunctions.net/appleDataHandlerFunction?timezone=" +
  Localization.timezone;

export const getAppleData = async (user, dispatch) => {
  dispatch({
    type: deviceActionTypes.SET_SYNC_LOADING,
    payload: { syncLoading: true },
  });

  const userData = (
    await firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(user.uid)
      .get()
  ).data();

  const lastSyncTIme = moment(userData.deviceSyncTime_apple)
    .startOf("D")
    .subtract(5, "d")
    .toDate()
    .toISOString();

  // Get daily count samples
  appleHealthKit.getDailyStepCountSamples(
    {
      startDate: lastSyncTIme,
    },
    (err, results) => {
      if (err) {
        // console.log(err);
        return;
      }
      axios.post(
        BACK_END_FUNCTION_ENDPOINT,
        (data = {
          result: results,
          userId: user.uid,
          type: "steps",
        })
      );
    }
  );

  // heart rate
  appleHealthKit.getHeartRateSamples(
    {
      startDate: lastSyncTIme, // required
      ascending: true, // optional; default false
    },
    (err, results) => {
      if (err) {
        return;
      }
      axios.post(
        BACK_END_FUNCTION_ENDPOINT,
        (data = {
          result: results,
          userId: user.uid,
          type: "heartRate",
        })
      );
    }
  );

  appleHealthKit.getActiveEnergyBurned(
    {
      startDate: lastSyncTIme,
      ascending: true,
    },
    (err, results) => {
      if (err) {
        //alert(JSON.stringify(err))
        return;
      }
      //alert(JSON.stringify(results))
      axios.post(
        BACK_END_FUNCTION_ENDPOINT,
        (data = {
          result: results,
          userId: user.uid,
          type: "activity",
        })
      );
    }
  );

  //sleep
  appleHealthKit.getSleepSamples(
    {
      startDate: lastSyncTIme,
      ascending: true,
    },
    (err, results) => {
      if (err) {
        return;
      }
      axios
        .post(
          BACK_END_FUNCTION_ENDPOINT,
          (data = {
            result: results,
            userId: user.uid,
            type: "sleep",
          })
        )
        .then((res) =>
          dispatch({
            type: deviceActionTypes.SET_SYNC_LOADING,
            payload: { syncLoading: false },
          })
        );
    }
  );

  setTimeout(() => {
    dispatch({
      type: deviceActionTypes.SET_SYNC_LOADING,
      payload: { syncLoading: false },
    });
  }, 5000);
};
