import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native"; 
import { Divider } from "react-native-paper";

import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { customTheme } from "../constants/themeConstants";

const DIMENSIONS = Dimensions.get("window"); // get dimensions of the window
const CHART_HEIGHT = 320; // define chart height

const HeartRateTrend = ({ data, labels, isLoading }) => {
  const heartRateData = [...data]; // get heart rate data

  let isDataPresent = false; // is data present

  if (heartRateData.length > 0) {
    // if heart rate data exists
    isDataPresent = !heartRateData.every((subArray) =>
    subArray.every((value) => value === 0)
    );
  } 
    
  heartRateData.forEach((value, index) => {
    heartRateData[index] = [
      parseInt(parseFloat(value[0]).toFixed(0)),
      parseInt(parseFloat(Math.max(0, value[1] - value[0])).toFixed(0)),
      parseInt(parseFloat(Math.max(0, value[2] - value[1])).toFixed(0)),
    ];
  }); // get heart rate data

  let maximum = 0; // maximum
  heartRateData.forEach((data) => {
    if (maximum < data[0] + data[1] + data[2]) {
      maximum = data[0] + data[1] + data[2];
    }
  }); 

  const BLUE_COLOR = "#7BC3FD";
  const GREEN_COLOR = "#87BC24";
  const PINK_COLOR = "#F33A6E";

  return (
    <View sentry-label="heartrate-trend">
      
      {/* if trend chart is loading show activity indicator */}
      {isLoading ? (
      <View
          style={{ height: 300 }}
          className="flex items-center justify-center"
        >
          <ActivityIndicator color={customTheme.colors.primary} size={10} />
        </View>

      ) : (
        <VictoryChart
          domainPadding={25}
          domain={{ y: isDataPresent ? [40, maximum] : [40, 120] }}
          height={300}
          padding={{ top: 20, bottom: 40, left: 40, right: 60 }}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            fixLabelOverlap
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              grid: { stroke: "none" },
              tickLabels: { fontSize: 12, margin: 4, fontWeight: "bold" },
            }}
          />

          <VictoryAxis
            axisLabelComponent={
              <VictoryLabel
                dy={-15}
                style={{ fontSize: 10, fontWeight: "bold" }}
              />
            }
            label="BPM"
            tickLabelComponent={<VictoryLabel textAnchor="start" />}
            fixLabelOverlap
            dependentAxis
            tickCount={4}
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              grid: { stroke: "none" },
              tickLabels: {
                angle: -90,
                fontSize: 12,
                margin: 4,
                fontWeight: "bold",
              },
            }}
          />

          <VictoryStack colorScale={[BLUE_COLOR, GREEN_COLOR, PINK_COLOR]}>
            <VictoryBar
              barWidth={8}
              data={labels.map((data, index) => {
                return {
                  x: data,
                  y: heartRateData[index] ? heartRateData[index][0] ?? 0 : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={labels.map((data, index) => {
                return {
                  x: data,
                  y: heartRateData[index] ? heartRateData[index][1] ?? 0 : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={labels.map((data, index) => {
                return {
                  x: data,
                  y: heartRateData[index] ? heartRateData[index][2] ?? 0 : 0,
                };
              })}
            />
          </VictoryStack>

          {!isDataPresent && (
            <VictoryLabel
              x={DIMENSIONS.width / 2.1}
              y={CHART_HEIGHT / 2.5}
              textAnchor={"middle"}
              text={"No Data"}
              style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
            />
          )}
        </VictoryChart>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          margin: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: BLUE_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}> Resting</Text>
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
          <Text style={{ fontSize: 10, lineHeight: 14 }}> Average</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Divider
            style={{
              borderWidth: 9,
              width: 10,
              borderColor: PINK_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}> High</Text>
        </View>
      </View>
    </View>
  );
};

export default HeartRateTrend;
