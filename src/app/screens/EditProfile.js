import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as Sentry from "@sentry/react-native";

import { firebaseCollections } from "../../../constants/firebaseCollections";

import CustomSafeView from "../../../components/CustomSafeView";
import CustomInput from "../../../components/CustomInput";
import DatePicker from "../../../components/DatePicker";
import CustomButton from "../../../components/CustomButton";
import MultiSelect from "../../../components/MultiSelect";
import { patientService } from "../api/services/patientService";
import { generateClient } from "aws-amplify/api";
import { getPatient } from "../../graphql/queries";
import { launchImageLibrary } from "react-native-image-picker";
import { createPatientActionCreator, updatePatientActionCreator, getPatientActionCreator } from "../../../store/actions/patientActions";
import Loader from "../components/Utils/Loader";
import { fetchMedicalMasterData } from "../../../store/actions/medicalMasterDataActions";
import { conditionList } from "../../../constants/underlyingConditionsConstants";

// const EditProfile = () => {
//   const user = useSelector((state) => state.UserReducer); // get user listener
  
//   const { patient, loading } = useSelector((state) => state.patientGetReducer);
//   const currentPatient = patient?.id === user.userId ? patient : null;
  

//   const dispatch = useDispatch();
//   const client = generateClient(); 

//   const [hasFetchedPatient, setHasFetchedPatient] = useState(false);
 
//   const { allergies: allergiesRedux, procedures: proceduresRedux, immunizations: immunizationsRedux,   loading: loadingMedicalData,
//   } = useSelector(
//     (state) => state.medicalMasterData
//   );  

//   useEffect(() => {
//     if (!hasFetchedPatient) {
//       dispatch(getPatientActionCreator());
//       dispatch(fetchMedicalMasterData());
//       setHasFetchedPatient(true);
//     }
//   }, [dispatch, hasFetchedPatient]);
  
//   useEffect(() => {
//     const appendOtherIfMissing = (list) => {
//       return list.some((item) => item.value === "Other")
//         ? list
//         : [...list, { _id: "other", value: "Other" }];
//     };
  
//     setAllergies((prev) => ({
//       ...prev,
//       list: appendOtherIfMissing(allergiesRedux),
//     }));
  
//     setProcedures((prev) => ({
//       ...prev,
//       list: appendOtherIfMissing(proceduresRedux),
//     }));
  
//     setImmunizations((prev) => ({
//       ...prev,
//       list: appendOtherIfMissing(immunizationsRedux),
//     }));
//   }, [allergiesRedux, proceduresRedux, immunizationsRedux]);
  

//   // define navigation instance
//   const navigation = useNavigation();
//   const [toggleOthers, setToggleOthers] = useState(false);
//   const [firstName, setFirstName] = useState(user.profileData?.firstName); // first name
//   const [lastName, setLastName] = useState(user.profileData?.lastName); // last name
//   const [pickedImage, setPickedImage] = useState(null);
//   const [otherCondition, setOtherCondition] = useState(
//     user.profileData?.otherCondition
//   );
//   const [otherAllergy, setOtherAllergy] = useState("");
//   const [otherProcedure, setOtherProcedure] = useState("");
//   const [otherImmunization, setOtherImmunization] = useState("");
//   const [showOtherAllergy, setShowOtherAllergy] = useState(false);
//   const [showOtherProcedure, setShowOtherProcedure] = useState(false);
//   const [showOtherImmunization, setShowOtherImmunization] = useState(false);
//   const [weight, setWeight] = useState(user.profileData?.weight); //  weight
//   const [height, setHeight] = useState(user.profileData?.height); // height
//   const [dob, setDob] = useState(user.profileData?.dob); // date of birth
//   const [gender, setGender] = useState({
//     value: user.profileData?.gender ?? "",
//     list: [
//       { _id: "1", value: "Male" },
//       { _id: "2", value: "Female" },
//       { _id: "3", value: "Others" },
//     ],
//     selectedList: [],
//     error: "",
//   }); // gender

