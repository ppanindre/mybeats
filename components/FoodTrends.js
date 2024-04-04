import React from "react";
import { View, Dimensions, Text } from "react-native";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { Divider } from "react-native-paper";

const DIMENSIONS = Dimensions.get("window");
const CHART_HEIGHT = 320;

const BLUE_COLOR = "#7BC3FD";
const YELLOW_COLOR = "#FFB200";
const GREEN_COLOR = "#87BC24";
const PINK_COLOR = "#F33A6E";

export default class FoodTrends extends React.PureComponent {
  render() {
    let total = 0;
    this.props.data.length > 0 &&
      this.props.data.forEach((value, index) => {
        total = total + value[0] + value[1] + value[2] + value[3];
      });

    const allZero = total == 0;

    return (
      <View>
        <VictoryChart
          domainPadding={25}
          domain={{ y: this.props.data.length === 0 ? [500, 2000] : null }}
          height={300}
          padding={{ top: 0, bottom: 40, left: 40, right: 60 }}
          theme={VictoryTheme.material}
        >
          {allZero ? (
            <VictoryLabel
              x={DIMENSIONS.width / 2.2}
              y={CHART_HEIGHT / 2}
              textAnchor={"middle"}
              text={"No Data"}
              style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Roboto" }}
            />
          ) : null}
          <VictoryStack
            colorScale={[BLUE_COLOR, YELLOW_COLOR, GREEN_COLOR, PINK_COLOR]}
          >
            <VictoryBar
              barWidth={8}
              data={this.props.labels.map((data, index) => {
                return {
                  x: data,
                  y: this.props.data[index]
                    ? this.props.data[index][0] ?? 0
                    : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={this.props.labels.map((data, index) => {
                return {
                  x: data,
                  y: this.props.data[index]
                    ? this.props.data[index][1] * 4 ?? 0
                    : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={this.props.labels.map((data, index) => {
                return {
                  x: data,
                  y: this.props.data[index]
                    ? this.props.data[index][2] * 4 ?? 0
                    : 0,
                };
              })}
            />
            <VictoryBar
              barWidth={8}
              data={this.props.labels.map((data, index) => {
                return {
                  x: data,
                  y: this.props.data[index]
                    ? this.props.data[index][3] * 9 ?? 0
                    : 0,
                };
              })}
            />
          </VictoryStack>
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
            label="CALORIES"
            tickLabelComponent={<VictoryLabel />}
            fixLabelOverlap
            dependentAxis
            domain={[500, 2000]}
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
        </VictoryChart>
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
              alignItems: "center",
              marginRight: 10,
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
            <Text style={{ fontSize: 10, lineHeight: 14 }}>Unknown</Text>
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
            <Text style={{ fontSize: 10, lineHeight: 14 }}>Carbs</Text>
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
            <Text style={{ fontSize: 10, lineHeight: 14 }}>Protein</Text>
          </View>
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
                borderColor: PINK_COLOR,
                marginRight: 5,
              }}
            />
            <Text style={{ fontSize: 10, lineHeight: 14 }}>Fat</Text>
          </View>
        </View>
      </View>
    );
  }
}
