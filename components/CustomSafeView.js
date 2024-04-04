import { SafeAreaView, StyleSheet, Platform } from "react-native";
import React from "react";

import { customTheme } from "../constants/themeConstants";

const CustomSafeView = ({ children }) => {
  // Create an android style sheet for android
  const AndroidStyleSheet = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1, // set flex to 1
      backgroundColor: customTheme.colors.light, // set background color to light
    },
  });

  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? AndroidStyleSheet.AndroidSafeArea
          : { height: "100%", backgroundColor: customTheme.colors.light } // set style for ios systems
      }
    >
      {/* render the children of the safe view */}
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeView;