//   const [profession, setProfession] = useState({
//     value: user.profileData?.selectedProfessionValue ?? "",
//     list: [
//       { _id: "1", value: "Firefighter" },
//       { _id: "2", value: "EMT/Paramedic" },
//       { _id: "3", value: "Police Officer" },
//       { _id: "4", value: "Military" },
//       { _id: "5", value: "Hazmat" },
//       { _id: "6", value: "Search and Rescue" },
//       { _id: "7", value: "Public Health Worker" },
//       { _id: "8", value: "Emergency Dispatcher" },
//       { _id: "9", value: "Volunteer Responder" },
//       { _id: "10", value: "Other first responder" },
//     ],
//     selectedList: user.profileData?.selectedProfessionList ?? [],
//     error: "",
//   }); // profession

//   const [conditions, setConditions] = useState({
//     value: user.profileData?.selectedConditionsValue ?? "",
//     list: conditionList,
//     selectedList: user.profileData?.selectedConditionsList ?? [],
//     error: "",
//   }); // conditions

//   const [allergies, setAllergies] = useState({
//     value: "",
//     list: allergiesRedux,
//     selectedList: [],
//     error: "",
//   });
  
//   const [procedures, setProcedures] = useState({
//     value: "",
//     list: proceduresRedux,
//     selectedList: [],
//     error: "",
//   });
  
//   const [immunizations, setImmunizations] = useState({
//     value: "",
//     list: immunizationsRedux,
//     selectedList: [],
//     error: "",
//   });
   
  
//   const setProfileDataOnFirebase = async (profileData) => {
//     const userId = auth().currentUser.uid;

//     // Set profile profileData to firebase
//     try {
//       await firestore()
//         .collection(firebaseCollections.USER_COLLECTION)
//         .doc(userId)
//         .update({
//           profileData,
//         });
//       Alert.alert("", "Your profile has been saved");
//     } catch (error) {
//       Sentry.captureException(error, {
//         extra: {
//           message: "Error while saving profile in edit profile",
//         },
//       }); // capture error
//     }
//   };

//   const createProfile = async () => {
//     const profile = {
//       firstName: firstName ?? "",
//       lastName: lastName ?? "",
//       weight: weight ?? "",
//       height: height ?? "",
//       gender: gender.value ?? "",
//       dob: dob ?? "",
//       selectedConditionsList: conditions.selectedList ?? [],
//       selectedConditionsValue: conditions.value ?? "",
//       selectedProfessionList: profession.selectedList ?? [],
//       selectedProfessionValue: profession.value ?? "",
//       otherCondition: otherCondition ?? "",
//     };

//     await setProfileDataOnFirebase(profile);


//     const calculateAge = (dob) => {
//       if (!dob) return null;
    
//       const parsedDate = new Date(dob);
//       if (isNaN(parsedDate)) {
//         // parsing manually from known formats
//         try {
//           const parts = dob.split(" ");
//           const months = {
//             Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
//             Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
//           };
//           const month = months[parts[0]];
//           const day = parseInt(parts[1]);
//           const year = parseInt(parts[2]);
//           if (month != null && !isNaN(day) && !isNaN(year)) {
//             return calculateAge(new Date(year, month, day));
//           }
//         } catch (e) {
//           console.warn("Failed fallback parsing DOB:", dob);
//         }
//         return null;
//       }
    
//       const today = new Date();
//       let age = today.getFullYear() - parsedDate.getFullYear();
//       const m = today.getMonth() - parsedDate.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) age--;
    
//       return age;
//     };
    
  
//     const reduxPayload = {
//       firstName,
//       lastName,
//       weight,
//       height,
//       gender: gender.value ?? "",
//       age: calculateAge(dob),
//       profileImageUri: pickedImage ?? null,
//       professionList: profession.selectedList.map((item) => item.value),
//       underlyingConditionsList: conditions.selectedList
//       .filter((item) => item.value !== "Other")
//       .map((item) => item.value),
//       otherCondition: otherCondition ?? "",
     
//       allergiesList: allergies.selectedList
//       .filter((item) => item.value !== "Other")
//       .map((item) => item.value),
//       otherAllergy: otherAllergy ?? "",
  
//       proceduresList: procedures.selectedList
//       .filter((item) => item.value !== "Other")
//       .map((item) => item.value),
//       otherProcedure: otherProcedure ?? "",
  
//       immunizationsList: immunizations.selectedList
//       .filter((item) => item.value !== "Other")
//       .map((item) => item.value),
//       otherImmunization: otherImmunization ?? "",
//     };
  
