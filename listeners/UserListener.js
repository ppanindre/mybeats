import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { UserActionCreators } from "../store/UserReducer/UserActionCreators";
import { firebaseCollections } from "../constants/firebaseCollections";
import { UserActionTypes } from "../store/UserReducer/UserActionTypes";
import { deviceActionTypes } from "../store/DeviceReducer/DeviceActionTypes";

// Configuring user listener to get the user data on any update that has been made
export const UserListener = (dispatch) => {
  const userId = auth().currentUser.uid
  return new Promise((resolve, reject) => {
    // Get user id if available from the auth
    // Listen for changes
    if (userId) {
    const unsubscribe = firestore()
      .collection(firebaseCollections.USER_COLLECTION)
      .doc(auth().currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          const userData = snapshot.data();

          if (userData !== undefined) {

          // set user listener data
          dispatch({
            type: UserActionTypes.SET_LISTENER_USER_DATA,
            payload: { userData: userData },
          });

          // set devices Data
          dispatch({
            type: deviceActionTypes.FETCH_DEVICES,
            payload: {
              fetchedDevices: userData.devices,
              deviceSelected: userData.vendor,
            },
          });

        }
          
          resolve(userData);
        },
        (error) => {
          reject(error);
        }
      );
      // return a cleanup function to unsubscribe when needed
      return unsubscribe;
    }

  });
};