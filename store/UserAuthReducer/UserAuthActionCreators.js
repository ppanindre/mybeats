import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { userAuthActionTypes } from "./UserAuthActionTypes";
import { firebaseCollections } from "../../constants/firebaseCollections";
import moment from "moment";

export const UserAuthActionCreators = {

  signupUser: (email, password) => {
    return async (dispatch) => {
      // Set loading to true
      dispatch({
        type: userAuthActionTypes.SET_LOADING,
        payload: { isLoading: true },
      });

      console.log("email", email, password);

      // Creating user with email and password
      try {
        const credentials = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        // Send verification email to the user
        // await user.sendEmailVerification();

        // User data
        const userData = {
          email: credentials.user.email,
          profileData: {
            firstName: firstName,
            lastName: lastName,
          },
          userId: credentials.user.uid,
          vendor: "",
          devices: [],
          joinDate: moment().valueOf(),
        };

        console.log("user data", userData);

        // Set user data in firestore after account has been created
        await firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(credentials.user.uid)
          .set(userData);

        dispatch({
          type: userAuthActionTypes.SET_USER_DATA,
          payload: {
            userData: {
              uid: credentials.user.uid,
              data: userData,
            },
          },
        });

        dispatch({
          type: userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE,
          payload: { showSkip: true },
        });
      } catch (error) {
        console.log("error", error);

        // Error handling with firebase
        let errorMsg = "";
        switch (error.code) {
          // If email already exists
          case "auth/email-already-in-use": {
            errorMsg = "User with email already exists";
            break;
          }
          case "auth/invalid-email": {
            errorMsg = "Email Id format is incorrect";
            break;
          }
          case "auth/weak-password": {
            errorMsg = "Choose a stronger password";
            break;
          }
          default: {
            errorMsg = "Please terminate the app & try again.";
            break;
          }
        }
        // Alert the user about the error
        Alert.alert(errorMsg);
      }

      // Set Loading to false
      dispatch({
        type: userAuthActionTypes.SET_LOADING,
        payload: { isLoading: false },
      });
    };
  },

  setUserData: () => {
    return async (dispatch) => {
      const user = auth().currentUser;

      // Get data from firestore and set it to redux
      const documentSnapshot = await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(user.uid)
        .get();

      const userData = {
        uid: user.uid,
        data: documentSnapshot.data(),
      };

      dispatch({
        type: userAuthActionTypes.SET_USER_DATA,
        payload: {
          userData,
        },
      });
    };
  },

  logoutUser: () => {
    return async (dispatch) => {
      try {
        // Logout user from firebase
        await auth().signOut();
        // Dispatch that the user has been logged out
        dispatch({ type: userAuthActionTypes.LOGOUT_USER });
      } catch (error) {
        Alert.alert("", "Please terminate the app & try again.");
      }
    };
  },
};
