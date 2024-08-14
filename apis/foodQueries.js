import firestore from "@react-native-firebase/firestore";

import { firebaseCollections } from "../constants/firebaseCollections";
import { foodActionTypes } from "../store/FoodReducer/FoodActionTypes";
import moment from "moment";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";

export const getFoodData = async (
  queryDate,
  foodDataStore,
  dispatch,
  userId,
  forceDataForToday
) => {
  // Check if the food data store has food already
  if (foodDataStore[queryDate] && !forceDataForToday) {
    return foodDataStore[queryDate];
  }

  // If food data is not present in the food store, then fetch it from firebase
  // get the snapshot of the food data for that particular day
  const snap = await firestore()
    .collection(firebaseCollections.USER_COLLECTION)
    .doc(userId)
    .collection(firebaseCollections.FOOD_SUBCOLLECTION)
    .doc(queryDate)
    .get();

  // if the snapshot of the food data exists, dispatch that data to the food store and return it to the Food Screen 
  if (snap.exists) {
    // get the food data
    const foodData = snap.data();

    // dispatch this food data to the food store for the query date
    dispatch({
      type: foodActionTypes.SET_FOOD_DATA,
      payload: { foodData: foodData, date: queryDate },
    });

    // return this data to render it on the food screen
    return foodData;
  } else {

    // if the snapshot did not exist which means there is no food data for that date
    // dispatch an empty array of food data
    dispatch({
      type: foodActionTypes.SET_FOOD_DATA,
      payload: { foodData: [], date: queryDate },
    });

    // return an empty data array to the food screen
    return [];
  }
};

export const getFoodTrendCard = async (
  queryDate,
  prevQueryDate,
  foodDataStore,
  dispatch,
  activeDevice,
  userId,
  forceDataForToday
) => {
  let showGrey = false;
  const current = moment().startOf("d").format("YYYY-MM-DD");
  if (current == queryDate) {
    showGrey = true;
  }

  let currentDayFood = await getFoodData(
    queryDate,
    foodDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );
  let previousDayFood = await getFoodData(
    prevQueryDate,
    foodDataStore,
    dispatch,
    activeDevice,
    userId,
    forceDataForToday
  );

  let currentCalories = currentDayFood?.calories ?? "-";
  let previousCalories = previousDayFood?.calories ?? "-";
  let currentWater = currentDayFood?.water ?? "-";
  let previousWater = previousDayFood?.water ?? "-";
  let currentProtein = currentDayFood?.protein ?? "-";
  let prevProtein = previousDayFood?.protein ?? "-";
  let calorieFactor =
    currentCalories ?? "-" ? 0 : currentCalories / CALORIE_REQUIREMENT;

  let proteinColor = "";
  let calorieColor = "";
  let waterColor = "";
  let trendbarColor = "";

  const YELLOW_COLOR = "#FFEF00";
  const ARROW_UP = "caretup";
  const ARROW_DOWN = "caretdown";
  const CALORIE_REQUIREMENT = 2000;
  const GREY_COLOR = "#D4d4d4";

  const categorizedCal = Math.max(
    (currentDayFood?.calories ?? 0) - (currentDayFood?.uncategorized ?? 0),
    0
  );

  const proteinCal = currentProtein == "-" ? 0 : currentProtein * 4;

  if (proteinCal == 0) {
    proteinColor = GREY_COLOR;
  } else if (
    proteinCal > 0.15 * categorizedCal &&
    proteinCal < 0.3 * categorizedCal
  ) {
    proteinColor = "green";
  } else if (
    proteinCal > 0.35 * categorizedCal ||
    proteinCal < 0.1 * categorizedCal
  ) {
    proteinColor = "red";
  } else {
    proteinColor = YELLOW_COLOR;
  }

  if (showGrey) {
    calorieColor = GREY_COLOR;
    waterColor = GREY_COLOR;
    trendbarColor = proteinColor;
  } else {
    calorieColor =
      currentCalories == "-"
        ? GREY_COLOR
        : calorieFactor < 0.5
        ? "red"
        : calorieFactor > 1.5
        ? "red"
        : calorieFactor > 0.7 && calorieFactor < 1.3
        ? "green"
        : calorieFactor
        ? YELLOW_COLOR
        : GREY_COLOR;
    waterColor =
      currentWater == "-"
        ? GREY_COLOR
        : currentWater < 50
        ? "red"
        : currentWater > 50 && currentWater < 70
        ? "yellow"
        : "green";

    if (
      calorieColor == GREY_COLOR &&
      waterColor == GREY_COLOR &&
      proteinColor == GREY_COLOR
    ) {
      trendbarColor = GREY_COLOR;
    } else if (
      calorieColor == "red" ||
      waterColor == "red" ||
      proteinColor == "red"
    ) {
      trendbarColor = "red";
    } else if (
      calorieColor == "yellow" ||
      waterColor == "yellow" ||
      proteinColor == "yellow"
    ) {
      trendbarColor = "yellow";
    } else {
      trendbarColor = "red";
    }
  }

  return [
    {
      title: "Calories",
      value:
        currentCalories == "-" || currentCalories == 0
          ? "-"
          : `${currentCalories}`,
      arrow:
        currentCalories == "-" || previousCalories == "-"
          ? ARROW_DOWN
          : currentCalories > previousCalories
          ? ARROW_UP
          : ARROW_DOWN,
      color: calorieColor,
    },
    {
      title: "Water",
      value:
        currentWater == "-" || currentWater == 0 ? "-" : `${currentWater} oz`,
      arrow:
        currentWater == "-" || previousWater == "-"
          ? ARROW_DOWN
          : previousWater > currentWater
          ? ARROW_UP
          : ARROW_DOWN,
      color: waterColor,
    },
    {
      title: "Protein",
      value:
        currentProtein == "-" || currentProtein == 0
          ? "-"
          : `${currentProtein} g`,
      arrow:
        currentProtein == "-" || prevProtein == "-"
          ? ARROW_DOWN
          : currentProtein >= prevProtein
          ? ARROW_UP
          : ARROW_DOWN,
      color: currentProtein == "-" ? GREY_COLOR : proteinColor,
    },
    {
      trendCardBarColor: trendbarColor,
    },
  ];
};

