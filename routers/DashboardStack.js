import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Dashboard from "../screens/DashBoard";
import CustomSafeView from "../components/CustomSafeView";
import Food from "../screens/Food";
import Sleep from "../screens/Sleep";
import { customTheme } from "../constants/themeConstants";
import HeartRate from "../screens/HeartRate";
import NewActivity from "../screens/NewActivity";
import TopNavbar from "../components/Utilities/TopNavbar";


const DashboardStack = () => {
  // Create an instance of MaterialTopNavNavigator
  const Tab = createMaterialTopTabNavigator();

  // Declaring Icon color (Move this into a constants file so that we can call it form any other component **)
  const [iconColor, setIconColor] = useState(customTheme.colors.light)
  const iconSize = 22;


  // set the icon color to white to avoid the icon clustering
  useEffect(() => {  
    // Change icon color to primary color after 2 seconds
    const timeout = setTimeout(() => {
      setIconColor(customTheme.colors.primary);
    }, 100);
  
    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CustomSafeView>
      {/* Top navbar which presents the profile screen */}      
      <TopNavbar />

      {/* Navigator */}
      <Tab.Navigator
      initialRouteName="dashboard"
        sceneContainerStyle={{
          backgroundColor: customTheme.colors.light,
        }}
        screenOptions={{
          headerShown: false,
          showLabel: false,
          tabBarIndicatorStyle: {
            backgroundColor: iconColor,
          },
        }}
      >
        {/* Dashboard Screen */}
        <Tab.Screen
          component={Dashboard}
          name="dashboard"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <FontAwesome name="dashboard" color={iconColor} size={iconSize} />
            ),
          }}
        />

        {/* Heart Rate Screen */}
        <Tab.Screen
          component={HeartRate}
          name="heartrate"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <FontAwesome name="heartbeat" color={iconColor} size={iconSize} /> 
            ),
          }}
        />

        {/* Sleep Screen */}
        <Tab.Screen
          component={Sleep}
          name="sleep"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Ionicons name="moon-sharp" color={iconColor} size={iconSize} /> 
            ),
          }}
        />

        {/* Activity Screen */}
        <Tab.Screen
          component={NewActivity}
          name="activity"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <FontAwesome5 name="walking" color={iconColor} size={iconSize} />
            ),
          }}
        />

        {/* Food Screen */}
        <Tab.Screen
          component={Food}
          name="food"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="food"
                color={iconColor}
                size={iconSize}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </CustomSafeView>
  );
};

export default DashboardStack;
