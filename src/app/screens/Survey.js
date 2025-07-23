import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeView from "../../../components/CustomSafeView";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import CustomButton from "../../../components/CustomButton";
import { RadioButton } from "react-native-paper";
import { sendSurveyAnswers } from "../../../apis/surveyQueries";
import FormInput from "../components/Inputs/FormInput";

const surveyQuestions = [
  "The goals, purpose, and objectives of the app and the overall project were explained in detail at the beginning of participation.",
  "I was able to register my health tracker in the mobile app easily.",
  "The app provided a good tutorial for explaining its features and their use.",
  "The app provided good visualization and understanding of the data recorded by my health tracker.",
  "The app was able to run on my smartphone without any difficulty.",
  "I was provided the option to disengage and replace my health tracker from the app, and withdraw my participation.",
  "I received useful notifications and assistance from the app.",
  "I liked the app’s overall design and interface.",
  "The app is easy-to-use, interactive, and has a good built-in user experience.",
  "This app can assist the firefighters in improving their health and wellness, and has the potential for nationwide  applicability.",
];

const questionCategory = [
  "explanation",
  "linking",
  "tutorial",
  "visualization",
  "smoothness",
  "withdraw",
  "notification",
  "design",
  "user_experience",
  "helpful",
];

const radioButtonValues = [1, 2, 3, 4, 5];

// const Survey = () => {
//   const [questionIndex, setQuestionIndex] = useState(null);
//   const [isSurveyFinished, setIsSurveyFinished] = useState(false);
//   const [answers, setAnswers] = useState({});
//   const [checked, setChecked] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const postAnswers = async () => {
//       setIsLoading(true);
//       await sendSurveyAnswers(answers);
//       setIsLoading(false);
//     };

//     if (isSurveyFinished) {
//       postAnswers();
//     }
//   }, [isSurveyFinished]);

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const addAnswer = () => {
//     if (checked === null) {
//       Alert.alert(
//         "",
//         "Please select an option to go to the next question"
//       );
//     } else {
//       const category = questionCategory[questionIndex];
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         [category]: checked,
//       }));
//       setQuestionIndex(questionIndex + 1);
//       setChecked(null);
//     }
//   };

//   const finishSurvey = () => {
//     const category = questionCategory[questionIndex];
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [category]: checked,
//     }));
//     setChecked(null);
//     setIsSurveyFinished(true);
//   };

//   return (
//     <CustomSafeView>
//       {/* Header */}
//       <View className="p-5 border-b-2 border-darkSecondary flex-row items-center gap-2">
//         <TouchableOpacity onPress={goBack}>
//           <ChevronLeftIcon color="#000000" />
//         </TouchableOpacity>
//         <Text className="text-2xl font-bold">Survey</Text>
//       </View>

//       {/* Content */}
//       <View className="p-5">
//         {questionIndex !== null ? (
//           <View>
//             <Text className="text-lg mb-5">
//               {surveyQuestions[questionIndex]}
//             </Text>
//             <View className="flex-row items-center justify-center gap-3 mb-5">
//               {radioButtonValues.map((radioValue, index) => (
//                 <View className="items-center">
//                   <View className="border-2 border-primary mb-2 rounded-full">
//                     <RadioButton
//                       key={index}
//                       value={radioValue}
//                       color="#fb923c"
//                       status={checked === radioValue ? "checked" : "unchecked"}
//                       onPress={() => setChecked(radioValue)}
//                     />
//                   </View>
//                   <Text className="text-lg">{radioValue}</Text>
//                 </View>
//               ))}
//             </View>
//             {questionIndex !== 9 ? (
//               <CustomButton
//                 onPress={addAnswer}
//                 variant="primary"
//                 btnLabel="Next"
//               />
//             ) : (
//               <CustomButton
//                 onPress={finishSurvey}
//                 variant="primary"
//                 btnLabel={
//                   isLoading ? <ActivityIndicator color="#ffffff" /> : "Next"
//                 }
//               />
//             )}
//           </View>
//         ) : (
//           <View>
//             <View className="mb-5">
//               <Text className="text-lg">
//                 We would like you to rate the app’s user interface, experience,
//                 ease-of-use, helpfulness, and overall project using the rating
//                 scale provided. Click on a number or below the number for each
//                 item that best reflects how you feel. That is, select 1 if you{" "}
//                 <Text className="font-bold">strongly disagree</Text>, 5 if you
//                 neither agree nor disagree, and 10 if you{" "}
//                 <Text className="font-bold">strongly agree</Text> with the
//                 statement, or any number in between.
//               </Text>
//             </View>
//             <CustomButton
//               variant="primary"
//               btnLabel="Let's Go!"
//               onPress={() => setQuestionIndex(0)}
//             />
//           </View>
//         )}
//       </View>
//     </CustomSafeView>
//   );
// };

const Survey = () => {
  const radioButtons = [
    {
      id: 1,
      name: 1,
      isSelected: false,
    },
    {
      id: 2,
      name: 2,
      isSelected: false,
    },
    {
      id: 3,
      name: 3,
      isSelected: false,
    },
    {
      id: 4,
      name: 4,
      isSelected: false,
    },
    {
      id: 5,
      name: 5,
      isSelected: false,
    },
  ];

  const [radioButtonsData, setRadioButtonsData] = useState(radioButtons);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const selectButton = (id) => {
    setRadioButtonsData((prevData) =>
      prevData.map((data) =>
        id === data.id
          ? { ...data, isSelected: true }
          : { ...data, isSelected: false }
      )
    );
  };

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="p-5 border-b-2 border-darkSecondary flex-row items-center gap-2">
        <TouchableOpacity onPress={goBack}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Survey</Text>
      </View>

      {/* Survey Content */}
      <View className="p-5">
        <Text className="text-lg mb-4">
          We would like you to rate the app’s user interface, experience,
          ease-of-use, helpfulness, and overall project using the rating scale
          provided below. Circle a number for each item that best reflects how
          you feel. That is, circle 1 if you strongly disagree, 5 if you
          strongly agree with the statement, or
        </Text>

        {/* Survey screen */}
        <View className="flex-row items-center justify-center gap-3 mb-5">
          {radioButtonsData.map((data) => (
            <View key={data.id} className="items-center">
              <TouchableOpacity
                onPress={() => selectButton(data.id)}
                className={`p-3 border-4 border-primary rounded-full border-double ${
                  data.isSelected && "bg-primary"
                }`}
              />
              <Text>{data.name}</Text>
            </View>
          ))}
        </View>

        {/* Text area */}
        <View className="mb-5">
          <Text className="mb-3 text-lg">Give us your feedback</Text>
          <TextInput
            className="border-2 border-darkSecondary rounded-lg p-3 text-lg"
            multiline={true}
            numberOfLines={10}
            style={{ height: 200, textAlignVertical: "top" }}
          />
        </View>

        {/* Primary Button */}
        <CustomButton
          variant="primary"
          btnLabel="Send FeedBack"
        />
      </View>
    </CustomSafeView>
  );
};

export default Survey;
