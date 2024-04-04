import { Text, AppState } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as Localization from "expo-localization";
import * as Sentry from "@sentry/react-native";

import { getAppleData } from "../apis/appleQueries";

import axios from "axios";
import { customTheme } from "../constants/themeConstants";

const SyncButton = () => {
    const { user } = useSelector((state) => state.UserAuthReducer); //  get user

    // get device selected
    const { deviceSelected } = useSelector((state) => state.DeviceReducer);

    // define dispatch instance
    const dispatch = useDispatch();

    // function to sync device
    const syncDevice = async () => {
        // if device selected is apple
        if (deviceSelected === "apple") {
            getAppleData(user, dispatch); // get apple data
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
        }
    };

    // Auto sync apple and gift device when the app comes back from the background
    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === "background") {
                console.log("syncing");
                syncDevice();
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

    return deviceSelected === "apple" || deviceSelected === "gfit" ? (
        <TouchableOpacity
            sentry-label="sync-btn"
            onPress={syncDevice}
            className="py-2 px-4 rounded-full shadow-lg items-center justify-center"
            style={{ backgroundColor: customTheme.colors.primary, width: 80 }}
        >
            <Text className="text-lg text-white">Sync</Text>
        </TouchableOpacity>
    ) : (
        <></>
    );
};

export default SyncButton;