//     try {
//       const patientId = auth().currentUser.uid;
  
//       const response = await client.graphql({
//         query: getPatient,
//         variables: { id: patientId },
//       });
  
//       if (response.data.getPatient) {
//         dispatch(updatePatientActionCreator(reduxPayload));
//       } else {
//         dispatch(createPatientActionCreator(reduxPayload));
//       }
//       // await dispatch(getPatientActionCreator());
//       dispatch({ type: "PATIENT_SHOULD_REFRESH", payload: true });
//     } catch (err) {
//       if (err.errors && err.errors[0]?.message.includes("not found")) {
//         dispatch(createPatientActionCreator(reduxPayload));
//       } else {
//         console.error("Error checking patient existence in AWS", err);
//       }
//     }
//   };

//   const pickImageFromGallery = () => {
//     const options = {
//       mediaType: "photo",
//       quality: 0.7,
//       maxWidth: 500,
//       maxHeight: 500,
//     };
  
//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.errorCode) {
//         console.log("Image Picker Error: ", response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri;
//         setPickedImage(uri);
//       }
//     });
//   };

//   useEffect(() => {
//     if (
//       !currentPatient?.id ||
//       currentPatient.id !== user.userId ||
//       allergiesRedux.length === 0 ||
//       proceduresRedux.length === 0 ||
//       immunizationsRedux.length === 0
//     ) return;
  
//     const getSelectedList = (values, reduxList, otherValue) => {
//       let selected = reduxList.filter((item) => values.includes(item.value));
//       const otherItem = reduxList.find((item) => item.value === "Other");
  
//       if (otherValue?.trim() && otherItem && !selected.some((i) => i.value === "Other")) {
//         selected.push(otherItem); // object with id
//       }
  
//       return selected;
//     };
  
//     const getValueString = (values, otherValue) =>
//       [...values, ...(otherValue?.trim() ? ["Other"] : [])].join(", ");
  
//     const allergyValues = currentPatient.allergiesList ?? [];
//     const procedureValues = currentPatient.proceduresList ?? [];
//     const immunizationValues = currentPatient.immunizationsList ?? [];
  
//     setAllergies({
//       list: allergiesRedux,
//       selectedList: getSelectedList(allergyValues, allergiesRedux, currentPatient.otherAllergy),
//       value: getValueString(allergyValues, currentPatient.otherAllergy),
//       error: "",
//     });
//     setOtherAllergy(currentPatient.otherAllergy ?? "");
  
//     setProcedures({
//       list: proceduresRedux,
//       selectedList: getSelectedList(procedureValues, proceduresRedux, currentPatient.otherProcedure),
//       value: getValueString(procedureValues, currentPatient.otherProcedure),
//       error: "",
//     });
//     setOtherProcedure(currentPatient.otherProcedure ?? "");
  
//     setImmunizations({
//       list: immunizationsRedux,
//       selectedList: getSelectedList(immunizationValues, immunizationsRedux, currentPatient.otherImmunization),
//       value: getValueString(immunizationValues, currentPatient.otherImmunization),
//       error: "",
//     });
//     setOtherImmunization(currentPatient.otherImmunization ?? "");

//     const conditionValues = currentPatient.underlyingConditionsList ?? [];

//     const getSelectedConditions = (values, list, otherVal) => {
//       let selected = list.filter((item) => values.includes(item.value));
//       const otherItem = list.find((item) => item.value === "Other");

//       if (otherVal?.trim() && otherItem && !selected.some((i) => i.value === "Other")) {
//         selected.push(otherItem);
//       }

//       return selected;
//     };

//     const getConditionValueString = (values, otherVal) =>
//       [...values, ...(otherVal?.trim() ? ["Other"] : [])].join(", ");

//     setConditions((prev) => ({
//       ...prev,
//       selectedList: getSelectedConditions(conditionValues, prev.list, currentPatient.otherCondition),
//       value: getConditionValueString(conditionValues, currentPatient.otherCondition),
//     }));

//   }, [
//     currentPatient,
//     user.userId,
//     allergiesRedux,
//     proceduresRedux,
//     immunizationsRedux
//   ]);  
  
