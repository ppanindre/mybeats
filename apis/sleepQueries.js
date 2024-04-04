import firestore from "@react-native-firebase/firestore";
import { firebaseCollections } from "../constants/firebaseCollections";
import { SleepActionTypes } from "../store/SleepReducer/SleepActionTypes";
import moment from "moment";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";
import { WEEK_LABELS, YEAR_LABLES } from "../constants/dateConstants";

export const getSleepData = async (
  queryDate,
  sleepDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  // check if heart rate data store has the data already
  if (sleepDataStore[queryDate] && !forceDataForToday) {
    return sleepDataStore[queryDate];
  }

  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  if (snap.exists) {
    const data = snap.data();
    const details = data.details.map((value) => {
      const dataTime = moment(value.time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "minute"
      );

      return {
        x: dataTime,
        y: parseInt(value.sleepType),
      };
    });

    dispatch({
      type: SleepActionTypes.SET_NEW_SLEEP_DATA,
      payload: {
        sleepData: {
          ...data,
          details: details,
        },
        date: queryDate,
      },
    });

    return {
      ...data,
      details: details,
    };
  } else {
    dispatch({
      type: SleepActionTypes.SET_NEW_SLEEP_DATA,
      payload: {
        sleepData: {
          details: [],
        },
        date: queryDate,
      },
    });
    return {
      details: [],
    };
  }
};

export const getSleepTrendCardData = async (
  queryDate,
  prevQueryDate,
  sleepDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  const YELLOW_COLOR = "#FFEF00";
  const ARROW_UP = "caretup";
  const ARROW_DOWN = "caretdown";
  const GREY_COLOR = "#D4d4d4";

  const currentDayActivity = await getSleepData(
    queryDate,
    sleepDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );

  const previousDayActivity = await getSleepData(
    prevQueryDate,
    sleepDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );

  let currentSteps = currentDayActivity?.deep ?? "-";
  let previousSteps = previousDayActivity.deep;
  let currentSedantary =
    (currentDayActivity?.totalTimeInBed ?? 0) -
      (currentDayActivity?.wake ?? 0) ?? "-";
  let previousWater =
    previousDayActivity.totalTimeInBed - previousDayActivity.wake;
  let currentLight = currentDayActivity?.light ?? "-";
  let previousLight = previousDayActivity.light;
  let trendBarColor = "";

  if (currentSedantary == 0) {
    currentSedantary = "-";
  }

  if (currentSteps == 0) {
    currentSteps = "-";
  }

  if (currentLight == 0) {
    currentLight = "-";
  }

  const deepColor =
    currentSteps == "-"
      ? GREY_COLOR
      : currentSteps <= 60
      ? "red"
      : currentSteps > 60 && currentSteps <= 90
      ? YELLOW_COLOR
      : "green";
  const listColor =
    currentLight == "-"
      ? GREY_COLOR
      : currentLight < 180
      ? "red"
      : currentLight > 180 && currentLight < 240
      ? YELLOW_COLOR
      : "green";
  const totalColor =
    currentSedantary == "-"
      ? GREY_COLOR
      : currentSedantary > 480
      ? "green"
      : currentSedantary < 480 && currentSedantary >= 360
      ? YELLOW_COLOR
      : "red";

  if (deepColor == "red" || listColor == "red" || totalColor == "red") {
    trendCardBar = "red";
  } else if (
    deepColor == YELLOW_COLOR ||
    listColor == YELLOW_COLOR ||
    totalColor == YELLOW_COLOR
  ) {
    trendCardBar = YELLOW_COLOR;
  } else {
    trendCardBar = "green";
  }

  return [
    {
      title: "Deep",
      value: currentSteps == "-" ? currentSteps : `${currentSteps} mins`,
      arrow:
        previousSteps == "-"
          ? ARROW_DOWN
          : currentSteps > previousSteps
          ? ARROW_UP
          : ARROW_DOWN,
      color: deepColor,
    },
    {
      title: "Light",
      value: currentLight == "-" ? currentLight : `${currentLight} mins`,
      arrow:
        currentLight == "-" || previousLight == "-"
          ? ARROW_DOWN
          : currentLight > previousLight
          ? ARROW_UP
          : ARROW_DOWN,
      color: listColor,
    },
    {
      title: "Total",
      value:
        currentSedantary == "-" ? currentSedantary : `${currentSedantary} mins`,
      arrow:
        previousWater == "-" || currentSedantary == "-"
          ? ARROW_DOWN
          : previousWater < currentSedantary
          ? ARROW_UP
          : ARROW_DOWN,
      color: totalColor,
    },
    {
      trendCardBarColor: currentSedantary == "-" ? GREY_COLOR : trendCardBar,
    },
  ];
};

