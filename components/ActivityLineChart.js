// import moment from 'moment'
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { Defs, Stop, LinearGradient } from "react-native-svg";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryBar,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory-native";
import moment from "moment";

const DIMENSIONS = Dimensions.get("window");
const CHART_HEIGHT = 300;

const ACTIVITIES = ["Idle", "Light", "Active", "Intense"];

const ActivityLineChart = ({
  useTimestamp = false,
  loading = false,
  activityIntraday = [],
  isNotification = false,
}) => {
  const [victoryLineChartData, setVictoryLineChartData] = useState([]);
  const [victoryBarChartData, setVictoryBarChartData] = useState([]);

  useEffect(() => {
    const tempData =
      activityIntraday?.length > 0
        ? activityIntraday.map((d) => {
            const dataTime = moment(d.time, "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            );

            return {
              x: dataTime,
              y: d.level,
            };
          })
        : [];

    const uniqueXValues = new Set();
    const modifiedChartData = [];

    for(const obj of tempData) {
      if (!uniqueXValues.has(obj.x)) {
        uniqueXValues.add(obj.x);
        modifiedChartData.push(obj);
      }
    }

    const continuousPoints = [];
    const discontinuousPoints = [];
    let currentContinuousSequence = [];
    let currentDiscontinuousSequence = [];

    for (let i = 0; i < modifiedChartData.length; i++) {
      if (i === 0 || modifiedChartData[i].x - modifiedChartData[i - 1].x > 60) {
        if (currentContinuousSequence.length > 0) {
          continuousPoints.push(currentContinuousSequence);
          currentContinuousSequence = [];
        }
        currentDiscontinuousSequence.push(modifiedChartData[i]);
      } else {
        if (currentDiscontinuousSequence.length > 0) {
          discontinuousPoints.push(currentDiscontinuousSequence);
          currentDiscontinuousSequence = [];
        }
        currentContinuousSequence.push(modifiedChartData[i]);
      }
    }

    if (currentContinuousSequence.length > 0) {
      continuousPoints.push(currentContinuousSequence);
    }

    if (currentDiscontinuousSequence.length > 0) {
      discontinuousPoints.push(currentDiscontinuousSequence);
    }

    setVictoryLineChartData(continuousPoints);
    setVictoryBarChartData(discontinuousPoints);
  }, [activityIntraday]);

  return (
    <View>
      <VictoryChart
        height={CHART_HEIGHT}
        // domain={{ y: [1, 4],
        //     // x: data.length == 0 ? [0, 1440] : useTimestamp ? null : [0, 1440]
        //  }}
        domain={{
          y: [0, 3],
          x:
            typeof activityIntraday === "undefined"
              ? [0, 1440]
              : useTimestamp
              ? null
              : [0, 1440],
        }}
        // domain={{ x: [0, 1440] }}

        padding={{ top: 80, bottom: 40, left: 30, right: 60 }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            mouseFollowTooltips
            labels={({ datum }) =>
              `${ACTIVITIES[datum.y]} at ${new Date(
                0,
                0,
                0,
                datum.x / 60,
                datum.x % 60
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}`
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
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#F33A6E" />
            <Stop offset="50%" stopColor="#7BC3FD" />
            <Stop offset="100%" stopColor="#144AA4" />
          </LinearGradient>
        </Defs>

        {victoryLineChartData.map((sequence, i) => (
          <VictoryLine
            key={i}
            animate={{ duration: 600 }}
            style={{
              grid: { stroke: "none" },
              data: { stroke: "url(#grad)", strokeWidth: 3 },
            }}
            interpolation="stepAfter"
            data={sequence}
          />
        ))}

        {victoryBarChartData.map((sequence, i) => (
          <VictoryBar
            key={i}
            animate={{ duration: 600 }}
            style={{
              grid: { stroke: "none" },
              data: { fill: "url(#grad)", width: 3 },
            }}
            data={sequence}
          />
        ))}

        {activityIntraday.length == 0 ? (
          <VictoryLabel
            x={DIMENSIONS.width / 2.1}
            y={CHART_HEIGHT / 2}
            textAnchor={"middle"}
            text={"No Data"}
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
          />
        ) : null}
        {loading ? (
          <VictoryLabel
            x={DIMENSIONS.width / 2.1}
            y={CHART_HEIGHT / 2}
            textAnchor={"middle"}
            text={"Loading"}
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
          />
        ) : null}
        <VictoryAxis
          tickLabelComponent={<VictoryLabel textAnchor="start" />}
          tickCount={3}
          tickFormat={(value) => {
            return ACTIVITIES[value];
          }}
          crossAxis={false}
          //fixLabelOverlap
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
            },
          }}
        />
      </VictoryChart>

      {activityIntraday.length > 0 && (
        <View
          className="flex-row items-center justify-between px-5 ml-5 absolute bottom-0 right-0"
          style={{ width: "95%" }}
        >
          <Text
            className="text-xs"
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#000000",
              opacity: 0.6,
            }}
          >
            00:00
          </Text>
          <Text
            className="text-xs"
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#000000",
              opacity: 0.6,
            }}
          >
            12:00
          </Text>
          <Text
            className="text-xs"
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#000000",
              opacity: 0.6,
            }}
          >
            24:00
          </Text>
        </View>
      )}
    </View>
  );
};

export default ActivityLineChart;
