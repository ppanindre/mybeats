import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import moment from "moment";
import { TourGuideZone } from "rn-tourguide";

import {
  getHeartRate,
  getHeartRateTrendCardData,
} from "../apis/heartRateQueries";
import { getSleepData, getSleepTrendCardData } from "../apis/sleepQueries";
import { ActivityActionCreators } from "../store/ActivityReducer/ActivityActionCreators";
import { FoodActionCreators } from "../store/FoodReducer/FoodActionCreators";
import { dashboardActionTypes } from "../store/DashboardReducer/DashboardActionTypes";
import CustomDayChartComponent from "../components/CustomDayChartComponent";
import SummaryChart from "../components/SummaryChart";
import TrendCardComponent from "../components/TrendCardComponent";

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
      const currentHeartRateTrendCardData = await getHeartRateTrendCardData(
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

      dispatch(FoodActionCreators.getDataForFoodTrendCard(queryDate, true));

      // set heart rate to show on summary chart
      setHeartRateDashboard(
        currentHeartRateData.resting ? currentHeartRateData.resting : "-"
      );

      // set sleep to be shown on summary chart
      setSleepDashboard(
        currentSleepData?.totalTimeInBed -
          (currentSleepData.wake ? currentSleepData.wake : 0) ?? 0
      );

      // set the heart rate trend card data
      setHeartTrendCard(currentHeartRateTrendCardData);

      // set the sleep trend card data
      setSleepTrendCard(currentSleepTrendCardData);
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          message: "Error while loading the data into the dashboard",
        },
      });
      Alert.alert("", "Please terminate the app & try again.");
    }

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
    sleepTrendCard?.length > 0 ? sleepTrendCard[3].trendCardBarColor : "green";
  const heartRateColor =
    heartTrendCard?.length > 0 ? heartTrendCard[3].trendCardBarColor : "green";

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

  return (
    // Tour guide for the dashboard screen
    <TourGuideZone
      zone={10}
      text="Swipe left or right to view heart, sleep, activity, and food data"
    >
      <View sentry-label="dashboard" className="p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
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
              style={{ height: Dimensions.get("window").height * 0.5 }}
              className="items-center justify-center"
            >
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
                calories={parseInt(foodTrendCardDataDashboard[0]?.value) || "-"} // food
                water={
                  foodTrendCardDataDashboard
                    ? foodTrendCardDataDashboard[1]?.value.replace(" oz", "")
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
                    ? ActivitytrendCardDataDashboard[0]?.value
                    : "-"
                } // steps
                ring={chartColor} // ring color
              />

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
