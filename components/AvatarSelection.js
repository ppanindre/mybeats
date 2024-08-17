import { View } from "react-native";
import React from "react";
import { UserIcon } from "react-native-heroicons/solid";

const AvatarSelection = () => {
  return (
    <View
      sentry-label="avatar-selection-component"
      style={{
        width: 150,
        height: 150,
      }}
      className="bg-darkSecondary items-center justify-center rounded-full"
    >
      <UserIcon color="#888888" size={50} />
    </View>
  );
};

export default AvatarSelection;
