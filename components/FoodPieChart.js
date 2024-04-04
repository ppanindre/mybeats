import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Divider } from "react-native-paper";
import { Circle, Svg, Text as SvgText } from "react-native-svg";
import { useSelector } from "react-redux";
import { VictoryPie, VictoryTheme } from "victory-native";

const  FoodPieChart = () => {
  const { foodData } = useSelector((state) => state.FoodReducer);

  let totalCal = 0;
  if (foodData) {
    totalCal =
      foodData["fat"] * 9 +
      foodData["carbs"] * 4 +
      foodData["protein"] * 4 +
      foodData["uncategorized"];
  }

  //if no macro values are present then we show message to the user
  const [noMacros, setNoMacros] = useState(false);

  useEffect(() => {
    setNoMacros(false);
  }, []);

  let data;
  if (!noMacros && foodData !== undefined) {
    data = Object.keys(foodData)?.map((key, _) => {
      let total = totalCal;
      let value = 0;
      if (key == "fat") {
        value = foodData[key] * 9;
        let nutrientPercent = (value / total) * 100;
        return {
          x: key,
          y: nutrientPercent,
        };
      } else if (key == "carbs" || key == "protein") {
        value = foodData[key] * 4;

        let nutrientPercent = (value / total) * 100;
        return {
          x: key,
          y: nutrientPercent,
        };
      } else if (key == "uncategorized") {
        value = foodData[key];
        let nutrientPercent = (value / total) * 100;

        return {
          x: key,
          y: nutrientPercent,
        };
      }

      return {
        x: key,
        y: 0,
      };
    });
  } else {
    data = [
      {
        key: "empty",
        value: 200,
        svg: { fill: "red" },
      },
    ];
  }

  const selectedKeys = ["uncategorized", "fat", "protein", "carbs"];

  data = data.filter((item) => selectedKeys.includes(item.x));

  const BLUE_COLOR = "#7BC3FD";
  const YELLOW_COLOR = "#FFB200";
  const GREEN_COLOR = "#87BC24";
  const PINK_COLOR = "#F33A6E";

  return (
    <View className="flex-1 items-center justify-center">
      {(foodData?.uncategorized ?? 0) == 0 &&
      (isNaN(totalCal) || totalCal == 0) ? (
        <View
          style={{
            minHeight: 265,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/nofood.png")} />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }}>
            No Data
          </Text>
        </View>
      ) : (
        <View>
          <Svg width={320} height={265}>
            <Circle cx={162} cy={140} r={50} fill="white" />
            <SvgText
              x={138}
              y={141}
              text-anchor="middle"
              stroke="#424242"
              stroke-width="1px"
              alignment-baseline="middle"
              fontSize={18}
              //Todo font color
            >
              {" "}
              {foodData?.calories ?? 0}
            </SvgText>

            <SvgText
              x={133}
              y={158}
              text-anchor="middle"
              stroke="#424242"
              stroke-width="1px"
              alignment-baseline="middle"
              fontSize={14}
            >
              {" "}
              Calories
            </SvgText>

            <VictoryPie
              theme={VictoryTheme.material}
              height={300}
              colorScale={[BLUE_COLOR, PINK_COLOR, GREEN_COLOR, YELLOW_COLOR]}
              innerRadius={70}
              padAngle={data.filter((item) => item.y !== 0).length == 1 ? 0 : 3}
              radius={100}
              labelRadius={({ innerRadius }) => innerRadius + 35}
              labels={({ datum }) => {
                const value = foodData[datum.x];

                const multiplier = {
                  fat: 9,
                  carbs: 4,
                  protein: 4,
                  uncategorized: 1,
                };
                return value !== 0 ? value * multiplier[datum.x] : "   ";
              }}
              style={{
                labels: { fill: "#4a4a4a", fontSize: 14, fontWeight: "bold" },
              }}
              padding={{ top: 20, bottom: 40, left: 10, right: 100 }}
              containerComponent={<Svg />}
              data={data}
            />
          </Svg>
        </View>
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
          <Text style={{ fontSize: 10, lineHeight: 14 }}>Protein</Text>
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
              borderColor: PINK_COLOR,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, lineHeight: 14 }}>Fat</Text>
        </View>
      </View>
    </View>
  );
};

export default FoodPieChart;