export const getSleepTrendChartData = async (
  startDate,
  endDate,
  currentActiveDevice,
  userId,
) => {
  let dayCounter = 0;
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
  let label = [];
  let groupMonthly = false;

  await fetchMultipleDcoumentsById(
    ids,
    firebaseCollections.USER_COLLECTION,
    {
      doc: userId,
      subcollection: firebaseCollections.SLEEP_SUBCOLLECTION,
    },
    currentActiveDevice
  ).then((docData) => {
    //creating lables based on month, year or week selection
    if (dayCounter == 6) {
      label = WEEK_LABELS;
    } else if (dayCounter >= 364) {
      label = YEAR_LABLES;
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

    docData.forEach((data) => {
      let index = 0;
      const date = moment(data.id, "YYYY-MM-DD");

      if (dayCounter == 6) {
        index = date.day();
      } else if (dayCounter >= 364) {
        index = date.month();
      } else {
        index = parseInt(date.format("DD")) - 1;
      }

      trendData.push({
        index: index,
        data: data,
      });
    });

    // console.log("trend Data", trendData)

  });

  if (trendData.length > 0) {
    trendData.sort((a, b) => a.index - b.index);
    
    // console.log("sorted trend data", trendData)
    
    const data = Array.from({ length: label.length }, () => [0, 0, 0, 0]);
    if (groupMonthly) {
      //this is going to be used only if the month is selcted.
      let grouped = trendData.reduce(
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
          totalObject[0] = totalObject[0] + (item?.data?.deep ?? 0);
          totalObject[1] = totalObject[1] + (item?.data?.light ?? 0);
          totalObject[2] = totalObject[2] + (item?.data?.rem ?? 0);
          totalObject[3] = totalObject[3] + (item?.data?.wake ?? 0);
        });

        //AVERAGE
        if (groupedList.length > 0) {
          totalObject[0] = totalObject[0] / (groupedList?.length ?? 1) ?? 0;
          totalObject[1] = totalObject[1] / (groupedList?.length ?? 1) ?? 0;
          totalObject[2] = totalObject[2] / (groupedList?.length ?? 1) ?? 0;
          totalObject[3] = totalObject[3] / (groupedList?.length ?? 1) ?? 0;
        }

        data[key] = totalObject;
      });
    } else {
      trendData.forEach((trends) => {
        data[trends.index] = [
          (trends.data?.deep ?? 0) || 0,
          (trends.data?.light ?? 0) || 0,
          (trends.data?.rem ?? 0) || 0,
          (trends.data?.wake ?? 0) || 0,
        ];
      });
    }

    return data;
  }
};


