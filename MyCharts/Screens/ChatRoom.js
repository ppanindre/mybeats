import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Amplify, { Storage } from "aws-amplify";

const ChatRoom = () => {
  const [progressText, setProgressText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [asset, setAsset] = useState(null);

  const selectFile = async () => {
    await launchImageLibrary({ mediaType: "mixed" }, (result) => {
      if (!result.assets) {
        Alert.alert(result.errorMessage);
        return;
      }
      setAsset(result.assets[0]);
    });
  };

  const fetchResourceFromURI = async (uri) => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };
  const uploadResource = async () => {
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);
    return Storage.put(asset.uri, img, {
      level: "public",
      contentType: asset.type,
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100
          )} %`
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`
        );
      },
    })
      .then((res) => {
        setProgressText("Upload Done: 100%");
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then((result) => console.log(result))
          .catch((err) => {
            setProgressText("Upload Error");
            console.log(err);
          });
      })
      .catch((err) => {
        setisLoading(false);
        setProgressText("Upload Error");
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectFile}>
        <Text style={styles.button}>SELECT {asset ? "ANOTHER" : ""} FILE</Text>
      </TouchableOpacity>
      {asset ? (
        asset.type.split("/")[0] === "image" ? (
          <Image
            style={styles.selectedImage}
            source={{ uri: asset?.uri ?? "" }}
          />
        ) : (
          <Image
            style={styles.selectedImage}
            source={{ uri: asset?.uri ?? "" }}
          />
        )
      ) : null}
      {asset && (
        <>
          <TouchableOpacity onPress={uploadResource}>
            <Text style={styles.button}>UPLOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAsset(null)}>
            <Text style={styles.cancelButton}>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )}
      <Text>{progressText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  uploadButtonContainer: {
    marginBottom: 16,
  },
  selectedImageContainer: {
    marginTop: 16,
  },
  selectedImageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 8,
  },
});

export default ChatRoom;
