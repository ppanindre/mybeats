import firestore from "@react-native-firebase/firestore";
import { firebaseCollections } from "../constants/firebaseCollections";
import moment from "moment";
import { heartActionTypes } from "../store/HeartRateReducer/HeartRateActionTypes";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";

export const getHeartRate = async (
  queryDate,
  heartRateDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  // check if heart rate data store has the data already
  if (heartRateDataStore[queryDate] && !forceDataForToday) {
    return heartRateDataStore[queryDate];
  }

  // else fetch the data
  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.HEART_RATE_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  if (snap.exists) {
    const heartRateData = snap.data();

    dispatch({
      type: heartActionTypes.SET_HEARTRATE_DATA,
      payload: {
        heartRateData: heartRateData,
        date: queryDate,
      },
    });
    return heartRateData;
  } else {
    dispatch({
      type: heartActionTypes.SET_HEARTRATE_DATA,
      payload: {
        heartRateData: {},
        date: queryDate,
      },
    });
    return {};
  }
};

export const getHeartRateIntraday = async (
  queryDate,
  heartRateIntradayStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  // Check if heart rate data store has the data already
  if (heartRateIntradayStore[queryDate] && !forceDataForToday) {
    return heartRateIntradayStore[queryDate];
  }

  // else fetch the data
  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.HEART_RATE_SUBCOLLECTION)
    .doc(queryDate)
    .collection(firebaseCollections.INTRADAY_COLLECTION)
    .doc(firebaseCollections.INTRADAY_SUBCOLLECTION)
    .get();

  if (snap.exists) {
    const data = snap.data();
    const heartRate = data.heartRateData;
    dispatch({
      type: heartActionTypes.SET_HEARTRATE_INTRADAY_DATA,
      payload: { heartRateIntradayData: heartRate, date: queryDate },
    });
    return heartRate;
  } else {
    dispatch({
      type: heartActionTypes.SET_HEARTRATE_INTRADAY_DATA,
      payload: { heartRateIntradayData: [], date: queryDate },
    });
    return [];
  }
};

export const getHeartRateTrendCardData = async (
  queryDate,
  prevQueryDate,
  heartRateIntradayStore,
  heartRateDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  const YELLOW_COLOR = "#FFEF00";
  const ARROW_UP = "caretup";
  const ARROW_DOWN = "caretdown";
  const GREY_COLOR = "#D4d4d4";

  const currentHeartRateIntraday = await getHeartRateIntraday(
    queryDate,
    heartRateIntradayStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );
  const prevHeartRateIntraday = await getHeartRateIntraday(
    prevQueryDate,
    heartRateIntradayStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );
  const currentHeartRate = await getHeartRate(
    queryDate,
    heartRateDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );
  const prevHeartRate = await getHeartRate(
    prevQueryDate,
    heartRateDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );

  const currentHeartRateIntradayValues =
    currentHeartRateIntraday.length > 0
      ? currentHeartRateIntraday.map((data) => data.value)
      : [0, 0, 0];
  const prevHeartRateIntradayValues =
    prevHeartRateIntraday.length > 0
      ? prevHeartRateIntraday.map((data) => data.value)
      : [0, 0, 0];

  const currentAverage = currentHeartRate?.min ?? 0;
  const previousAverage = prevHeartRate?.min ?? 0;
  const currentMax = Math.floor(Math.max(...currentHeartRateIntradayValues, 0));
  const previousMax = Math.floor(Math.max(...prevHeartRateIntradayValues, 0));
  const currentResting = currentHeartRate?.resting ?? 0;
  const previousResting = prevHeartRate?.resting ?? 0;

  let isYellow = false;
  let isRed = false;
  let isGreen = false;

  if (currentResting >= 40 && currentResting <= 80) {
    isGreen = true;
    restingColor = "green";
  } else if (currentResting > 80 && currentResting <= 100) {
    isYellow = true;
    restingColor = YELLOW_COLOR;
  } else if (currentResting > 100) {
    isRed = true;
    restingColor = "red";
  } else {
    restingColor = "grey";
  }

  if (currentAverage >= 40 && currentAverage <= 100) {
    isGreen = true;
    averageColor = "green";
  } else if (currentAverage > 100 && currentAverage <= 120) {
    isYellow = true;
    averageColor = YELLOW_COLOR;
  } else if (currentAverage > 120) {
    isRed = true;
    averageColor = "red";
  } else {
    averageColor = "grey";
  }

  //average color
  if (currentAverage == "NaN" || previousAverage == "NaN") {
    //no data

    averageColor = GREY_COLOR;
  }

  if (currentMax >= 40 && currentMax <= 120) {
    isGreen = true;
    maxColor = "green";
  } else if (currentMax > 120 && currentMax <= 140) {
    isYellow = true;
    maxColor = YELLOW_COLOR;
  } else if (currentMax > 140) {
    isRed = true;
    maxColor = "red";
  } else {
    maxColor = "grey";
  }

  //max color
  if (currentMax == 0) {
    //no data
    maxColor = GREY_COLOR;
  }

  // RESTING IS 0 then min without 0

  return [
    {
      title: "Resting",
      value: currentResting == 0 ? "-" : `${currentResting} bpm`,
      arrow:
        currentResting == 0 || previousResting == 0
          ? ARROW_DOWN
          : currentResting > previousResting
          ? ARROW_UP
          : ARROW_DOWN,
      color: restingColor,
    },
    {
      title: "Average",
      value:
        currentAverage == "NaN" || currentAverage == 0
          ? "-"
          : `${currentAverage} bpm`,
      arrow:
        currentAverage == "NaN" || previousAverage == "NaN"
          ? ARROW_DOWN
          : currentAverage > previousAverage
          ? ARROW_UP
          : ARROW_DOWN,
      color: averageColor,
    },
    {
      title: "High",
      value: currentMax == 0 ? "-" : `${currentMax} bpm`,
      arrow:
        currentMax == 0 || previousMax == 0
          ? ARROW_DOWN
          : currentMax > previousMax
          ? ARROW_UP
          : ARROW_DOWN,
      color: maxColor,
    },
    {
      trendCardBarColor: isRed
        ? "red"
        : isYellow
        ? YELLOW_COLOR
        : isGreen
        ? "green"
        : GREY_COLOR,
    },
  ];
};