export const getSleepDisplayData = async (
  queryDate,
  prevQueryDate,
  nextQueryDate,
  activeDevice,
  user
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);
  prevQueryDate = prevQueryDate.concat(`-${activeDevice}`);
  nextQueryDate = nextQueryDate.concat(`-${activeDevice}`);

  const querySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  const prevQuerySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(prevQueryDate)
    .get();

  const nextQuerySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(nextQueryDate)
    .get();

  // labels
  const labels = [];

  let offset = 0;

  if (querySnap.exists) {
    // Get current sleep data
    const currentSleepData = querySnap.data().details;

    if (nextQuerySnap.exists) {
      let isRemoved = false;

      // get next day sleep data
      const nextDaySleepData = nextQuerySnap.data().details;

      for (let i = currentSleepData.length - 1; i > 0; i--) {
        const timeDiff = moment(currentSleepData[i].time, "HH:mm:ss").diff(
          moment(currentSleepData[i - 1].time, "HH:mm:ss"),
          "seconds"
        );

        if (timeDiff > 3600) {
          const moment1 = moment(
            currentSleepData[currentSleepData.length - 1].time,
            "HH:mm:ss"
          );
          const moment2 = moment(nextDaySleepData[0].time, "HH:mm:ss");

          const currentNextTimeDiff =
            24 * 3600 - moment1.diff(moment2, "seconds");

          if (currentNextTimeDiff <= 3600) {
            currentSleepData.splice(i);
          }

          isRemoved = true;
          break;
        }
      }
    }

    // console.log("current sleep data", currentSleepData)

    labels[0] = currentSleepData[0].time;
    labels[1] = currentSleepData[currentSleepData.length - 1].time;

    // console.log("label 1", labels[0]);
    // console.log("label 2", labels[1]);

    const tempDetails = currentSleepData.map((value) => {
      const dataTime = moment(value.time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "minute"
      );

      return {
        x: dataTime,
        y: parseInt(value.sleepType),
      };
    });

    const uniqueXValues = new Set();
    const currentDetails = [];

    // console.log("current sleep", currentDetails);

    for (const obj of tempDetails) {
      if (!uniqueXValues.has(obj.x)) {
        uniqueXValues.add(obj.x);
        currentDetails.push(obj);
      }
    }

    currentDetails.sort((a, b) => a.x - b.x);

    const resultSleep = [];
    let startIndex = 0;
    let endIndex = currentDetails.length;

    for (let i = currentDetails.length - 1; i > 0; i--) {
      if (currentDetails[i].x - currentDetails[i - 1].x >= 120) {
        startIndex = i;
        resultSleep.unshift(currentDetails.slice(startIndex, endIndex));
        endIndex = startIndex;
      }
    }

    resultSleep.unshift(currentDetails.slice(0, endIndex));

    if (prevQuerySnap.exists) {
      const prevDaySleepData = prevQuerySnap.data().details;

      const moment1 = moment(
        prevDaySleepData[prevDaySleepData.length - 1].time,
        "HH:mm:ss"
      );
      const moment2 = moment(currentSleepData[0].time, "HH:mm:ss");

      const timeDiff = 24 * 3600 - moment1.diff(moment2, "seconds");

      if (timeDiff <= 7200) {
        for (let i = prevDaySleepData.length - 1; i > 0; i--) {
          const prevDayTimeDiff = moment(
            prevDaySleepData[i].time,
            "HH:mm:ss"
          ).diff(moment(prevDaySleepData[i - 1].time, "HH:mm:ss"), "seconds");

          if (prevDayTimeDiff > 7200) {
            const prevDaySlice = prevDaySleepData.slice(i);

            labels[0] = prevDaySlice[0].time;
            labels[1] = currentSleepData[currentSleepData.length - 1].time;

            const prevDetails = prevDaySlice.map((value) => {
              const dataTime =
                moment(value.time, "HH:mm:ss").diff(
                  moment().startOf("d"),
                  "minute"
                ) - 1440;

              return {
                x: dataTime,
                y: parseInt(value.sleepType),
              };
            });

            offset = prevDetails[0].x * -1;

            resultSleep[0].unshift(...prevDetails);

            const modifiedCurrentDetails = resultSleep[0].map((data) => ({
              x: data.x + offset,
              y: data.y,
            }));

            resultSleep[0] = modifiedCurrentDetails;

            return {
              currentSleepDisplayData: resultSleep,
              labels,
              isPrevDataAppended: true,
            };
          }
        }

        labels[0] = prevDaySleepData[0].time;
        labels[1] = currentSleepData[currentSleepData.length - 1].time;

        const prevDetails = prevDaySleepData.map((value) => {
          const dataTime =
            moment(value.time, "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            ) - 1440;

          return {
            x: dataTime,
            y: parseInt(value.sleepType),
          };
        });

        offset = prevDetails[0].x * -1;

        resultSleep[0].unshift(...prevDetails);

        const modifiedCurrentDetails = resultSleep[0].map((data) => ({
          x: data.x + offset,
          y: data.y,
        }));

        resultSleep[0] = modifiedCurrentDetails;

        return {
          currentSleepDisplayData: resultSleep,
          labels,
          isPrevDataAppended: true,
        };
      }
    }

    return { currentSleepDisplayData: resultSleep, labels };
  } else {
    return { currentSleepDisplayData: [], labels: ["00:00:00", "6:00:00"] };
  }
};

