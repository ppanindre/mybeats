import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { TourGuideZone } from "rn-tourguide";

import {
  getHeartRate,
  getHeartRateTrendCardData,
} from "../../../../apis/heartRateQueries";
import { getSleepData, getSleepTrendCardData } from "../../../../apis/sleepQueries";
import { ActivityActionCreators } from "../../../../store/ActivityReducer/ActivityActionCreators";
import { FoodActionCreators } from "../../../../store/FoodReducer/FoodActionCreators";
import { dashboardActionTypes } from "../../../../store/DashboardReducer/DashboardActionTypes";
import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import SummaryChart from "../../../../components/SummaryChart";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import { firebaseCollections } from "../../../../constants/firebaseCollections";

const Dashboard = () => {
  // Declare navigation & dispatch instance
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Check if you are forcing food data
  const { toForceFoodData } = useSelector((state) => state.DashboardReducer);

  // current date state
  const [currentDate, setCurrentDate] = useState();

  // Summary chart data states
  const [heartRateDashboard, setHeartRateDashboard] = useState("-");
  const [sleepDashboard, setSleepDashboard] = useState("-");
  const [heartTrendCard, setHeartTrendCard] = useState([]);
  const [sleepTrendCard, setSleepTrendCard] = useState([]);
  const [toShowArrows, setToShowArrows] = useState(true);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);

  // Notification state
  const [latestNotification, setLatestNotification] = useState();
  const [notificationCount, setNotificationCount] = useState(0);

  // Get heart rate data
  const { heartRateDataStore, heartRateIntradayStore } = useSelector(
      (state) => state.HeartRateReducer
  );

  // Get sleep data
  const { sleepDataStore } = useSelector((state) => state.SleepReducer);

  // Get activity
  const { ActivitytrendCardDataDashboard } = useSelector(
      (state) => state.ActivityReducer
  );

  // Get food
  const { foodTrendCardDataDashboard } = useSelector(
      (state) => state.FoodReducer
  );

  // Get user
  const user = useSelector((state) => state.UserReducer);

  // get if the user indicated the app to start the tour guide
  const { startTourGuide } = useSelector((state) => state.UserAuthReducer);

  // To set the notification card to be visible or not visible
  const [isVisible, setIsVisible] = useState(false);

  const isFocused = useIsFocused();

  // When date is changed on the above chart
  const changeDate = async (queryDate, forceDataForToday = false) => {

      // set the current date to be the query date

      setCurrentDate(queryDate);

      // set the dashboard to loading before the data finishes loading
      setIsDashboardLoading(true);

      // if date is today's date dont show the trend card arrows
      if (queryDate === moment().format("YYYY-MM-DD")) {
          setToShowArrows(false);
      } else {
          setToShowArrows(true);
      }

      // Get heart rate data
      try {
          const currentHeartRateData = await getHeartRate(
              queryDate,
              heartRateDataStore,
              dispatch,
              user.vendor,
              user.userId,
              forceDataForToday
          );

          // Get sleep data
          const currentSleepData = await getSleepData(
              queryDate,
              sleepDataStore,
              dispatch,
              user.vendor,
              user.userId,
              forceDataForToday
          );
          
          // get the previous day with respect  to the current day
          const prevQueryDate = moment(queryDate)
              .subtract(1, "days")
              .format("YYYY-MM-DD");

          // get heart rate trend card data
          const currentHeartRateTrendCardData =
              await getHeartRateTrendCardData(
                  queryDate,
                  prevQueryDate,
                  heartRateIntradayStore,
                  heartRateDataStore,
                  dispatch,
                  user.vendor,
                  user.userId,
                  forceDataForToday
              );

          // get sleep trend card data
          const currentSleepTrendCardData = await getSleepTrendCardData(
              queryDate,
              prevQueryDate,
              sleepDataStore,
              dispatch,
              user.vendor,
              user.userId,
              forceDataForToday
          );

          // Change this logic in future versions
          dispatch(
              ActivityActionCreators.getDataForActivityTrendCard(
                  queryDate,
                  true,
                  user.vendor
              )
          );

          dispatch(
              FoodActionCreators.getDataForFoodTrendCard(queryDate, true)
          );

          // set heart rate to show on summary chart
          setHeartRateDashboard(
              currentHeartRateData.resting
                  ? currentHeartRateData.resting
                  : "-"
          );

          // set sleep to be shown on summary chart
          setSleepDashboard(currentSleepData?.totalSleep ?? 0);

          // set the heart rate trend card data
          setHeartTrendCard(currentHeartRateTrendCardData);

          // set the sleep trend card data
          setSleepTrendCard(currentSleepTrendCardData);
      } catch (error) {
          console.error("Error while changing date", error);
          Sentry.captureException(error, {
              extra: {
                  message: "Error while loading the data into the dashboard",
              },
          });
      }

      console.log("data loaded")

      dispatch({
          type: dashboardActionTypes.IS_DATA_LOADED,
          payload: { isDataLoaded: true },
      });

      // set the dashboard loading to false
      setIsDashboardLoading(false);
  };

  useEffect(() => {
      if (toForceFoodData) {
          changeDate(
              moment(currentDate).format("YYYY-MM-DD"),
              (forceDataForToday = true)
          );
      }
      dispatch({
          type: dashboardActionTypes.FORCE_FOOD,
          payload: { toForceFoodData: false },
      });
  }, [toForceFoodData]);

  const activityColor =
      ActivitytrendCardDataDashboard.length > 0
          ? ActivitytrendCardDataDashboard[3].trendCardBarColor
          : "green";
  const sleepColor =
      sleepTrendCard?.length > 0
          ? sleepTrendCard[3].trendCardBarColor
          : "green";
  const heartRateColor =
      heartTrendCard?.length > 0
          ? heartTrendCard[3].trendCardBarColor
          : "green";

  let chartColor = "green";

  if (
      activityColor == "red" ||
      sleepColor == "red" ||
      heartRateColor == "red"
  ) {
      chartColor = "red";
  } else if (
      activityColor == "#FFEF00" ||
      sleepColor == "#FFEF00" ||
      heartRateColor == "#FFEF00"
  ) {
      chartColor = "#FFEF00";
  }

  // function to set the latest notificaiton to show on dashboard
  // and remove the notiifcation once the unread counter is 0

  // Reminder listener
  useEffect(() => {
      if (!user.vendor) {
          console.error("Vendor is undefined.");
          return;
      }

      const unsubscribe = firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(user.userId)
          .collection("reminder")
          .doc("summary")
          .collection("notifications")
          .where("device", "==", user.vendor)
          .onSnapshot((snapshot) => {
              let set = false;
              Sentry.captureMessage("Notification data: ", snapshot);
              snapshot.docs.forEach((doc) => {
                  if (!set) {
                      setIsVisible(true);
                      console.log("doc data", doc.data());
                      setLatestNotification(doc.data());
                      set = true;
                  }
              });
          });
      return () => unsubscribe;
  }, [user.vendor]);

  // Notification Listener
  useEffect(() => {
      if (!user.vendor) {
          console.error("Vendor is undefined.");
          return;
      }

      const unsubscribe = firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(user.userId)
          .collection(firebaseCollections.NOTIFICATION_COLLECTION)
          .doc("summary")
          .collection("notifications")
          .where("device", "==", user.vendor) // where the device selected is vendor
          .where("approved", "==", true) // notification is approved
          .orderBy("approvedTime", "desc")
          .onSnapshot(
              (snapshot) => {
                  let set = false;
                  Sentry.captureMessage("Notification data: ", snapshot);
                  snapshot.docs.forEach((doc) => {
                      if (!set) {
                          setIsVisible(true);
                          setLatestNotification(doc.data());
                          set = true;
                      }
                  });
              },
              (error) => {
                  Sentry.captureException(error);
                  // Handle the error more specifically if needed, e.g.:
                  console.error("Error fetching notifications:", error);
                  // Optionally, update UI or state to reflect the error
                  setIsVisible(false);
                  setLatestNotification(null);
              }
          );

      return () => unsubscribe();
  }, [user.vendor]);

  // notification listener
  useEffect(() => {
      const unsubscribe = firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(user.userId)
          .collection(firebaseCollections.NOTIFICATION_COLLECTION)
          .doc("summary")
          .onSnapshot((snapshot) => {
              const data = snapshot.data(); // get notification when new notification is added
              setNotificationCount(data?.unread);
          });

      // cleanup function
      return () => unsubscribe();
  }, []);

  // define notification listener
  const notificationListener = useRef();

  // define response listener
  const responseListener = useRef();

  // Set up push notifications
  useEffect(() => {
      registerForPushNotificationsAsync().then(async (token) => {
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(user?.userId)
              .update({
                  notificationToken: token,
              });
      });

      notificationListener.current =
          Notifications.addNotificationReceivedListener(() => {});

      responseListener.current =
          Notifications.addNotificationResponseReceivedListener(() => {});

      return () => {
          Notifications.removeNotificationSubscription(
              notificationListener.current
          );
          Notifications.removeNotificationSubscription(
              responseListener.current
          );
      };
  }, []);

  // Register push notifications
  async function registerForPushNotificationsAsync() {
      let token;

      if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
              name: "default",
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: "#FF231F7C",
          });
      }
      const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
      }
      if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
      }
      token = (
          await Notifications.getExpoPushTokenAsync({
              projectId: "75a57d2e-e4e1-4fba-9a96-4467262579c6",
          })
      ).data;
      return token;
  }

  useEffect(() => {
      if (!isFocused) {
          setIsVisible(false);
      }
  }, [isFocused]);

  // Scroll View Ref
  const scrollViewRef = useRef();

  useEffect(() => {
      // Check if startTourGuide is true
      if (startTourGuide) {
          // Scroll to the top of the ScrollView
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
  }, [startTourGuide]);

  return (
      // Tour guide for the dashboard screen
      <TourGuideZone
          zone={10}
          text="Swipe left or right to view heart, sleep, activity, and food data"
      >
          <View sentry-label="dashboard" className="p-5">
              <ScrollView
                  ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
              >
                  <View className="relative">
                      {isDashboardLoading && (
                          // Hide the date component until the dashboard loads
                          <View
                              className="absolute bg-white z-30"
                              style={{ height: 50, width: "100%" }}
                          />
                      )}
                      <CustomDayChartComponent changeDate={changeDate} />
                  </View>

                  {/* The Dashboard Summary Chart */}
                  {/* if dashboard is loading, show an activity indicator */}
                  {isDashboardLoading ? (
                      <View
                          style={{
                              height: Dimensions.get("window").height * 0.5,
                          }}
                          className="items-center justify-center space-y-3 "
                      >
                          {currentDate === moment().format("YYYY-MM-DD") && (
                              <Text className="text-md">
                                  Syncing your data with AI
                              </Text>
                          )}
                          <ActivityIndicator color="#fb923c" />
                      </View>
                  ) : (
                      <View>
                          {/* summary chart */}
                          <SummaryChart
                              heartrate={heartRateDashboard} // heartrate
                              sleep={parseInt(sleepDashboard) * 60 || 0} // sleep
                              loading={false}
                              sedantary={
                                  ActivitytrendCardDataDashboard
                                      ? ActivitytrendCardDataDashboard[1]?.value.replace(
                                            " mins",
                                            ""
                                        )
                                      : "-"
                              }
                              calories={
                                  parseInt(
                                      foodTrendCardDataDashboard[0]?.value
                                  ) || "-"
                              } // food
                              water={
                                  foodTrendCardDataDashboard
                                      ? foodTrendCardDataDashboard[1]?.value.replace(
                                            " oz",
                                            ""
                                        )
                                      : "-"
                              } // water
                              activity={
                                  ActivitytrendCardDataDashboard
                                      ? ActivitytrendCardDataDashboard[2]?.value.replace(
                                            " mins",
                                            ""
                                        )
                                      : "-"
                              } // activity
                              steps={
                                  ActivitytrendCardDataDashboard
                                      ? ActivitytrendCardDataDashboard[0]
                                            ?.value
                                      : "-"
                              } // steps
                              ring={chartColor} // ring color
                          />
                          {isVisible &&
                              latestNotification &&
                              notificationCount > 0 && (
                                  <View className="bg-white border-2 border-orange-400 rounded-lg py-3 px-5 mt-5">
                                      <View className="flex-row items-center space-x-3">
                                          <MaterialCommunityIcons
                                              name="lightbulb-on-outline"
                                              color={
                                                  customTheme.colors.primary
                                              }
                                              size={18}
                                          />
                                          <View className="pr-5">
                                              <WrappedText
                                                  content={
                                                      latestNotification.message
                                                  }
                                                  lineLimit={80}
                                              />
                                          </View>
                                      </View>
                                      {latestNotification?.type !==
                                          "Reminder" && (
                                          <View className="items-end">
                                              <TouchableOpacity
                                                  onPress={() =>
                                                      navigation.navigate(
                                                          "notifications"
                                                      )
                                                  }
                                                  className="flex-row items-center space-y"
                                              >
                                                  <Text className="text-orange-400 font-bold">
                                                      Show More
                                                  </Text>
                                                  <ChevronRightIcon
                                                      size={20}
                                                      color={
                                                          customTheme.colors
                                                              .primary
                                                      }
                                                  />
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                  </View>
                              )}

                          <TrendCardComponent
                              title="Heart Rate"
                              lastSyncDate={null}
                              date={null}
                              data={heartTrendCard ?? []}
                              onEdit={() => {
                                  navigation.navigate("heartrate");
                              }}
                          />
                          {/* Sleep Trend Card component */}
                          <TrendCardComponent
                              title="Sleep"
                              lastSyncDate={null}
                              date={null}
                              data={sleepTrendCard ?? []}
                              onEdit={() => {
                                  navigation.navigate("sleep");
                              }}
                          />
                          {/* Activity Trend Card Component */}
                          <TrendCardComponent
                              title="Activity"
                              lastSyncDate={null}
                              date={null}
                              data={ActivitytrendCardDataDashboard}
                              showArrows={toShowArrows}
                              onEdit={() => {
                                  navigation.navigate("activity");
                              }}
                          />
                          {/* Food Card Component */}
                          <TrendCardComponent
                              title="Food"
                              lastSyncDate={null}
                              date={null}
                              data={foodTrendCardDataDashboard ?? []}
                              showArrows={toShowArrows}
                              onEdit={() => {
                                  navigation.navigate("food");
                              }}
                          />
                      </View>
                  )}
              </ScrollView>
          </View>
      </TourGuideZone>
  );
};

export default Dashboard;