//   useEffect(() => {
//     const checkShowOther = (selectedList, otherValue) =>
//       selectedList.some((item) => item.value === "Other") ||
//       (otherValue && otherValue.trim() !== "");
  
//     setToggleOthers(
//       checkShowOther(conditions.selectedList, otherCondition)
//     );
//     setShowOtherAllergy(
//       checkShowOther(allergies.selectedList, otherAllergy)
//     );
//     setShowOtherProcedure(
//       checkShowOther(procedures.selectedList, otherProcedure)
//     );
//     setShowOtherImmunization(
//       checkShowOther(immunizations.selectedList, otherImmunization)
//     );
//   }, [
//     conditions.selectedList,
//     allergies.selectedList,
//     procedures.selectedList,
//     immunizations.selectedList,
//     otherCondition,
//     otherAllergy,
//     otherProcedure,
//     otherImmunization,
//   ]);  

//   useEffect(() => {
//     if (user.profileData?.otherCondition && !conditions.selectedList.some(c => c.value === "Other")) {
//       setConditions(prev => ({
//         ...prev,
//         selectedList: [...prev.selectedList, { value: "Other" }],
//       }));
//       setToggleOthers(true); 
//     }
//   }, []);
  
//   useEffect(() => {
//     const OtherIsVisible = (list, setList, otherValue, setOtherValue) => {
//       const hasOtherSelected = list.selectedList.some(item => item.value === "Other");
//       const isOtherValuePresent = otherValue && otherValue.trim() !== "";
  
//       if (isOtherValuePresent && !hasOtherSelected) {
//         setList(prev => ({
//           ...prev,
//           selectedList: [...prev.selectedList, { value: "Other" }],
//         }));
//       }
//     };
  
//     OtherIsVisible(conditions, setConditions, otherCondition, setOtherCondition);
//     OtherIsVisible(allergies, setAllergies, otherAllergy, setOtherAllergy);
//     OtherIsVisible(procedures, setProcedures, otherProcedure, setOtherProcedure);
//     OtherIsVisible(immunizations, setImmunizations, otherImmunization, setOtherImmunization);
//   }, []);
  

//   if (loading || loadingMedicalData) return <Loader />;
  
//   return (
//     <CustomSafeView sentry-label="edit-profile">
//       <TouchableWithoutFeedback
//         onPress={() => Keyboard.dismiss()}
//         style={{ height: "100%" }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//         >
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View>
//               {/* Header */}
//               <View className="p-5 border-b-2 border-darkSecondary flex-row items-center justify-between">
//                 <View className="flex-row items-center justify-between gap-2">
//                   <TouchableOpacity
//                     sentry-label="edit-profile-back-btn"
//                     onPress={() => navigation.navigate("profile")}
//                   >
//                     <ChevronLeftIcon color="#000000" />
//                   </TouchableOpacity>
//                   <Text className="text-2xl font-bold">Edit Profile</Text>
//                 </View>
//               </View>

//               <View className="p-5" style={{ width: "100%" }}>
//                 {/* Avatar Selection */}
//                 <View className="items-center justify-center mb-3">
//                   {/* Display image */}
//                   {(pickedImage || currentPatient?.profileImage || user.avatar) ? (
//                       <View
//                         className="border border-dark rounded-full overflow-hidden"
//                         style={{ height: 150, width: 150 }}
//                       >
//                         <Image
//                           source={
//                             pickedImage
//                               ? { uri: pickedImage }
//                               : currentPatient?.profileImage
//                               ? { uri: currentPatient.profileImage }
//                               : user.avatar?.imgSrc
//                           }
//                           style={{ height: 150, width: 150 }}
//                           resizeMode="cover"
//                         />
//                       </View>
//                     ) : (
//                       <TouchableOpacity
//                         sentry-label="edit-profile-add-avatar-btn"
//                         onPress={() => navigation.navigate("addAvatar")}
//                         className="border border-dark rounded-full overflow-hidden"
//                         style={{ height: 150, width: 150 }}
//                       >
//                         <Image
//                           source={require("../assets/add-avatar.png")}
//                           style={{ height: 150, width: 150 }}
//                           resizeMode="cover"
//                         />
//                         <View className="absolute z-30 bg-primary rounded-md p-1 top-[60px] left-[35px]">
//                           <Text className="text-light text-xs">Add Avatar</Text>
//                         </View>
//                       </TouchableOpacity>
//                   )}
//                   {/* Button */}
//                   <TouchableOpacity
//                       sentry-label="edit-profile-upload-image-btn"
//                       onPress={pickImageFromGallery}
//                       className="mt-3 bg-primary px-4 py-2 rounded-md"
//                     >
//                       <Text className="text-light font-semibold">Upload Image</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* User Form */}
//                 <View className="items-center justify-center">
//                   {/* Email */}
//                   <View className="mb-3 w-[325]">
//                     <CustomInput
//                       sentry-label="edit-profile-email"
//                       placeholder="Email"
//                       value={user.email}
//                       isDisabled={true}
//                     />
//                   </View>

