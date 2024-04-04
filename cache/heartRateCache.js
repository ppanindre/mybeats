import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";
import getUser from "./userCache";
// import { saveToDevice } from "../utils/utils";
// import { refreshCurrentDayCache } from "./cacheUtil";

let HEART_RATE_CACHE = {}

let HEART_RATE_DATA_CACHE = {}


/**
 * Dates fetching for intraday
 */
const DATES_FETCHING = {}

/**
 * The intraday data being fetched
 */
const DATES_FETCHING_DATA = {}


let listener = null;

let intradayListener = null;

let callback_curr = null;

let dashboardCallback = null;

let prevActiceDevice = null;

/**
 * @param {string} date the date for which the heart rate should be fetched.
 * @param {string} fetchIntraDay flag used to fetch intraday
 */
const getHeartRates = async (date, fetchIntraDay = true) => {
    // const userId = auth().currentUser?.uid ?? "";
    const userId = "";

    const user = await getUser()
    const currentActiveDevice = user.vendor;

    const currentDay = moment().format("YYYY-MM-DD").concat(`-${currentActiveDevice}`);
    // modify the date to get the vendor in cache.
    date = date.concat(`-${currentActiveDevice}`)
    //alert(date)

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


    if (currentDay == date && listener && intradayListener) {
        return { intraday: HEART_RATE_CACHE[date], heartRateData: HEART_RATE_DATA_CACHE[date] };
    }

    const promises = []


    if (DATES_FETCHING[date]) {
        promises.push(DATES_FETCHING[date]);
    } else if (!HEART_RATE_CACHE[date]) {

        const promise = firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .collection(HEART_RATE_SUBCOLLECTION)
            .doc(date)
            .collection(INTRADAY_COLLECTION)
            .doc(INTRADAY_SUBCOLLECTION)
            .get()
            .then(async (snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    const heartRateSeries = data.heartRateData;
                    //1440 minutes
                    const timeArray = Array.from({ length: 1440 }).map(() => 0);
                    // alert(JSON.stringify(heartRateSeries))
                    heartRateSeries.forEach((data) => {
                        const time = data.time;
                        const value = data.value;
                        //get the index in timeArray from the time.
                        const index = moment(time, "HH:mm:ss").diff(moment().startOf("d"), "minute");
                        timeArray[index] = value;

                    });
                    const updatedeTimeSeries = []
                    for (let i = 0; i < timeArray.length; i++) {
                        if (i % 2 != 0) {
                            const currentValue = timeArray[i]
                            const prevValue = timeArray[i - 1]
                            let newValue = 0;
                            if (currentValue == 0) {
                                newValue = prevValue;
                            } else if (prevValue == 0) {
                                newValue = currentValue
                            } else {
                                newValue = (prevValue + currentValue) / 2
                            }
                            updatedeTimeSeries.push(newValue);

                        }
                    }

                    //cache the data.
                    HEART_RATE_CACHE[date] = updatedeTimeSeries;
                    //saveToDevice(`HeartIntraday_${date}`, JSON.stringify(timeArray))
                    //delete from dates fetching.
                    delete DATES_FETCHING[date];
                } else {
                    //HEART_RATE_CACHE[date] = []
                }
            });
        //put the value in dates fetching.
        DATES_FETCHING[date] = promise
        promises.push(promise);
    }

    if (DATES_FETCHING_DATA[date]) {
        promises.push(DATES_FETCHING_DATA[date]);
    } else if (!HEART_RATE_DATA_CACHE[date]) {
        const promise = firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .collection(HEART_RATE_SUBCOLLECTION)
            .doc(date)
            .get()
            .then(async (snapshot) => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    HEART_RATE_DATA_CACHE[date] = data;
                    //saveToDevice(`HeartRateData_${date}`, JSON.stringify(data))
                } else {
                    //HEART_RATE_DATA_CACHE[date] = {}

                }
                delete DATES_FETCHING_DATA[date];
            })
        DATES_FETCHING_DATA[date] = promise
        promises.push(promise);
    }

    await Promise.all(promises);

    if (!listener) {
        addListener(currentActiveDevice);
    }

    return { intraday: HEART_RATE_CACHE[date], heartRateData: HEART_RATE_DATA_CACHE[date] }
}


