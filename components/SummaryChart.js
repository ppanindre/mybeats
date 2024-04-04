import React, { Fragment, useEffect } from "react";
import { View, Dimensions } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { VictoryPie } from "victory-native";
import Svg from "react-native-svg";

import InnerProgressChart from "./InnerProgressChart";
import {
  TourGuideZone,
  useTourGuideController,
} from "rn-tourguide";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width; // get screen width
const ICON_SIZE = 28; // icon size

// The outer radius of the Pie chart
// const PIE_CHART_RADIUS = screenWidth * 0.35;
const PIE_CHART_RADIUS = 150;

// The innner pie chart radius

// const PIE_CHART_INNER_RADIUS = PIE_CHART_RADIUS * 0.75;
const PIE_CHART_INNER_RADIUS = 112;
// Chart Height
// const CHART_HEIGHT = PIE_CHART_RADIUS * 2;
const CHART_HEIGHT = PIE_CHART_RADIUS * 2;
// const CHART_WIDTH = screenWidth * 0.8;
const CHART_WIDTH = screenWidth * 0.8;

//TODO , after pilot test calculate the calorie requirement per user.

const CALORIE_REQUIREMENT = 2000; // calorie requirement

const statusArray = [0.5, 1, 1, 1];
const data = Array.apply(null, Array(statusArray.length * 10)).map(
  Number.prototype.valueOf,
  1
);

const DashboardChart = ({
  loading,
  sedantary,
  calories,
  water,
  sleep,
  activity,
  heartrate,
  ring,
  steps,
}) => {
  // REDUX STORE
  const { showSkipDevice } = useSelector((state) => state.UserAuthReducer); // get boolean value for skip devioce

  const getStatus = () => {
    // If the data is not yet recieved, return loading
    if (loading) {
      return "Loading";
    }

    const totalActivity = activity; // Get total activity

    if (!totalActivity || totalActivity == "-") {
      return "-";
    }

    const percent = sedantary / totalActivity + sedantary; // get percentage

    // Logic clause of presenting activity
    if (percent > 0.6) {
      return "Sedantary";
    } else if (percent > 0.5 && percent < 0.6) {
      return "Midly Active";
    } else {
      return "Active";
    }
  };

  const getFill = (index) => {
    //TOTAL NUMBER OF INDEX IS 40
    if (loading) {
      return "#f8f8ff";
    }

    if ((index >= 25) & (index < 35)) {
      let currSleep = parseInt(sleep);
      const progress = statusArray[3] * 10;
      if (currSleep == 0) {
        return "#F0F0F0";
      } else if (currSleep >= 7 * 60 * 60) {
        return "#61677A";
      } else {
        const barsToFill = Math.floor((currSleep / (7 * 60 * 60)) * 10);
        if (index < 25 + barsToFill) {
          return "#61677A";
        }
        return "#F0F0F0";
      }
    } else if ((index >= 5) & (index < 15)) {
      const progress = statusArray[3] * 10;
      //5 is 0th index
      //14 is the last index
      const barsToFill = Math.floor(progress * (water / 100));

      // this will work for 34 - 39 indexes
      if (index < 5 + barsToFill) {
        return "#39A7FF";
      }
      return "#E0F4FF";
    }
    if ((index >= 15) & (index < 25)) {
      // const progress = 5
      //Grey
      const progress = statusArray[3] * 10;
      //35 is 0th index
      //4 is the last index, fill should start from 34
      const barsToFill = Math.round(
        progress * (calories / CALORIE_REQUIREMENT)
      );

      // this will work for 25 - 35 indexes
      if (index < 15 + barsToFill) {
        return "#79AC78";
      }
      return "#F2FFE9";
    } else if (index > 34 || index < 5) {
      //TODO revisit this.
      let totalActivity = activity;
      let toalBarsFill = 8 * 60;

      //const minutesFromDayStart = moment().diff(moment().startOf("d"), "minutes");
      //one should be active for 50% of the day
      //const requiredActivity = .5 * (minutesFromDayStart - );
      const barsToFill = Math.floor(10 * (totalActivity / toalBarsFill));

      if (index <= 34 + barsToFill && index > 4) {
        return "#FF6666";
      }

      const barsLeft = barsToFill - 5;
      if (index < barsLeft) {
        return "#FF6666";
      }
      return "#FFEADD";
    }
  };

  const getPieColor = () => data.map((_, index) => getFill(index));

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

  return (
    <Fragment>
      <View className="items-center justify-center" style={{ width: "100%" }}>
        <View
          className="relative items-center justify-center"
          style={{ height: 340, width: 370 }}
        >
          <View
            className="absolute bg-white p-2 z-20 rounded-full"
            style={{ left: 15, top: "43%" }}
          >
            <MaterialCommunityIcons
              name="power-sleep"
              // size={ICON_SIZE}
              size={30}
              color="grey"
            />
          </View>

          <View
            className="absolute bg-white p-2 z-20 rounded-full"
            style={{
              left: "44",
              top: 0,
            }}
          >
            <MaterialCommunityIcons name="run" size={30} color="#B21628" />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <Svg height={CHART_HEIGHT + 2} width={CHART_WIDTH}>
              <VictoryPie
                style={{
                  data: {
                    fillOpacity: 1,
                    stroke: "grey",
                    strokeWidth: 0.5,
                  },
                  labels: {
                    fontSize: 0,
                  },
                }}
                standalone={false}
                padAngle={4.5}
                innerRadius={PIE_CHART_INNER_RADIUS}
                colorScale={getPieColor()}
                radius={({ datum }) => {
                  let radius = 0;
                  if (
                    datum.x == 35 ||
                    datum.x == 5 ||
                    datum.x == 15 ||
                    datum.x == 25 ||
                    datum.x == 4 ||
                    datum.x == 14 ||
                    datum.x == 24 ||
                    datum.x == 34
                  ) {
                    radius = PIE_CHART_RADIUS;
                  } else {
                    radius = PIE_CHART_RADIUS - 15;
                  }
                  return radius;
                }}
                height={CHART_HEIGHT}
                width={CHART_WIDTH}
                data={data.map((value, index) => {
                  return { x: index, y: value, label: " " };
                })}
              />
              
              <TourGuideZone
                zone={8}
                isTourGuide
                text="These health rays will indicate your performace in the particular category"
                shape="circle"
              >

                <InnerProgressChart
                  ring={ring}
                  water={water}
                  calories={calories}
                  chartWidth={CHART_WIDTH}
                  chartHeight={CHART_HEIGHT}
                  heartrate={heartrate}
                  activity={activity}
                  steps={steps}
                  sleep={sleep}
                  radius={PIE_CHART_INNER_RADIUS}
                  loading={loading}
                  status={getStatus}
                  iconSize={ICON_SIZE}
                />
              </TourGuideZone>
            </Svg>
          </View>

          <View
            className="absolute bottom-0 bg-white p-2 z-20 rounded-full"
            style={{
              bottom: "1%",
              left: "43%",
            }}
          >
            <MaterialCommunityIcons
              name="food"
              size={ICON_SIZE}
              color="#79AC78"
            />
          </View>

          <View
            className="absolute bg-white p-2 z-20 rounded-full"
            style={{ right: 15, top: "43" }}
          >
            <MaterialCommunityIcons
              name="cup-water"
              size={ICON_SIZE}
              color="#0384fc"
            />
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default DashboardChart;
