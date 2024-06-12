import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileImageButton = ({imageUri, onSelectImage}) => {

    // pick image from gallery keep this function in image library
    // we need to declare it everywhere wherever we use the image library
    // component
    const selectImage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.error("ImagePicker Error: ", response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                onSelectImage(source.uri)
            }
        });
    };

    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={selectImage}
                className="h-[150] w-[150] border-2 border-lightPrimary rounded-full items-center justify-center"
            >
                <View className="relative" style={{ height: 150, width: 150 }}>
                    <Image
                        source={
                            imageUri
                                ? { uri: imageUri }
                                : require("../../assets/add-avatar.png")
                        }
                        className="h-[150] w-[150] rounded-full"
                    />
                    {!imageUri && (
                        <View
                            className="absolute z-30 bg-primary rounded-md p-1"
                            style={{ top: 62, left: 35 }}
                        >
                            <Text className="text-light">Add Image</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileImageButton;
