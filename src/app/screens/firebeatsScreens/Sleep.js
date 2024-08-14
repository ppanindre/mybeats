import { View, ScrollView, ActivityIndicator, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";

import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import SleepChart from "../../../../components/SleepLineChart";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import SleepTrend from "../../../../components/SleepTrend";

import {
  getFitbitSleepDisplayData,
  getGarminSleepDisplayData,
  getSleepDisplayData,
  getSleepTrendCardData,
  getSleepTrendChartData,
} from "../../../../apis/sleepQueries";
import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";

const { height, width } = Dimensions.get("window");

const Sleep = () => {
  // declare dispatch instance
  const dispatch = useDispatch();

  // REDUX STORE
  const { deviceSelected } = useSelector((state) => state.DeviceReducer); // get device selected
  const { sleepDataStore, sleepIntradayStore } = useSelector(
    (state) => state.SleepReducer
  ); //  get sleep data cache
  const user = useSelector((state) => state.UserReducer); // get user listener

  // STATES
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [isSleepTrendLoading, setIsSleepTrendLoading] = useState(false); // show loading for trend chart
  const [isSleepDataLoading, setIsSleepDataLoading] = useState(false); // show loading for sleep chart
  const [sleepChartData, setSleepChartData] = useState([]); // sleep chart data
  const [sleepTrendCardData, setSleepTrendCardData] = useState([]); // sleep trend card data
  const [sleepTrendChartData, setSleepTrendChartData] = useState([]); // sleep trend chart data
  const [isPrevDataAppended, setIsPrevDataAppended] = useState(false); // is prev data appended for sleep
  const [sleepChartLabels, setSleepChartLabels] = useState([
    "00:00:00",
    "8:00:00",
  ]); // labels for sleep chart
  const [sleepTrendChartLabels, setSleepTrendChartLabels] =
    useState(WEEK_LABELS); // sleep trend chart labels

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD"); // current date
    const startDate = moment().startOf("week").format("YYYY-MM-DD").toString(); // start date for trend chart
    const endDate = moment().endOf("week").format("YYYY-MM-DD").toString(); // end date for trend chart

    changeDate(currentDate, (forceDataForToday = true)); // fetch new data for day chart

    changeDateRange(startDate, endDate, "week"); // fetch new data for trend chart
  }, [user]); // whenever device sync time changes or new device is selected

  // whenever date is changed, fetch data for that day
  const changeDate = async (queryDate, forceDataForToday = false) => {
    setCurrentDate(queryDate);
    try {
      setIsSleepDataLoading(true); // show loading for sleep day chart

      // get previous date
      const prevQueryDate = moment(queryDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD");

      // define sleep day data, labels, is previous data appended
      let currentSleepDisplayData, labels, isPrevDataAppended;

      if (deviceSelected !== "garmin") {
        // if device is fitbit apple or google fit
        ({ currentSleepDisplayData, labels, isPrevDataAppended } =
          await getFitbitSleepDisplayData(
            queryDate,
            deviceSelected,
            user.userId,
            sleepIntradayStore,
            forceDataForToday,
            dispatch
          ));
      } else {
        // if device selected is garmin
        ({ currentSleepDisplayData, labels, isPrevDataAppended } =
          await getGarminSleepDisplayData(
            queryDate,
            deviceSelected,
            user.userId,
            sleepIntradayStore,
            forceDataForToday,
            dispatch
          ));
      }

      // define unique sleep data
      const uniqueSleepData = [];

      if (currentSleepDisplayData.length > 0) {
        // if sleep data exists
        currentSleepDisplayData.forEach((data) => {
          const uniqueSubData = [];

          // remove duplicate data
          for (let i = 0; i < data.length - 1; i++) {
            if (data[i].x !== data[i + 1].x) {
              uniqueSubData.push(data[i]);
            }
          }
          uniqueSleepData.push(uniqueSubData);
        });
      }

      setSleepChartLabels(labels); // set sleep labels
      setSleepChartData(uniqueSleepData); // set sleep chart data
      setIsPrevDataAppended(isPrevDataAppended); // set boolean value if sleep from previous day is appended

      // get card data
      const cardData = await getSleepTrendCardData(
        queryDate,
        prevQueryDate,
        sleepDataStore,
        dispatch,
        deviceSelected,
        user.userId,
        forceDataForToday
      );

      setSleepTrendCardData(cardData); // set sleep card data
      setIsSleepDataLoading(false); // stop showing loading
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while fetching sleep data" },
      }); //capture error
    }
  };

  // fetch data for trend when date range is changed
  const changeDateRange = async (startDate, endDate, selectedMode) => {
    setIsSleepTrendLoading(true); //

    // handle the mode of trend chart date for week, month, year
    switch (selectedMode) {
      // week mode
      case "week": {
        setSleepTrendChartLabels(WEEK_LABELS);
        break;
      }

      // month mode
      case "month": {
        const startMoment = moment(startDate, "YYYY-MM-DD");
        const daysInMonth = startMoment.daysInMonth();
        const labelsArray = Array.from(
          { length: daysInMonth },
          (_, i) => i + 1
        );
        setSleepTrendChartLabels(labelsArray);
        break;
      }

      // year mode
      case "year": {
        setSleepTrendChartLabels(YEAR_LABLES);
        break;
      }
    }

    // get trend chart data
    const trendChartData = await getSleepTrendChartData(
      startDate,
      endDate,
      deviceSelected,
      user.userId
    );

    // set sleep trend chart data
    setSleepTrendChartData(trendChartData);

    // set sleep trend loading to false
    setIsSleepTrendLoading(false);
  };

  return (
    <View sentry-label="sleep">
      <View className="p-5" style={{ width: "100%" }}>
        {isSleepDataLoading &&
          currentDate === moment().format("YYYY-MM-DD") && (
            <View
              style={{ height: height * 0.7, width: width }}
              className=" bg-white items-center justify-center absolute top-0 left-0 z-10"
            >
              <Text className="text-md">Syncing your data with AI</Text>
              <ActivityIndicator color="orange" />
            </View>
          )}

        {/* Scroll View */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: "100%",
            paddingBottom: 5,
          }}
        >
          {/* Day chart component */}
          <CustomDayChartComponent
            sentry-label="sleep-day-chart-date"
            changeDate={changeDate}
          />

          {/* if sleep data is loading, render an activity indicator */}
          {!isSleepDataLoading ? (
            <SleepChart
              data={sleepChartData}
              labels={sleepChartLabels}
              isPrevDataAppended={isPrevDataAppended}
              deviceSelected={user.vendor}
              isLoading={isSleepDataLoading}
            />
          ) : (
            <View
              className="items-center justify-center"
              style={{ height: 300 }}
            >
              {/* if data is loading */}
              <ActivityIndicator color="orange" />
            </View>
          )}

          {/* trend card component */}
          <TrendCardComponent
            sentry-label="sleep-card"
            title="Sleep"
            lastSyncDate={null}
            date={null}
            data={sleepTrendCardData ?? []}
          />

          <View>
            {/* trend chart date range */}
            <CustomTrendDatePicker
              sentry-label="sleep-trend-date"
              changeDateRange={changeDateRange}
              isDataLoading={isSleepTrendLoading}
            />
          </View>

          {/* sleep trend chart data */}
          <SleepTrend
            isLoading={isSleepTrendLoading}
            data={sleepTrendChartData ?? []}
            labels={sleepTrendChartLabels}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Sleep;
