import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import {
  OFFSET,
  WEEK,
  MONTH,
  YEAR,
  WEEK_LABELS,
  YEAR_LABLES,
} from "../constants/dateConstants";

import getUser from "../cache/userCache";
import { CustomDateComponent } from "../components/CustomDateComponent";
import TrendCardComponent from "../components/TrendCardComponent";
import FoodTrends from "../components/FoodTrends";
import FoodPieChart from "../components/FoodPieChart";
import { useNavigation } from "@react-navigation/native";
import FoodEditComponent from "./FoodEdit";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { getDataForFoodTrendCard } from "../utils/trendCardUtils";
import CustomDateComponentForFood from "../components/CustomDateComponentForFood";
import { fetchMultipleDcoumentsById } from "../utils/firestoreUtils";
import CustomTrendsDateComponent from "../components/CustomTrendsDateComponent";

import { USER_TABLE } from "../constants/firebaseCollections";
import getFood, { addPrevListener } from "../cache/foodCache";
import { useDispatch, useSelector } from "react-redux";
import { FoodActionCreators } from "../store/FoodReducer/FoodActionCreators";
import { activityActionTypes } from "../store/ActivityReducer/ActivityActionTypes";
import { foodActionTypes } from "../store/FoodReducer/FoodActionTypes";
import { FoodListner } from "../listeners/FoodListner";

const dateRender = (date) => {
  return moment(date).format("MMM DD, YYYY").toString();
};

