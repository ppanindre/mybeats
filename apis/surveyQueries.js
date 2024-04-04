import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { firebaseCollections } from "../constants/firebaseCollections";

export const sendSurveyAnswers = async (surveyAnswers) => {

  const userId = auth().currentUser.uid;
  await firestore()
    .collection(firebaseCollections.SURVEY_COLLECTION)
    .doc(userId)
    .set({
      ...surveyAnswers,
      userId: userId,
    });
  return true;
};
