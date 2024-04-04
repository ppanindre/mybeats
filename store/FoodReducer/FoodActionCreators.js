import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { foodActionTypes } from "./FoodActionTypes";
import { FetchFoodWithoutUpdatingRedux } from "./FetchFoodWithoutUpdatingRedux";
import { dashboardActionTypes } from "../DashboardReducer/DashboardActionTypes";

export const FoodActionCreators = {
  fetchData: (date) => {
    const userId = auth().currentUser.uid;

    return async (dispatch) => {
      const FOOD_CACHE = {};
      const DATES_FETCHING = {};

      if (DATES_FETCHING[date]) {
        await DATES_FETCHING[date];
      } else if (!FOOD_CACHE[date]) {
        const promise = firestore()
          .collection("user")
          .doc(userId)
          .collection("food")
          .doc(date)
          .get()
          .then((snapShot) => {
            if (snapShot.exists) {
              const data = snapShot.data();
              FOOD_CACHE[date] = data;
            } else {
              FOOD_CACHE[date] = {};
            }
            delete DATES_FETCHING[date];
          });

        DATES_FETCHING[date] = promise;
        await promise;
      }

      dispatch({
        type: foodActionTypes.FETCH_FOOD_DATA,
        payload: { foodData: FOOD_CACHE[date], date: date },
      });
    };
  },

  getDataForFoodTrendCard: (optionalStartDate = null, dashboard = false) => {
    return async (dispatch) => {
      let date = null;
      let previousDate = null;

      //date = moment().startOf("d").format("YYYY-MM-DD")
      if (optionalStartDate) {
        date = moment(optionalStartDate).startOf("d").format("YYYY-MM-DD");
        previousDate = moment(optionalStartDate)
          .startOf("d")
          .subtract(1, "d")
          .format("YYYY-MM-DD");
      } else {
        date = moment().startOf("d").format("YYYY-MM-DD");
        previousDate = moment()
          .startOf("d")
          .subtract(1, "d")
          .format("YYYY-MM-DD");
      }

      let showGrey = false;
      const current = moment().startOf("d").format("YYYY-MM-DD");
      if (current == date) {
        showGrey = true;
      }

      let currentDayActivity = await await FetchFoodWithoutUpdatingRedux(date);
      let previousDayActivity = null;

      let currentSteps = currentDayActivity?.calories ?? "-";
      let previousSteps = previousDayActivity?.calories ?? "-";
      let currentSedantary = currentDayActivity?.water ?? "-";
      let previousWater = previousDayActivity?.water ?? "-";
      let currentProtein = currentDayActivity?.protein ?? "-";
      let prevProtein = previousDayActivity?.protein ?? "-";
      let calorieFactor =
        currentSteps ?? "-" ? 0 : currentSteps / CALORIE_REQUIREMENT;

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
        (currentDayActivity?.calories ?? 0) -
          (currentDayActivity?.uncategorized ?? 0),
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
          currentSteps == "-"
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
          currentSedantary == "-"
            ? GREY_COLOR
            : currentSedantary < 50
            ? "red"
            : currentSedantary > 50 && currentSedantary < 70
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

      dispatch({
        type: dashboard
          ? foodActionTypes.FETCH_DASHBOARD_FOOD_TRENDCARD
          : foodActionTypes.FETCH_FOOD_TRENDCARD,
        payload: [
          {
            title: "Calories",
            value:
              currentSteps == "-" || currentSteps == 0
                ? "-"
                : `${currentSteps}`,
            arrow:
              currentSteps == "-" || previousSteps == "-"
                ? ARROW_DOWN
                : currentSteps > previousSteps
                ? ARROW_UP
                : ARROW_DOWN,
            color: calorieColor,
          },
          {
            title: "Water",
            value:
              currentSedantary == "-" || currentSedantary == 0
                ? "-"
                : `${currentSedantary} oz`,
            arrow:
              currentSedantary == "-" || previousWater == "-"
                ? ARROW_DOWN
                : previousWater > currentSedantary
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
        ],
      });
    };
  },
};
