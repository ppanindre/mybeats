import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import FoodPieChart from "../../../../components/FoodPieChart";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import FoodTrends from "../../../../components/FoodTrends";
import { useDispatch, useSelector } from "react-redux";
import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";
import * as Sentry from "@sentry/react-native";
import moment from "moment";
import {
  getFoodData,
  getFoodTrendCard,
  getFoodTrendChartData,
} from "../../../../apis/foodQueries";
import { customTheme } from "../../../../constants/themeConstants";
import FoodEditComponent from "./FoodEdit";

const NewFood = () => {
  const dispatch = useDispatch();

  // REDUX STORE
  const { foodDataStore } = useSelector((state) => state.FoodReducer); // get heart rate store
  const user = useSelector((state) => state.UserReducer); // get user listener instance

  // STATES
  const [isFoodChartLoading, setIsFoodChartLoading] = useState(false); //  food chart loading
  const [isTrendChartLoading, setIsTrendChartLoading] = useState(false); // trend chart loading
  const [foodChartData, setFoodChartData] = useState([]); // heart rate day chart
  const [foodTrendCardData, setFoodTrendCardData] = useState([]); // heart rate card data
  const [foodTrendChartData, setFoodTrendChartData] = useState([]); // heart rate trend data
  const [foodTrendChartLabels, setFoodTrendChartLabels] = useState(WEEK_LABELS); // trend labels
  const [showEditFood, setShowFoodEdit] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [startDateRange, setStartDateRange] = useState();
  const [endDateRange, setEndDateRange] = useState();

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD"); // get curreent date
    const startDate = moment().startOf("week").format("YYYY-MM-DD").toString(); // get start date for trend range
    const endDate = moment().endOf("week").format("YYYY-MM-DD").toString(); // get end date for trend range
    changeDate(currentDate, (forceDataForToday = true)); // fetch data for day chart
    changeDateRange(startDate, endDate, "week"); // fetch trend chart data
  }, [user]); // whenever user syncs or changes device

  const changeDate = async (queryDate, forceDataForToday = false) => {
    setCurrentDate(queryDate);

    setIsFoodChartLoading(true);

    try {
      // get current heart rate data for the day chart
      const currentFoodData = await getFoodData(
        queryDate,
        foodDataStore,
        dispatch,
        user.vendor,
        user.userId,
        forceDataForToday
      );

      setFoodChartData(currentFoodData); // set heart rate chart data
      const prevQueryDate = moment(queryDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD"); // get prev date

      // get card data
      const cardData = await getFoodTrendCard(
        queryDate,
        prevQueryDate,
        foodDataStore,
        dispatch,
        user.vendor,
        user.userId,
        forceDataForToday
      );

      setFoodTrendCardData(cardData); // set tren d card data
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while fetching heart rate data" },
      }); // capture error
    }

    setIsFoodChartLoading(false);
  };

  const changeDateRange = async (startDate, endDate, selectedMode) => {

    setStartDateRange(startDate);
    setEndDateRange(endDate);

    setIsTrendChartLoading(true); // show trend chart loading

    // handle change of mode for week, month, year
    switch (selectedMode) {
      // mode selected is week
      case "week": {
        setFoodTrendChartLabels(WEEK_LABELS); // set trend chart labels for week
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
        setFoodTrendChartLabels(labelsArray); // set trend chart labels for month
        break;
      }

      // mode selected to year
      case "year": {
        setFoodTrendChartLabels(YEAR_LABLES); // set trend chart labels for year
        break;
      }
    }
    try {
      const trendChartData = await getFoodTrendChartData(
        startDate,
        endDate,
        user.userId,
        user.vendor
      ); // get trend chart data
      setFoodTrendChartData(trendChartData); // set trend chart data
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while fetching heartrate trend data" },
      }); //capture error
    }
    setIsTrendChartLoading(false); // stop showing loading
  };

  const onClickingSave = () => {
    setShowFoodEdit(!showEditFood);
    console.log("current date", currentDate)
    changeDate(currentDate, forceDataForToday=true)
    changeDateRange(startDateRange, endDateRange, "week");
  };

  return (
    <View sentry-label="food">
      <View className="p-5" style={{ width: "100%" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 5,
            width: "100%",
          }}
        >
          {showEditFood ? (
            <FoodEditComponent
            onClickingSave={onClickingSave}
            date={currentDate}
          />
          ) : (
            <View>
              <CustomDayChartComponent
                sentry-label="food-chart-date"
                changeDate={changeDate}
              />

              <FoodPieChart foodData={foodChartData} />

              <TrendCardComponent
                isFoodTrendCard={true}
                title="Food"
                data={foodTrendCardData}
                showEdit={true}
                onEdit={() => {
                  setShowFoodEdit(!showEditFood);
                }}
              />

              {/* date range */}
              <CustomTrendDatePicker
                sentry-label="heartrate-trend-date"
                isDataLoading={isTrendChartLoading}
                changeDateRange={changeDateRange}
              />
              {isTrendChartLoading ? (
                <View
                  style={{ minHeight: 350 }}
                  className="items-center justify-center"
                >
                  <ActivityIndicator color={customTheme.colors.primary} />
                </View>
              ) : (
                <FoodTrends
                  data={foodTrendChartData}
                  labels={foodTrendChartLabels}
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default NewFood;
