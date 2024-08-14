import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import CustomButton from "../../../components/CustomButton";
import CustomSafeView from "../../../components/CustomSafeView";

import { avatarList } from "../../../constants/avatarConstants";
import { userQueries } from "../../../apis/userQueries";
import { customTheme } from "../../../constants/themeConstants";


const AddAvatar = () => {
  // get user listener
  const user = useSelector((state) => state.UserReducer);

  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar ?? null); // get selected avatar

  // define navigation instance
  const navigation = useNavigation();

  // save avatar to firestore
  const saveAvatar = async () => {
    await userQueries.setAvatar(user.userId, selectedAvatar); // set avatar to firebase
    navigation.navigate("editProfile"); // navigate user to edit profile
  };

  const renderAvatar = ({ item }) => {
    return (
      // render avatar
      <View
        className={`rounded-full p-5 bg-gray-100 flex items-center justify-center mr-3 border-2 border-gray-100
      ${
        selectedAvatar &&
        selectedAvatar.id === item.id && // if the avatar is selected, have a orange border around it
        "border-2 border-orange-400"
      }
      `}
      >
        {/* you can select the iamge avatar */}
        <TouchableOpacity
          sentry-label="add-avatar-select-avatar-btn"
          onPress={() => setSelectedAvatar(item)}
        >
          <Image source={item.imgSrc} style={{ height: 70, width: 70 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomSafeView sentry-label="add-avatar">
      {/* Header */}
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center justify-between gap-2">
          {/* go back button */}
          <TouchableOpacity
            sentry-label="add-avatar-back-btn"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon color={customTheme.colors.dark} />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text-2xl font-bold">Add Avatar</Text>
        </View>
      </View>

      <View className="flex-1" style={{ width: "100%" }}>
        {/* Avatars */}
        <View className="mt-3">
          {/* Render all the available avatars */}
          <FlatList
            data={avatarList}
            renderItem={renderAvatar}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </View>

      {/* Button to save the avatar */}
      <View className="px-5 mt-5">
        <CustomButton
          sentry-label="add-avatar-save-avatar-btn"
          variant="primary"
          btnLabel="Save"
          onPress={saveAvatar}
        />
      </View>
    </CustomSafeView>
  );
};

export default AddAvatar;
