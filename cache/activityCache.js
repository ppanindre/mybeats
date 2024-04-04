import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ACTIVITY_SUBCOLLECTION, INTRADAY_COLLECTION, INTRADAY_SUBCOLLECTION, USER_TABLE } from "../constants/firebaseCollections";
import moment from "moment";
import getUser from "./userCache";
//import { saveToDevice } from "../utils/utils";

let ACTIVITY_RATE_CACHE = {}

let ACTIVITY_INTRADAY_CACHE = {}


/**
 * The dates that are currently being fetched.
 */
const DATES_FETCHING = {}

/**
 * Dates fetching for intraday
 */
const DATES_FETCHING_INTRADAY = {}

let listener = null;

let intradayListener = null;

let callback_curr = null;

let prevActiceDevice = null;



/**
 * @param {string} date the date for which the heart rate should be fetched.
 */
const getActivityData = async (date) => {
    const userId = auth().currentUser?.uid ?? "";


    const user = await getUser()
    const currentActiveDevice = user.vendor;
    const currentDay = moment().format("YYYY-MM-DD").concat(`-${currentActiveDevice}`);
    // modify the date to get the vendor in cache.
    date = date.concat(`-${currentActiveDevice}`)

    // check if device has been changed.
    if (prevActiceDevice != currentActiveDevice) {
        // remove existing listeners
        if (listener) {
            listener()
            listener = null;
        }

        if (intradayListener) {
            intradayListener()
            intradayListener = null;
        }

        // set the active device as the current one.
        prevActiceDevice = currentActiveDevice;
    }



    //listeners are present hence return data from cache.
    if (date == currentDay && listener && intradayListener) {
        return { activity: ACTIVITY_RATE_CACHE[date], intraday: ACTIVITY_INTRADAY_CACHE[date] };
    }

    const promises = []

    if (DATES_FETCHING[date]) {
        promises.push(DATES_FETCHING[date]);
    } else if (!ACTIVITY_RATE_CACHE[date]) {
        const promise = firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .collection(ACTIVITY_SUBCOLLECTION)
            .doc(date)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    ACTIVITY_RATE_CACHE[date] = data;
                    //saveToDevice(`Activity_${date}`, JSON.stringify(data))
                } else {
                    ACTIVITY_RATE_CACHE[date] = {};
                }
                //delete from dates fetching.
                delete DATES_FETCHING[date];
            });
        DATES_FETCHING[date] = promise;
        promises.push(promise)
    }

    if (DATES_FETCHING_INTRADAY[date]) {
        promises.push(DATES_FETCHING_INTRADAY[date]);
    } else if (!ACTIVITY_INTRADAY_CACHE[date]) {
        const promise = firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .collection(ACTIVITY_SUBCOLLECTION)
            .doc(date)
            .collection(INTRADAY_COLLECTION)
            .doc(INTRADAY_SUBCOLLECTION)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    const timeSeries = data.activities;
                    const timeArray = Array.from({ length: 1440 }).map(() => 0);
                    //const timeArray = Array.from({ length: 1440 }).map((value, index) => { return { x: index, y: -1 } })
                    timeSeries.forEach((data) => {

                        const time = data.time;
                        const value = data.level + 1;
                        //get the index in timeArray from the time.
                        const index = moment(time, "HH:mm:ss").diff(moment().startOf("d"), "minute");
                        timeArray[index] = value;

                    });
                    ACTIVITY_INTRADAY_CACHE[date] = timeArray;
                    //saveToDevice(`ActivityIntraday_${date}`, JSON.stringify(timeArray))
                } else {
                    //ACTIVITY_INTRADAY_CACHE[date] = [];
                }
                delete DATES_FETCHING_INTRADAY[date];
            })

        DATES_FETCHING_INTRADAY[date] = promise;
        promises.push(promise)

    }

    await Promise.all(promises);

    //if no listeners are present add them.
    if (!listener) {
        addListener(currentActiveDevice);
    }

    return { activity: ACTIVITY_RATE_CACHE[date], intraday: ACTIVITY_INTRADAY_CACHE[date] };
}

// /**
//  * Method that will load data from the device into the memory.
//  * The last 10 days of data will be loaded into the memory.
//  */
// export const loadActivityDataIntoMemory = async () => {
//     const promises = []
//     for (i = 0; i <= 10; i++) {
//         const date = moment().subtract(i, "d").format("YYYY-MM-DD");

//         //get activity intraday data
//         promises.push(SecureStore.isAvailableAsync(`ActivityIntraday_${date}`)
//             .then(async (bool) => {
//                 if (!bool) {
//                     return;
//                 }
//                 const data = SecureStore.getItemAsync(`ActivityIntraday_${date}`)
//                 if (data) {
//                     const jsonData = JSON.parse(data);
//                     ACTIVITY_INTRADAY_CACHE[date] = jsonData;
//                 }
//             }).catch(() => { }));


//         //get activity data
//         promises.push(SecureStore.isAvailableAsync(`Activity_${date}`)
//             .then(async (bool) => {
//                 if (!bool) {
//                     return;
//                 }
//                 const data = SecureStore.getItemAsync(`Activity_${date}`)
//                 if (data) {
//                     const jsonData = JSON.parse(data);
//                     ACTIVITY_RATE_CACHE[date] = jsonData;
//                 }
//             }).catch(() => { }));
//     }

//     await Promise.all(promises)
// }


const addListener = async (vendor) => {
    const userId = auth().currentUser?.uid ?? "";
    //const userId = "VvzRkmQ8dnSm1CiJfdNl5OmM4yh1";
    let date = moment().format("YYYY-MM-DD");
    // add vendor specific date
    date = date.concat(`-${vendor}`)


    listener = firestore()
        .collection(USER_TABLE)
        .doc(userId)
        .collection(ACTIVITY_SUBCOLLECTION)
        .doc(date)
        .onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                ACTIVITY_RATE_CACHE[date] = data;
                if (callback_curr) {
                    callback_curr();
                }
                //saveToDevice(`Activity_${date}`, JSON.stringify(data))
            } else {
                //ACTIVITY_RATE_CACHE[date] = {};
            }
        });



    intradayListener = firestore()
        .collection(USER_TABLE)
        .doc(userId)
        .collection(ACTIVITY_SUBCOLLECTION)
        .doc(date)
        .collection(INTRADAY_COLLECTION)
        .doc(INTRADAY_SUBCOLLECTION)
        .onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                const timeSeries = data.activities;
                //const timeArray = []
                const timeArray = Array.from({ length: 1440 }).map(() => 0);
                //const timeArray = Array.from({ length: 1440 }).map((value, index) => { return { x: index, y: -1 } })
                timeSeries.forEach((data) => {
                    const time = data.time;
                    const value = data.level + 1;
                    //get the index in timeArray from the time.
                    const index = moment(time, "HH:mm:ss").diff(moment().startOf("d"), "minute");
                    timeArray[index] = value;
                });
                ACTIVITY_INTRADAY_CACHE[date] = timeArray;
                if (callback_curr) {
                    callback_curr();
                }
                //saveToDevice(`ActivityIntraday_${date}`, JSON.stringify(timeArray))
            } else {
                //ACTIVITY_INTRADAY_CACHE[date] = [];
            }
        })
}


const removeListener = () => {
    if (listener) {
        listener()
        listener = null;
    }

    if (intradayListener) {
        intradayListener()
        intradayListener = null;
    }

    ACTIVITY_RATE_CACHE = {}

    ACTIVITY_INTRADAY_CACHE = {}
}


const setCallback = (callback) => {
    callback_curr = callback;
}


export default getActivityData;
export { setCallback, removeListener, addListener }