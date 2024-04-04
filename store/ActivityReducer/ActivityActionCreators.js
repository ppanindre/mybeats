import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { activityActionTypes } from "./ActivityActionTypes";
import { FetchDataWithoutUpdatingRedux } from "./FetchActivityWithoutUpdatingRedux";

const MESSAGE_COLLECTION = "message";
const MESSAGES_SUB_COLLECTION = "messages";
const USER_TABLE = "user";
const SURVEY_TABLE = "survey";
const ACTIVITY_SUBCOLLECTION = "activity";
const SLEEP_SUBCOLLECTION = "sleep";
const FOOD_SUBCOLLECTION = "food";
const HEART_RATE_SUBCOLLECTION = "heartRate";
const INTRADAY_COLLECTION = "intraday";
const INTRADAY_SUBCOLLECTION = "details";
const DELETE_USER_DATA_COLLECTION = "deleteUserData";

export const ActivityActionCreators = {
  fetchData: (queryDate) => {
    return async (dispatch) => {
      const ACTIVITY_RATE_CACHE = {};
      const ACTIVITY_INTRADAY_CACHE = {};
      // The dates that are currently being fetched.
      const DATES_FETCHING = {};
      // Dates fetching for intraday
      const DATES_FETCHING_INTRADAY = {};

      const userId = auth().currentUser.uid;

      const date = queryDate;
      //
      const promises = [];

      if (DATES_FETCHING[date]) {
        promises.push(DATES_FETCHING[date]);
      } else if (!ACTIVITY_RATE_CACHE[date]) {
        const promise = firestore()
          .collection("user")
          .doc(userId)
          .collection("activity")
          .doc(date)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              ACTIVITY_RATE_CACHE[date] = data;
              // console.log("activity")
              // console.log(data)

              //saveToDevice(`Activity_${date}`, JSON.stringify(data))
            } else {
              ACTIVITY_RATE_CACHE[date] = {};
            }
            //delete from dates fetching.
            delete DATES_FETCHING[date];
          });
        DATES_FETCHING[date] = promise;
        promises.push(promise);
      }

      if (DATES_FETCHING_INTRADAY[date]) {
        promises.push(DATES_FETCHING_INTRADAY[date]);
      } else if (!ACTIVITY_INTRADAY_CACHE[date]) {
        const promise = firestore()
          .collection("user")
          .doc(userId)
          .collection("activity")
          .doc(date)
          .collection("intraday")
          .doc("details")
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              const data = snapshot.data();
              const activityIntraday = data.activities;

              ACTIVITY_INTRADAY_CACHE[date] = activityIntraday;
            } else {
            }
            delete DATES_FETCHING_INTRADAY[date];
          });

        DATES_FETCHING_INTRADAY[date] = promise;
        promises.push(promise);
      }

      await Promise.all(promises).then(() => {
        dispatch({
          type: activityActionTypes.FETCH_ACTIVITY_INTRADAY,
          payload: {
            acitivityIntraday: ACTIVITY_INTRADAY_CACHE[date],
            date: date,
          },
        });

        dispatch({
          type: activityActionTypes.FETCH_ACTIVITY_RATE,
          payload: ACTIVITY_RATE_CACHE[date],
        });
      });
    };
  },

  getDataForActivityTrendCard: (
    optionalStartDate = null,
    dashboard = false,
    deviceSelected = ""
  ) => {
    return async (dispatch) => {
      const YELLOW_COLOR = "#FFEF00";
      const ARROW_UP = "caretup";
      const ARROW_DOWN = "caretdown";
      const CALORIE_REQUIREMENT = 2000;
      const GREY_COLOR = "#D4d4d4";
      const DAY_ACTIVITY_MINUTES = 60 * 16;

      let date = null;
      let previousDate = null;
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

      let currentDayActivity = await (
        await FetchDataWithoutUpdatingRedux(date, deviceSelected)
      ).activity;
      let previousDayActivity = await (
        await FetchDataWithoutUpdatingRedux(previousDate, deviceSelected)
      ).activity;

      let currentSteps = currentDayActivity?.steps ?? 0;
      let previousSteps = previousDayActivity?.steps ?? 0;
      let currentSedantary = currentDayActivity?.sedentaryMinutes ?? 0;
      let previousWater = previousDayActivity?.sedentaryMinutes ?? 0;
      let currentLight = currentDayActivity?.fairlyActiveMinutes ?? 0;
      let previousLight = previousDayActivity?.fairlyActiveMinutes ?? 0;
      let trendCardBar = "green";
      let activeTime =
        currentLight +
        (currentDayActivity?.lightlyActiveMinutes ?? 0) +
        (currentDayActivity?.veryActiveMinutes ?? 0);
      let preciousActiveTime =
        previousLight +
        (previousDayActivity?.lightlyActiveMinutes ?? 0) +
        (previousDayActivity?.veryActiveMinutes ?? 0);
      let sedcolor = "green";
      let actColor = "green";

      if ((currentSedantary) => 0.5 * DAY_ACTIVITY_MINUTES) {
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

      dispatch({
        type: dashboard
          ? activityActionTypes.FETCH_DASHBOARD_ACTIVITY_TRENDCARD
          : activityActionTypes.FETCH_ACTIVITY_TRENDCARD,

        payload: [
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
              currentSedantary == 0 || previousWater == 0
                ? ARROW_DOWN
                : previousWater < currentSedantary
                ? ARROW_UP
                : ARROW_DOWN,
            color: sedantaryColor,
          },
          {
            title: "Active",
            value:
              activeTime == 0 || activeTime == "-" ? "-" : `${activeTime} mins`,
            arrow:
              activeTime == 0 || preciousActiveTime == 0
                ? ARROW_DOWN
                : activeTime > preciousActiveTime
                ? ARROW_UP
                : ARROW_DOWN,
            color: activeColor,
          },
          {
            trendCardBarColor: trendCardBar,
          },
        ],
      });
    };
  },
};
