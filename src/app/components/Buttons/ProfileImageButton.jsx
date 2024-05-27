import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import { theme } from "../../../../tailwind.config";

const ProfileImageButton = ({ imageUri, selectImage }) => {
    return (
        <View className="items-center">
            {imageUri ? (
                <TouchableOpacity onPress={selectImage}>
                    <Image
                        source={{ uri: imageUri }}
                        className="h-[150] w-[150] rounded-full border-2 border-primary"
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={selectImage}
                    className="h-[150] w-[150] border-2 border-lightPrimary rounded-full items-center justify-center">
                       <View
                      className="relative"
                      style={{ height: 150, width: 150 }}
                    >
                      <Image
                        source={require("../../assets/add-avatar.png")}
                        style={{ height: 150, width: 150 }}
                      />
                      <View
                        className="absolute z-30 bg-orange-400 rounded-md p-1"
                        style={{ top: 62, left: 35 }}
                      >
                        <Text className="text-white">Add Image</Text>
                      </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProfileImageButton;
