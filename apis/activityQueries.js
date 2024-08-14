import firestore from "@react-native-firebase/firestore";
import { firebaseCollections } from "../constants/firebaseCollections";
import moment from "moment";
import { activityActionTypes } from "../store/ActivityReducer/ActivityActionTypes";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";

export const getActivityData = async (queryDate, userId, deviceSelected) => {
  queryDate = queryDate.concat(`-${deviceSelected}`);

  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.ACTIVITY_SUBCOLLECTION)
    .doc(queryDate)
    .collection(firebaseCollections.INTRADAY_COLLECTION)
    .doc(firebaseCollections.INTRADAY_SUBCOLLECTION)
    .get();

  if (snap.exists) {
    const data = snap.data();

    const timeSeries = data.activities;
    const timeArray = Array.from({ length: 1440 }).map(() => 0);
    //const timeArray = Array.from({ length: 1440 }).map((value, index) => { return { x: index, y: -1 } })
    timeSeries.forEach((data) => {
      const time = data.time;
      const value = data.level + 1;
      //get the index in timeArray from the time.
      const index = moment(time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "minute"
      );
      timeArray[index] = value;
    });

    return timeArray;
  } else {
    return [];
  }
};

export const getActivity = async (
  queryDate,
  activityDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  // check if heart rate data store has the data already
  if (activityDataStore[queryDate] && !forceDataForToday) {
    return activityDataStore[queryDate];
  }

  // else fetch the data
  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.ACTIVITY_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  if (snap.exists) {
    const activityData = snap.data();

    dispatch({
      type: activityActionTypes.SET_ACTIVITY_DATA,
      payload: {
        activityData: activityData,
        date: queryDate,
      },
    });
    return activityData;
  } else {
    dispatch({
      type: activityActionTypes.SET_ACTIVITY_DATA,
      payload: {
        activityData: {},
        date: queryDate,
      },
    });
    return {};
  }
};

export const getActivityIntraday = async (
  queryDate,
  activityIntradayStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  // Check if heart rate data store has the data already
  if (activityIntradayStore[queryDate] && !forceDataForToday) {
    return activityIntradayStore[queryDate];
  }

  // else fetch the data
  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.ACTIVITY_SUBCOLLECTION)
    .doc(queryDate)
    .collection(firebaseCollections.INTRADAY_COLLECTION)
    .doc(firebaseCollections.INTRADAY_SUBCOLLECTION)
    .get();

  if (snap.exists) {
    const data = snap.data();
    const activity = data.activities;

    dispatch({
      type: activityActionTypes.SET_ACTIVITY_INTRADAY_DATA,
      payload: { activityIntradayData: activity, date: queryDate },
    });
    return activity;
  } else {
    dispatch({
      type: activityActionTypes.SET_ACTIVITY_INTRADAY_DATA,
      payload: { activityIntradayData: [], date: queryDate },
    });
    return [];
  }
};

