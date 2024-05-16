import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { incrementNotificationUnread } from "../../../apis/notificationQueries";

let listener = null;
const USER_TABLE = "user";

const SignInWithGarmin = ({}) => {
  // define navigation
  const navigation = useNavigation();
  const dimen = Dimensions.get("window");
  const [showWebview, setShowWebView] = useState(false);
  const [url, setUrl] = useState();

  const [uniqueId, setUniqueId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    createListener();
  }, []);

  writeToUserDatabase = (
    expiresIn,
    accessToken,
    refreshToken,
    vendor,
    user,
    email,
    code,
    uniqueId,
    otp
  ) => {
    const accessTokenVar = `${vendor}_accesstoken`;
    const refreshTokenVar = `${vendor}_refreshToken`;
    const obj = {
      otp: otp ?? "",
      uniqueId: uniqueId,
      code: code,
      email: email.toLowerCase(),
      userId: user.uid,
      joinDate: moment().toDate().getTime(),
      vendor: vendor ?? "",
      accessTokenExpiry: expiresIn ?? "",
      deviceRegistered: true,
      annon: this.props.annon ?? false,
      devices: [vendor],
    };
    obj[accessTokenVar] = accessToken ?? "";
    obj[refreshTokenVar] = refreshToken ?? "";
  };

  const createListener = () => {
    const uniqueId = (Math.random() * Math.random()).toString(36).substring(2);
    database().ref(`auth/${uniqueId}`).set({
      authComplete: false,
    });
    setUniqueId(uniqueId);

    listener = database()
      .ref(`auth/${uniqueId}`)
      .on("value", (snapshot) => {
        const data = snapshot.val();

        if (
          data?.vendor == "garmin" &&
          data?.authComplete &&
          data?.accessToken
        ) {
          const dataToWrite = {
            vendor: data?.vendor ?? "",
            devices: firestore.FieldValue.arrayUnion(data?.vendor ?? ""),
          };

          dataToWrite["garmin_accesstoken"] = data?.accessToken ?? "";
          dataToWrite["garmin_refreshToken"] = data?.refreshToken ?? "";

          const userId = auth().currentUser.uid;

          firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .update(dataToWrite)
            .then(async () => {
              axios.get(
                `https://us-central1-firebeats-43aaf.cloudfunctions.net/sendCustomMailFunction?docId=${userId}&type=1`
              );
              await firestore()
                .collection(USER_TABLE)
                .doc(userId)
                .collection("notification")
                .doc("summary")
                .collection("notifications")
                .add({
                  approved: true,
                  device: "garmin",
                  message: "Your device has been added successfully!",
                  timestamp: moment().toDate().getTime(),
                });

              Alert.alert("", "Your device has been added successfully!");

              await incrementNotificationUnread(userId);

              listener = null;
              navigation.navigate("BottomTabNav");
            })
            .catch((error) => {
              Alert.alert("", "Please terminate the app & try again.");
            });
          return;
        }

        if (data?.authComplete && data?.email && data?.password) {
          auth()
            .signInWithEmailAndPassword(data?.email, data?.password)
            .then((userCredential) => {
              writeToUserDatabase(
                data?.expiresIn,
                data?.accessToken,
                data?.refreshToken,
                data?.vendor,
                userCredential.user,
                data?.email,
                uniqueId,
                data?.otp
              );
            })
            .catch((error) => {
              Alert.alert("", "Please terminate the app & try again.");
            });
        }
      });
  };

  const onClick = async () => {
    setIsLoading(true);
    const GARMIN_AUTH_URL =
      "https://us-central1-firebeats-43aaf.cloudfunctions.net/garminAuthFunction?userId=";

    await axios
      .get(`${GARMIN_AUTH_URL}${uniqueId ?? ""}`)
      .then((resp) => {
        const data = resp.data;
        setShowWebView(true);
        setUrl(data.url);
      })
      .catch((err) => {
        console.error("Failed to complete Garmin auth", err);
      });
    setIsLoading(false);
  };

  return (
    <CustomSafeView sentry-label="sign-in-with-garmin">
      <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
        <TouchableOpacity sentry-label="garmin-back-btn" onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Sign in with Garmin</Text>
      </View>
      {showWebview ? (
        <View
          style={{
            height: dimen.height * 0.8,
            width: dimen.width,
            flex: 1,
          }}
        >
          <WebView
            style={{
              margin: 5,
              flex: 1,
            }}
            source={{ uri: url }}
            scalesPageToFit
            javaScriptEnabled
            startInLoadingState
            domStorageEnabled={true}
          />
        </View>
      ) : (
        <>
          <View className="p-5">
            <View></View>
            <View className="mb-5">
              <Text className="mb-2">Dear Firefighter,</Text>
              <Text className="text-md mb-2">
                To add your Garmin health tracker, follow the steps mentioned
                below.
              </Text>
              <Text className="mb-2">Step 1: Click on the button below.</Text>
              <Text className="mb-2">
                Step 2: Enter your Garmin account details.
              </Text>
              <Text className="mb-2">
                Step 3: Click on "Sign in" to complete authentication process.
              </Text>
            </View>
            <CustomButton
              sentry-label="garmin-next-btn"
              btnLabel={isLoading ? <ActivityIndicator color="#fff" /> : "Next"}
              variant="primary"
              onPress={onClick}
            />
          </View>
        </>
      )}
    </CustomSafeView>
  );
};

export default SignInWithGarmin;
