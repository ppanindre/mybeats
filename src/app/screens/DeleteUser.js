import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as Sentry from "@sentry/react-native";

import { firebaseCollections } from "../../../constants/firebaseCollections";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";
import OTPTextInput from "../../../components/OTPTextInput";

const DeleteUser = () => {
  // get user listener
  const user = useSelector((state) => state.UserReducer);

  const [isLoading, setIsLoading] = useState(false); // delete otp logic
  const [resendCooldown, setResendCooldown] = useState(0); // the resend cooldown counter
  const [errorMessage, setErrorMessage] = useState(""); // error message for delete logic

  const navigation = useNavigation(); //  navigation instance

  useEffect(() => {
    if (resendCooldown > 0) {
      const countdownInterval = setInterval(() => {
        setResendCooldown((prevCount) => prevCount - 1); // resend cooldown
      }, 1000); // Update every second

      // Clear the interval when the component is unmounted or when the cooldown is over
      return () => clearInterval(countdownInterval);
    }
  }, [resendCooldown]);

  // resend otp
  const resendOtp = async () => {
    setIsLoading(true); // set loading to true
    try {
      await axios.get(
        "https://us-central1-firebeats-43aaf.cloudfunctions.net/sendDeleteUserMailFunction?email=" +
          user.email
      ); // send the delete mail
      setIsLoading(false); // set the delete loading to false
      setResendCooldown(30); // start the resend cooldown
    } catch (error) {
      // capture error through sentry
      Sentry.captureException(error, {
        extra: { message: "Error while sending the delete mail" },
      });
    }
  };

  // handle otp change
  const handleOtpChange = (otp) => {
    // if otp is entered, validate the otp
    if (otp.length === 6) {
      validateOtp(otp);
    } else {
      setErrorMessage(""); // reset the error message
    }
  };

  // function to validate otp
  const validateOtp = async (enteredOtp) => {
    // get the otp snap
    const snap = await firestore()
      .collection(firebaseCollections.OTP_COLLECTION)
      .doc(user.email)
      .get();

    // if snap exists
    if (snap.exists) {
      // if otp is valid
      if (enteredOtp === snap.data().deleteOtp) {
        try {
          await auth().signInWithEmailAndPassword(
            user.email,
            snap.data().password
          ); // firebase requires recent sign in to delete account

          // delete the user account
          auth()
            .currentUser.delete()
            .then(() => {
              Alert.alert("", "Your account has been deleted"); // alert the user that account has been deleted
            })
            .catch((error) => {
              setErrorMessage(error.message);
              Sentry.captureException(error, {
                extra: { message: "Error while deleting account" },
              }); // set error message
            });
        } catch (error) {
          setErrorMessage(error.message);
          Sentry.captureException(error, {
            extra: { message: "Error while deleting the account" },
          }); // capture error
        }
      } else {
        setErrorMessage("Sorry! This not a valid OTP. Please try again. "); // show the error if otp is not valid
      }
    }
  };

  return (
    <CustomSafeView sentry-label="delete-user">
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()} // dismiss keyboard if user presses outside the input field
        style={{ height: "100%" }}
      >
        {/* Header */}
        <View className="items-center">
          <View
            className="p-10 gap-3 justify-center"
            style={{ height: "100%" }}
          >
            {/* Error Message */}
            <View>
              {errorMessage === "" && (
                <Text style={{ fontSize: 16 }} className="text-orange-400">
                  Please check your email and enter the OTP. If you have not
                  received the email, please check your spam folder or try again
                </Text>
              )}
            </View>
            
            {/* OTP input */}
            <View
              className="flex-row items-center justify-center"
              style={{ width: 325 }}
            >
              <OTPTextInput
                sentry-label="delete-user-otp"
                handleTextChange={(otp) => handleOtpChange(otp)}
              />
            </View>
            {errorMessage !== "" && (
              <Text className="text-red-600">{errorMessage}</Text>
            )}
            
            {/* resend-otp-btn */}
            <View style={{ width: 325 }}>
              <CustomButton
                sentry-label="resend-otp-btn"
                onPress={resendOtp}
                btnLabel={
                  isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : resendCooldown === 0 ? (
                    "Resend One-Time-Password (OTP)"
                  ) : (
                    `Resend One-Time-Password (${resendCooldown} sec)`
                  )
                }
                variant={resendCooldown === 0 ? "primary" : "disabled"}
              />

              {/* Back btn */}
              <CustomButton
                sentry-label="delete-otp-back-btn"
                variant="light"
                btnLabel="Back"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CustomSafeView>
  );
};

export default DeleteUser;