export const getHeartRateTrendChartData = async (
  startDate,
  endDate,
  userId,
  currentActiveDevice
) => {
  let index = 1;
  let startDateCopy = moment(startDate); // Create a copy of startDate
  let endDateMoment = moment(endDate); // Convert endDate to a moment object
  let dates = [];

  while (startDateCopy.isSameOrBefore(endDateMoment, "day")) {
    dates.push(startDateCopy.format("YYYY-MM-DD"));
    startDateCopy.add(index, "day"); // Update the copy of startDate
  }

  let chartData;
  let groupMonthly = false;

  if (dates.length > 31) {
    chartData = Array.from({ length: 12 }).map(() => [0, 0, 0]);
    groupMonthly = true;
  } else {
    chartData = Array.from({ length: dates.length }).map(() => [0, 0, 0]);
  }

  await fetchMultipleDcoumentsById(
    dates,
    firebaseCollections.USER_COLLECTION,
    {
      doc: userId,
      subcollection: firebaseCollections.HEART_RATE_SUBCOLLECTION,
    },
    currentActiveDevice
  ).then((datas) => {
    let months = [];
    datas.forEach((data) => {
      let month = moment(data.id, "YYYY-MM-DD").month();
      months.push(month);
      if (groupMonthly) {
        let newData = [0, 0, 0];
        let presentMin = chartData[month][1] ?? 0;
        let presentResting = chartData[month][0] ?? 0;
        let presentMax = chartData[month][2] ?? 0;

        newData[1] = presentMin + (data?.min ?? 0);
        newData[0] = presentResting + (data?.resting ?? 0);
        newData[2] = presentMax + (data?.max ?? 0);

        chartData[month] = newData;
      } else {
        let min = data.min ?? 0;
        let resting = data.resting ?? 0;
        let max = data.max ?? 0;
        let index = 0;

        if (dates.length <= 10) {
          index = moment(data.id, "YYYY-MM-DD").day();
        } else {
          index = moment(data.id, "YYYY-MM-DD").date();
        }

        chartData[index] = [resting, min, max];
      }
    });

    let uniqueMonths = [...new Set(months)];
    if (groupMonthly) {
      uniqueMonths.forEach((month) => {
        chartData[month][0] =
          chartData[month][0] / months.filter((x) => x == month).length;
        chartData[month][1] =
          chartData[month][1] / months.filter((x) => x == month).length;
        chartData[month][2] =
          chartData[month][2] / months.filter((x) => x == month).length;
      });
    }
  });

  return chartData;
};