//                   {/* First Name */}
//                   <View className="mb-3 w-[325]">
//                     <CustomInput
//                       placeholder="First Name"
//                       value={firstName}
//                       onChangeText={(text) => setFirstName(text)}
//                     />
//                   </View>

//                   {/* Last Name */}
//                   <View className="mb-3 w-[325]">
//                     <CustomInput
//                       placeholder="Last Name"
//                       value={lastName}
//                       onChangeText={(text) => setLastName(text)}
//                     />
//                   </View>

//                   {/* Date of Birth Handler */}
//                   <View className="mb-3 w-[325]">
//                     <DatePicker
//                       onConfirm={(dob) => setDob(dob)}
//                       currVal={dob}
//                     />
//                   </View>

//                   {/* Gender */}
//                   <View className="mb-6" style={{ height: 50, width: 325 }}>
//                     <MultiSelect
//                       sentry-label="edit-profile-gender"
//                       label="Gender"
//                       value={gender.value}
//                       onSelection={(value) =>
//                         setGender({
//                           ...gender,
//                           value: value.text,
//                           selectedList: value.selectedList,
//                           error: "",
//                         })
//                       }
//                       arrayList={[...gender.list]}
//                       selectedArrayList={gender.selectedList}
//                       multiEnable={false}
//                     />
//                   </View>

//                   {/* Weight */}
//                   <View className="mb-3 w-[325]">
//                     <CustomInput
//                       placeholder="Weight (lb)"
//                       keyboardType="numeric"
//                       value={weight}
//                       onChangeText={(text) => setWeight(text)}
//                     />
//                   </View>

//                   {/* Height */}
//                   <View className="mb-3 w-[325]">
//                     <CustomInput
//                       placeholder="Height (inch)"
//                       keyboardType="numeric"
//                       value={height}
//                       onChangeText={(text) => setHeight(text)}
//                     />
//                   </View>

//                   {/* Profession */}
//                   <View className="mb-3" style={{ width: 325 }}>
//                     <MultiSelect
//                       sentry-label="edit-profile-profession"
//                       label="Profession"
//                       value={profession.value}
//                       onSelection={(value) =>
//                         setProfession({
//                           ...profession,
//                           value: value.text,
//                           selectedList: value.selectedList,
//                           error: "",
//                         })
//                       }
//                       arrayList={[...profession.list]}
//                       selectedArrayList={profession.selectedList}
//                       multiEnable={true}
//                     />
//                   </View>

//                   {/* Underlying conditions */}
//                   <View className="mb-2" style={{ width: 325 }}>
//                     <MultiSelect
//                       sentry-label="edit-profile-underlyingconditions"
//                       label="Underlying Conditions"
//                       value={conditions.value}
//                       onSelection={(value) =>
//                         setConditions({
//                           ...conditions,
//                           value: value.text,
//                           selectedList: value.selectedList,
//                           error: "",
//                         })
//                       }
//                       arrayList={[...conditions.list]}
//                       selectedArrayList={[...conditions.selectedList]}
//                       multiEnable={true}
//                     />
//                   </View>

//                   {toggleOthers && (
//                     <View className="mb-3 w-[325]">
//                       <CustomInput
//                         placeholder="If other condition, please specify"
//                         value={otherCondition}
//                         onChangeText={(text) => setOtherCondition(text)}
//                       />
//                     </View>
//                   )}

