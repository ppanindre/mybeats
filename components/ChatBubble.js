import { View, Text } from "react-native";
import React from "react";

const ChatBubble = ({ sender, message, time }) => {
  return (
    <View
      className={`${
        sender !== "admin" ? "self-end bg-primary" : "bg-lightPrimary"
      } relative mb-5 p-5 shadow-md rounded-lg`}
      style={{ width: "80%" }}
    >
      {/* Message */}
      <View
        style={{ bottom: -10 }}
        className={`${
          sender !== "admin" ? "right-5 bg-primary" : "left-5 bg-lightPrimary"
        } absolute h-5 w-5 rotate-45`}
      />
      <Text className={`${sender !== "admin" && "text-light"}`}>{message}</Text>
      
      {/* Time of message */}
      <Text
        className={`${
          sender !== "admin" ? "text-light font-light" : "font-extralight"
        } absolute bottom-2 right-2 text-xs`}
      >
        {time}
      </Text>
    </View>
  );
};

export default ChatBubble;