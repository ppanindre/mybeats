import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { firebaseCollections } from "../constants/firebaseCollections";

let USER_CACHE = null;
let listener = null;
let cachedCallback = null;

/**
 * The cache for user data.
 */
const getUser = async (callback) => {
    const userId = auth().currentUser.uid

    // update the exisiting callback
    if (callback) {
        cachedCallback = callback;
    }
    if (!USER_CACHE) {
        await firestore()
            .collection(firebaseCollections.USER_COLLECTION)
            .doc(userId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                  const data = snapshot.data();
                  USER_CACHE = data;
                }
            });
        //set up a listener for user details change
        listener = firestore()
            .collection(firebaseCollections.USER_COLLECTION)
            .doc(userId)
            .onSnapshot(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    USER_CACHE = data;
                    if (cachedCallback) {
                        //notifiy using callback that data has changed.
                        cachedCallback(USER_CACHE);
                    }
                }
            });
    }
    return USER_CACHE;
}

const removeUserListener = () => {
    if (listener) {
        listener();
    }

    USER_CACHE = null;
    cachedCallback = null;
}

export default getUser;

export { removeUserListener }