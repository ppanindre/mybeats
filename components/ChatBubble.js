import { View, Text } from "react-native";
import React from "react";

const ChatBubble = ({ sender, message, time }) => {
  return (
    <View
      className={`${
        sender !== "admin" ? "self-end bg-orange-400" : "bg-orange-200"
      } relative mb-5 p-5 shadow-md rounded-lg`}
      style={{ width: "80%" }}
    >
      {/* Message */}
      <View
        style={{ bottom: -10 }}
        className={`${
          sender !== "admin" ? "right-5 bg-orange-400" : "left-5 bg-orange-200"
        } absolute h-5 w-5 rotate-45`}
      />
      <Text className={`${sender !== "admin" && "text-white"}`}>{message}</Text>
      
      {/* Time of message */}
      <Text
        className={`${
          sender !== "admin" ? "text-white font-light" : "font-extralight"
        } absolute bottom-2 right-2 text-xs`}
      >
        {time}
      </Text>
    </View>
  );
};

export default ChatBubble;