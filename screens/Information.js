import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import CustomSafeView from "../components/CustomSafeView";
import { List } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  InformationCircleIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import TrendCardComponent from "../components/TrendCardComponent";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { userAuthActionTypes } from "../store/UserAuthReducer/UserAuthActionTypes";
import { useNavigation } from "@react-navigation/native";
import { customTheme } from "../constants/themeConstants";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const imageHeight = windowHeight * 0.35;
const imageWidth = windowWidth * 0.88

const listData = [
  {
    index: 0,
    title: "Summary Chart",
    image: (
      <Image
        source={require("../assets/dashboard.png")}
        style={{
          width: 300,
          height: 300,
        }}
      />
    ),
    content:
      "This chart is a daily summary of your activity level, calorie intake, water consumption, and sleep duration. The corresponding health rays will be filled throughout the day asthe application receive your data related to each category. Ifany of the categories cross the health risk thresholds thering color will change from green to yellow or red dependingon the risk level.",
  },
  {
    index: 1,
    title: "Health Card",
    image: (
      <View style={{width: 320}}>
        <TrendCardComponent
          title="Health Category"
          lastSyncDate={null}
          date={null}
          data={[
            {
              arrow: "caretdown",
              color: "red",
              title: "Value A",
              value: "Parameter A",
            },
            {
              arrow: "caretdown",
              color: "yellow",
              title: "Value B",
              value: "Parameter B",
            },
            {
              arrow: "caretup",
              color: "green",
              title: "Value C",
              value: "Parameter C",
            },
            { trendCardBarColor: "red" },
          ]}
        />
      </View>
    ),
    content:
      "The health card is a daily summary of a particular health category. It indicates the day and time at which the most recent data related to the category was received by the application. Values of certain critical parameters related to the health category are also provided. The arrows for each parameter provide a comparison of its present value with the corresponding previous value. You may be able to manually edit the data for certain health categories. Tapping on the card or the navigation arrow will take you to the screen providing more details of the health category. The color of the health line and the arrows will change from green to yellow or red depending on the risk level in the health category.",
  },
  {
    index: 2,
    title: "Heart Rate Chart",
    image: (
      <Image
        source={require("../assets/heartrate.png")}
        style={{ height: imageHeight, width: imageWidth }}
      />
    ),
    content:
      "The heart rate chart is a detailed view of your heart rates throughout the day. Upon tapping on the heart rate curve, the heart rate value at a particular instance will be shown.",
  },
  {
    index: 3,
    title: "Trend Chart",
    image: (
      <Image
        source={require("../assets/trend-chart.png")}
        style={{ height: imageHeight, width: imageWidth }}
      />
    ),
    content:
      "This chart provides weekly, monthly, or yearly trends of parameters related to a particular health category.",
  },
  {
    index: 4,
    title: "Sleep Chart",
    image: (
      <Image
        source={require("../assets/sleep.png")}
        style={{ height: imageHeight, width: imageWidth }}
      />
    ),
    content:
      "This chart depicts your sleep behavior by providing the sleep patterns throughout the sleep duration.",
  },
  {
    index: 5,
    title: "Activity Chart",
    image: (
      <Image
        source={require("../assets/activity.png")}
        style={{ height: imageHeight, width: imageWidth }}
      />
    ),
    content: "This chart provides your activity levels throughout the day.",
  },
  {
    index: 6,
    title: "Food Chart",
    image: (
      <Image
        source={require("../assets/food.png")}
        style={{ height: imageHeight, width: imageWidth }}
      />
    ),
    content:
      "This chart provides the percentage distribution of carbohydrates, fats, and proteins in your daily calorie intake.",
  },
];

const Information = () => {
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Set item value
  const [item, setItem] = useState(0);

  return (
    <CustomSafeView sentry-label="information">
      <View className="relative flex-1 bg-white" style={{ height: "100%" }}>
        {/* Header */}
        <View className="border-b-2 p-5 border-gray-200">
          <Text className="text-2xl font-bold">Information</Text>
        </View>

        {/* Information Content */}
        <View className="p-5">
          {/* hide vertical scroll bar */}
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: customTheme.colors.light,
              paddingBottom: 100,
            }}
            onContentSizeChange={() => {
              if (item !== -1 && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                  y: item * 75,
                  animated: true,
                });
              }
            }}
          >
            <View>
              <CustomButton
                sentry-label="information-tour-guide-btn"
                variant="primary"
                btnLabel="Tour Guide"
                onPress={() => {
                  console.log("hello tour guide")
                  dispatch({
                    type: userAuthActionTypes.START_TOUR_GUIDE,
                    payload: { startTourGuide: true },
                  });
                  navigation.navigate("dashboard")
                }
              }
              />
            </View>
            {listData.map((listItem) => (
              <List.Accordion
                sentry-label="info-list"
                key={listItem.index}
                title={listItem.title}
                expanded={item == listItem.index}
                style={{
                  backgroundColor: customTheme.colors.light,
                  borderBottomWidth: 2,
                  borderColor: customTheme.colors.primary,
                  marginBottom: 15,                  
                }}
                titleStyle={{
                  color: "#929797",
                  backgroundColor: customTheme.colors.light
                }}
                theme={{
                  colors: {
                    primary: customTheme.colors.primary,
                    background: customTheme.colors.light
                  },
                }}
                onPress={() => {
                  if (item != listItem.index) {
                    setItem(listItem.index);
                  } else {
                    setItem(-1);
                  }
                }}
              >
                <View className="mt-5 p-5">
                  <View className="p-5 items-center justify-center">
                    {listItem.image}
                  </View>
                  <Text>{listItem.content}</Text>
                </View>
              </List.Accordion>
            ))}

            <List.Accordion
              title="Navigation"
              expanded={item == 7}
              onPress={() => {
                if (item != 7) setItem(7);
                else setItem(-1);
              }}
              style={{
                backgroundColor: customTheme.colors.light,
                borderBottomWidth: 2,
                borderColor: customTheme.colors.primary,
                marginBottom: 15,
              }}
              titleStyle={{
                color: "#979797"
              }}
              theme={{
                colors: {
                  primary: customTheme.colors.primary,
                  background: customTheme.colors.light
                },
              }}
            >
              <View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap on {">"} or {"<"} to navigate to next or previous day
                  data.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="swipe" size={40} color="grey" />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Swipe left or right to view the details of each health
                  category.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                {/* Avatar icon */}
                <View className="items-center justify-center">
                  <UserIcon color="grey" size={40} />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to contact us if needed, provide feedback for the
                  application, and quit the participation.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <HomeIcon color="grey" size={40} />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to view the daily summary dashboard.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <InformationCircleIcon color="grey" size={40} />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to learn information about various charts
                  in the application.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ChatBubbleLeftIcon color="grey" size={40} />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to contact us.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BellIcon color="grey" size={40} />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to view all your notifications.
                </Text>

                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="heartbeat" size={40} color="grey" />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to view daily heart rate data.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="directions-walk"
                    size={40}
                    color="grey"
                  />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to view daily activity levels.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="power-sleep"
                    size={40}
                    color="grey"
                  />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to view daily sleep behavior.
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons name="food" size={40} color="grey" />
                </View>
                <Text style={{ textAlign: "center", margin: 20 }}>
                  Tap here to navigate to view details of daily calorie intake
                  and water consumption.
                </Text>
              </View>
            </List.Accordion>
          </ScrollView>
        </View>
      </View>
    </CustomSafeView>
  );
};

export default Information;