import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import axios from "axios";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { userAuthActionTypes } from "../../../store/UserAuthReducer/UserAuthActionTypes";


const LoginOtp = () => {
    // define states
    const [email, setEmail] = useState(""); // email entered
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); // error message to show
    const [isLoading, setIsLoading] = useState(false); // loading state when sending the e-mail
    const [isDisabled, setIsDisabled] = useState(false);

    // define dispatch & navigation hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Validate Email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // valid email regular expression
        return emailRegex.test(email); // validate email by regex
    };

    // Send OTP
    const sendOtp = async () => {
        if (email === "") {
            setEmailErrorMessage("Please enter a email"); // if the email field is blank
        } else {
            if (validateEmail(email)) {
                // if email is validated through the regular expression
                try {
                    setIsDisabled(false);
                    setEmailErrorMessage("");
                    setIsLoading(true); // show activity indicator when sending the email
                    navigation.navigate("enterOtp"); // navigate the user to the enter otp screen
                    // send otps to all emails other than the testing email
                    if (email.toLowerCase() !== "cfdpoly@gmail.com") {
                        await axios.get(
                            "https://us-central1-firebeats-43aaf.cloudfunctions.net/sendLoginMailFunction?email=" +
                                email.toLowerCase()
                        );
                    }
                    setIsLoading(false); // stop showing activity indicator when email is sent
                    dispatch({
                        type: userAuthActionTypes.SET_EMAIL_FOR_OTP,
                        payload: { enteredEmail: email.toLowerCase() },
                    }); // dispatch the entered email to redux
                } catch (error) {
                    Sentry.captureException(error, {
                        extra: {
                            message: "Error while sending the login email",
                        },
                    }); // capture any errors through Sentry
                }
            } else {
                setEmailErrorMessage("Please enter a valid email ID"); // if email entered is not valid
            }
        }
    };

    return (
        <CustomSafeView sentry-label="login-otp-screen">
            {/* Touchable without feedback to dismiss keyboard when user presses outside */}
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={{ height: "100%", width: "100%" }}
            >
                <View
                    style={{ height: "100%", width: "100%" }}
                    className="p-5 justify-center items-center"
                >
                    <View
                        style={{ width: 325 }}
                        sentry-label="login-otp-email-input"
                        className="mb-2"
                    >
                        {/* Enter email */}
                        <CustomInput
                            error={emailErrorMessage !== ""}
                            placeholder="Enter email"
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                        />

                        {/* Error message to display */}
                        {emailErrorMessage !== "" && (
                            <Text className="text-red-600">
                                {emailErrorMessage}
                            </Text>
                        )}
                    </View>

                    <View
                        sentry-label="login-otp-send-otp-btn"
                        style={{ width: 325 }}
                        className="mt-3"
                    >
                        {/* Send otp button */}
                        <CustomButton
                            onPress={sendOtp}
                            btnLabel={
                                isLoading ? (
                                    <ActivityIndicator color="white" /> // if the email did not send yet
                                ) : (
                                    "Send One-Time-Password (OTP)" // if the email has been sent
                                )
                            }
                            variant={isDisabled ? "disabled" : "primary"}
                        />

                        {/* Button to go back to the previous screen */}
                        <CustomButton
                            sentry-label="login-otp-back-btn"
                            onPress={() => navigation.goBack()}
                            btnLabel="Back"
                            variant="light"
                        />
                    </View>

                    {/* Terms of Service section & Privacy Policy Section*/}
                    <View
                        className="flex-row justify-center flex-wrap"
                        style={{ width: 325 }}
                    >
                        <Text>Please refer to our </Text>
                        <TouchableOpacity
                            sentry-label="login-otp-terms-btn"
                            onPress={() =>
                                navigation.navigate("termsOfService")
                            }
                        >
                            <Text className="text-primary underline">
                                Terms of Service{" "}
                            </Text>
                        </TouchableOpacity>
                        <Text>and</Text>
                        <TouchableOpacity
                            sentry-label="login-otp-privacy-btn"
                            onPress={() => navigation.navigate("privacyPolicy")}
                        >
                            <Text className="text-primary underline">
                                {" "}
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </CustomSafeView>
    );
};

export default LoginOtp;
