import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import getUser from "./userCache";
import { firebaseCollections } from "../constants/firebaseCollections";

let SLEEP_CACHE = {};

let SLEEP_DETAILS = {};

let listener = null;

let callback_curr = null;

let prevActiceDevice = null;

/**
 * The dates that are currently being fetched.
 */
const DATES_FETCHING = {};

const getSleep = async (date) => {
  //const userId = "3PgLBbHKYHapWqmrBH52odj11ii1";
  const userId = auth().currentUser.uid

  const user = await getUser();
  const currentActiveDevice = user.vendor;

  const currentDay = moment()
    .format("YYYY-MM-DD")
    .concat(`-${currentActiveDevice}`);
  // modify the date to get the vendor in cache.
  date = date.concat(`-${currentActiveDevice}`);

  // check if device has been changed.
  if (prevActiceDevice != currentActiveDevice) {
    // remove existing listeners
    if (listener) {
      listener();
      listener = null;
    }

    // set the active device as the current one.
    prevActiceDevice = currentActiveDevice;
  }

  if (currentDay == date && listener) {
    return { data: SLEEP_CACHE[date], details: SLEEP_DETAILS[date] };
  }

  if (DATES_FETCHING[date]) {
    await DATES_FETCHING[date];
  } else if (!SLEEP_CACHE[date]) {
    const promise = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(userId)
      .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
      .doc(date)
      .get()
      .then((snapShot) => {
        if (snapShot.exists) {
          const data = snapShot.data();
          const details = data.details;
          SLEEP_CACHE[date] = data;
          //index_to_ignore = -1
          // if query date is today then we need to ignore all data points that are > current time.
          let modifiedDetails = details.map((value, index) => {
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

          // if (index_to_ignore != -1) {
          //     // modifiedDetails = modifiedDetails.slice(0,index_to_ignore)
          // }

          // alert(JSON.stringify(modifiedDetails))
          // alert(index_to_ignore)

          SLEEP_DETAILS[date] = modifiedDetails;
        } else {
          //SLEEP_CACHE[date] = {}
        }

        delete DATES_FETCHING[date];
      });

    DATES_FETCHING[date] = promise;
    await promise;
  }

  if (!listener) {
    addListener(currentActiveDevice);
  }

  return { data: SLEEP_CACHE[date], details: SLEEP_DETAILS[date] };
};

const addListener = (vendor) => {
  const userId = auth().currentUser?.uid ?? "";
  //const userId = "3PgLBbHKYHapWqmrBH52odj11ii1";
  let date = moment().format("YYYY-MM-DD");

  // add vendor specific date
  date = date.concat(`-${vendor}`);

  listener = firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(date)
    .onSnapshot((snapShot) => {
      if (snapShot.exists) {
        const data = snapShot.data();
        const details = data.details;
        SLEEP_CACHE[date] = data;
        //index_to_ignore = -1
        // if query date is today then we need to ignore all data points that are > current time.
        let modifiedDetails = details.map((value, index) => {
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

          return {
            x: dataTime,
            y: parseInt(value.sleepType),
          };
        });

        // if (index_to_ignore != -1) {
        //     // modifiedDetails = modifiedDetails.slice(0,index_to_ignore)
        // }

        SLEEP_DETAILS[date] = modifiedDetails;
        if (callback_curr) {
          callback_curr();
        }
      } else {
        //SLEEP_CACHE[date] = {}
      }
    });
};

const setCallback = (callback) => {
  callback_curr = callback;
};

const removeSleepListener = () => {
  if (listener) {
    listener();
    listener = null;
  }

  SLEEP_CACHE = {};

  SLEEP_DETAILS = {};
};

export default getSleep;
export { setCallback, removeSleepListener, addListener };
