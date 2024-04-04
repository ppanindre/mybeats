import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";

import SyncButton from "../SyncButton";
import { userAuthActionTypes } from "../../store/UserAuthReducer/UserAuthActionTypes";
import { customTheme } from "../../constants/themeConstants";

const TopNavbar = ({ showSync = true, isMyBeats = false }) => {
    // Get profile data from the user reducer
    const user = useSelector((state) => state.UserReducer);

    // get the flag for start tour guide, if start tour guide is true, start the tour guide
    const { startTourGuide } = useSelector((state) => state.UserAuthReducer);

    // Declare navigation instance
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Declare Tour guide hook
    const { canStart, start, eventEmitter } = useTourGuideController();

    // Tour guide
    useEffect(() => {
        // if the tour guide can start or user clicked on start tour guide in the info rscreen
        if (canStart && startTourGuide) {
            start(); // start tour gudie
        }
    }, [canStart, startTourGuide]);

    // when tour guide is stopped
    const handleOnStop = () =>
        dispatch({
            type: userAuthActionTypes.START_TOUR_GUIDE,
            payload: { startTourGuide: false },
        });

    // execute handleonstop when event emitted is stop
    useEffect(() => {
        eventEmitter.on("stop", handleOnStop);

        return () => {
            eventEmitter.off("stop", handleOnStop);
        };
    }, []);

    // Get Last sync time
    const getLastSyncTime = () => {
        let deviceSyncTime = "";

        // get user vendor
        const vendor = user.vendor;

        if (vendor === "apple") {
            // get apple sync time
            deviceSyncTime = user.deviceSyncTime_apple;
        } else if (vendor === "Fitbit") {
            // get fitbit sync time
            deviceSyncTime = user.deviceSyncTime_Fitbit;
        } else if (vendor === "garmin") {
            // get garmin sync time
            deviceSyncTime = user.deviceSyncTime_garmin;
        } else if (vendor === "gfit") {
            // get gfit sync time
            deviceSyncTime = user.devceSyncTime_gfit;
        }

        // if there is no device sync time, return null
        if (deviceSyncTime === "") {
            return null;
        }

        // convert the sync timestamp to the following time forat
        deviceSyncTime = moment(deviceSyncTime).format("MMM DD, YYYY h:mmA");
        return isMyBeats
            ? "Last Active: ".concat(deviceSyncTime)
            : "Last sync: ".concat(deviceSyncTime);
    };

    return (
        <View className="relative p-4 border-b-2 border-gray-300 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2 ">
                {/* Profile Icon */}

                <TourGuideZone
                    zone={0}
                    text="Access the settings"
                    shape="circle"
                >
                    {user.avatar ? (
                        // if user has an avatar render the image
                        <TouchableOpacity
                            disabled={startTourGuide} // if tour guide is running disable the button
                            onPress={() => navigation.navigate("profile")} // navigate the user to profile screen
                            className="bg-gray-100 h-10 w-10 rounded-lg items-center justify-center"
                        >
                            <Image
                                source={user.avatar.imgSrc}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    ) : (
                        // if user does not has an avatar render the first letter of the user name
                        <TouchableOpacity
                            disabled={startTourGuide}
                            onPress={() => navigation.navigate("profile")}
                            style={{
                                backgroundColor: customTheme.colors.primary,
                            }}
                            className="h-10 w-10 rounded-lg items-center justify-center"
                        >
                            <Text className="text-white text-lg font-bold font-[appfont-bold]">
                                {user.email && user.email[0].toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    )}
                </TourGuideZone>

                {/* Profile name */}
                <View>
                    <Text
                        style={{ color: customTheme.colors.dark }}
                        className="text-lg font-[appfont-bold]"
                    >
                        Hello
                        {/* if user did not set the first name, dont return anything  */}
                        {+user?.profileData?.firstName !== null &&
                            " " + user?.profileData?.firstName}
                        !
                    </Text>

                    {/* render the last sync time */}
                    <Text
                        className="font-[appfont]"
                        style={{ fontSize: 10, color: customTheme.colors.dark }}
                    >
                        {getLastSyncTime()}
                    </Text>
                </View>
            </View>

            {isMyBeats && (
                <View
                    className={`gap-2 ${Platform.OS === "android" && "mt-1"}`}
                >
                    <TouchableOpacity
                        sentry-label="sync-btn"
                        onPress={() => navigation.navigate("confirmAddress")}
                    >
                        <Text
                            style={{ color: customTheme.colors.primary }}
                            className=" text-md font-[appfont-bold]"
                        >
                            Change Role
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* if to sync button, render sync button */}
            {showSync && (
                <View
                    className={`gap-2 ${Platform.OS === "android" && "mt-1"}`}
                >
                    <SyncButton />
                </View>
            )}
        </View>
    );
};

export default TopNavbar;
