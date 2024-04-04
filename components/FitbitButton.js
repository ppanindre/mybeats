import { Alert } from "react-native";
import React, { useEffect } from "react";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as Sentry from "@sentry/react-native";
import { useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import base64 from "react-native-base64";
import qs from "qs";

import AddDeviceButton from "./AddDeviceButton";
import { deviceQueries } from "../apis/deviceQueries";

WebBrowser.maybeCompleteAuthSession(); // for fitbit auth

const REGISTER_FITBIT_URL =
  "https://us-central1-firebeats-43aaf.cloudfunctions.net/registerFitbitFunction?userId=";

const VENDOR = "Fitbit";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
  tokenEndpoint: "https://api.fitbit.com/oauth2/token",
  revocationEndpoint: "https://api.fitbit.com/oauth2/revoke",
};

const FitbitButton = () => {
  // get user
  const { user } = useSelector((state) => state.UserAuthReducer);

  // define navigation instance
  const navigation = useNavigation();

  // fibit auth request schema
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: "code",
      clientId: "23BGCB",
      scopes: [
        "activity",
        "sleep",
        "heartrate",
        "profile",
        "nutrition",
        "settings",
        "weight",
      ],
      prompt: AuthSession.Prompt.Consent,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "com.vr1126.firebeats",
        path: "redirect",
      }),
    },
    discovery
  );

  // use effect for response received
  useEffect(() => {
    addFitbit(); // add fitbit when a response is generated through fitbit api
  }, [response]);

  const addFitbit = async () => {
    try {
      // if response from fitbit is successfull
      if (response?.type === "success") {
        const encodedAuth = base64.encode(
          "23BGCB:6424c66980012fbd22581c9dd0a61075"
        );

        // Body of the code
        const body = {
          client_id: "23BGCB",
          grant_type: "authorization_code",
          redirect_uri: AuthSession.makeRedirectUri({
            scheme: "com.vr1126.firebeats",
            path: "redirect",
          }),
          code: response.params.code,
          code_verifier: request.codeVerifier,
        };

        // get token response
        const tokenResponse = await axios.post(
          "https://api.fitbit.com/oauth2/token",
          qs.stringify(body),
          {
            headers: {
              Authorization: `Basic ${encodedAuth}`,
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        // get access token, refresh token
        const { access_token, refresh_token } = tokenResponse.data;

        // register fitbit through google cloud function
        await axios.get(
          `${REGISTER_FITBIT_URL}${user.uid}&vendorAccessToken=${access_token}`
        );

        // Setting vendor access & refresh token
        const vendorAccessToken = `${VENDOR}_accesstoken`;
        const vendorRefreshToken = `${VENDOR}_refreshToken`;

        // vendor data
        const vendorData = {
          vendor: VENDOR,
        };

        vendorData[vendorAccessToken] = access_token; // add access token to vendor data
        vendorData[vendorRefreshToken] = refresh_token; // add refresh token to vendor data

        await deviceQueries.addVendorToFirebase(user, vendorData); // add fitbit data to firebase

        Alert.alert("", "Your device has been added successfully!"); // alert user of device being added
        navigation.navigate("BottomTabNav"); // navigate to bottom tab nav
      }
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while getting response from fitbit api" },
      }); // capture error
      Alert.alert("", "Please try to add your fitbit device again"); // alert the user to add fitbit again
    }
  };

  return (
    <AddDeviceButton
      sentry-label="add-fitbit-btn"
      deviceName="Fitbit"
      btnIcon="fitbit"
      onPress={() => promptAsync()}
    />
  );
};

export default FitbitButton;