export const getActivityTrendCardData = async (
  queryDate,
  prevQueryDate,
  activityIntradayStore,
  activityDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  const YELLOW_COLOR = "#FFEF00";
  const ARROW_UP = "caretup";
  const ARROW_DOWN = "caretdown";
  const GREY_COLOR = "#D4d4d4";
  const DAY_ACTIVITY_MINUTES = 60 * 16;

  let showGrey = false;

  const currentActivity = await getActivity(
    queryDate,
    activityDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );
  const prevActivity = await getActivity(
    prevQueryDate,
    activityDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );

  let currentSteps = currentActivity?.steps ?? 0;
  let previousSteps = prevActivity?.steps ?? 0;
  let currentSedantary = currentActivity?.sedentaryMinutes ?? 0;
  let previousMinutes = prevActivity?.sedentaryMinutes ?? 0;
  let currentLight = currentActivity?.fairlyActiveMinutes ?? 0;
  let previousLight = prevActivity?.fairlyActiveMinutes ?? 0;
  let trendCardBar = "green";
  let activeTime =
    currentLight +
    (currentActivity?.lightlyActiveMinutes ?? 0) +
    (currentActivity?.veryActiveMinutes ?? 0);
  let previousActiveTime =
    previousLight +
    (prevActivity?.lightlyActiveMinutes ?? 0) +
    (prevActivity?.veryActiveMinutes ?? 0);
  let sedcolor = "green";
  let actColor = "green";

  if ((currentSedantary) > 0.5 * DAY_ACTIVITY_MINUTES) {
    sedcolor = "red";
    actColor = "red";
  } else if (
    currentSedantary > 0.25 * DAY_ACTIVITY_MINUTES &&
    currentSedantary < 0.4 * DAY_ACTIVITY_MINUTES
  ) {
    sedcolor = YELLOW_COLOR;
    actColor = YELLOW_COLOR;
  } else {
    sedcolor = "green";
    actColor = "green";
  }
  const stepsColor =
    currentSteps == 0 || showGrey
      ? GREY_COLOR
      : currentSteps >= 10000
      ? "green"
      : currentSteps < 10000 && currentSteps > 7500
      ? YELLOW_COLOR
      : "red";
  // TODO color calculation
  const sedantaryColor = currentSedantary == 0 ? GREY_COLOR : sedcolor;
  const activeColor = activeTime == 0 ? GREY_COLOR : actColor;

  if (currentSedantary == 0) {
    trendCardBar = GREY_COLOR;
  } else {
    if (
      stepsColor == "red" ||
      sedantaryColor == "red" ||
      activeColor == "red"
    ) {
      trendCardBar = "red";
    } else if (
      stepsColor == YELLOW_COLOR ||
      sedantaryColor == YELLOW_COLOR ||
      activeColor == YELLOW_COLOR
    ) {
      trendCardBar = YELLOW_COLOR;
    } else {
      trendCardBar = "green";
    }
  }


  return [
    {
      title: "Steps",
      value: currentSteps == 0 ? "-" : currentSteps,
      arrow:
        currentSteps == 0 || previousSteps == 0
          ? ARROW_DOWN
          : currentSteps > previousSteps
          ? ARROW_UP
          : ARROW_DOWN,
      color: stepsColor,
    },
    {
      title: "Idle",
      value: currentSedantary == 0 ? "-" : `${currentSedantary} mins`,
      arrow:
        currentSedantary == 0 || previousMinutes == 0
          ? ARROW_DOWN
          : previousMinutes < currentSedantary
          ? ARROW_UP
          : ARROW_DOWN,
      color: sedantaryColor,
    },
    {
      title: "Active",
      value: activeTime == 0 || activeTime == "-" ? "-" : `${activeTime} mins`,
      arrow:
        activeTime == 0 || previousActiveTime == 0
          ? ARROW_DOWN
          : activeTime > previousActiveTime
          ? ARROW_UP
          : ARROW_DOWN,
      color: activeColor,
    },
    {
      trendCardBarColor: trendCardBar,
    },
  ];
};

