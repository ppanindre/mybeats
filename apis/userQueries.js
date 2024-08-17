import moment from "moment";
import * as momentTimezone from "moment-timezone";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as Sentry from "@sentry/react-native";
import CryptoJS from "react-native-crypto-js";

import { userAuthActionTypes } from "../store/UserAuthReducer/UserAuthActionTypes";
import { firebaseCollections } from "../constants/firebaseCollections";
import { heartActionTypes } from "../store/HeartRateReducer/HeartRateActionTypes";
import { SleepActionTypes } from "../store/SleepReducer/SleepActionTypes";
import { activityActionTypes } from "../store/ActivityReducer/ActivityActionTypes";
import { foodActionTypes } from "../store/FoodReducer/FoodActionTypes";
import { UserActionTypes } from "../store/UserReducer/UserActionTypes";

export const userQueries = {
  // validate otp function
  validateOtp: async (enteredOtp, emailForOtp, dispatch, navigation) => {
      try {
          const snap = await firestore()
              .collection(firebaseCollections.OTP_COLLECTION)
              .doc(emailForOtp)
              .get(); // snap of otp email

          // if snap exists
          if (snap.exists) {
              let secretKey;

              try {
                  // secret key
                  const authConfigSnap = await firestore()
                      .collection(firebaseCollections.AUTH_CONFIG_COLLECTION)
                      .doc("otpConfig")
                      .get();
                  if (authConfigSnap.exists) {
                      secretKey = authConfigSnap.data().secretKey;
                  }
              } catch (error) {
                  // If an error occurs while fetching secret key
                  Sentry.captureException(error, {
                      extra: { message: "Error while fetching secret key" },
                  });
              }

              // if the entered otp matches the otp on the database
              const fetchedOtp = snap.data().otp;
              const decryptedBytes = CryptoJS.AES.decrypt(
                  fetchedOtp,
                  secretKey
              );
              const decryptedOTP = decryptedBytes.toString(CryptoJS.enc.Utf8);

              if (enteredOtp === decryptedOTP) {
                  const signInMethods =
                      await auth().fetchSignInMethodsForEmail(emailForOtp); // number of sign in methods for user

                  // if not new user
                  if (signInMethods.length > 0) {
                      await auth().signInWithEmailAndPassword(
                          emailForOtp,
                          snap.data().password
                      ); // user login
                      navigation.navigate("BottomTabNav"); // navigate to bottom tab nav
                  } else {
                      // if new user
                      const credentials =
                          await auth().createUserWithEmailAndPassword(
                              emailForOtp,
                              snap.data().password
                          );
                      const userData = {
                          email: credentials.user.email,
                          userId: credentials.user.uid,
                          vendor: "",
                          devices: [],
                          joinDate: moment().valueOf(),
                      }; // create user data object

                      await firestore()
                          .collection(firebaseCollections.USER_COLLECTION)
                          .doc(credentials.user.uid)
                          .set(userData);

                      // set the user data in redux
                      dispatch({
                          type: userAuthActionTypes.SET_USER_DATA,
                          payload: {
                              userData: {
                                  uid: credentials.user.uid,
                                  data: userData,
                              },
                          },
                      });

                      // since the user is a new user, show skip on the add device screen
                      dispatch({
                          type: userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE,
                          payload: { showSkip: true },
                      });

                      // start the tour guide if the user is a new user
                      dispatch({
                          type: userAuthActionTypes.START_TOUR_GUIDE,
                          payload: { startTourGuide: true },
                      });

                      // navigate the user to profile creation
                      navigation.navigate("profileCreation");
                  }
              } else {
                  // if the otp is not validated
                  return "Sorry! This not a valid OTP. Please try again.";
              }
          } else {
              // Snap does not exist
              return "Oops!! Something went wrong. Please restart the app";
          }
      } catch (error) {
          // Capture the error from Sentry
          Sentry.captureException(error);
          return "Oops!! Something went wrong. Please restart the app";
      }
  },

  // set profile data on firebase
  setProfileDataOnFirebase: async (profileData, selectedAvatar) => {
      // user id
      const userId = auth().currentUser.uid;
      try {
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(userId)
              .update({
                  profileData,
                  avatar: selectedAvatar,
              }); // update profile data
      } catch (error) {
          Sentry.captureException(error, {
              extra: {
                  message: "Error when setting profile data on firebase",
              },
          }); // capture error
      }
  },

  // set the selected avatar
  setAvatar: async (userId, selectedAvatar) => {
      try {
          // set the selected avatar to firebase
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(userId)
              .update({
                  avatar: selectedAvatar,
              });
      } catch (error) {
          // capture any error through sentry
          Sentry.captureException(error, {
              extra: {
                  message:
                      "Error while setting avatar from edit profile to firebase",
              },
          });
      }
  },

  // set feedback
  setFeedback: async (userId, feedback) => {
      try {
          // set feedback to feedback collection
          await firestore()
              .collection(firebaseCollections.FEEDBACK_COLLECTION)
              .doc(userId)
              .set({
                  feedback: feedback,
              });
      } catch (error) {
          // catch any error occured through sentry
          Sentry.captureException(error, {
              extra: {
                  message: "Error while setting feedback on firebase",
              },
          });
      }
  },

  // update selected device on firebase
  setDeviceOnFirebase: async (deviceSelected, userId) => {
      try {
          // set device on firebase
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(userId)
              .update({
                  vendor: deviceSelected,
              });
      } catch (error) {
          // Capture error on sentry
          Sentry.captureException(error, {
              extra: {
                  message:
                      "Error while setting the selected device on firebase",
              },
          });
      }
  },

  // logout user
  logoutUser: async (dispatch, user) => {
      try {
          // Remove push notification token
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(user.userId)
              .update({
                  notificationToken: "",
              });
          // Logout user from firebase
          // Dispatch that the user has been logged out
          // Clear cache
          dispatch({ type: heartActionTypes.EMPTY_HEART_RATE_DATA });
          dispatch({ type: SleepActionTypes.EMPTY_SLEEP_DATA });
          dispatch({ type: activityActionTypes.EMPTY_ACTIVITY_DATA });
          dispatch({ type: foodActionTypes.EMPTY_FOOD_DATA });
          dispatch({ type: UserActionTypes.EMPTY_USER_DATA });
          
          // logout user from the redux
          dispatch({ type: userAuthActionTypes.LOGOUT_USER });
          await auth().signOut();
      } catch (error) {

          // capture error through Sentry
          Sentry.captureException(error, {
              extra: {
                  message: "Error while logging out user",
              },
          });
      }
  },

  // update timezone
  updateTimezone: async (userId) => {
      try {
          // update timezone to firestore
          const timezone = momentTimezone.tz.guess();
          await firestore()
              .collection(firebaseCollections.USER_COLLECTION)
              .doc(userId)
              .update({
                  timezone: timezone,
              });
      } catch (error) {
          Sentry.captureException(error, {
              extra: { message: "Error while updating timezone" },
          });
      }
  },
};