export const getFitbitSleepDisplayData = async (
  queryDate,
  activeDevice,
  user
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  const querySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  // labels
  const labels = [];
  let prevSleepData = [];

  if (querySnap.exists) {
    const currentSleepData = querySnap.data().details;

    for (let i = 0; i < currentSleepData.length - 1; i++) {
      const currentTime = new Date(`1970-01-01T${currentSleepData[i].time}`);
      const nextTime = new Date(`1970-01-01T${currentSleepData[i + 1].time}`);

      if (currentTime > nextTime) {
        prevSleepData = currentSleepData.slice(0, i + 1);
        currentSleepData.splice(0, i + 1);
        break;
      }
    }

    labels[0] =
      prevSleepData.length > 0
        ? prevSleepData[0].time
        : currentSleepData[0].time;
    labels[1] = currentSleepData[currentSleepData.length - 1].time;

    let prevDetails = [];

    if (prevSleepData.length > 0) {
      prevDetails = prevSleepData.map((value) => {
        const dataTime =
          moment(value.time, "HH:mm:ss").diff(moment().startOf("d"), "second") -
          86400;

        return {
          x: dataTime,
          y: parseInt(value.sleepType),
        };
      });
    }

    const currentDetails = currentSleepData.map((value) => {
      const dataTime = moment(value.time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "second"
      );

      return {
        x: dataTime,
        y: parseInt(value.sleepType),
      };
    });

    currentDetails.unshift(...prevDetails);

    let offset = prevDetails.length > 0 ? prevDetails[0].x * -1 : 0;

    const modifiedCurrentDetails = [
      currentDetails.map((data) => ({
        x: data.x + offset,
        y: data.y,
      })),
    ];

    return {
      currentSleepDisplayData: modifiedCurrentDetails,
      labels,
      isPrevDataAppended: prevDetails.length > 0,
    };
  } else {
    return {
      currentSleepDisplayData: [],
      labels: ["00:00:00", "6:00:00"],
    };
  }
};

