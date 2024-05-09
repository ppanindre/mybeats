import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTourGuideController } from "rn-tourguide";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomSafeView from "../../../components/CustomSafeView";

import { UserAuthActionCreators } from "../../../store/UserAuthReducer/UserAuthActionCreators";
import { userAuthActionTypes } from "../../../store/UserAuthReducer/UserAuthActionTypes";
import { UserActionTypes } from "../../../store/UserReducer/UserActionTypes";
import { firebaseCollections } from "../../../constants/firebaseCollections";
import { deviceActionTypes } from "../../../store/DeviceReducer/DeviceActionTypes";
import { customTheme } from "../../../constants/themeConstants";
import { userQueries } from "../../../apis/userQueries";
import { bottomTabConfig } from "./bottomTabConfig";

// Creating Bottom Tab navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    // Get user data from useSelector
    const { user } = useSelector((state) => state.UserAuthReducer);

    // get if the user indicated the app to start the tour guide
    const { startTourGuide } = useSelector((state) => state.UserAuthReducer);

    const [userIsloading, setIsLoading] = useState(true); // for loading user
    const [notificationCount, setNotificationCount] = useState(0); // notification bubble
    const [tabsData, setTabsData] = useState(bottomTabConfig);

    // define dispatch instance
    const dispatch = useDispatch();

    useEffect(() => {
        if (user !== null) {
            userQueries.updateTimezone(user.uid); // add timezone of user to firebase
            setIsLoading(false); // user is loaded
        } else {
            setIsLoading(true); // user is not yet there
            dispatch(UserAuthActionCreators.setUserData()); // set user data
        }
    }, [user]);

    // user listener
    useEffect(() => {
        // We unsubsribe to the user listener when any update has been made
        const userId = auth().currentUser.uid;

        const unsubscribe = firestore()
            .collection(firebaseCollections.USER_COLLECTION)
            .doc(userId)
            .onSnapshot((snapshot) => {
                // whenever there is a change in the firestore user collection, we will get the snapshot data
                const userData = snapshot.data();

                if (userData !== undefined) {
                    // set user listener data
                    dispatch({
                        type: UserActionTypes.SET_LISTENER_USER_DATA,
                        payload: { userData: userData },
                    });

                    // set devices Data
                    dispatch({
                        type: deviceActionTypes.FETCH_DEVICES,
                        payload: {
                            fetchedDevices: userData.devices,
                            deviceSelected: userData.vendor,
                        },
                    });
                }
            });

        // cleanup function
        return () => unsubscribe();
    }, [dispatch]);

    // notification listener
    useEffect(() => {
        const userId = auth().currentUser.uid;

        const unsubscribe = firestore()
            .collection(firebaseCollections.USER_COLLECTION)
            .doc(userId)
            .collection(firebaseCollections.NOTIFICATION_COLLECTION)
            .doc("summary")
            .onSnapshot((snapshot) => {
                const data = snapshot.data(); // get notification when new notification is added
                setNotificationCount(data?.unread);
            });

        // cleanup function
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dispatch({
            type: userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE,
            payload: { showSkip: false },
        }); // once user is loaded, do not show skip on add device
    }, []);

    // tour guide hook
    const { canStart, start } = useTourGuideController();

    // tour guide
    useEffect(() => {
        if (canStart && startTourGuide) {
            start(); // start the tour guide
        }
    }, [canStart]);

    return (
        <>
            {userIsloading ? (
                // If user is not loaded, show loading
                <CustomSafeView>
                    <View
                        style={{ height: "100%" }}
                        className="items-center justify-center"
                    >
                        <ActivityIndicator color={customTheme.colors.dark} />
                    </View>
                </CustomSafeView>
            ) : (
                <>
                    {/* if user is loaded, render the bottom tab navigator */}
                    <Tab.Navigator
                        initialRouteName={"MyHealth"}
                        sceneContainerStyle={{
                            backgroundColor: customTheme.colors.light,
                            position: "relative",
                        }}
                        screenOptions={{
                            tabBarShowLabel: false,
                            tabBarStyle: {
                                height: 90,
                                alignItems: "center",
                                paddingBottom: 10,
                                paddingTop: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                backgroundColor: customTheme.colors.light,
                                shadowColor: "#000000", // black
                                shadowOffset: { width: 0, height: 10 }, // horizontal and vertical offset
                                shadowOpacity: 0.25, // shadow opacity
                                shadowRadius: 10, // shadow blur radius
                                elevation: 5, // shadow
                                position: "relative",
                            },
                        }}
                    >
                        {tabsData.map((tab) => (
                            <Tab.Screen
                                component={tab.component}
                                name={tab.label}
                                options={{
                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => {
                                        return (
                                            <View className="items-center justify-center">
                                                {focused ? (
                                                    // If the tab is in focused
                                                    <View className="items-center justify-center rounded-3xl">
                                                        {/* Focused Icon */}
                                                        {tab.focusedIcon}

                                                        {/* Label below the tab icon */}
                                                        <Text
                                                            style={{
                                                                color: customTheme
                                                                    .colors
                                                                    .primary,
                                                            }}
                                                            className="text-xs"
                                                        >
                                                            {tab.label}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    // If the tab is not focused
                                                    <View className="items-center">
                                                        {/* Tab Icon */}
                                                        <View className="items-center justify-center">
                                                            {tab.icon}
                                                        </View>

                                                        {/* Tab Label */}
                                                        <Text
                                                            style={{
                                                                color: customTheme
                                                                    .colors
                                                                    .dark,
                                                            }}
                                                            className="text-xs"
                                                        >
                                                            {tab.label}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    },
                                }}
                            />
                        ))}
                    </Tab.Navigator>
                </>
            )}
        </>
    );
};

export default BottomTabNavigator;
