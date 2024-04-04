import React from "react";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { View, Dimensions } from "react-native";
import moment from "moment";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

const DIMENSIONS = Dimensions.get("window");
const CHART_HEIGHT = 300;

const SLEEP_TYPE = ["Deep", "Light", "REM", "Awake"];

export const NotificationSleepChart = ({ data = [], loading = false }) => {
  //alert(JSON.stringify(data))
  let showData = true;
  let unique = data.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  return (
    <View>
      <VictoryChart
        height={CHART_HEIGHT}
        domain={{
          y: [1, 5],
          x: data.length <= 10 || unique.length == 1 ? [0, 1440] : null,
        }}
        minDomain={{ y: 1 }}
        padding={{ top: 0, bottom: 40, left: 30, right: 60 }}
        theme={VictoryTheme.material}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#F33A6E" />
            <Stop offset="50%" stopColor="#7BC3FD" />
            <Stop offset="100%" stopColor="#144AA4" />
          </LinearGradient>
        </Defs>

        <VictoryLine
          animate={{ onLoad: { duration: 600 } }}
          style={{
            grid: { stroke: "none" },
            data: { stroke: "url(#grad)", strokeWidth: 3 },
          }}
          interpolation={"stepAfter"}
          data={data.length > 10 && unique.length > 1 ? data : []}
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel textAnchor="end" />}
          tickFormat={(value) =>
            moment().startOf("d").add(value, "minute").format("HH:mm")
          }
          tickCount={5}
          style={{
            tickLabels: { fontSize: 11, margin: 4, fontWeight: "bold" },
            axis: { stroke: "none" },
            grid: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
          }}
          fixLabelOverlap
        />
        {(data.length <= 10 || unique.length == 1) && !loading ? (
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
    </View>
  );
};
