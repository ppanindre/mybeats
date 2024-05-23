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
                    className="h-[150] w-[150] border-2 border-primary rounded-full items-center justify-center">
                    <PlusIcon color={theme.colors.primary} size={30} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProfileImageButton;
