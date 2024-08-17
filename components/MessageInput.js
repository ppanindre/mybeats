import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { theme } from "../tailwind.config";

const MessageInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
    <View
      className="p-5 flex-row items-center gap-2 shadow-md"
      style={{ width: "100%" }}
    >
      <TextInput
        className="flex-1 p-5 bg-darkSecondary rounded-full"
        placeholder="Enter your message"
        onChangeText={(message) => setMessage(message)}
        value={message}
      />
      <TouchableOpacity
        onPress={submitMessage}
        className="bg-primary rounded-full p-2 shadow-md"
      >
        <ChevronRightIcon color={theme.colors.light} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
