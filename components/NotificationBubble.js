import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDownIcon, TrashIcon } from "react-native-heroicons/outline";
import Swipeable from "react-native-gesture-handler/Swipeable";

const NotificationBubble = ({ id, message, time, onDelete, index }) => {
  // Renders the delete icon when the bubble is swiped to the left
  const renderRightActions = () => (
    <View className="flex-row items-center justify-center mb-5">
      <TrashIcon color="orange" size={28} />
    </View>
  );

  return (
    // Swipeable component
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={onDelete}
    >
      <View
        className={`flex-row items-center bg-light justify-between mb-5 rounded-lg gap-2`}
      >
        <View
          style={{
            borderWidth: 1,
          }}
          className={"p-5 flex-1 rounded-lg border-primary"}
        >
          <Text className="text-dark">
            {message}
          </Text>

          <Text className="absolute bottom-2 right-2 ">{time}</Text>


          {/* View more button */}
          <TouchableOpacity className="self-end flex-row items-center gap-2">
            <Text className="text-primary font-bold">View More</Text>
            <ChevronDownIcon color="orange" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default NotificationBubble;