export const getActivityTrendChartData = async (
  startDate,
  endDate,
  userId,
  currentActiveDevice
) => {
  const WEEK_LABLES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dayCounter = 0;
  let activityTrendData= [];
  const ids = [];
  //construct all the ids between startDate and endDate
  let start = moment(startDate);
  let end = moment(endDate);

  while (start.toDate().toString() != end.toDate().toString()) {
    ids.push(end.format("YYYY-MM-DD"));
    end = end.subtract(1, "d");
    dayCounter += 1;
  }
  ids.push(start.format("YYYY-MM-DD"));
  const trendData = [];

  //fetch all documents whose dates are present.
  await fetchMultipleDcoumentsById(
    ids,
    firebaseCollections.USER_COLLECTION,
    { doc: userId, subcollection: firebaseCollections.ACTIVITY_SUBCOLLECTION },
    currentActiveDevice
  ).then((docData) => {
    let label = [];
    let groupMonthly = false;

    //creating lables based on month, year or week selection
    if (dayCounter == 6) {
      label = WEEK_LABLES;
    } else if (dayCounter >= 363) {
      label = [
        "Jan ",
        "Feb ",
        "Mar ",
        "Apr ",
        "May ",
        "Jun ",
        "Jul ",
        "Aug ",
        "Sep ",
        "Oct ",
        "Nov ",
        "Dec ",
      ];
      groupMonthly = true;
    } else {
      if (docData[0]?.id) {
        label = Array(
          moment(docData[0]?.id ?? null, "YYYY-MM-DD").daysInMonth()
        )
          .fill()
          .map((_, i) => i + 1);
      } else {
        label = Array(30)
          .fill()
          .map((_, i) => i + 1);
      }
    }
    //construst trend object that will be used to create the chart
    docData
      ?.forEach((data) => {
        let index = 0;
        const date = moment(data.id, "YYYY-MM-DD");

        if (dayCounter == 6) {
          index = date.day();
        } else if (dayCounter >= 363) {
          index = date.month();
        } else {
          index = parseInt(date.format("DD")) - 1;
        }

        trendData.push({
          index: index,
          data: data,
        });

        //sort array based on
        if (trendData.length > 0) {
          trendData.sort((a, b) => a.index - b.index);
          const {chartData, labels} = constructTrendChartData(trendData, label, groupMonthly);
          activityTrendData = chartData
        } else {
          activityTrendData = []
          //no data found          
          // setTrendsLabel(label);
        }
      })      
  }).catch(error => {
    console.log("error trend data", error)
  })

  return activityTrendData
};

const constructTrendChartData = (trendsData, label, groupMonthly = false) => {
  const data = Array.from({ length: label.length }, () => [0, 0, 0, 0]);

  if (groupMonthly) {
    //this is going to be used only if the year is selcted.
    let grouped = trendsData.reduce(
      (hash, obj) => ({
        ...hash,
        [obj["index"]]: (hash[obj["index"]] || []).concat(obj),
      }),
      {}
    );
    Object.keys(grouped).forEach((key) => {
      const groupedList = grouped[key];
      const totalObject = [0, 0, 0, 0];

      groupedList.forEach((item) => {
        totalObject[3] =
          totalObject[3] + (item?.data?.veryActiveMinutes ?? 0);
        totalObject[2] =
          totalObject[2] + (item?.data?.fairlyActiveMinutes ?? 0);
        totalObject[1] =
          totalObject[1] + (item?.data?.lightlyActiveMinutes ?? 0);
        totalObject[0] = totalObject[0] + (item?.data?.sedentaryMinutes ?? 0);
      });

      //AVERAGE
      if (groupedList.length > 0) {
        totalObject[0] = totalObject[0] / groupedList.length ?? 0;
        totalObject[1] = totalObject[1] / groupedList.length ?? 0;
        totalObject[2] = totalObject[2] / groupedList.length ?? 0;
        totalObject[3] = totalObject[3] / groupedList.length ?? 0;
      }

      data[key] = totalObject;
    });
  } else {
    trendsData.forEach((trends) => {
      let veryActiveMinutes = (trends?.data?.veryActiveMinutes || 0) ?? 0;
      let fairlyActiveMinutes = (trends?.data?.fairlyActiveMinutes || 0) ?? 0;
      let lightlyActiveMinutes =
        (trends?.data?.lightlyActiveMinutes || 0) ?? 0;
      let sedentaryMinutes = (trends?.data?.sedentaryMinutes || 0) ?? 0;
      data[trends.index] = [
        sedentaryMinutes ?? 0,
        lightlyActiveMinutes ?? 0,
        fairlyActiveMinutes ?? 0,
        veryActiveMinutes ?? 0,
      ];
    });
  }

  return {chartData: data, labels: label}
};