const INCREMENT_WEEK = WEEK;
const INCREMENT_MONTH = MONTH;
const INCREMENT_YEAR = YEAR;

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const Food = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UserReducer);

  const { foodCache, foodTrendCard } = useSelector(
    (state) => state.FoodReducer
  );
  //state variable to decide whether to show food edit screen or not
  const [showEdit, setShowEdit] = useState(false);
  //offset value to determine which date to render
  const [dateOffset, setDateOffset] = useState(0);

  const [displayDate, setDisplayDate] = useState(
    moment().startOf("d").toDate().getTime()
  );

  const [incrementFormat, setIncrementFormat] = useState(INCREMENT_WEEK);

  //data used to render the pie chart
  const [isNutientDataLoading, setNutirentLoading] = useState(true);
  const [noData, setNoData] = useState(true);

  const [lastSyncTIme, setLastSyncTIme] = useState("");

  //date ofset for the trends chart
  const [rangeDateOffset, setRangedDateOffset] = useState(0);
  const [previousDate, setPreviousDate] = useState();
  const [nextDate, setNextDate] = useState();
  const [chartLables, setChartLabels] = useState(WEEK_LABELS);
  const [chartData, setChartData] = useState([]);

  const [userStartDate, setUserStartDate] = useState(null);
  const [trendChartLoading, setTrendChartLoading] = useState(true);
  const [newDataAvailable, setNewDataAvailble] = useState(false);

  const [showFoodEdit, setShowFoodEdit] = useState(false);

  const currentDate = moment().startOf("d").toDate().getTime() - OFFSET;

  const [selectedSlice, setSelectedSlice] = useState({
    label: "",
    value: 0,
  });

  useEffect(() => {
    getLastSyncTime();
    // fetchData();
  }, []);

  //effect that will run whenever the dateOffsetChanges
  useEffect(() => {
    fetchData();
  }, [dateOffset]);

  const fetchData = () => {
    setNutirentLoading(true);
    const date = moment().subtract(dateOffset, "d").startOf("d");
    setDisplayDate(date.toDate().getTime());

    const dateFormatted = moment(date).format("YYYY-MM-DD");

    // console.log("food cache", foodCache[dateFormatted])

    if (foodCache[dateFormatted]) {
      dispatch({
        type: foodActionTypes.FETCH_FOOD_DATA,
        payload: { foodData: foodCache[dateFormatted], date: dateFormatted },
      });
      setNutirentLoading(false);
    } else {
      dispatch(FoodActionCreators.fetchData(dateFormatted)).then((value) => {
        setNutirentLoading(false);
      });
    }

    setUserStartDate(moment(auth().currentUser?.metadata?.creationTime));

    dispatch(FoodActionCreators.getDataForFoodTrendCard(date));
  };

  //alert(JSON.stringify(foodTrendCardData))

  //called when the offset changes based on date range swipe.
  useEffect(() => {
    let prevDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset, incrementFormat);
    let nextDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset + 1, incrementFormat)
      .subtract(1, "d");
    setPreviousDate(prevDate.toDate().getTime());
    setNextDate(nextDate.toDate().getTime());
    fetchFoodTrendDate(prevDate, nextDate);
  }, [rangeDateOffset]);

  //Called whenever a change in date increment format changes.
  useEffect(() => {
    let currentDate = moment();
    let previous;
    setRangedDateOffset(0);
    setChartData([]);
    switch (incrementFormat) {
      case INCREMENT_WEEK:
        previous = currentDate.startOf(INCREMENT_WEEK);
        setPreviousDate(previous.toDate().getTime());
        setNextDate(
          previous.add(1, INCREMENT_WEEK).subtract(1, "d").toDate().getTime()
        );
        setChartLabels(WEEK_LABELS);
        fetchFoodTrendDate(
          moment().startOf("w").toDate().getTime(),
          moment().startOf("w").add(6, "d").toDate().getTime()
        );
        break;
      case INCREMENT_MONTH:
        previous = currentDate.startOf(INCREMENT_MONTH);
        setPreviousDate(previous.toDate().getTime());
        setNextDate(
          currentDate
            .startOf(INCREMENT_MONTH)
            .add(1, INCREMENT_MONTH)
            .subtract(1, "d")
            .toDate()
            .getTime()
        );
        setChartLabels(
          Array.from({ length: previous.daysInMonth() }).map((u, i) => i + 1)
        );
        fetchFoodTrendDate(
          moment().startOf(INCREMENT_MONTH).toDate().getTime(),
          moment()
            .startOf(INCREMENT_MONTH)
            .add(1, INCREMENT_MONTH)
            .toDate()
            .getTime()
        );

        break;
      case INCREMENT_YEAR:
        previous = currentDate.startOf(INCREMENT_YEAR);
        setPreviousDate(previous.toDate().getTime());
        setNextDate(
          previous.add(1, INCREMENT_YEAR).subtract(1, "d").toDate().getTime()
        );
        setChartLabels(YEAR_LABLES);
        fetchFoodTrendDate(
          moment().startOf("y").toDate().getTime(),
          moment().startOf("y").add(365, "d").toDate().getTime()
        );
        break;
    }
  }, [incrementFormat]);

  /**
   * Get the last sync time of the user
   */
  const getLastSyncTime = () => {
    getUser().then((user) => {
      if (user.joinDate) {
        setUserStartDate(moment(auth().currentUser?.metadata?.creationTime));
      }
      if (user[`deviceSyncTime_${user.vendor}`]) {
        setLastSyncTIme(
          moment(user[`deviceSyncTime_${user.vendor}`]).format("lll")
        );
      }
    });
  };

  /**
   *
   * @param {Date} prevDate
   * @param {Date} nextDate
   */
  const fetchFoodTrendDate = (prevTime, nextTime) => {
    setTrendChartLoading(true);
    const userId = auth().currentUser.uid;
    let startFormat = moment(prevTime).format("YYYY-MM-DD");
    let endFormat = moment(nextTime).format("YYYY-MM-DD");
    let index = 1;
    let ids = [];

    while (startFormat != endFormat) {
      ids.push(startFormat);
      startFormat = moment(prevTime).add(index, "d").format("YYYY-MM-DD");
      index++;
    }
    ids.push(endFormat);

    let chartData;

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

    fetchMultipleDcoumentsById(ids, USER_TABLE, {
      doc: userId,
      subcollection: "food",
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
      if (dataPresent) {
        setChartData(chartData);
      } else {
        setChartData([]);
      }
      setTrendChartLoading(false);
    });
  };

  /**
   * Callback method for date change.
   * @param {string} direction the direction of the swipe
   */
  const onDateSwipe = (direction) => {
    if (direction == "left") {
      setDateOffset(dateOffset + 1);
    } else {
      setDateOffset(dateOffset - 1);
    }

    setSelectedSlice({
      label: "",
      value: 0,
    });
  };

  /**
   * The callback function when the date range is changed
   * @param {string} direction
   */
  const onDateRangeChanged = (direction) => {
    if (direction == "left") {
      setRangedDateOffset(rangeDateOffset - 1);
    } else {
      setRangedDateOffset(rangeDateOffset + 1);
    }
  };

  const onClickingSave = () => {
    setShowFoodEdit(!showFoodEdit);

    let prevDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset, incrementFormat);
    let nextDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset + 1, incrementFormat)
      .subtract(1, "d");
    fetchFoodTrendDate(prevDate, nextDate);
  };

  const disableSwipeLeft = (date) => {
    return (
      moment(date).format("YYYY-MM-DD") ===
      moment(auth().currentUser?.metadata?.creationTime).format("YYYY-MM-DD")
    );

    // if (userStartDate) {
    //   return moment(userStartDate)
    //     .startOf("D")
    //     .isSameOrAfter(moment(date).startOf("D"));
    // }
    // console.log("food date", moment(date).startOf("D"));
    // moment(auth().currentUser.metadata.creationTime).format("YYYY-MM-DD") ===
    //   moment(date).format("YYYY-MM-DD")
  };

  const datePickedThroughModal = (date) => {
    const currentDay = moment().toDate().getTime();

    const daysDiff = moment(currentDay).diff(moment(date), "days");

    setDateOffset(daysDiff)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {newDataAvailable && (
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 10,
            backgroundColor: "#FEEEAA",
          }}
        >
          <Text>New data might be available , please pull down to refresh</Text>
        </View>
      )}

      {!showFoodEdit ? (
        <View
          style={{
            marginBottom: 10,
            // height: Dimensions.get("window").height - 120,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {showEdit ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowEdit(false);
                  }}
                >
                  <Avatar.Icon
                    size={24}
                    style={{
                      backgroundColor: "white",
                      borderWidth: 0.6,
                      marginTop: 20,
                    }}
                    icon={require("../assets/back.png")}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="p-5 justify-center">
                <CustomDateComponentForFood
                  disableLeft={disableSwipeLeft(displayDate)}
                  disableRight={displayDate >= currentDate}
                  date={dateRender(displayDate)}
                  swipeFunction={onDateSwipe}
                  datePickerFunction={datePickedThroughModal}
                />
                <FoodPieChart
                  noData={noData}
                  isLoading={isNutientDataLoading}
                  selectedSlice={selectedSlice}
                  onSelectedSlice={(data) => setSelectedSlice(data)}
                  calories={
                    foodTrendCard.length == 0 ? 0 : foodTrendCard[0]?.value ?? 0
                  }
                />

                <TrendCardComponent
                  isFoodTrendCard={true}
                  title="Food"
                  lastSyncDate={lastSyncTIme}
                  showArrows={dateOffset != 0}
                  data={foodTrendCard}
                  showEdit={true}
                  onEdit={() => {
                    setShowFoodEdit(!showFoodEdit);
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginLeft: 20,
                          marginRight: 20,
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setIncrementFormat(INCREMENT_WEEK)}
                        >
                          <Text
                            style={{
                              textDecorationLine:
                                incrementFormat == INCREMENT_WEEK
                                  ? "underline"
                                  : "none",
                              color:
                                incrementFormat == INCREMENT_WEEK
                                  ? "#fb923d"
                                  : "#D8D8D8",
                              fontSize: 16,
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {INCREMENT_WEEK}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setIncrementFormat(INCREMENT_MONTH)}
                        >
                          <Text
                            style={{
                              textDecorationLine:
                                incrementFormat == INCREMENT_MONTH
                                  ? "underline"
                                  : "none",
                              color:
                                incrementFormat == INCREMENT_MONTH
                                  ? "#fb923d"
                                  : "#D8D8D8",
                              fontSize: 16,
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {INCREMENT_MONTH}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setIncrementFormat(INCREMENT_YEAR)}
                        >
                          <Text
                            style={{
                              textDecorationLine:
                                incrementFormat == INCREMENT_YEAR
                                  ? "underline"
                                  : "none",
                              color:
                                incrementFormat == INCREMENT_YEAR
                                  ? "#fb923d"
                                  : "#D8D8D8",
                              fontSize: 16,
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {INCREMENT_YEAR}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ overflow: "hidden" }}>
                        <CustomTrendsDateComponent
                          isDataLoading={trendChartLoading}
                          disableLeft={
                            userStartDate >=
                            moment(previousDate).toDate().getTime()
                          }
                          date={moment(nextDate).format("MMM DD, YYYY")}
                          swipeFunction={onDateRangeChanged}
                          prevDate={moment(previousDate).format("MMM DD, YYYY")}
                          disableRight={rangeDateOffset == 0}
                        />
                      </View>
                    </View>
                  </View>
                  {trendChartLoading ? (
                    <View
                      style={{
                        height: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="small" color="orange" />
                    </View>
                  ) : (
                    <FoodTrends data={chartData} labels={chartLables} />
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <FoodEditComponent
          onClickingSave={onClickingSave}
          date={moment()
            .startOf("d")
            .subtract(dateOffset, "d")
            .toDate()
            .getTime()}
        />
      )}
    </View>
  );
};
export default Food;