export const getGarminSleepDisplayData = async (
  queryDate,
  activeDevice,
  user
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);

  const querySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  // Labels
  const labels = [];

  let prevDaySleepData = [];

  if (querySnap.exists) {
    const currentSleepData = querySnap.data().details;

    const sortedSleepDataBasedOnTime = currentSleepData.sort((a, b) =>
      moment(a.time, "HH:mm:ss").diff(moment(b.time, "HH:mm:ss"))
    );

    let splicedIndex;

    let prevDaySleepData = [];
    let currentDaySleepData = [];

    // console.log("sorted sleep data", sortedSleepDataBasedOnTime)

    for (let i = 0; i < sortedSleepDataBasedOnTime.length; i++) {
      const moment2 = moment("00:00:00", "HH:mm:ss");
      const moment1 = moment(sortedSleepDataBasedOnTime[i].time, "HH:mm:ss");
      const timeDiff = moment1.diff(moment2, "hours");

      if (timeDiff >= 21) {
        currentDaySleepData = sortedSleepDataBasedOnTime.slice(0, i);
        prevDaySleepData = sortedSleepDataBasedOnTime.slice(i);

        break;
      }
    }

    // Set current day sleep data if there is no prev day sleep data
    if (currentDaySleepData.length === 0) {
      currentDaySleepData = currentSleepData;
    }

    // Set Labels
    labels[0] =
      prevDaySleepData.length > 0
        ? prevDaySleepData[0].time
        : currentDaySleepData[0].time;
    labels[1] = currentDaySleepData[currentDaySleepData.length - 1].time;

    // Find offset in merged data

    let prevDetails = [];

    if (prevDaySleepData.length > 0) {
      prevDetails = prevDaySleepData.map((value) => {
        const dataTime =
          moment(value.time, "HH:mm:ss").diff(moment().startOf("d"), "second") -
          86400;

        return {
          x: dataTime,
          y: parseInt(value.sleepType),
        };
      });
    }

    const currentDetails = currentDaySleepData.map((value) => {
      const dataTime = moment(value.time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "second"
      );

      return {
        x: dataTime,
        y: parseInt(value.sleepType),
      };
    });

    currentDetails.unshift(...prevDetails);

    let offset = prevDetails.length > 0 ? prevDetails[0].x * -1 : 0;

    const modifiedCurrentDetails = [
      currentDetails.map((data) => ({
        x: data.x + offset,
        y: data.y,
      })),
    ];

    return {
      currentSleepDisplayData: modifiedCurrentDetails,
      labels,
      isPrevDataAppended: prevDetails.length > 0,
    };
  } else {
    return {
      currentSleepDisplayData: [],
      labels: ["00:00:00", "6:00:00"],
    };
  }
};