//                   {/* Allergies */}
//                     <View className="mb-3" style={{ width: 325 }}>
//                       <MultiSelect
//                         sentry-label="edit-profile-allergies"
//                         label="Allergies"
//                         value={allergies.value}
//                         onSelection={(value) =>
//                           setAllergies({
//                             ...allergies,
//                             value: value.text,
//                             selectedList: value.selectedList,
//                             error: "",
//                           })
//                         }
//                         arrayList={[...allergies.list]}
//                         selectedArrayList={allergies.selectedList}
//                         multiEnable={true}
//                       />
//                     </View>
//                     {showOtherAllergy && (
//                       <View className="mb-3 w-[325]">
//                         <CustomInput
//                           placeholder="If other allergy, please specify"
//                           value={otherAllergy}
//                           onChangeText={(text) => setOtherAllergy(text)}
//                         />
//                       </View>
//                     )}

//                     {/* Procedures */}
//                     <View className="mb-3" style={{ width: 325 }}>
//                       <MultiSelect
//                         sentry-label="edit-profile-procedures"
//                         label="Surgeries / Procedures"
//                         value={procedures.value}
//                         onSelection={(value) =>
//                           setProcedures({
//                             ...procedures,
//                             value: value.text,
//                             selectedList: value.selectedList,
//                             error: "",
//                           })
//                         }
//                         arrayList={[...procedures.list]}
//                         selectedArrayList={procedures.selectedList}
//                         multiEnable={true}
//                       />
//                     </View>
//                     {showOtherProcedure && (
//                       <View className="mb-3 w-[325]">
//                         <CustomInput
//                           placeholder="If other procedure, please specify"
//                           value={otherProcedure}
//                           onChangeText={(text) => setOtherProcedure(text)}
//                         />
//                       </View>
//                     )}

//                     {/* Immunizations */}
//                     <View className="mb-3" style={{ width: 325 }}>
//                       <MultiSelect
//                         sentry-label="edit-profile-immunizations"
//                         label="Immunizations"
//                         value={immunizations.value}
//                         onSelection={(value) =>
//                           setImmunizations({
//                             ...immunizations,
//                             value: value.text,
//                             selectedList: value.selectedList,
//                             error: "",
//                           })
//                         }
//                         arrayList={[...immunizations.list]}
//                         selectedArrayList={immunizations.selectedList}
//                         multiEnable={true}
//                       />
//                     </View>
//                     {showOtherImmunization && (
//                       <View className="mb-3 w-[325]">
//                         <CustomInput
//                           placeholder="If other immunization, please specify"
//                           value={otherImmunization}
//                           onChangeText={(text) => setOtherImmunization(text)}
//                         />
//                       </View>
//                     )}

//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//       <View className="px-8 mt-4">
//         <CustomButton
//           sentry-label="edit-profile-save-btn"
//           variant="primary"
//           btnLabel="Save"
//           onPress={createProfile}
//         />
//       </View>
//     </CustomSafeView>
//   );
// };

