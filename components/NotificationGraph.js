import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";
import * as Localization from "expo-localization";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native"; // victory native
import { Defs, LinearGradient, Stop } from "react-native-svg"; // react native svg

import {
  getFitbitSleepDisplayData,
  getGarminSleepDisplayData,
  getSleepDisplayData,
} from "../apis/sleepQueries";
import SleepChart from "./SleepLineChart";
import NotificationActivityChart from "./NotificationActivityChart";
import { customTheme } from "../constants/themeConstants";
import { getActivityData } from "../apis/activityQueries";

const NotificationGraph = ({ notification }) => {
  // get the user listener
  const user = useSelector((state) => state.UserReducer);

  // activity state
  const [data, setData] = useState({
    activity: [],
  });

  // sleep states
  const [sleepChartData, setSleepChartData] = useState([]);
  const [isPrevDataAppended, setIsPrevDataAppended] = useState(false);
  const [sleepChartLabels, setSleepChartLabels] = useState([
    "00:00:00",
    "8:00:00",
  ]);

  // Convert minutes to hour time for tooltip
  const minutesToTime = (index) => {
    const formattedTime = moment(index, "HH:mm:ss").format("hh:mm A");
    return formattedTime;
  };

  // use effect to fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if ((notification?.heartRates ?? []).length > 0) {
          const date = notification?.chartdate
            ? moment(notification.chartdate).format("YYYY-MM-DD")
            : moment
                .tz(notification.timestamp, "gmt")
                .tz(Localization.timezone)
                .format("YYYY-MM-DD");

          const queryDate = date;
          const prevQueryDate = moment(queryDate)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          const nextQueryDate = moment(queryDate)
            .add(1, "days")
            .format("YYYY-MM-DD");

          // declare instance of current sleep display data, labels, is prev data appended
          let currentSleepDisplayData, labels, isPrevDataAppended;

          const deviceSelected = user.vendor;

          // if device selected is Fitbit, get sleep data
          if (deviceSelected === "Fitbit") {
            ({ currentSleepDisplayData, labels, isPrevDataAppended } =
              await getFitbitSleepDisplayData(
                queryDate,
                deviceSelected,
                user.userId,
                forceDataForToday
              ));
          } else if (deviceSelected === "garmin") {
            // if device selected is garmin
            ({ currentSleepDisplayData, labels, isPrevDataAppended } =
              await getGarminSleepDisplayData(
                queryDate,
                deviceSelected,
                user.userId,
                forceDataForToday
              ));
          } else {
            // if device selected is apple or gfit
            ({ currentSleepDisplayData, labels, isPrevDataAppended } =
              await getSleepDisplayData(
                queryDate,
                prevQueryDate,
                nextQueryDate,
                deviceSelected,
                user.userId,
                forceDataForToday
              ));
          }

          const uniqueSleepData = [];

          if (currentSleepDisplayData.length > 0) {
            currentSleepDisplayData.forEach((data) => {
              const uniqueSubData = [];
              for (let i = 0; i < data.length - 1; i++) {
                if (data[i].x !== data[i + 1].x) {
                  uniqueSubData.push(data[i]);
                }
              }
              uniqueSleepData.push(uniqueSubData);
            });
          }

          // set labels
          setSleepChartLabels(labels);

          // set sleep chart data
          setSleepChartData(uniqueSleepData);

          setIsPrevDataAppended(isPrevDataAppended);

          const startIndexTime = moment(
            notification?.heartRates[0].timeStamp,
            "HH:mm:ss"
          ).diff(moment().startOf("d"), "minute");
          const endIndexTime = moment(
            notification?.heartRates[notification?.heartRates.length - 1]
              .timeStamp,
            "HH:mm:ss"
          ).diff(moment().startOf("d"), "minute");

          const adjustedStartIndex = Math.max(startIndexTime, 0);
          const adjustedEndIndex = endIndexTime + 1;

          const activityData = await getActivityData(
            date,
            user.userId,
            user.vendor
          );

          let adjustedActivityData = activityData
            .slice(adjustedStartIndex, adjustedEndIndex)
            .map((data, index) => {
              return {
                x: moment()
                  .startOf("d")
                  .add(adjustedStartIndex + index, "minute")
                  .toDate()
                  .getTime(),
                y: data,
              };
            });

          if (
            adjustedActivityData.length == 0 ||
            (adjustedActivityData.length != 0 &&
              adjustedActivityData.reduce((a, b) => a + parseInt(b.y), 0) == 0)
          ) {
            adjustedActivityData = (notification.heartRates ?? []).map(
              (val) => {
                return {
                  x: moment(val?.timeStamp, "HH:mm:ss").toDate().getTime(),
                  y: 1,
                };
              }
            );
          }

          setData({...data, activity: adjustedActivityData})
        }
      } catch (error) {
        Sentry.captureException(error, {
          extra: {
            message: "Error while fetching data for notification data",
          },
        });
      }
    };

    fetchData();
  }, []);

  if (
    notification?.type == "SLEEP" ||
    notification?.type == "Hypertension" ||
    notification?.type == "Afib" ||
    notification?.type == "Arrhythmia"
  ) {
    let minDomain = 150;
    let maxDomain = 50;
    (notification.heartRates ?? []).forEach((val) => {
      minDomain = Math.min(minDomain, val.heartRate);
      maxDomain = Math.max(maxDomain, val.heartRate);
    });

    return (
      <View style={{ marginLeft: -40 }}>
        {notification?.type == "SLEEP" && (
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                {notification?.chartdate
                  ? moment(notification.chartdate).format("  MMM DD")
                  : moment
                      .tz(notification.timestamp, "gmt")
                      .tz(Localization.timezone)
                      .format("  MMM DD")}
              </Text>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Sleep
              </Text>
            </View>

            {/* Sleep Chart */}
            <View style={{ width: "100%" }} className="mx-5">
              {sleepChartData.length > 0 ? (
                <SleepChart
                  data={sleepChartData}
                  labels={sleepChartLabels}
                  isPrevDataAppended={isPrevDataAppended}
                  deviceSelected={user.vendor}
                />
              ) : (
                <View className="items-center justify-center" style={{height: 300}}>
                  <ActivityIndicator color={customTheme.colors.primary} />
                </View>
              )}
            </View>
          </View>
        )}

        {/* Heart Rate */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          {notification?.type != "SLEEP" && (
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {notification?.chartdate
                ? moment(notification.chartdate).format("  MMM DD")
                : moment
                    .tz(notification.timestamp, "gmt")
                    .tz(Localization.timezone)
                    .format("MMM DD")}
            </Text>
          )}
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Heart Rate (BPM)
          </Text>
        </View>
        <VictoryChart
          minDomain={{
            y: minDomain,
          }}
          maxDomain={{
            y: maxDomain,
          }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              mouseFollowTooltips
              labels={({ datum }) =>
                `${datum.y} BPM at ${minutesToTime(datum.x)}`
              }
              labelComponent={
                <VictoryTooltip
                  cornerRadius={10}
                  pointerWidth={1}
                  center={{ y: 40 }}
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <Defs>
            {/* TODO create diffrent grad for different limits */}
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#E9B55E" stopOpacity={1} />
              <Stop offset="50%" stopColor="#CECF8A" />
              <Stop offset="75%" stopColor="#CFF66A" />
              <Stop offset="100%" stopColor="#4FC3F5" />
            </LinearGradient>
          </Defs>
          <VictoryLine
            style={{
              data: { stroke: "url(#grad)", strokeWidth: 2 },
              parent: { border: "1px solid #ccc" },
            }}
            data={(notification.heartRates ?? []).map((val) => {
              return {
                x: val?.timeStamp,
                y: val?.heartRate,
              };
            })}
          />
          <VictoryAxis
            axisLabelComponent={<VictoryLabel style={{ fontSize: 10 }} />}
            tickLabelComponent={<VictoryLabel textAnchor="end" />}
            tickCount={3}
            fixLabelOverlap
            dependentAxis
            style={{
              axis: { stroke: "none" },
              grid: { stroke: "none" },
              ticks: { stroke: "transparent" },
              tickLabels: {
                angle: -90,
                fontSize: 11,
                margin: 4,
                fontWeight: "bold",
                color: "black",
                fontFamily: "Roboto",
              },
            }}
          />
          {(notification?.heartRates?.length ?? 0) != 0 && (
            <VictoryAxis
              style={{
                tickLabels: {
                  fontSize: 11,
                  margin: 4,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                },
                axis: { stroke: "none" },
                grid: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
              }}
              tickFormat={(value) => moment(value, "HH:mm:ss").format("HH:mm")}
              tickCount={5}
              fixLabelOverlap
            />
          )}
        </VictoryChart>

        <View style={{ marginLeft: 40 }}>
          {notification?.type != "SLEEP" && (
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Activity
                </Text>
              </View>
              {data.activity.length !== 0 ? (
                <ActivityChart
                  timeStamp={notification.timestamp}
                  activityData={data.activity}
                  loading={(notification?.heartRates?.length ?? 0) == 0}
                />
              ) : (
                <View
                  className="items-center justify-center"
                  style={{ height: 300 }}
                >
                  <ActivityIndicator color="#fb923c" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
};

const ActivityChart = ({ activityData }) => {
  console.log("activity data", activityData)

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 60,
        marginRight: 10,
      }}
    >
      <NotificationActivityChart
        data={activityData}
        useTimestamp={true}
        loading={false}
        isNotification={true}
      />
    </View>
  );
};

export default NotificationGraph;
