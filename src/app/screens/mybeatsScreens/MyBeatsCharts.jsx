import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import TrendCardComponent from "../../../../components/TrendCardComponent";
import HeartRateTrend from "../../../../components/HeartRateTrend";
import SleepTrend from "../../../../components/SleepTrend";
import FoodTrends from "../../../../components/FoodTrends";
import ActivityTrends from "../../../../components/ActivityTrends";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";
import {
  getHeartRateTrendChartData,
  getHeartRateTrendCardData,
} from "../../../../apis/heartRateQueries";
import {
  getSleepTrendChartData,
  getSleepTrendCardData,
} from "../../../../apis/sleepQueries";
import {
  getActivityTrendChartData,
  getActivityTrendCardData,
} from "../../../../apis/activityQueries";
import {
  FoodActionCreators,
  getDataForFoodTrendCard,
} from "../../../../store/FoodReducer/FoodActionCreators";
import firestore from "@react-native-firebase/firestore";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import HeartRateDayChart from "../../../../components/HeartRateDayChart";
import MyChartsLineChart from "./MyChartsLineChart";

const getUserIdFromPatientId = async (patientId) => {
  try {
    const usersRef = firestore().collection("Users");
    const snapshot = await usersRef.where("patientId", "==", patientId).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const userId = doc.id;
      console.log("Retrieved Firebase userId:", userId);
      return userId;
    } else {
      console.log("No userId found for patientId:", patientId);
    }
  } catch (err) {
    console.error("Error fetching userId from patientId:", err);
  }
  return null;
};

