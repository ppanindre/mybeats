import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
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

const DIMENSIONS = Dimensions.get("window");
const CHART_HEIGHT = 290;
const SCREEN_WIDTH = Dimensions.get("window").width;


const MyChartsLineChart = ({
  data = [],
  unit = "ms",
  mode = "week", // week | month | year
}) => {
  const [chartData, setChartData] = useState([]);
  const [maxY, setMaxY] = useState(100);
  const [xLabels, setXLabels] = useState([]);
  const [xTickValues, setXTickValues] = useState([]);

  useEffect(() => {
    let labels = [];
    let ticks = [];

    if (mode === "week") {
      labels = [...Array(7)].map((_, i) =>
        moment().startOf("week").add(i, "days").format("ddd")
      );
      ticks = labels.map((_, i) => i);
    } else if (mode === "month") {
      const daysInMonth = 30; // fixed to 30 for dummy data
      labels = [...Array(daysInMonth)].map((_, i) => (i + 1).toString());
      ticks = [4, 9, 14, 19, 24, 29];
    } else if (mode === "year") {
      labels = [...Array(12)].map((_, i) => moment().month(i).format("MMM"));
      ticks = labels.map((_, i) => i);
    }

    const formatted = labels.map((label, index) => ({
      x: index,
      y: data[index] !== undefined ? data[index] : null,
      // tooltip: `${data[index]} ${unit} on ${label}`,
      tooltip: `${data[index]}`,
    }));

    const valuesOnly = formatted.map((d) => d.y).filter((v) => v !== null);
    const suggestedMax = unit === "steps" ? 10000 : 100;
    setMaxY(
      valuesOnly.length > 0
        ? Math.max(...valuesOnly, suggestedMax)
        : suggestedMax
    );
    setChartData(formatted);
    setXLabels(labels);
    setXTickValues(ticks);
  }, [data, mode, unit]);

  return (
    <View style={{ width: "100%" }} className="relative">
      <VictoryChart
        minDomain={{ y: 0 }}
        maxDomain={{ y: maxY }}
        theme={VictoryTheme.material}
        height={CHART_HEIGHT}
        domainPadding={{ x: [24, 24], y: 20 }}
        padding={{
          top: 20,
          bottom: 40,
          left: SCREEN_WIDTH * 0.15,
          right: SCREEN_WIDTH * 0.15,
        }}        
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            mouseFollowTooltips
            labels={({ datum }) => (datum.y !== null ? datum.tooltip : "")}
            labelComponent={
              <VictoryTooltip
                cornerRadius={10}
                pointerWidth={1}
                center={{ y: 40 }}
                flyoutStyle={{ fill: "white" }}
                style={{ fontSize: 12, fill: "#000" }}
              />
            }
          />
        }
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#E9B55E" stopOpacity={1} />
            <Stop offset="50%" stopColor="#CECF8A" />
            <Stop offset="75%" stopColor="#CFF66A" />
            <Stop offset="100%" stopColor="#4FC3F5" />
          </LinearGradient>
        </Defs>

        {chartData.every((d) => d.y !== null) ? (
          <VictoryLine
            data={chartData}
            style={{
              data: { stroke: "url(#grad)", strokeWidth: 2 },
            }}
          />
        ) : (
          <VictoryLabel
            x={DIMENSIONS.width / 2.1}
            y={CHART_HEIGHT / 2}
            textAnchor="middle"
            text="No Data"
            style={{
              fontSize: 16,
              fill: "#000",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          />
        )}

        <VictoryAxis
          tickValues={xTickValues}
          tickFormat={xTickValues.map((i) => xLabels[i])}
          fixLabelOverlap
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            grid: { stroke: "none" },
            tickLabels: {
              fontSize: 12,
              fontWeight: "bold",
              fill: "#333",
              padding: 8,
            },
          }}
        />

        <VictoryAxis
          dependentAxis
          offsetX={SCREEN_WIDTH * 0.10}
          tickFormat={(t) => `${Math.round(t)}`}
          axisLabelComponent={
            <VictoryLabel
              dy={-15}
              style={{ fontSize: 10, fontWeight: "bold" }}
            />
          }
          label={unit === "steps" ? "STEPS" : "MS"}
          fixLabelOverlap
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            grid: { stroke: "none" },
            tickLabels: {
              angle: -90,
              fontSize: 12,
              fontWeight: "bold",
              padding: 5,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default MyChartsLineChart;