export const getGarminSleepDisplayData2 = async (
  queryDate,
  prevQueryDate,
  nextQueryDate,
  activeDevice,
  user
) => {
  queryDate = queryDate.concat(`-${activeDevice}`);
  prevQueryDate = prevQueryDate.concat(`-${activeDevice}`);
  nextQueryDate = nextQueryDate.concat(`-${activeDevice}`);

  const querySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  const prevQuerySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(prevQueryDate)
    .get();

  const nextQuerySnap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(user)
    .collection(firebaseCollections.SLEEP_SUBCOLLECTION)
    .doc(nextQueryDate)
    .get();

  // labels
  const labels = [];

  let offset = 0;

  if (querySnap.exists) {
    // Get current sleep data
    const unsortedCurrentSleepData = querySnap.data().details;

    const currentSleepData = unsortedCurrentSleepData.sort((a, b) =>
      moment(a.time, "HH:mm:ss").diff(moment(b.time, "HH:mm:ss"))
    );

    if (nextQuerySnap.exists) {
      let isRemoved = false;

      // get next day sleep data
      const unsortedNextDaySleepData = nextQuerySnap.data().details;

      const nextDaySleepData = unsortedNextDaySleepData.sort((a, b) =>
        moment(a.time, "HH:mm:ss").diff(moment(b.time, "HH:mm:ss"))
      );

      for (let i = currentSleepData.length - 1; i > 0; i--) {
        const timeDiff = moment(currentSleepData[i].time, "HH:mm:ss").diff(
          moment(currentSleepData[i - 1].time, "HH:mm:ss"),
          "seconds"
        );

        if (timeDiff > 3600) {
          const moment1 = moment(
            currentSleepData[currentSleepData.length - 1].time,
            "HH:mm:ss"
          );
          const moment2 = moment(nextDaySleepData[0].time, "HH:mm:ss");

          const currentNextTimeDiff =
            24 * 3600 - moment1.diff(moment2, "seconds");

          if (currentNextTimeDiff <= 3600) {
            currentSleepData.splice(i);
          }

          isRemoved = true;
          break;
        }
      }
    }

    // console.log("current sleep data", currentSleepData)

    labels[0] = currentSleepData[0].time;
    labels[1] = currentSleepData[currentSleepData.length - 1].time;

    // console.log("label 1", labels[0]);
    // console.log("label 2", labels[1]);

    const tempDetails = currentSleepData.map((value) => {
      const dataTime = moment(value.time, "HH:mm:ss").diff(
        moment().startOf("d"),
        "minute"
      );

      return {
        x: dataTime,
        y: parseInt(value.sleepType),
      };
    });

    const uniqueXValues = new Set();
    const currentDetails = [];

    // console.log("current sleep", currentDetails);

    for (const obj of tempDetails) {
      if (!uniqueXValues.has(obj.x)) {
        uniqueXValues.add(obj.x);
        currentDetails.push(obj);
      }
    }

    currentDetails.sort((a, b) => a.x - b.x);

    const resultSleep = [];
    let startIndex = 0;
    let endIndex = currentDetails.length;

    for (let i = currentDetails.length - 1; i > 0; i--) {
      if (currentDetails[i].x - currentDetails[i - 1].x >= 120) {
        startIndex = i;
        resultSleep.unshift(currentDetails.slice(startIndex, endIndex));
        endIndex = startIndex;
      }
    }

    resultSleep.unshift(currentDetails.slice(0, endIndex));

    if (prevQuerySnap.exists) {
      const unsortedPrevDaySleepData = prevQuerySnap.data().details;

      const prevDaySleepData = unsortedPrevDaySleepData.sort((a, b) =>
        moment(a.time, "HH:mm:ss").diff(moment(b.time, "HH:mm:ss"))
      );

      const moment1 = moment(
        prevDaySleepData[prevDaySleepData.length - 1].time,
        "HH:mm:ss"
      );
      const moment2 = moment(currentSleepData[0].time, "HH:mm:ss");

      const timeDiff = 24 * 3600 - moment1.diff(moment2, "seconds");

      if (timeDiff <= 7200) {
        for (let i = prevDaySleepData.length - 1; i > 0; i--) {
          const prevDayTimeDiff = moment(
            prevDaySleepData[i].time,
            "HH:mm:ss"
          ).diff(moment(prevDaySleepData[i - 1].time, "HH:mm:ss"), "seconds");

          if (prevDayTimeDiff > 7200) {
            const prevDaySlice = prevDaySleepData.slice(i);

            labels[0] = prevDaySlice[0].time;
            labels[1] = currentSleepData[currentSleepData.length - 1].time;

            const prevDetails = prevDaySlice.map((value) => {
              const dataTime =
                moment(value.time, "HH:mm:ss").diff(
                  moment().startOf("d"),
                  "minute"
                ) - 1440;

              return {
                x: dataTime,
                y: parseInt(value.sleepType),
              };
            });

            offset = prevDetails[0].x * -1;

            resultSleep[0].unshift(...prevDetails);

            const modifiedCurrentDetails = resultSleep[0].map((data) => ({
              x: data.x + offset,
              y: data.y,
            }));

            resultSleep[0] = modifiedCurrentDetails;

            return {
              currentSleepDisplayData: resultSleep,
              labels,
              isPrevDataAppended: true,
            };
          }
        }

        labels[0] = prevDaySleepData[0].time;
        labels[1] = currentSleepData[currentSleepData.length - 1].time;

        const prevDetails = prevDaySleepData.map((value) => {
          const dataTime =
            moment(value.time, "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            ) - 1440;

          return {
            x: dataTime,
            y: parseInt(value.sleepType),
          };
        });

        offset = prevDetails[0].x * -1;

        resultSleep[0].unshift(...prevDetails);

        const modifiedCurrentDetails = resultSleep[0].map((data) => ({
          x: data.x + offset,
          y: data.y,
        }));

        resultSleep[0] = modifiedCurrentDetails;

        return {
          currentSleepDisplayData: resultSleep,
          labels,
          isPrevDataAppended: true,
        };
      }
    }

    return { currentSleepDisplayData: resultSleep, labels };
  } else {
    return { currentSleepDisplayData: [], labels: ["00:00:00", "6:00:00"] };
  }
};