const AllTrendsDashboard = ({ route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);
  const patientId = route?.params?.patientId || null;
  const selectedType = route?.params?.type || "all";

  const [hrvChartData, setHrvChartData] = useState([]);
  const [stepsChartData, setStepsChartData] = useState([]);
  const [selectedChartMode, setSelectedChartMode] = useState("week");

  const {
    heartRateTrendChartData,
    heartRateTrendCardData,
    heartRateDataStore,
    heartRateIntradayStore,
  } = useSelector((state) => state.HeartRateReducer);
  const { sleepTrendChartData, sleepTrendCardData } = useSelector(
    (state) => state.SleepReducer
  );
  const { foodTrendChartData, foodTrendCardData } = useSelector(
    (state) => state.FoodReducer
  );
  const {
    activityTrendChartData,
    activityTrendCardData,
    activityIntradayStore,
    activityDataStore,
  } = useSelector((state) => state.ActivityReducer);

  const [firebaseUserId, setFirebaseUserId] = useState(null);
  const [trendLabels, setTrendLabels] = useState(WEEK_LABELS);
  const [isLoading, setIsLoading] = useState(false);

  const staticTrendLabels = {
    heart: ["Resting", "Average", "High"],
    food: ["Calories", "Water", "Protein"],
    activity: ["Steps", "Idle", "Active"],
    hrv: ["Low", "Average",  "High"],
  };

  const safeArray = (arr, fallback = []) =>
    Array.isArray(arr) ? arr : fallback;

  const changeDateRange = async (startDate, endDate, mode) => {
    setIsLoading(true);
    setSelectedChartMode(mode);
    const uid = firebaseUserId || user.userId;
    const device = user.vendor;
    switch (mode) {
      case "week":
        setTrendLabels(WEEK_LABELS);
        break;
      case "month": {
        const days = moment(startDate).daysInMonth();
        setTrendLabels([...Array(days)].map((_, i) => i + 1));
        break;
      }
      case "year":
        setTrendLabels(YEAR_LABLES);
        break;
    }
    const totalDays = moment(endDate).diff(moment(startDate), "days") + 1;
    const generateMock = (count, unit) => {
      return Array.from({ length: count }, () =>
        unit === "HRV"
          ? 40 + Math.floor(Math.random() * 20)
          : 5000 + Math.floor(Math.random() * 4000)
      );
    };

    setHrvChartData(generateMock(totalDays, "HRV"));
    setStepsChartData(generateMock(totalDays, "steps"));

    try {
      const today = moment(endDate).format("YYYY-MM-DD");
      const prevDay = moment(endDate).subtract(1, "days").format("YYYY-MM-DD");

      if (selectedType === "heart" || selectedType === "all") {
        await getHeartRateTrendChartData(startDate, endDate, uid, device);
        await getHeartRateTrendCardData(
          today,
          prevDay,
          heartRateIntradayStore,
          heartRateDataStore,
          dispatch,
          device,
          uid,
          false
        );
      }
      if (selectedType === "sleep" || selectedType === "all") {
        await getSleepTrendChartData(startDate, endDate, user.vendor, uid).then(
          (res) => {
            console.log("Sleep Trend Chart Data:", res);
          }
        );
      }
      if (
        ["walk", "exercise", "cycling", "activity", "all"].includes(
          selectedType
        )
      ) {
        await getActivityTrendChartData(startDate, endDate, uid, user.vendor);

        await getActivityTrendCardData(
          today,
          prevDay,
          activityIntradayStore,
          activityDataStore,
          dispatch,
          user.vendor,
          uid,
          false
        );
      }
      if (["calories", "food", "all"].includes(selectedType)) {
        await dispatch(
          FoodActionCreators.getDataForFoodTrendCard(moment(startDate))
        );
        console.log("Food Trend Chart Data:", foodTrendChartData);
      }
    } catch (err) {
      console.error("Error fetching trends:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      if (!patientId) return;
      console.log("Resolving Firebase UID for patientId:", patientId);
      const resolvedUserId = await getUserIdFromPatientId(patientId);
      if (resolvedUserId) {
        console.log("Using Firebase UID:", resolvedUserId);
        setFirebaseUserId(resolvedUserId);
        const today = moment().format("YYYY-MM-DD");
        const start = moment().startOf("week").format("YYYY-MM-DD");
        const end = moment().endOf("week").format("YYYY-MM-DD");
        changeDateRange(start, end, "week");
      }
    };
    fetchUserIdAndData();
  }, [patientId]);

  // Generate mock HRV intraday data every 5 minutes from 00:00 to 23:55
  const mockHrvDayData = Array.from({ length: 288 }, (_, i) => {
    const hour = Math.floor((i * 5) / 60);
    const minute = (i * 5) % 60;
    return {
      time: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`,
      value: 40 + Math.floor(Math.random() * 20), // mock HRV values
    };
  });

  return (
    <ScreenContainer>
      <ScrollView className="space-y-10">
        {(selectedType === "heart" || selectedType === "all") && (
          <>
            {/* <Text className="text-xl font-bold mb-2">Heart Rate</Text> */}
            <TrendCardComponent
              title="Heart Rate"
              labels={trendLabels}
              lastSyncDate={null}
              date={null}
              data={
                safeArray(heartRateTrendCardData).length === 0
                  ? staticTrendLabels.heart.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(heartRateTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            <HeartRateTrend
              labels={trendLabels}
              data={safeArray(heartRateTrendChartData)}
              isLoading={isLoading}
            />
          </>
        )}

        {(selectedType === "sleep" || selectedType === "all") && (
          <>
            {/* <Text className="text-xl font-bold mt-5 mb-2">Sleep</Text> */}
            <TrendCardComponent
              title="Sleep"
              lastSyncDate={null}
              date={null}
              data={
                safeArray(sleepTrendCardData).length === 0
                  ? staticTrendLabels.heart.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(heartRateTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            <SleepTrend
              labels={trendLabels}
              data={safeArray(sleepTrendChartData)}
              isLoading={isLoading}
            />
          </>
        )}

        {(selectedType === "food" ||
          selectedType === "calories" ||
          selectedType === "all") && (
          <>
            {/* <Text className="text-xl font-bold mt-5 mb-2">Food & Calories</Text> */}
            <TrendCardComponent
              title="Food"
              lastSyncDate={null}
              date={null}
              data={
                safeArray(foodTrendCardData).length === 0
                  ? staticTrendLabels.food.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(foodTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            <FoodTrends
              labels={trendLabels}
              data={safeArray(foodTrendChartData, [[0, 0, 0, 0]])}
            />
          </>
        )}

        {["walk", "exercise", "cycling", "activity", "all"].includes(
          selectedType
        ) && (
          <>
            {/* <Text className="text-xl font-bold mt-5 mb-2">Activity</Text> */}
            <TrendCardComponent
              title="Activity"
              lastSyncDate={null}
              date={null}
              data={
                safeArray(activityTrendCardData).length === 0
                  ? staticTrendLabels.activity.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(activityTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            <ActivityTrends
              labels={trendLabels}
              data={safeArray(activityTrendChartData)}
              isLoading={isLoading}
            />
          </>
        )}

        {selectedType === "hrv" && (
          <>
            {/* <Text className="text-xl font-bold mt-5 mb-2">
              Heart Rate Variability
            </Text> */}
            <TrendCardComponent
              title="HRV"
              lastSyncDate={null}
              date={null}
              data={
                safeArray(heartRateTrendCardData).length === 0
                  ? staticTrendLabels.hrv.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(heartRateTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            {/* <HeartRateTrend
              labels={WEEK_LABELS} 
              data={Array(7)
                .fill(null)
                .map(() => [
                  42 + Math.floor(Math.random() * 5), // resting
                  50 + Math.floor(Math.random() * 10), // min
                  60 + Math.floor(Math.random() * 20), // max
                ])}
              isLoading={false}
            /> */}
            {/* <HeartRateDayChart chartData={mockHrvDayData} isLoading={false} /> */}
            <MyChartsLineChart
              data={hrvChartData}
              unit="HRV"
              mode={selectedChartMode}
            />
          </>
        )}

        {selectedType === "steps" && (
          <>
            {/* <Text className="text-xl font-bold mt-5 mb-2">Steps</Text> */}
            <TrendCardComponent
              title="Steps"
              lastSyncDate={null}
              date={null}
              data={
                safeArray(activityTrendCardData).length === 0
                  ? staticTrendLabels.hrv.map((label) => ({
                      title: label,
                      value: "-",
                      arrow: "caretdown",
                      color: "#D4d4d4",
                    }))
                  : safeArray(activityTrendCardData)
              }
            />
            <CustomTrendDatePicker
              isDataLoading={isLoading}
              changeDateRange={changeDateRange}
            />
            <MyChartsLineChart
              data={stepsChartData}
              unit="steps"
              mode={selectedChartMode}
            />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default AllTrendsDashboard;
