import { initialize, readRecords } from "react-native-health-connect";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import axios from "axios";
import { firebaseCollections } from "../constants/firebaseCollections";
import { deviceActionTypes } from "../store/DeviceReducer/DeviceActionTypes";

export const getHealthConnectData = async (user, dispatch) => {
    dispatch({
        type: deviceActionTypes.SET_SYNC_LOADING,
        payload: { syncLoading: true },
    });

    console.log("syncing health connect");

    try {
        const userData = (
            await firestore()
                .collection(firebaseCollections.USER_COLLECTION)
                .doc(user.uid)
                .get()
        ).data();

        const lastSyncTime = moment(userData.deviceSyncTime_healthConnect)
            .startOf("D")
            .toDate()
            .toISOString();

        await initialize();

        const heartRates = await readRecords("HeartRate", {
            timeRangeFilter: {
                operator: "between",
                startTime: lastSyncTime,
                endTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            },
        });

        await axios.post(
            "https://us-central1-firebeats-43aaf.cloudfunctions.net/healthConnectHandlerFunction?timezone=",
            (data = {
                result: heartRates,
                userId: user.uid,
                type: "heartRate",
            })
        );

        const sleepSamples = await readRecords("SleepSession", {
            timeRangeFilter: {
                operator: "between",
                startTime: lastSyncTime,
                endTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            },
        });

        await axios.post(
            "https://us-central1-firebeats-43aaf.cloudfunctions.net/healthConnectHandlerFunction?timezone=",
            (data = {
                result: sleepSamples,
                userId: user.uid,
                type: "sleep",
            })
        );

        const steps = await readRecords("Steps", {
            timeRangeFilter: {
                operator: "between",
                startTime: lastSyncTime,
                endTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            },
        });

        await axios.post(
            "https://us-central1-firebeats-43aaf.cloudfunctions.net/healthConnectHandlerFunction?timezone=",
            (data = {
                result: steps,
                userId: user.uid,
                type: "steps",
            })
        );

        const totalCaloriesBurned = await readRecords("TotalCaloriesBurned", {
            timeRangeFilter: {
                operator: "between",
                startTime: lastSyncTime,
                endTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            },
        });

        await axios.post(
            "https://us-central1-firebeats-43aaf.cloudfunctions.net/healthConnectHandlerFunction?timezone=",
            (data = {
                result: totalCaloriesBurned,
                userId: user.uid,
                type: "activity",
            })
        );
    } catch (error) {
        console.error("Error while fetching health connect", error);
    }

    dispatch({
        type: deviceActionTypes.SET_SYNC_LOADING,
        payload: { syncLoading: false },
    });

    setTimeout(() => {
        dispatch({
            type: deviceActionTypes.SET_SYNC_LOADING,
            payload: { syncLoading: false },
        });
    }, 5000);
};