const getMultipleHeartRateDocuments = async (dates) => {
    //TODO check cache to see which documents are already available and remove them from dates.
    const userId = auth().currentUser?.uid ?? "";
    //const userId = "3PgLBbHKYHapWqmrBH52odj11ii1";
    let returnData = {}
    await fetchMultipleDcoumentsById(dates, USER_TABLE,
        { doc: userId, subcollection: HEART_RATE_SUBCOLLECTION })
        .then((data) => {
            returnData = data;
        });
    return returnData;
}


const addListener = (vendor) => {
    const userId = auth().currentUser?.uid ?? "";
    //const userId = "VvzRkmQ8dnSm1CiJfdNl5OmM4yh1";
    let date = moment().format("YYYY-MM-DD");
    // add vendor specific date
    date = date.concat(`-${vendor}`)

    intradayListener = firestore()
        .collection(USER_TABLE)
        .doc(userId)
        .collection(HEART_RATE_SUBCOLLECTION)
        .doc(date)
        .collection(INTRADAY_COLLECTION)
        .doc(INTRADAY_SUBCOLLECTION)
        .onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                const heartRateSeries = data.heartRateData;
                //1440 minutes
                const timeArray = Array.from({ length: 1440 }).map(() => 0);
                heartRateSeries.forEach((data) => {
                    const time = data.time;
                    const value = data.value;
                    //get the index in timeArray from the time.
                    const index = moment(time, "HH:mm:ss").diff(moment().startOf("d"), "minute");
                    timeArray[index] = value;
                });
                //average out every 2 points of timearay
                const updatedeTimeSeries = []
                for (let i = 0; i < timeArray.length; i++) {
                    if (i % 2 != 0) {
                        const currentValue = timeArray[i]
                        const prevValue = timeArray[i - 1]
                        let newValue = 0;
                        if (currentValue == 0) {
                            newValue = prevValue;
                        } else if (prevValue == 0) {
                            newValue = currentValue
                        } else {
                            newValue = (prevValue + currentValue) / 2
                        }
                        updatedeTimeSeries.push(newValue);

                    }
                }
                //cache the data.
                HEART_RATE_CACHE[date] = updatedeTimeSeries;
                
                if (callback_curr) {
                    callback_curr();
                }

                if (dashboardCallback) {
                    dashboardCallback();
                }
                //saveToDevice(`HeartIntraday_${date}`, JSON.stringify(timeArray))
            } else {
                //HEART_RATE_CACHE[date] = []
            }
        });

    listener = firestore()
        .collection(USER_TABLE)
        .doc(userId)
        .collection(HEART_RATE_SUBCOLLECTION)
        .doc(date)
        .onSnapshot((snapshot) => {
            //alert(JSON.stringify(HEART_RATE_DATA_CACHE))

            if (snapshot.exists) {
                const data = snapshot.data();
                HEART_RATE_DATA_CACHE[date] = data;
                if (callback_curr) {
                    callback_curr();
                }

                if (dashboardCallback) {
                    dashboardCallback();
                }
                //saveToDevice(`HeartRateData_${date}`, JSON.stringify(data))
            } else {
                //HEART_RATE_DATA_CACHE[date] = {}

            }
        })
}

const setCallback = (callback) => {
    callback_curr = callback;
}


const setDashboardCallback = (callback) => {
    dashboardCallback = callback;
}


const removeHrListener = () => {
    if (listener) {
        listener()
        listener = null;
    }

    if (intradayListener) {
        intradayListener()
        intradayListener = null;
    }

    HEART_RATE_CACHE = {}

    HEART_RATE_DATA_CACHE = {}
}





export default getHeartRates;
export {
    getMultipleHeartRateDocuments,
    setCallback, setDashboardCallback, removeHrListener, addListener
};