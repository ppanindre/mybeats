import { View, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";

import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";
import {
  getActivityIntraday,
  getActivityTrendCardData,
  getActivityTrendChartData,
} from "../../../../apis/activityQueries";

import { customTheme } from "../../../../constants/themeConstants";
import ActivityLineChart from "../../../../components/ActivityLineChart";
import ActivityTrends from "../../../../components/ActivityTrends";
import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import TrendCardComponent from "../../../../components/TrendCardComponent";

const NewActivity = () => {
  // define dispatch instance
  const dispatch = useDispatch();

  // REDUX STORE
  const { activityIntradayStore, activityDataStore } = useSelector(
    (state) => state.ActivityReducer
  ); // get activity store
  const user = useSelector((state) => state.UserReducer);

  // STATES
  const [isActivityChartLoading, setIsActivityChartLoading] = useState(false);
  const [isTrendChartLoading, setIsTrendChartLoading] = useState(false); // trend chart loading
  const [activityDailyChartData, setActivityDailyChartData] = useState([]); // activity day chart
  const [activityTrendCardData, setActivityTrendCardData] = useState([]); // activity card data
  const [activityTrendChartData, setActivityTrendChartData] = useState([]); // activity trend data
  const [activityTrendChartLabels, setActivityTrendChartLabels] =
    useState(WEEK_LABELS); // trend labels

  // function to fetch day chart data whenever date is changed
  const changeDate = async (queryDate, forceDataForToday = false) => {
    setIsActivityChartLoading(true);
    try {
      // get current activity data for the day chart
      const activityIntraday = await getActivityIntraday(
        queryDate,
        activityIntradayStore,
        dispatch,
        user.vendor,
        user.userId,
        forceDataForToday
      );
      setActivityDailyChartData(activityIntraday); // set activity daily chart data
      const prevQueryDate = moment(queryDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD"); // get prev date

      // get card data
      const cardData = await getActivityTrendCardData(
        queryDate,
        prevQueryDate,
        activityIntradayStore,
        activityDataStore,
        dispatch,
        user.vendor,
        user.userId,
        forceDataForToday
      );

      console.log("card data", cardData)

      setActivityTrendCardData(cardData); // set trend card data
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error, {
        extra: { message: "Error while fetching activity data" },
      }); // capture error
    }
    setIsActivityChartLoading(false);
  };

  // function to fetch trend data between range
  const changeDateRange = async (startDate, endDate, selectedMode) => {
    setIsTrendChartLoading(true); // show trend chart loading

    // handle change of mode for week, month, year
    switch (selectedMode) {
      // mode selected is week
      case "week": {
        setActivityTrendChartLabels(WEEK_LABELS); // set trend chart labels for week
        break;
      }

      // mode selected is month
      case "month": {
        const startMoment = moment(startDate, "YYYY-MM-DD");
        const daysInMonth = startMoment.daysInMonth();
        const labelsArray = Array.from(
          { length: daysInMonth },
          (_, i) => i + 1
        );
        setActivityTrendChartLabels(labelsArray); // set trend chart labels for month
        break;
      }

      // mode selected to year
      case "year": {
        setActivityTrendChartLabels(YEAR_LABLES); // set trend chart labels for year
        break;
      }
    }
    try {
      const chartData = await getActivityTrendChartData(
        startDate,
        endDate,
        user.userId,
        user.vendor
      ); // get trend chart data

      console.log("activity chart data", chartData)

      setActivityTrendChartData(chartData); // set trend chart data
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while fetching activity trend data" },
      }); //capture error
    }
    setIsTrendChartLoading(false); // stop showing loading
  };

  return (
    <View sentry-label="activity">
      <View className="p-5" style={{ width: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 5,
            width: "100%",
          }}
        >
          {/* Day chart component */}
          <CustomDayChartComponent
            sentry-label="activity-day-chart-date"
            changeDate={changeDate}
          />

          {/* Activity day chart */}
          {isActivityChartLoading ? (
            <View
              className="flex-rowitems-center justify-center"
              style={{ minHeight: 300 }}
            >
              <ActivityIndicator color={customTheme.colors.primary} />
            </View>
          ) : (
            <ActivityLineChart activityIntraday={activityDailyChartData} />
          )}

          {/* trend card component */}
          <TrendCardComponent
            sentry-label="activity-trend-card"
            title="Activity"
            lastSyncDate={null}
            date={null}
            data={activityTrendCardData ?? []}
          />

          {/* trend date range */}
          <View>
            <CustomTrendDatePicker
              sentry-label="activity-trend-date"
              isDataLoading={isTrendChartLoading}
              changeDateRange={changeDateRange}
            />
          </View>

          {/* trend chart data */}
          <View>
            {isTrendChartLoading ? (
              <View className="items-center justify-center" style={{minHeight: 370}}>
                <ActivityIndicator color={customTheme.colors.primary} />
              </View>
            ) : (
              <ActivityTrends
                sentry-label="activity-trend-chart"
                isLoading={isTrendChartLoading}
                labels={activityTrendChartLabels}
                data={activityTrendChartData}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NewActivity;