const EditProfile = () => {
  const user = useSelector((state) => state.UserReducer); // get user listener

  // define navigation instance
  const navigation = useNavigation();
  const [toggleOthers, setToggleOthers] = useState(false);
  const [firstName, setFirstName] = useState(user.profileData?.firstName); // first name
  const [lastName, setLastName] = useState(user.profileData?.lastName); // last name
  const [otherCondition, setOtherCondition] = useState(
    user.profileData?.otherCondition
  );
  const [zip, setZip] = useState(user.profileData?.zip);
  const [weight, setWeight] = useState(user.profileData?.weight); //  weight
  const [height, setHeight] = useState(user.profileData?.height); // height
  const [dob, setDob] = useState(user.profileData?.dob); // date of birth
  const [gender, setGender] = useState({
    value: user.profileData?.gender ?? "",
    list: [
      { _id: "1", value: "Male" },
      { _id: "2", value: "Female" },
      { _id: "3", value: "Others" },
    ],
    selectedList: [],
    error: "",
  }); // gender

  const [profession, setProfession] = useState({
    value: user.profileData?.selectedProfessionValue ?? "",
    list: [
      { _id: "1", value: "Firefighter" },
      { _id: "2", value: "EMT/Paramedic" },
      { _id: "3", value: "Police Officer" },
      { _id: "4", value: "Military" },
      { _id: "5", value: "Hazmat" },
      { _id: "6", value: "Other first responder" },
    ],
    selectedList: user.profileData?.selectedProfessionList ?? [],
    error: "",
  }); // profession

  const [conditions, setConditions] = useState({
    value: user.profileData?.selectedConditionsValue ?? "",
    list: [
      { _id: "1", value: "None" },
      { _id: "2", value: "Hypertension" },
      { _id: "3", value: "Sleep apnea" },
      { _id: "4", value: "Cardiomegaly" },
      { _id: "5", value: "Arrhythmia" },
      { _id: "6", value: "Heart stroke" },
      { _id: "7", value: "Atrial fibrillation" },
      { _id: "8", value: "Other" },
    ],
    selectedList: user.profileData?.selectedConditionsList ?? [],
    error: "",
  }); // conditions

  const setProfileDataOnFirebase = async (profileData) => {
    const userId = auth().currentUser.uid;

    // Set profile profileData to firebase
    try {
      await firestore()
        .collection(firebaseCollections.USER_COLLECTION)
        .doc(userId)
        .update({
          profileData,
        });
      Alert.alert("", "Your profile has been saved");
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          message: "Error while saving profile in edit profile",
        },
      }); // capture error
    }
  };

  const createProfile = async () => {
    if (dob) {
      const age = moment().diff(moment(dob, "MMM DD, YYYY"), "years");

      if (age < 18) {
        Alert.alert("", "You must be at least 18 years old.");
        return;
      }
    }

    const profile = {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      weight: weight ?? "",
      height: height ?? "",
      gender: gender.value ?? "",
      zip: zip ?? "",
      dob: dob ?? "",
      selectedConditionsList: conditions.selectedList ?? [],
      selectedConditionsValue: conditions.value ?? "",
      selectedProfessionList: profession.selectedList ?? [],
      selectedProfessionValue: profession.value ?? "",
      otherCondition: otherCondition ?? "",
    };

    await setProfileDataOnFirebase(profile);
  };

  useEffect(() => {
    let toShowOthers = false;

    conditions.selectedList.forEach((item) => {
      if (item.value === "Other") {
        toShowOthers = true;
        return;
      } else {
        toShowOthers = false;
      }
    });

    if (toShowOthers) {
      setToggleOthers(true);
    } else {
      setToggleOthers(false);
    }
  }, [conditions]);

  return (
    <CustomSafeView sentry-label="edit-profile">
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ height: "100%" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {/* Header */}
              <View className="p-5 border-b-2 border-darkSecondary flex-row items-center justify-between">
                <View className="flex-row items-center justify-between gap-2">
                  <TouchableOpacity
                    sentry-label="edit-profile-back-btn"
                    onPress={() => navigation.navigate("profile")}
                  >
                    <ChevronLeftIcon color="#000000" />
                  </TouchableOpacity>
                  <Text className="text-2xl font-bold">Edit Profile</Text>
                </View>
              </View>

              <View className="p-5" style={{ width: "100%" }}>
                {/* Avatar Selection */}
                <View className="items-center justify-center mb-3">
                  <TouchableOpacity
                    sentry-label="edit-profile-add-avatar-btn"
                    onPress={() => navigation.navigate("addAvatar")}
                  >
                    {/* if user has selected avatar, show avatar, otherwise an icon with add avatar button */}
                    {user.avatar ? (
                      <View className="p-5 bg-gray-100 rounded-full ">
                        <Image
                          source={user.avatar.imgSrc}
                          style={{
                            height: 120,
                            width: 120,
                          }}
                        />
                      </View>
                    ) : (
                      <View
                        className="relative"
                        style={{
                          height: 120,
                          width: 120,
                        }}
                      >
                        <Image
                          source={require("../assets/add-avatar.png")}
                          style={{
                            height: 120,
                            width: 120,
                          }}
                        />
                        <View
                          className="absolute z-30 bg-orange-400 rounded-md p-1"
                          style={{
                            top: 48,
                            left: 20,
                          }}
                        >
                          <Text className="text-white">Add Avatar</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                {/* User Form */}
                <View className="items-center justify-center">
                  {/* Email */}
                  <View className="mb-3 w-[325]">
                    <CustomInput
                      sentry-label="edit-profile-email"
                      placeholder="Email"
                      value={user.email}
                      isDisabled={true}
                    />
                  </View>

                  <View className="mb-3 w-[325]">
                    <CustomInput
                      sentry-label="edit-profile-name"
                      placeholder="Random Username"
                      value={user.profileData?.name}
                      isDisabled={true}
                    />
                  </View>

                  {/* First Name */}
                  {false && (
                    <>
                      <View className="mb-3 w-[325]">
                        {/* First Name */}
                        <CustomInput
                          sentry-label="profile-creation-first-name"
                          placeholder="First Name"
                          value={firstName}
                          onChangeText={(text) => setFirstName(text)}
                        />
                      </View>

                      {/* Last Name */}
                      <View className="mb-3 w-[325]">
                        <CustomInput
                          sentry-label="profile-creation-last-name"
                          placeholder="Last Name"
                          value={lastName}
                          onChangeText={(text) => setLastName(text)}
                        />
                      </View>

                      {/* Date of birth */}
                    </>
                  )}

                  <View className="mb-3">
                    <DatePicker
                      sentry-label="profile-creation-dob"
                      onConfirm={(dob) => setDob(dob)}
                      currVal={dob}
                    />
                  </View>

                  {/* Gender */}
                  <View className="mb-6" style={{ height: 50, width: 325 }}>
                    <MultiSelect
                      sentry-label="edit-profile-gender"
                      label="Gender"
                      value={gender.value}
                      onSelection={(value) =>
                        setGender({
                          ...gender,
                          value: value.text,
                          selectedList: value.selectedList,
                          error: "",
                        })
                      }
                      arrayList={[...gender.list]}
                      selectedArrayList={gender.selectedList}
                      multiEnable={false}
                    />
                  </View>

                  {/* Weight */}
                  <View className="mb-3 w-[325]">
                    <CustomInput
                      placeholder="Weight (lb)"
                      keyboardType="numeric"
                      value={weight}
                      onChangeText={(text) => setWeight(text)}
                    />
                  </View>

                  {/* Height */}
                  <View className="mb-3 w-[325]">
                    <CustomInput
                      placeholder="Height (inch)"
                      keyboardType="numeric"
                      value={height}
                      onChangeText={(text) => setHeight(text)}
                    />
                  </View>

                  {/* Zip */}
                  <View className="mb-3 w-[325]">
                    <CustomInput
                      sentry-label="profile-creation-zip"
                      placeholder="Zipcode"
                      keyboardType="numeric"
                      maxLength={5}
                      value={zip}
                      onChangeText={(text) => setZip(text)}
                    />
                  </View>

                  {/* Profession */}
                  <View className="mb-3" style={{ width: 325 }}>
                    <MultiSelect
                      sentry-label="edit-profile-profession"
                      label="Profession"
                      value={profession.value}
                      onSelection={(value) =>
                        setProfession({
                          ...profession,
                          value: value.text,
                          selectedList: value.selectedList,
                          error: "",
                        })
                      }
                      arrayList={[...profession.list]}
                      selectedArrayList={profession.selectedList}
                      multiEnable={true}
                    />
                  </View>

                  {/* Underlying conditions */}
                  <View className="mb-2" style={{ width: 325 }}>
                    <MultiSelect
                      sentry-label="edit-profile-underlyingconditions"
                      label="Underlying Conditions"
                      value={conditions.value}
                      onSelection={(value) =>
                        setConditions({
                          ...conditions,
                          value: value.text,
                          selectedList: value.selectedList,
                          error: "",
                        })
                      }
                      arrayList={[...conditions.list]}
                      selectedArrayList={[...conditions.selectedList]}
                      multiEnable={true}
                    />
                  </View>

                  {toggleOthers && (
                    <View className="mb-3 w-[325]">
                      <CustomInput
                        placeholder="If other, please specify"
                        value={otherCondition}
                        onChangeText={(text) => setOtherCondition(text)}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View className="px-8 mt-4">
        <CustomButton
          sentry-label="edit-profile-save-btn"
          variant="primary"
          btnLabel="Save"
          onPress={createProfile}
        />
      </View>
    </CustomSafeView>
  );
};

export default EditProfile;
