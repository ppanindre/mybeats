import React from "react";
import { View, Dimensions, Text, ActivityIndicator } from "react-native";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { Divider } from "react-native-paper";

const DIMENSIONS = Dimensions.get("window"); // get window dimensions
const CHART_HEIGHT = 320;

const SleepTrend = (props) => {
  const BLUE_COLOR = "#7BC3FD";
  const YELLOW_COLOR = "#FFB200";
  const GREEN_COLOR = "#87BC24";
  const PINK_COLOR = "#F33A6E";

  let total = 0;
  props.data.forEach((value, index) => {
    total = total + value[0] + value[1] + value[2] + value[3];
  });

  const allZero = total == 0;

  return (
    <View sentry-label="sleep-trend">
      {props.isLoading ? (
        <View
          style={{ height: 300 }}
          className="flex items-center justify-center"
        >
          <ActivityIndicator color="orange" size={10} />
        </View>
      ) : (
        // Trend Chart
        <VictoryChart
          domainPadding={25}
          domain={{ y: props.data.length == 0 || allZero ? [200, 800] : null }}
          height={300}
          padding={{ top: 20, bottom: 40, left: 40, right: 60 }}
          theme={VictoryTheme.material}
        >
          <VictoryStack
            colorScale={[BLUE_COLOR, YELLOW_COLOR, GREEN_COLOR, PINK_COLOR]}
          >
            <VictoryBar
              barWidth={8}
              data={props.labels.map((data, index) => {
                return {
                  x: data,
                  y: props.data[index] ? props.data[index][0] ?? 0 : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={props.labels.map((data, index) => {
                return {
                  x: data,
                  y: props.data[index] ? props.data[index][1] ?? 0 : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={props.labels.map((data, index) => {
                return {
                  x: data,
                  y: props.data[index] ? props.data[index][2] ?? 0 : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={props.labels.map((data, index) => {
                return {
                  x: data,
                  y: props.data[index] ? props.data[index][3] ?? 0 : 0,
                };
              })}
            />
          </VictoryStack>

          {/* Labels */}
          {props.data.length == 0 ? (
            <VictoryLabel
              x={DIMENSIONS.width / 2.2}
              y={CHART_HEIGHT / 2}
              textAnchor={"middle"}
              text={"No Data"}
              style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
            />
          ) : null}

          <VictoryAxis
            fixLabelOverlap
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              grid: { stroke: "none" },
              tickLabels: { fontSize: 12, fontWeight: "bold" },
            }}
          />
          <VictoryAxis
            axisLabelComponent={
              <VictoryLabel
                dy={-15}
                style={{ fontSize: 10, fontWeight: "bold" }}
              />
            }
            label="TOTAL MINUTES"
            fixLabelOverlap
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              grid: { stroke: "none" },
              tickLabels: { angle: -90, fontSize: 12, fontWeight: "bold" },
            }}
          />
        </VictoryChart>
      )}

      <View className="flex-row itme-center justify-center m-5">
        <View className="flex-row items-center" style={{ marginRight: 10 }}>
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: BLUE_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}>Deep</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: YELLOW_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}>Light</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: GREEN_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}>REM</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: PINK_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}>Awake</Text>
        </View>
      </View>
    </View>
  );
};

export default SleepTrend;
