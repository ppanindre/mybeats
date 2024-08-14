import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Sentry from "@sentry/react-native";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomButton from "../../../components/CustomButton";
import OTPTextInput from "../../../components/OTPTextInput";

import { userQueries } from "../../../apis/userQueries";
import { customTheme } from "../../../constants/themeConstants";


const EnterOtp = () => {
  // get the email that the user entered to submit otp
  const { emailForOtp } = useSelector((state) => state.UserAuthReducer);

  // set states for the components
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");

  const otpRef = useRef(null);

  // Declare dispath and navigation
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
      // If the resend cool down is more than 0
      if (resendCooldown > 0) {
          const countdownInterval = setInterval(() => {
              // Decrease the cooldown counter
              setResendCooldown((prevCount) => prevCount - 1);
          }, 1000); // Update every second

          // Clear the interval when the component is unmounted or when the cooldown is over
          return () => clearInterval(countdownInterval);
      }
  }, [resendCooldown]);

  // resend otp function
  const resendOtp = async () => {
      // when we resend the otp the button starts loading
      setIsLoading(true);

      clearText();

      // cfdpoly = testing email
      if (emailForOtp !== "cfdpoly@gmail.com") {
          // send the otp again to the email
          try {
              await axios.get(
                  "https://us-central1-firebeats-43aaf.cloudfunctions.net/sendLoginMailFunction?email=" +
                      emailForOtp
              );
          } catch (error) {
              // send the error to Sentry
              Sentry.captureException(error);
          }
      }

      // after we have sent the otp, set loading to false
      setIsLoading(false);

      // set the cooldown to 30s (change the paramter to increase or decrease cooldown)
      setResendCooldown(30);
  };

  // function to handle otp change
  const handleOtpChange = async (otp) => {
      // if user has entered all the 6 digits for the otp, automatically validate the otp
      if (otp.length === 6) {
          // get the error message if an error is encountered otherwise, the user will be navigated to the appropriate screen
          const errorMessage = await userQueries.validateOtp(
              otp,
              emailForOtp,
              dispatch,
              navigation
          ); // validate the entered otp
          setErrorMessage(errorMessage);
      } else {
          setErrorMessage(""); // set the error message to "" to reload the error
      }
  };

  // function to clear otp text when resend otp is clicked
  const clearText = () => {
      if (otpRef.current) {
          otpRef.current.clear();
      }
  };

  return (
      <CustomSafeView>
          {/* when user touches outside the input area, the keyboard should dismiss */}
          <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              style={{ height: "100%" }}
          >
              <View className="items-center">
                  <View
                      className="p-10 gap-3 justify-center items-center "
                      style={{ height: "100%" }}
                  >
                      {/* If there is no error message, show the below text */}
                      {errorMessage === "" && (
                          <View className="w-[325]">
                              <Text
                                  style={{ fontSize: 16 }}
                                  className="text-orange-400"
                              >
                                  Please check your email and enter the OTP.
                                  If you have not received the email, please
                                  check your spam folder or try again.
                              </Text>
                          </View>
                      )}

                      {/* OTP Text View */}
                      <View
                          className="flex-row items-center justify-center"
                          style={{ width: 325 }}
                          sentry-label="login-otp-view"
                      >
                          <OTPTextInput
                              ref={otpRef}
                              sentry-label="login-otp-input"
                              handleTextChange={(otp) => handleOtpChange(otp)}
                          />
                      </View>

                      {/* show error message if there is an error message */}
                      {errorMessage !== "" && (
                          <Text className="text-red-600">{errorMessage}</Text>
                      )}

                      {/* Resend otp button */}
                      <View style={{ width: 325 }}>
                          <CustomButton
                              onPress={resendOtp}
                              sentry-label="resend-otp-button"
                              btnLabel={
                                  isLoading ? (
                                      <ActivityIndicator
                                          color={customTheme.colors.light}
                                      /> // show activity indicator if the send otp function is loading
                                  ) : resendCooldown === 0 ? (
                                      "Resend OTP"
                                  ) : (
                                      `Resend OTP (${resendCooldown} sec)` // show the timer for the resend cooldown
                                  )
                              }
                              variant={
                                  resendCooldown === 0
                                      ? "primary"
                                      : "disabled"
                              } // if the resend cooldown is more than 0 then disable the button
                          />

                          {/* Back button */}
                          <CustomButton
                              sentry-label="back-button"
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

export default EnterOtp;
