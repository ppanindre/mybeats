import { View, ScrollView, Dimensions, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";
import firestore from '@react-native-firebase/firestore';

import HeartRateDayChart from "../../../../components/HeartRateDayChart";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import HeartRateTrend from "../../../../components/HeartRateTrend";
import FoodTrends from "../../../../components/FoodTrends";

import {
  getHeartRateIntraday,
  getHeartRateTrendCardData,
  getHeartRateTrendChartData,
} from "../../../../apis/heartRateQueries";
import { FoodActionCreators } from "../../../../store/FoodReducer/FoodActionCreators";
import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";

const { height, width } = Dimensions.get("window");

const getUserIdFromPatientId = async (patientId) => {
  try {
    const doc = await firestore().collection('Patients').doc(patientId).get();
    if (doc.exists) {
      return doc.data().userId;
    }
  } catch (err) {
    console.error("Error fetching userId:", err);
    Sentry.captureException(err);
  }
  return null;
};

const MyBeatsCharts = ({ route }) => {
  const dispatch = useDispatch();
  const { heartRateIntradayStore, heartRateDataStore } = useSelector((state) => state.HeartRateReducer);
  const { foodTrendCard, foodTrendChartData } = useSelector((state) => state.FoodReducer);
  const user = useSelector((state) => state.UserReducer);

  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [isHeartRateChartLoading, setIsHeartRateChartLoading] = useState(false);
  const [isTrendChartLoading, setIsTrendChartLoading] = useState(false);
  const [heartRateDailyChartData, setHeartRateDailyChartData] = useState([]);
  const [heartRateTrendCardData, setHeartRateTrendCardData] = useState([]);
  const [heartRateTrendChartData, setHeartRateTrendChartData] = useState([]);
  const [heartRateTrendChartLabels, setHeartRateTrendChartLabels] = useState(WEEK_LABELS);
  const [foodChartLabels, setFoodChartLabels] = useState(WEEK_LABELS);

  const [patientId, setPatientId] = useState(route?.params?.patientId || null);
  const [firebaseUserId, setFirebaseUserId] = useState(null);
  const type = route?.params?.type || "heart";

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      if (!patientId) return;
      const resolvedUserId = await getUserIdFromPatientId(patientId);
      if (resolvedUserId) {
        setFirebaseUserId(resolvedUserId);
        const today = moment().format("YYYY-MM-DD");
        const start = moment().startOf("week").format("YYYY-MM-DD");
        const end = moment().endOf("week").format("YYYY-MM-DD");

        if (type === "calories") {
          dispatch(FoodActionCreators.getDataForFoodTrendCard(moment()));
          dispatch(FoodActionCreators.getDataForFoodTrendChart(moment(start), moment(end)));
        } else {
          changeDate(today, true);
          changeDateRange(start, end, "week");
        }
      }
    };
    fetchUserIdAndData();
  }, [patientId]);


  useEffect(() => {
    if (type === "calories" && Array.isArray(foodTrendChartData)) {
      setIsTrendChartLoading(false);
    }
  }, [foodTrendChartData]);

  const changeDate = async (queryDate, forceDataForToday = false) => {
    setCurrentDate(queryDate);
    try {
      setIsHeartRateChartLoading(true);
      const intradayData = await getHeartRateIntraday(queryDate, heartRateIntradayStore, dispatch, user.vendor, firebaseUserId, forceDataForToday);
      setHeartRateDailyChartData(intradayData);
      const prevDate = moment(queryDate).subtract(1, "days").format("YYYY-MM-DD");
      const cardData = await getHeartRateTrendCardData(queryDate, prevDate, heartRateIntradayStore, heartRateDataStore, dispatch, user.vendor, firebaseUserId, forceDataForToday);
      setHeartRateTrendCardData(cardData);
      setIsHeartRateChartLoading(false);
    } catch (err) {
      Sentry.captureException(err, { extra: { message: `Error while fetching ${type} data` } });
    }
  };

  const changeDateRange = async (startDate, endDate, mode) => {
    setIsTrendChartLoading(true);
    switch (mode) {
      case "week":
        setHeartRateTrendChartLabels(WEEK_LABELS);
        setFoodChartLabels(WEEK_LABELS);
        break;
      case "month": {
        const days = moment(startDate).daysInMonth();
        const labels = [...Array(days)].map((_, i) => i + 1);
        setHeartRateTrendChartLabels(labels);
        setFoodChartLabels(labels);
        break;
      }
      case "year":
        setHeartRateTrendChartLabels(YEAR_LABLES);
        setFoodChartLabels(YEAR_LABLES);
        break;
    }
    try {
      if (type === "calories") {
        await dispatch(FoodActionCreators.getDataForFoodTrendChart(moment(startDate), moment(endDate)));
      } else {
        const trendData = await getHeartRateTrendChartData(startDate, endDate, firebaseUserId, user.vendor);
        setHeartRateTrendChartData(trendData);
        setIsTrendChartLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err, { extra: { message: `Error while fetching ${type} trend data` } });
      setIsTrendChartLoading(false);
    }
  };

  return (
    <View className="relative">
      <View className="p-5" style={{ width: "100%" }}>
        {isHeartRateChartLoading && currentDate === moment().format("YYYY-MM-DD") && (
          <View style={{ height: height * 0.7, width: width }} className="bg-white items-center justify-center absolute top-0 left-0 z-10">
            <Text className="text-md">Syncing your data with AI</Text>
            <ActivityIndicator color="orange" />
          </View>
        )}
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 5, width: "100%" }}>
          {type !== "calories" && (
            <>
              <CustomDayChartComponent changeDate={changeDate} />
              <HeartRateDayChart chartData={heartRateDailyChartData} />
              <TrendCardComponent title={type.charAt(0).toUpperCase() + type.slice(1)} lastSyncDate={null} date={null} data={heartRateTrendCardData ?? []} />
            </>
          )}
          {type === "calories" && (
            <TrendCardComponent title="Food" isFoodTrendCard={true} lastSyncDate={null} data={foodTrendCard} userIdFromAWS={firebaseUserId} />
          )}

          <View>
            <CustomTrendDatePicker isDataLoading={isTrendChartLoading} changeDateRange={changeDateRange} />
          </View>

          <View>
            {type === "calories" ? (
              <FoodTrends
                data={Array.isArray(foodTrendChartData) && foodTrendChartData.length ? foodTrendChartData : [[0, 0, 0, 0]]}
                labels={Array.isArray(foodChartLabels) && foodChartLabels.length ? foodChartLabels : ["M", "T", "W", "T", "F", "S", "S"]}
              />
            ) : (
              <HeartRateTrend isLoading={isTrendChartLoading} labels={heartRateTrendChartLabels} data={heartRateTrendChartData} />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyBeatsCharts;
