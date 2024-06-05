import { SafeAreaView, StyleSheet, Platform } from "react-native";
import React from "react";

const CustomSafeView = ({ children }) => {
    // Create an android style sheet for android
    const AndroidStyleSheet = StyleSheet.create({
        AndroidSafeArea: {
            flex: 1, // set flex to 1
        },
    });

    return (
        <SafeAreaView
            className="bg-light"
            style={
                Platform.OS === "android"
                    ? AndroidStyleSheet.AndroidSafeArea
                    : { height: "100%" } // set style for ios systems
            }
        >
            {/* render the children of the safe view */}
            {children}
        </SafeAreaView>
    );
};

export default CustomSafeView;
