import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import axios from "axios";
import * as Localization from "expo-localization";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/CustomButton";
import CustomSafeView from "../../../components/CustomSafeView";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { incrementNotificationUnread } from "../../../apis/notificationQueries";

const USER_TABLE = "user";

let listener = null;
const GFIT_AUTH_URL =
  "https://us-central1-firebeats-43aaf.cloudfunctions.net/googleAuthFunction?userId=";

const SignInWithGfit = () => {
  const { user } = useSelector((state) => state.UserAuthReducer);
  const navigation = useNavigation();

  const [loader, showLoader] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [uniqueId, setUniqueId] = useState("");

  const onCredRequired = (url) => {
    showLoader(true);
    // after 10 seconds the loader will dissapear.
    setTimeout(() => {
      showLoader(false);
    }, 10000);
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const onClick = () => {
    setIsLoading(true);

    axios
      .get(`${GFIT_AUTH_URL}${uniqueId ?? ""}`)
      .then((resp) => {
        const data = resp.data;
        onCredRequired(data.Location);
        setIsLoading(false);
      })
      .finally(() => {})
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("", "Oops!! Something went wrong. Please restart the app");
        console.error("Oops!! Something went wrong. Please restart the app", err);
      });
  };

  useEffect(() => {
    if (!listener) {
      createListener();
    }
  }, []);

  const writeToUserDatabase = (
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
    const refreshTokenVar = `${vendor}_accesstoken`;
    const obj = {
      otp: otp ?? "",
      uniqueId: uniqueId,
      code: code,
      email: email,
      userId: user.uid,
      joinDate: moment().toDate().getTime(),
      vendor: vendor,
      accessTokenExpiry: expiresIn,
      deviceRegistered: true,
      devices: [vendor],
    };
    obj[accessTokenVar] = accessToken;
    obj[refreshTokenVar] = refreshToken;

    firestore()
      .collection(USER_TABLE)
      .doc(user.uid)
      .set()
      .then(() => {
        axios.get(
          `https://us-central1-firebeats-43aaf.cloudfunctions.net/fetchGfitDataFunction?userId=${user.uid}&timezone=${Localization.timezone}`
        );
        // go to welcome screen after 1 second
        setTimeout(() => {
          listener = null;
          navigation.navigate("addDevice");
        }, 4000);
      })
      .catch((error) => alert(error));
  };

  // create an unique id and attach a listener such that the app knows when the auth flow is
  // successful when things happen in the backend .
  const createListener = () => {
    //write the data to the realtime database.
    const uniqueId = (Math.random() * Math.random()).toString(36).substring(2);
    database().ref(`auth/${uniqueId}`).set({
      authComplete: false,
    });
    setUniqueId(uniqueId);

    listener = database()
      .ref(`auth/${uniqueId}`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("asadsasd");
        console.log(data);
        if (data?.authComplete) {
          //alert("HERE")
          const accessTokenVar = `${data?.vendor}_accesstoken`;
          const refreshTokenVar = `${data?.vendor}_refreshToken`;
          const userId = user.uid;
          const obj = {
            vendor: data?.vendor,
            devices: firestore.FieldValue.arrayUnion(data?.vendor),
          };
          obj[accessTokenVar] = data?.accessToken;
          obj[refreshTokenVar] = data?.refreshToken;

          firestore()
            .collection(USER_TABLE)
            .doc(userId)
            .update(obj)
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
                  device: "gfit",
                  message: "Your device has been added succesfully!",
                  timestamp: moment().toDate().getTime(),
                  approvedTime: moment().toDate().getTime(),
                });

              listener = null;
              Alert.alert("", "Your device has been added successfully!")

              await incrementNotificationUnread(userId);

              navigation.navigate("BottomTabNav");
            })
            .catch((error) => {
              alert(error);
            });
          return;
        }
        console.log("gfit" + data?.authComplete);
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
              var errorMessage = error.message;
              alert(errorMessage);
            });
        }
      });
  };

  return (
    <CustomSafeView>
      {loader ? (
        <View>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <>
          <View>
            <View className="p-5 border-b-2 border-gray-200 flex-row items-center gap-2">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeftIcon color="#000000" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold">Sign in with Google Fit</Text>
            </View>
            <View className="p-5">
              <Text className="mb-2">Dear Firefighter,</Text>
              <Text className="text-md mb-2">
                Google Fit is a fitness app that is compatible with most health
                tracking devices. If you have a health tracker other than
                Fitbit, Garmin, or Apple watch, we request you to follow the
                steps mentioned below to add your health tracker in our app:
              </Text>
              <Text className="mb-2">
                Step 1: Install Google Fit app in your mobile phone with which
                your health tracker is synced.
              </Text>
              <Text className="mb-2">
                Step 2: Complete the login process in Google Fit app and select
                all the check boxes.
              </Text>
              <Text className="mb-2">
                Step 3: Make sure that your health tracker is also synced with
                Google Fit app.
              </Text>
              <Text className="mb-2">
                Step 4: Open FireBeats App in the same mobile device.
              </Text>
              <Text className="text-md mb-2">
                Step 5: Click on the button below and complete the login process
                with same Google Fit account.
              </Text>
              <View />
            </View>
          </View>
          <View className="px-5">
            <CustomButton
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

export default SignInWithGfit;
