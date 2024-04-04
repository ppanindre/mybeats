import moment from "moment";
import React from "react";
import { View, Dimensions } from "react-native";
import { Defs, Stop, LinearGradient } from "react-native-svg";
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

const ACTIVITIES = ["None", "Idle", "Light", "Active", "Intense"];

const NotificationActivityChart = ({
  data,
  useTimestamp = false,
  loading = false,
  isNotification = false,
}) => {
  return (
    <View>
      <VictoryChart
        height={CHART_HEIGHT}
        domain={{
          y: [1, 4],
          x: data.length == 0 ? [0, 1440] : useTimestamp ? null : [0, 1440],
        }}
        padding={{ top: 80, bottom: 40, left: 30, right: 60 }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            mouseFollowTooltips
            labels={({ datum }) =>
              `${ACTIVITIES[datum.y]} at ${moment(datum.x).format("hh:mm A")}`
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
        <VictoryLine
          animate={{ onLoad: { duration: 600 } }}
          style={{
            grid: { stroke: "none" },
            data: { stroke: "url(#grad)", strokeWidth: 3 },
          }}
          interpolation={"stepAfter"}
          data={data}
        />

        <VictoryAxis
          tickLabelComponent={<VictoryLabel textAnchor={"end"} />}
          style={{
            tickLabels: { fontSize: 11, margin: 4, fontWeight: "bold" },
            axis: { stroke: "none" },
            grid: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
          }}
          tickFormat={(value) =>
            useTimestamp
              ? moment(value).format("HH:mm")
              : moment().startOf("d").add(value, "minute").format("HH:mm")
          }
          tickCount={isNotification ? 5 : 5}

          //fixLabelOverlap
        />
        {data.length == 0 && !loading ? (
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
    </View>
  );
};

export default NotificationActivityChart;
