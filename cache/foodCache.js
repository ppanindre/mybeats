import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FOOD_SUBCOLLECTION, USER_TABLE } from "../constants/firebaseCollections";
import moment from "moment";


let listener = null;

let callback_curr = null;

let FOOD_CACHE = {}

let dashboardFoodCallback = null;

let prevListener = null;

/**
 * The dates that are currently being fetched.
 */
const DATES_FETCHING = {}

const getFood = async (date, forced = false, callback = null) => {
    //update the callback
    if (callback) {
        callback_curr = callback;
    }

    const currentDay = moment().format("YYYY-MM-DD");

    //for current day if listener is set return data from the cache.
    if (listener && currentDay == date) {
        return FOOD_CACHE[date];
    }

    const userId = auth().currentUser?.uid ?? "";



    if (DATES_FETCHING[date]) {
        await DATES_FETCHING[date];
    } else if (!FOOD_CACHE[date]) {
        const promise = firestore()
            .collection("user")
            .doc(userId)
            .collection("food")
            .doc(date)
            .get()
            .then((snapShot) => {
                if (snapShot.exists) {
                    const data = snapShot.data();
                    FOOD_CACHE[date] = data;
                } else {
                    FOOD_CACHE[date] = {};
                }
                delete DATES_FETCHING[date];
            });

        DATES_FETCHING[date] = promise;
        await promise;
    }

    if (!listener) {
        addListener();
    }

    return FOOD_CACHE[date];
}


const addListener = () => {
    // const userId = auth().currentUser?.uid ?? "";
    const userId = auth().currentUser.uid;

    const date = moment().format("YYYY-MM-DD");
    listener = firestore()
        .collection("user")
        .doc(userId)
        .collection("food")
        .doc(date)
        .onSnapshot((snapShot) => {
            if (snapShot.exists) {
                const data = snapShot.data();
                FOOD_CACHE[date] = data;
                if (callback_curr) {
                    callback_curr();
                }
                if (dashboardFoodCallback) {
                    dashboardFoodCallback();
                }
            } else {
                FOOD_CACHE[date] = {};
            }

        });
}


const addPrevListener = (dateToFetch) => {
    if (prevListener) {
        prevListener();
    }
    // const userId = auth().currentUser?.uid ?? "";
    const userId = auth().currentUser.uid
    //const date = moment().format("YYYY-MM-DD");
    prevListener = firestore()
        .collection("user")
        .doc(userId)
        .collection("food")
        .doc(dateToFetch)
        .onSnapshot((snapShot) => {
            if (snapShot.exists) {
                const data = snapShot.data();
                FOOD_CACHE[dateToFetch] = data;
                if (callback_curr) {
                    callback_curr();
                }
            } else {
                FOOD_CACHE[dateToFetch] = {};
            }

        });
}


const setDashboardFoodCallback = (callback) => {
    dashboardFoodCallback = callback;
}

const removeFoodListener = () => {
    if (listener) {
        listener()
        listener = null;
    }

    if (prevListener) {
        prevListener()
        prevListener = null;
    }

    FOOD_CACHE = {}
    callback_curr = null;
}



export default getFood;
export { setDashboardFoodCallback, addPrevListener, removeFoodListener };