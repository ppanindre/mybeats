import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import auth from "@react-native-firebase/auth";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { userQueries } from "../../../apis/userQueries";
import { customTheme } from "../../../constants/themeConstants";


const Feedback = () => {
  // define navigation instance
  const navigation = useNavigation();

  // STATES
  const [feedbackInput, setFeedbackInput] = useState(""); // feedback input
  const [isLoading, setIsLoading] = useState(false); // loading when sending feedback

  // function to send feedback
  const sendFeedback = async () => {
    const userId = auth().currentUser.uid; // get user id
    setIsLoading(true); // show loading
    await userQueries.setFeedback(userId, feedbackInput); // send feedback
    setIsLoading(false); // stop showing loading

    Alert.alert("", "Thank you for sending us your feedback"); // alert user for sending feedback
    navigation.navigate("BottomTabNav"); // navigate user to main screen
  };

  return (
    <CustomSafeView sentry-label="feedback">
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()} // dismiss the keyboard when the input box is out of focus
        style={{ height: "100%" }}
      >
        <View>
          {/* Header */}
          <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
            <TouchableOpacity
              sentry-label="feedback-back-btn"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon color={customTheme.colors.dark} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold">Send Feedback</Text>
          </View>

          {/* Content */}
          <View className="p-5">
            <View className="mb-5">
              <Text className="text-lg">
                We appreciate your input! Your feedback is essential in
                enhancing our application. Please take a moment to share your
                thoughts with us. Your valuable insights help us make
                improvements and provide a better user experience. Thank you for
                being a part of our community!
              </Text>
            </View>

            {/* Feedback input */}
            <View className="mb-5">
              <TextInput
                className="border-2 border-gray-300 rounded-lg p-3 text-lg"
                onChangeText={(prevText) => setFeedbackInput(prevText)}
                multiline={true}
                numberOfLines={10}
                style={{ height: 200, textAlignVertical: "top" }}
              />
            </View>

            {/* Send Feedback button */}
            <CustomButton
              sentry-label="feedback-send-btn"
              onPress={sendFeedback}
              variant="primary"
              btnLabel={
                isLoading ? (
                  <ActivityIndicator color={customTheme.colors.light} />
                ) : (
                  "Send"
                )
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CustomSafeView>
  );
};

export default Feedback;
