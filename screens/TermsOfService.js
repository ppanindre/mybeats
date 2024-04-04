import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import CustomSafeView from "../components/CustomSafeView";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const termsOfServiceData = [
  {
    header: "Acceptance of Terms",
    body: `By accessing or using our mobile application ("the App"), you agree to comply with and be bound by these Terms of Service "Terms". If you do not agree to these Terms, please do not use the App.`,
  },
  {
    header: "Changes to Terms",
    body: `We reserve the right to modify or revise these Terms at any time. Any changes will be effective immediately upon posting the updated Terms on the App. Your continued use of the App after any changes constitutes your acceptance of the revised Terms.`,
  },
  {
    header: "Privacy Policy",
    body: `Your use of the App is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand our data practices.`,
  },
  {
    header: "User Eligibility",
    body: `You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are of legal age.`,
  },
  {
    header: "Access to Data",
    body: `The App connects to your personal wireless wearable health trackers to collect and analyze physiological data. By using the App, you grant us permission to access, collect, store, and use this data for the purpose of evaluating health risk factors and providing alerts.`,
  },
  {
    header: "Health Information",
    body: `The App provides health information and alerts based on the data collected. This information is for informational purposes only and should not be considered medical advice. Consult a healthcare professional for personalized medical guidance.`,
  },
  {
    header: "Intellectual Property",
    body: `All content and materials on the App, including text, graphics, logos, images, and software, are our property and are protected by intellectual property laws.`,
  },
  {
    header: "User Conduct",
    body: `You agree not to:`,
    listItems: [
      `\u2022 Use the App for any unlawful purpose or in violation of these Terms.`,
      `\u2022 Share false or misleading information through the App.`,
      `\u2022 Attempt to access, use, or disrupt the App's security features.`,
      `\u2022 Reverse engineer, decompile, or disassemble any part of the App.`,
      `\u2022 Use the App to harass, harm, or infringe upon the rights of others.`,
    ],
  },
  {
    header: "Termination",
    body: `We reserve the right to terminate or suspend your access to the App at any time, with or without cause and without notice.`,
  },
  {
    header: "Disclaimers and Limitation of Liability",
    body: ``,
    listItems: [
      `\u2022 The App is provided "as is"; without warranties of any kind.`,
      `\u2022 We are not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of the App.`,
      `\u2022 We are not responsible for the accuracy or reliability of data provided by wearable health trackers or the results provided by the Artificial Intelligence techniques integrated in the App.`,
    ],
  },
  {
    header: "Contact Information",
    body: `If you have any questions or concerns regarding these Terms, please contact us at fire.research@nyu.edu.`,
  },
];

const TermsOfService = () => {
  const navigation = useNavigation();

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="flex-row  items-center  space-x-2 border-b-2 p-5 border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Terms Of Service</Text>
      </View>

      <ScrollView
        className="p-5 space-y-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View>
          <Text className="font-bold">Effective Date: August 1, 2023</Text>
        </View>

        {termsOfServiceData.map((data, index) => (
          <View key={index}>
            <Text className="font-bold">{`${index + 1}. ${data.header}`}</Text>
            <Text>{data.body}</Text>
            {data.listItems &&
              data.listItems.map((item, index) => (
                <View
                  key={index}
                  className="mt-1"
                >
                  <Text className="flex-1">{item}</Text>
                </View>
              ))}
          </View>
        ))}

        <View>
          <Text>Thank you!</Text>
        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default TermsOfService;
