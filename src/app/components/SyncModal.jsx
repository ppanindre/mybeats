import { View, Text, Modal, Pressable, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Animation from "../../../assets/animation.gif"

const SyncModal = ({ visible, onClose, points, pointsAdded }) => {
  // Define medal tiers in ascending order
  const medalTiers = [
    { name: "Bronze", threshold: 100, color: "#cd7f32" },
    { name: "Silver", threshold: 200, color: "#c0c0c0" },
    { name: "Gold", threshold: 300, color: "#FFD700" },
  ];

  // Find the next medal the user can achieve
  const nextMedal = medalTiers.find((tier) => points < tier.threshold);
  const pointsToNext = nextMedal ? nextMedal.threshold - points : 0;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        className="flex-1 bg-dark/50 justify-center items-center px-5"
      >
        <Pressable
          className="bg-light rounded-2xl w-full max-w-sm items-center space-y-3"
          onPress={() => {}}
        >
          <ImageBackground
            source={Animation}
            className="py-10 px-5 items-center"
          >
            <Text className="text-xl font-bold text-center mb-2">
              Congratulations!
            </Text>
            <Text className="text-center text-xl mb-4">
              You earned{" "}
              <Text className="text-primary font-bold">
                {pointsAdded} points
              </Text>
            </Text>

            {points < 300 ? (
              <View className="flex flex-row items-center space-x-2 mt-3">
                <Text className="text-xl">
                  Just {pointsToNext} points to go for
                </Text>
                <MaterialCommunityIcons
                  name="medal"
                  size={20}
                  color={nextMedal.color}
                />
                <Text className="text-xl font-bold">{nextMedal.name}</Text>
              </View>
            ) : (
              <Text className="text-xl font-bold mt-5 text-primary">
                You've earned the Gold medal!
              </Text>
            )}
          </ImageBackground>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SyncModal;
