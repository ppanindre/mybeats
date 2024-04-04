import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#434343",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default class CustomTrendsDateComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let leftColor = this.props.disableLeft ? "white" : "#fb923d";
    let color = this.props.disableRight ? "white" : "#fb923d";
    return (
      <View className="mt-5 flex-row items-center justify-between">
        <TouchableOpacity
          disabled={this.props.isDataLoading}
          onPress={() =>
            this.props.disableLeft ? null : this.props.swipeFunction("left")
          }
        >
          <ChevronLeftIcon name="caretleft" color={leftColor} />
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-bold text-gray-800">
            {this.props.prevDate} - {this.props.date}
          </Text>
        </View>

        <TouchableOpacity
          disabled={this.props.isDataLoading}
          onPress={() => {
            !this.props.disableRight ? this.props.swipeFunction("right") : null;
          }}
        >
          <ChevronRightIcon
            name="caretright"
            color={color}
            // style={styles.arrowRight}
          />
          {/* <Text></Text> */}
        </TouchableOpacity>
      </View>
    );
  }
}
