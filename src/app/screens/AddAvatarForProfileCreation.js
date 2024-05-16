import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import CustomButton from "../../../components/CustomButton";
import CustomSafeView from "../../../components/CustomSafeView";

import { profileActionTypes } from "../../../store/ProfileReducer/ProfileActionTypes";
import { avatarList } from "../../../constants/avatarConstants";
import { customTheme } from "../../../constants/themeConstants";

const AddAvatarForProfileCreation = () => {
  // define dispatch & navigation instance
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedAvatar, setSelectedAvatar] = useState(null); // selected avatar

  // function to save avatar to the store
  const saveAvatar = async () => {
    // dispatch to the selected avatar to the reducer
    dispatch({
      type: profileActionTypes.ADD_AVATAR,
      payload: { selectedAvatar },
    });

    // navigate the user to profile creation
    navigation.navigate("profileCreation");
  };

  const renderAvatar = ({ item }) => {
    return (
      <View
        className={`rounded-full p-5 bg-gray-100 flex items-center justify-center mr-3 border-2 border-gray-100
      ${
        selectedAvatar &&
        selectedAvatar.id === item.id && // if the avatar is selected, display an orange border around the image
        "border-2 border-orange-400"
      }
      `}
      >
        {/* Button to select avatar */}
        <TouchableOpacity
          sentry-label="add-avatar-profile-select-avatar-btn"
          onPress={() => setSelectedAvatar(item)}
        >
          <Image source={item.imgSrc} style={{ height: 70, width: 70 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomSafeView sentry-label="add-avatar-profilecreation">
      {/* Header */}
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center justify-between gap-2">
          {/* Button to go back */}
          <TouchableOpacity
            sentry-label="add-avatar-profilecreation-back-btn"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon color={customTheme.colors.dark} />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text-2xl font-bold">Add Avatar</Text>
        </View>
      </View>

      {/* render the avatar list */}
      <View className="flex-1" style={{ width: "100%" }}>
        <FlatList
          data={avatarList}
          renderItem={renderAvatar}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
          }}
        />
      </View>

      {/* Button to save the selected avatar */}
      <View className="px-5 mt-5">
        <CustomButton
          sentry-label="add-avatar-profilecreation-save-btn"
          btnLabel="Save"
          variant="primary"
          onPress={saveAvatar}
        />
      </View>
    </CustomSafeView>
  );
};

export default AddAvatarForProfileCreation;
