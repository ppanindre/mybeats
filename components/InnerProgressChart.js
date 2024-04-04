import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import { useSelector } from "react-redux";

const FONT_SIZE = 13;

const toHHMMSS = (secs) => {
  if (secs == "0") {
    return "-";
  }
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return hours + " hr " + minutes + " min";
};

const InnerProgressChart = ({
  heartrate,
  activity,
  sleep,
  chartWidth,
  chartHeight,
  steps,
  radius,
  iconSize,
  water,
  calories,
  ring,
  loading,
}) => {
  const referenceX = chartWidth / 2;
  const referenceY = chartHeight / 2;
  const sleepText = toHHMMSS(sleep);
  const sleepXDelta = sleepText == "-" ? 0.3 * radius : 0.5 * radius;

  const { height, width } = useWindowDimensions();

  const { showSkipDevice } = useSelector((state) => state.UserAuthReducer);

  //animated value
  const [loadAnim, setLoadAnim] = useState(2 * Math.PI * radius);
  const currentLoadAnim = useRef(loadAnim);

  // Declare Tour guide hook
  const { canStart, start, stop, eventEmitter } = useTourGuideController();

  // Tour guide
  useEffect(() => {
    if (canStart && showSkipDevice) {
      start();
    }
  }, [canStart]);

  const handleOnStart = () => console.log("start");
  const handleOnStop = () => console.log("stop");
  const handleOnStepChange = () => console.log(`stepChange`);

  useEffect(() => {
    eventEmitter.on("start", handleOnStart);
    eventEmitter.on("stop", handleOnStop);
    eventEmitter.on("stepChange", handleOnStepChange);

    return () => {
      eventEmitter.off("start", handleOnStart);
      eventEmitter.off("stop", handleOnStop);
      eventEmitter.off("stepChange", handleOnStepChange);
    };
  }, []);

  //update the red since it will be called from an async operation.
  useEffect(() => {
    currentLoadAnim.current = loadAnim;
  }, [loadAnim]);

  //animation on loading
  useEffect(() => {
    let interval = null;
    if (loading) {
      interval = setInterval(() => {
        setLoadAnim(currentLoadAnim.current + 0.05 * (2 * Math.PI * radius));
      });
    } else {
      if (interval) {
        clearInterval(interval);
      }
      setLoadAnim(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading]);

  return (
    <View className="realtive">
      <View className="absolute z-50" style={{ left: "16%", top: "12%" }}>
        <TourGuideZone
          zone={9}
          text="This health ring will turn green, yellow, or red based on your health indicators"
          shape="circle"
        >
          <View
            className="bg-transparent rounded-full"
            style={{ height: chartHeight / 1.3, width: chartWidth / 1.46 }}
          ></View>
        </TourGuideZone>
      </View>

      <Circle
        x={referenceX}
        y={referenceY}
        r={radius - 5}
        stroke={ring}
        strokeWidth={5}
        strokeDasharray={2 * Math.PI * radius}
        strokeDashoffset={loadAnim}
        strokeLinecap="round"
      />

      <Circle
        x={referenceX}
        y={referenceY}
        r={radius}
        fill="green"
        opacity={0.1}
        strokeDashoffset={0}
      />

      <Circle x={referenceX} y={referenceY} r={radius - 8} fill="#CCE6D0" />
      <Circle
        x={referenceX}
        y={referenceY}
        r={radius - 15}
        fill="white"
        opacity={0.5}
      />
      <Svg width={chartWidth} height={chartHeight}>
        {/* Outer ring */}
        <Circle
          cx={referenceX}
          cy={referenceY}
          r={radius - 5}
          stroke={ring}
          strokeWidth={5}
        />

        {/* Inner circle */}
        <Circle cx={referenceX} cy={referenceY} r={radius} opacity={0.1} />

        {/* Circles */}
        <Circle cx={referenceX} cy={referenceY} r={radius - 8} fill="#ffedd5" />

        <Circle
          cx={referenceX}
          cy={referenceY}
          r={radius - 15}
          fill="#ffedd5"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            position: "absolute",
            gap: 10,
            top: 66,
            left: width * 0.32,
            // width: 250,
            // height: 250,
          }}
        >
          <View>
            <View className="flex-row items-center space-x-3">
              <FontAwesome
                name="heartbeat"
                size={iconSize}
                color="#fb923c"
                // style={{position: "absolute", top: 0, left: -27}}
              />
              <Text
                className="text-orange-400"
                // style={{right: -27, top: 5}}
              >
                {loading ? "" : heartrate}
              </Text>
            </View>
          </View>
        </View>

        {/* Second row icons and text */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            gap: 10,
            // top: referenceY - 0.35 * radius,
            // left: referenceX - 1.2 * radius,
            top: 106,
            left: width * 0.25,
            // width: 250,
            // height: 250,
          }}
        >
          <View className="relative">
            <View
              className="flex-row items-center space-x-1"
              style={{ width: 60 }}
            >
              <MaterialIcons
                name="directions-walk"
                size={iconSize}
                color="#fb923c"
              />
              <Text
                style={{
                  color: "#fb923c",
                  fontSize: FONT_SIZE,
                  textAlign: "center",
                }}
              >
                {loading ? "" : steps}
              </Text>
            </View>
          </View>

          <View>
            <View
              className="flex-row items-center space-x-1"
              style={{ width: 60 }}
            >
              <MaterialIcons name="flash-on" size={iconSize} color="#fb923c" />
              <Text
                style={{
                  color: "#fb923c",
                  fontSize: FONT_SIZE,
                  textAlign: "center",
                }}
              >
                {loading ? "" : activity}
              </Text>
            </View>
          </View>
        </View>

        {/* Third row icons and text */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            position: "absolute",
            top: 146,
            left: width * 0.25,
            // width: 250,
            // height: 250,
          }}
        >
          <View>
            <View
              className="flex-row items-center space-x-1"
              style={{ width: 60 }}
            >
              <MaterialCommunityIcons
                name="cup-water"
                size={iconSize}
                color="#fb923c"
              />
              <Text
                style={{
                  color: "#fb923c",
                  fontSize: FONT_SIZE,
                  textAlign: "center",
                }}
              >
                {loading ? "" : water}
              </Text>
            </View>
          </View>

          <View>
            <View
              className="flex-row items-center space-x-1"
              style={{ width: 60 }}
            >
              <MaterialCommunityIcons
                name="food"
                size={iconSize}
                color="#fb923c"
              />
              <Text
                style={{
                  color: "#fb923c",
                  fontSize: calories == "" ? FONT_SIZE : FONT_SIZE,
                  textAlign: "center",
                }}
              >
                {loading ? "" : calories}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            position: "absolute",
            top: 135,
            left: width * 0.32,
            // width: 250,
            // height: 250,
          }}
        >
          <View
            style={{
              alignItems: "center",
              position: "relative",
              top: 0.5 * radius,
            }}
          >
            <View className="flex-row items-center" style={{ width: 80 }}>
              <MaterialCommunityIcons
                name="power-sleep"
                size={iconSize}
                color="#fb923c"
              />
              <Text
                style={{
                  color: "#fb923c",
                  fontSize: FONT_SIZE * 0.9,
                  textAlign: "center",
                }}
              >
                {loading ? "" : sleepText}
              </Text>
            </View>
          </View>
        </View>
      </Svg>
    </View>
  );
};

export default InnerProgressChart;