export const getFoodTrendChartData = async (
  startDate,
  endDate,
  userId,
  activeDevice
) => {
  let startFormat = moment(startDate);
  let endFormat = moment(endDate);
  let index = 1;
  let ids = [];

  while (startFormat.isSameOrBefore(endFormat, "day")) {
    ids.push(startFormat.format("YYYY-MM-DD"));
    startFormat.add(index, "day"); // Update the copy of startDate
  }


  let chartData = [];

  if (ids.length > 31) {
    chartData = Array.from({ length: 12 }).map(() => [0, 0, 0]);
  } else {
    chartData = Array.from({ length: ids.length }).map(() => [0, 0, 0]);
  }

  let dataPresent = false;

  if (ids.length > 360) {
    chartData = Array.from({ length: 12 }).map(() => [0, 0, 0, 0]);
  } else {
    chartData = Array.from({ length: ids.length }).map(() => [0, 0, 0, 0]);
  }

  await fetchMultipleDcoumentsById(ids, firebaseCollections.USER_COLLECTION, {
    doc: userId,
    subcollection: firebaseCollections.FOOD_SUBCOLLECTION,
    activeDevice
  }).then((datas) => {
    let months = [];
    let groupMonthly = false;
    datas.forEach((data) => {
      dataPresent = true;

      //yearly data
      if (ids.length > 300) {
        groupMonthly = true;
        let month = moment(data.id, "YYYY-MM-DD").month();
        months.push(month);
        let newData = [0, 0, 0, 0];
        let presentCarbs = chartData[month][1] ?? 0;
        let presentProtein = chartData[month][2] ?? 0;
        let presentFat = chartData[month][3] ?? 0;
        let presentUncat = chartData[month][0] ?? 0;
        let carbs = data.carbs ?? 0;
        let protein = data.protein ?? 0;
        let fat = data.fat ?? 0;
        let uncat = data.uncategorized ?? 0;

        if (presentCarbs && carbs) {
          newData[1] = presentCarbs + carbs;
        } else {
          newData[1] = Math.max(presentCarbs ?? 0, carbs ?? 0);
        }

        if (presentProtein && protein) {
          newData[2] = presentProtein + protein;
        } else {
          newData[2] = Math.max(presentProtein ?? 0, protein ?? 0);
        }

        if (presentFat && fat) {
          newData[3] = presentFat + fat;
        } else {
          newData[3] = Math.max(presentFat ?? 0, fat ?? 0);
        }

        if (presentUncat && uncat) {
          newData[0] = presentUncat + uncat;
        } else {
          newData[0] = Math.max(presentUncat ?? 0, uncat ?? 0);
        }

        chartData[month] = newData;
      } else {
        groupMonthly = false;
        let carbs = data?.carbs ?? 0;
        let protein = data?.protein ?? 0;
        let fat = data?.fat ?? 0;
        let uncat = data.uncategorized ?? 0;
        //week
        let index = 0;
        if (ids.length <= 10) {
          index = moment(data.id, "YYYY-MM-DD").day();
        } else {
          index = moment(data.id, "YYYY-MM-DD").date() - 1;
        }

        chartData[index] = [uncat, carbs, protein, fat];
      }
    });

    //average for the month
    let uniqueMonths = [...new Set(months)];
    if (groupMonthly) {
      uniqueMonths.forEach((month) => {
        chartData[month][0] =
          chartData[month][0] / months.filter((x) => x == month).length;
        chartData[month][1] =
          chartData[month][1] / months.filter((x) => x == month).length;
        chartData[month][2] =
          chartData[month][2] / months.filter((x) => x == month).length;
        chartData[month][3] =
          chartData[month][3] / months.filter((x) => x == month).length;
      });
    }
  });

  console.log("trend chart data", chartData)

  return chartData
};


// SAVE FOOD
export const saveFoodDataOnFirebase  = (
  foodData,
  timeEntered,
  userId
) => {
  console.log("saving food data", foodData, timeEntered, userId)
}