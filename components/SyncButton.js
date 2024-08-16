import { Text, AppState, Platform } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as Localization from "expo-localization";
import * as Sentry from "@sentry/react-native";

import { getAppleData } from "../apis/appleQueries";

import axios from "axios";
import { customTheme } from "../constants/themeConstants";
import { dashboardActionTypes } from "../store/DashboardReducer/DashboardActionTypes";
import { getHealthConnectData } from "../apis/healthConnectQueries";

const SyncButton = () => {
    const { user } = useSelector((state) => state.UserAuthReducer); //  get user
    const { isDataLoaded } = useSelector((state) => state.DashboardReducer);

    // get device selected
    const { deviceSelected } = useSelector((state) => state.DeviceReducer);

    // define dispatch instance
    const dispatch = useDispatch();

    console.log("device selected", deviceSelected);

    // function to sync device
    const syncDevice = async () => {

        // Dispatch an event that dashboard data has not loaded
        dispatch({
            type: dashboardActionTypes.IS_DATA_LOADED,
            payload: { isDataLoaded: false },
        });

        // if device selected is apple
        if (deviceSelected === "apple") {
            await getAppleData(user, dispatch); // get apple data
        } else if (deviceSelected === "gfit") {
            try {
                await axios.get(
                    `https://us-central1-firebeats-43aaf.cloudfunctions.net/fetchGfitDataFunction?userId=${user.uid}&timezone=${Localization.timezone}`
                );
            } catch (error) {
                // capture gfit sync error
                Sentry.captureException(error, {
                    extra: { message: "Error while syncing gfit" },
                });
            }
        } else if (deviceSelected === "healthConnect") {
            await getHealthConnectData(user, dispatch);
        }
    };

    // Auto sync apple and gift device when the app comes back from the background
    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === "background") {
                if (deviceSelected === "apple") {
                    syncDevice();
                }
            }
        };

        // subscribe to app state changes
        const appStateSubscription = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        // clear timeout
        return () => {
            appStateSubscription.remove();
        };
    }, []);

    return deviceSelected === "apple" ||
        deviceSelected === "gfit" ||
        (deviceSelected === "healthConnect" && Platform.OS === "android") ? (
        <TouchableOpacity
            disabled={!isDataLoaded} // disable the button until the data is loaded
            sentry-label="sync-btn"
            onPress={syncDevice}
            className="bg-orange-400 py-2 px-4 rounded-full shadow-lg items-center justify-center"
            style={{
                width: 80,
                backgroundColor: !isDataLoaded
                    ? customTheme.colors.darkSecondary
                    : customTheme.colors.primary,
            }}
        >
            <Text className="text-lg text-white">Sync</Text>
        </TouchableOpacity>
    ) : (
        <></>
    );
};

export default SyncButton;
