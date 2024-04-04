import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import moment from "moment";

const DIMENSIONS = Dimensions.get("window");  // get window dimensions
const CHART_HEIGHT = 290; // define chart height

const HeartRateDayChart = ({ chartData }) => {
  // STATES
  const [victoryChartData, setVictoryChartData] = useState([]); // set chart data
  const [maximum, setMaximum] = useState(140); // maximum y domain

  useEffect(() => {

    // get chart data in terms of x and y
    const modifiedChartData =
      chartData.length > 0
        ? chartData.map((data) => {
            const dataTime = moment(data.time, "HH:mm:ss").diff(
              moment().startOf("d"),
              "minute"
            );
            return {
              x: dataTime,
              y: data.value,
            };
          })
        : [];

    let maxValue = null;

    modifiedChartData.forEach((entry) => {
      if (maxValue === null || entry.y > maxValue) {
        maxValue = entry.y;
      }
    }); // get max value

    setMaximum(maxValue); // set the maximum y value
    const results = []; // define results
    let sliceStart = 0;

    for (let i = 0; i < modifiedChartData.length - 1; i++) {
      if (modifiedChartData[i + 1].x - modifiedChartData[i].x >= 15) {
        const chunk = modifiedChartData.slice(sliceStart, i + 1);
        sliceStart = i + 1;
        results.push(chunk);
      }
    }

    // Add the last chunk, if any
    if (sliceStart < modifiedChartData.length) {
      const lastChunk = modifiedChartData.slice(sliceStart);
      results.push(lastChunk);
    }

    const uniqueResults = [] // define unique results

    if (results.length > 0) {
      results.forEach((data) => {
        const uniqueSubData = [];
        for (let i = 0; i < data.length - 1; i++) {
          if (data[i].x !== data[i + 1].x) {
            uniqueSubData.push(data[i]);
          }
        }
        uniqueResults.push(uniqueSubData);
      });
    } // filter out duplicate data

    setVictoryChartData(uniqueResults); // set chart data
  }, [chartData]);

  // Convert minutes to hour time
  const minutesToTime = (index) => {
    const hours = Math.floor(index / 60);
    const minutes = index % 60;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

    // return the time in tooltip
    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  // Check if data is present
  const isDataPresent = victoryChartData.length > 0;

  return (
    <View style={{ width: "100%" }} className="relative">
      <VictoryChart
        domain={{ x: [0, 1440] }}
        minDomain={{
          y: 40,
        }} // minimum y domain
        maxDomain={{
          y: victoryChartData.length > 0 ? maximum : 140, // TODO set it to maximum of the heart rate
        }} // maximum domain
        theme={VictoryTheme.material}
        height={300}
        padding={{ top: 40, bottom: 40, left: 40, right: 60 }}
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
        {/* <VictoryAxis/> */}

        {victoryChartData.length > 0 &&
          victoryChartData.map((data, index) => (
            <VictoryLine
              key={index}
              style={{
                data: {
                  stroke: "url(#grad)",
                  strokeWidth: ({ active }) => (active ? 3 : 2),
                },
                parent: { border: "1px solid #ccc" },
                labels: { fill: "black", width: 28, fontSize: 14 },
              }}
              data={data}
            />
          ))}

        {!isDataPresent ? (
          <VictoryLabel
            x={DIMENSIONS.width / 2.1}
            y={CHART_HEIGHT / 2}
            textAnchor={"middle"}
            text={"No Data"}
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
          /> // victory label
        ) : null}
        <VictoryAxis
          axisLabelComponent={
            <VictoryLabel
              dy={-15}
              style={{ fontSize: 10, fontWeight: "bold" }}
            />
          }
          label="BPM"
          tickFormat={(value) => Math.round(parseFloat(value))}
          tickLabelComponent={<VictoryLabel textAnchor="middle" />}
          tickCount={5}
          fixLabelOverlap
          dependentAxis
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "transparent" },
            tickLabels: {
              angle: -90,
              fontSize: 12,
              margin: 4,
              fontWeight: "bold",
            },
            ticks: { stroke: "transparent" },
          }}
        />
      </VictoryChart>

      {/* Labels */}
      {chartData.length > 0 && (
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

export default HeartRateDayChart;
