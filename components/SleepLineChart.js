import React from "react";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { View, Dimensions, Text } from "react-native";
import moment from "moment";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory-native";

const DIMENSIONS = Dimensions.get("window");
const CHART_HEIGHT = 300;

const SLEEP_TYPE = ["Deep", "Light", "REM", "Awake"];

const SleepChart = ({
  data = [],
  loading = false,
  labels,
  isPrevDataAppended,
  deviceSelected,
}) => {
  let lastDataPoint = 1440; // last data point

  if (data.length > 0) {
    if (data[0].length > 0) {
      lastDataPoint = data[data.length - 1];
      lastDataPoint = lastDataPoint[lastDataPoint.length - 1].x;
    }
  }

  const showTimeLabel = (timeString) => {
    const [hour, minute] = timeString.split(":").slice(0, 2); // Extract the hour and minute
    let ampm = "AM";
    let hour12 = parseInt(hour, 10);
    if (hour12 >= 12) {
      ampm = "PM";
      if (hour12 !== 12) {
        hour12 -= 12;
      }
    }

    const formattedTime = `${hour12}:${minute} ${ampm}`; // get formatted time
    return formattedTime;
  };

  let startTime =
    moment(labels[0], "HH:mm:ss").diff(moment().startOf("d"), "minute") - 1440;

  // Convert minutes to hour time
  const minutesToTime = (index) => {
    if (true) {
      if (isPrevDataAppended) {
        const startTimeSeconds = startTime * 60;
        console.log("index", index, startTimeSeconds);

        if (index + startTimeSeconds < 0) {
          index = 86400 - (index - startTimeSeconds);
        } else {
          console.log("start time seconds", startTimeSeconds);
          index += startTimeSeconds;
        }
      }

      const hours = Math.floor(index / 3600); // 3600 seconds in an hour
      const minutes = Math.floor((index % 3600) / 60);
      const seconds = index % 60;
      const period = hours < 12 ? "AM" : "PM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

      const formattedTime = `${formattedHours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")} ${period}`;

      return formattedTime;
    }

    if (isPrevDataAppended) {
      if (index + startTime < 0) {
        index = 1440 - (index - startTime);
      } else {
        index += startTime;
      }
    }

    const hours = Math.floor(index / 60);
    const minutes = index % 60;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  return (
    <View sentry-label="sleep-day-chart">
      <VictoryChart
        height={CHART_HEIGHT}
        domain={{
          y: [1, 5],
          x:
            data.length > 0 && data[0].length > 0
              ? [data[0][0].x, lastDataPoint]
              : null,
        }}
        minDomain={{ y: 1 }}
        padding={{ top: 0, bottom: 40, left: 30, right: 60 }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            mouseFollowTooltips
            labels={({ datum }) =>
              `${SLEEP_TYPE[datum.y - 1]} at ${minutesToTime(datum.x)}`
            }
            labelComponent={
              <VictoryTooltip
                cornerRadius={10}
                pointerWidth={1}
                center={{ y: 40 }}
                flyoutStyle={{ fill: "white" }}
              />
            } 
          /> // tooltop
        }
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#F33A6E" />
            <Stop offset="50%" stopColor="#7BC3FD" />
            <Stop offset="100%" stopColor="#144AA4" />
          </LinearGradient>
        </Defs>

        {data.length > 0 &&
          data.map((data, index) => (
            <VictoryLine
              key={index}
              animate={{ onLoad: { duration: 600 } }}
              style={{
                grid: { stroke: "none" },
                data: { stroke: "url(#grad)", strokeWidth: 3 },
              }}
              interpolation={"stepAfter"}
              data={data ? data : []}
            />
          ))}

        {data.length === 0 && !loading ? (
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
          tickValues={SLEEP_TYPE}
          crossAxis={false}
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
            },
          }}
        />
      </VictoryChart>
      
      {/* Sleep chart labels */}
      {data.length > 0 && (
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
            {labels.length > 0
              ? showTimeLabel(labels[0])
              : showTimeLabel("00:00:00")}
          </Text>
          <Text
            className="text-xs"
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#000000",
              opacity: 0.6,
            }}
          ></Text>
          <Text
            className="text-xs"
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#000000",
              opacity: 0.6,
            }}
          >
            {labels.length > 0 ? showTimeLabel(labels[1]) : "06:00"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SleepChart;
