import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import { CustomDateComponent } from "../components/CustomDateComponent";
import TrendCardComponent from "../components/TrendCardComponent";
import ActivityLineChart from "../components/ActivityLineChart";
import ActivityTrends from "../components/ActivityTrends";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ActivityActionCreators } from "../store/ActivityReducer/ActivityActionCreators";
import auth from "@react-native-firebase/auth";
import { ActitvityListener } from "../listeners/ActivityListener";
import { activityActionTypes } from "../store/ActivityReducer/ActivityActionTypes";
import { fetchMultipleDcoumentsById } from "../store/ActivityReducer/FetchMultipleDocumentsById";

import CustomTrendsDateComponent from "../components/CustomTrendsDateComponent";

const YEAR_LABLES = [
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

const WEEK_LABLES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const INCREMENT_WEEK = "Week";
const INCREMENT_MONTH = "Month";
const INCREMENT_YEAR = "Year";

const DAY = 86400000;

const Activity = () => {
  // const [pageRefresh, setpageRefresh] = useState(false);
  const dispatch = useDispatch();

  const [displayDate, setDisplayDate] = useState(
    moment().startOf("day").toDate().getTime()
  );
  const [constantStartDate, setConstantStartDate] = useState(
    moment().startOf("day").toDate().getTime()
  );

  const [userStartDate, setUserStateDate] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [activityChartLoading, setActivityChartLoading] = useState(true);
  const { acitivityIntraday } = useSelector((state) => state.ActivityReducer);
  const { trendCardData } = useSelector((state) => state.ActivityReducer);
  const { activitiesIntradayCache } = useSelector(
    (state) => state.ActivityReducer
  );
  const [trendLoading, setTrendLoading] = useState(true);
  const [trendsData, setTrendsData] = useState([]);
  const [trendsLabel, setTrendsLabel] = useState(WEEK_LABLES); // Replace 'WEEK_LABLES' with the actual label value
  const [incrementFormat, setIncrementFormat] = useState("Week");
  const [previousDate, setPreviousDate] = useState();
  const [nextDate, setNextDate] = useState();
  const [rangeDateOffset, setRangedDateOffset] = useState(0);

  const { deviceSelected } = useSelector((state) => state.DeviceReducer);
  const user = useSelector((state) => state.UserReducer);

  useEffect(() => {
    setDisplayDate(moment().startOf("day").toDate().getTime());
    setRangedDateOffset(0);
    setCurrentOffset(0);
    const date = moment().format("YYYY-MM-DD");

    dispatch(
      ActivityActionCreators.getDataForActivityTrendCard(
        null,
        false,
        user.vendor
      )
    )
      .then
      // console.log(trendCardData)
      ();
    fetchActivityData(date);

    let prevDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset, incrementFormat);
    let nextDate = moment()
      .startOf(incrementFormat)
      .add(rangeDateOffset + 1, incrementFormat)
      .subtract(1, "d");

    trendsDateHandler(prevDate, nextDate);
  }, [user]);

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
    trendsDateHandler(prevDate, nextDate);
  }, [rangeDateOffset]);

  useEffect(() => {
    let currentDate = moment();
    let previous;
    setRangedDateOffset(0);
    // setChartData([])
    switch (incrementFormat) {
      case INCREMENT_WEEK:
        previous = currentDate.startOf(INCREMENT_WEEK);
        setPreviousDate(previous.toDate().getTime());
        setNextDate(
          previous.add(1, INCREMENT_WEEK).subtract(1, "d").toDate().getTime()
        );
        setTrendsLabel(WEEK_LABLES);
        trendsDateHandler(
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
        setTrendsLabel(
          Array.from({ length: previous.daysInMonth() }).map((u, i) => i + 1)
        );
        trendsDateHandler(
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
        setTrendsLabel(YEAR_LABLES);
        trendsDateHandler(
          moment().startOf("y").toDate().getTime(),
          moment().startOf("y").add(365, "d").toDate().getTime()
        );
        break;
    }
  }, [incrementFormat]);

  useEffect(() => {
    fetchTrendData(
      moment().startOf("week").toDate(),
      moment().startOf("week").add(6, "d").toDate()
    );

    dispatch(
      ActivityActionCreators.getDataForActivityTrendCard(
        null,
        false,
        deviceSelected
      )
    ).then();

    const date = moment().format("YYYY-MM-DD").concat(`-${deviceSelected}`);

    fetchActivityData(date);
    setUserStateDate(user.joinDate);
  }, []);

  useEffect(() => {
    const unsubscribe = ActitvityListener(dispatch, deviceSelected).then(
      (value) => {
        setActivityChartLoading(false);
      }
    );
    return () => {
      unsubscribe;
    };
  }, [dispatch, deviceSelected]);

  const fetchTrendData = async (startDate, endDate) => {
    let dayCounter = 0;

    const userId = auth().currentUser?.uid ?? "";
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
    fetchMultipleDcoumentsById(
      ids,
      "user",
      { doc: userId, subcollection: "activity" },
      deviceSelected
    )
      //fetchMultipleDcoumentsById(ids, USER_TABLE, { doc: "3PgLBbHKYHapWqmrBH52odj11ii1", subcollection: ACTIVITY_SUBCOLLECTION })
      .then((docData) => {
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
        docData?.forEach((data) => {
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
        });

        //sort array based on
        if (trendData.length > 0) {
          trendData.sort((a, b) => a.index - b.index);
          constructTrendChartData(trendData, label, groupMonthly);
        } else {
          //no data found
          setTrendsLabel(label);
          setTrendLoading(false);
        }
      })
      .catch((error) => {
        console.log("error activity trend", error);
        setTrendLoading(false);
      });

    // setTrendLoading(false)
  };

  /**
   * Method that constructs the trend data as required by the chart library.
   * @param {Array<any>} trendsData the trend data
   */
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

    setTrendsData(data);
    setTrendsLabel(label);
    setTrendLoading(false);
  };

  const dateRender = (date) => {
    return moment(date).format("MMM DD, YYYY").toString();
  };

  const disableSwipeLeft = (date) => {
    if (userStartDate) {
      return moment(userStartDate)
        .startOf("D")
        .isSameOrAfter(moment(date).startOf("D"));
    }
    return false;
  };

  const fetchActivityData = (queryDate) => {
    let date = "";
    // console.log("hello activity")
    setActivityChartLoading(true);
    // this.setState({ activityChartLoading: true });
    
    if (queryDate) {
      date = moment(queryDate).format("YYYY-MM-DD").concat(`-${user.vendor}`);
    } else {
      date = moment().format("YYYY-MM-DD").concat(`-${user.vendor}`);
    }
    
    // console.log("query date", queryDate)

    if (activitiesIntradayCache[date]) {

      // console.log("going to if")

      dispatch({
        type: activityActionTypes.FETCH_ACTIVITY_INTRADAY,
        payload: {
          acitivityIntraday: activitiesIntradayCache[date],
          date: date,
        },
      });
      setActivityChartLoading(false);
    } else {
      // console.log("going to else")

      dispatch(ActivityActionCreators.fetchData(date)).then((value) => {
        setActivityChartLoading(false);
      });
    }
  };

  const onAreaChartPageChanged = (direction) => {
    let offset;
    if (direction == "right") {
      offset = currentOffset + 1;
    } else {
      offset = currentOffset - 1;
    }
    let toAdd = deviceSelected == "garmin" ? DAY / 24 : 0;
    setDisplayDate(
      new Date(moment(constantStartDate).add(offset, "day")).getTime() + toAdd
    );
    // console.log(
    //   "area chart page changed",
    //   new Date(moment(constantStartDate).add(offset, "day")).getTime() + toAdd
    // );

    // setDisplayDate(new Date(moment("06-23-2023", "MM-DD-YYYY")).getTime())
    setCurrentOffset(offset);
    fetchActivityData(
      moment(constantStartDate).add(offset, "day").toDate().getTime() + toAdd
    );
    // moment("06-23-2023", "MM-DD-YYYY").toDate().getTime()
    // );

    dispatch(
      ActivityActionCreators.getDataForActivityTrendCard(
        moment(constantStartDate).add(offset, "day").toDate().getTime(),
        false,
        deviceSelected
      )
    );
  };

  const trendsDateHandler = (prev, curr) => {
    setTrendLoading(true);
    // console.log("trend data handler");
    setTrendsData([]);
    // console.log("prev", prev, "curr", curr``)
    fetchTrendData(prev, curr);
  };

  const onTrendsChartPageChanged = (direction) => {
    if (direction === "right") {
      setRangedDateOffset(rangeDateOffset + 1);
    } else {
      setRangedDateOffset(rangeDateOffset - 1);
    }
  };

  const datePickedThroughModal = (date) => {
    setDisplayDate(new Date(moment(date)).getTime());
    console.log("date picked", new Date(moment(date)).getTime());
    const daysDiff = moment(constantStartDate).diff(moment(date), "days");

    setCurrentOffset((daysDiff + 1) * -1)
    
    fetchActivityData(moment(date).toDate().getTime());
    dispatch(
      ActivityActionCreators.getDataForActivityTrendCard(
        moment(date).toDate().getTime(),
        false,
        deviceSelected
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="p-5">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* <CustomDateComponent date={"Sept 24, 2023"} /> */}

          <CustomDateComponent
            disableLeft={disableSwipeLeft(displayDate)}
            disableRight={constantStartDate == displayDate}
            date={dateRender(displayDate)}
            swipeFunction={onAreaChartPageChanged}
            datePickerFunction={datePickedThroughModal}
          />

          {activityChartLoading ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 300,
              }}
            >
              <ActivityIndicator color="orange" />
            </View>
          ) : (
            <ActivityLineChart />
          )}

          <View className="mt-3">
            <TrendCardComponent
              title="Activity"
              cardBarColor="orange"
              data={trendCardData}
              date={displayDate}
              showArrows={currentOffset != 0}
            />
          </View>

          {/* Week Month year card */}

          <View className="mt-4">
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
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

              <CustomTrendsDateComponent
                isDataLoading={trendLoading}
                disableLeft={
                  userStartDate >= moment(previousDate).toDate().getTime()
                }
                date={moment(nextDate).format("MMM DD, YYYY")}
                swipeFunction={onTrendsChartPageChanged}
                prevDate={moment(previousDate).format("MMM DD, YYYY")}
                disableRight={rangeDateOffset == 0}
              />
            </View>
            {trendLoading ? (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 360,
                }}
              >
                <ActivityIndicator color="orange" />
              </View>
            ) : (
              <View>
                <ActivityTrends
                  data={trendsData}
                  labels={trendsLabel}
                  trendLoading={trendLoading}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Activity;
