import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import CustomSafeView from "../../../components/CustomSafeView";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="flex-row  items-center  space-x-2 border-b-2 p-5 border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Privacy Policy</Text>
      </View>

      <ScrollView
        className="p-5 space-y-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View>
          <Text className="font-bold">Effective Date: June 29, 2023</Text>
        </View>

        <View>
          <Text className="font-bold">Introduction</Text>
          <Text>
            Welcome! We are committed to protecting the privacy and security of
            your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your personal data when you
            use our mobile application and related services (collectively
            referred to as the &quot;Services&quot;). Please read this Privacy
            Policy carefully to understand our practices regarding your personal
            information. By using our Services, you consent to the data
            practices described in this Privacy Policy.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Information We Collect</Text>
          <View className="space-y-2">
            <View>
              <Text>
                1. Personal Information: When you use our Services, we may
                collect personal information that can be used to identify you as
                an individual or that is associated with you. This may include:
              </Text>
              <Text>{`\u2022 Contact information (such as your name, email address, and phone number)`}</Text>
              <Text>{`\u2022 Demographic information (such as your age, gender, and location)`}</Text>
              <Text>{`\u2022 Health-related information (such as physiological data from your wearable health tracker)`}</Text>
            </View>
            <View>
              <Text>
                2. Non-Personal Information: We may also collect non-personal
                information that does not directly identify you. This may
                include:
              </Text>
              <Text>{`\u2022 Aggregated data about user activity on our Services`}</Text>
              <Text>{`\u2022 Device information (such as the type of device, operating system, and browser)`}</Text>
              <Text>{`\u2022 Log data (such as IP addresses, access times, and browsing behavior)`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="font-bold">Use of Information</Text>
          <View>
            <Text>
              We use the information we collect for various purposes, including:
            </Text>
            <View>
              <Text>{`\u2022 Providing and personalizing our Services to meet your needs`}</Text>
              <Text>{`\u2022 Analyzing and improving our Services`}</Text>
              <Text>{`\u2022 Communicating with you and responding to your inquiries`}</Text>
              <Text>{`\u2022 Sending you important notifications and updates about the Services`}</Text>
              <Text>{`\u2022 Detecting and preventing fraudulent or unauthorized activities`}</Text>
              <Text>{`\u2022 Complying with legal obligations`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="font-bold">Data Sharing and Disclosure</Text>
          <View>
            <Text>
              We may share your personal information in the following
              circumstances:
            </Text>
            <View>
              <Text>{`\u2022 With your consent: We may share your information when you give us explicit permission to do so.`}</Text>
              <Text>{`\u2022 We may engage trusted third-party service providers who assist us in providing the Services. These service providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your data.`}</Text>
              <Text>{`\u2022 Communicating with you and responding to your inquiries`}</Text>
              <Text>{`\u2022 Legal requirements: We may disclose your information if required to do so by law or in response to valid legal requests, such as subpoenas or court orders.`}</Text>
              <Text>{`\u2022 Protection of rights: We may disclose your information to protect our rights, property, or safety, as well as the rights, property, or safety of others.`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="font-bold">Data Security</Text>
          <Text>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, please be aware that no security measures are 100% secure,
            and we cannot guarantee the absolute security of your data.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Data Retention</Text>
          <Text>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. We will
            securely delete or anonymize your personal information when it is no
            longer needed.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Your Choices and Rights</Text>
          <View>
            <View>
              <Text>{`\u2022 Opt-out: You may choose to opt-out of receiving promotional communications from us by following the instructions provided in our emails or by contacting us directly.`}</Text>
              <Text>{`\u2022 Access and Correction: You have the right to access and correct your personal information held by us. You may update your information directly within the mobile application or by contacting us.`}</Text>
              <Text>{`\u2022 Data Portability: You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.`}</Text>
              <Text>{`\u2022 Deletion: You may request the deletion of your personal information, subject to certain exceptions under applicable laws.`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="font-bold">Children&#39;s Privacy</Text>
          <Text>
            Our Services are not intended for individuals under the age of 18.
            We do not knowingly collect or solicit personal information from
            anyone under the age of 18. If we become aware that we have
            collected personal information from a child under the age of 18
            without obtaining parental consent, we will take steps to delete
            that information promptly. If you believe that we may have collected
            personal information from a child under 18 without parental consent,
            please contact us immediately.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Updates to this Privacy Policy</Text>
          <Text>
            We may update this Privacy Policy from time to time to reflect
            changes in our data practices or legal requirements. We will notify
            you of any material changes by posting the updated Privacy Policy on
            our website or through other communication channels. Please review
            this Privacy Policy periodically for any updates.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Contact Us</Text>
          <Text>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us at
            firebeatsapp@gmail.com. We will respond to your inquiries as soon as
            reasonably possible.
          </Text>
        </View>

        <View>
          <Text className="font-bold">Conclusion</Text>
          <Text>
            Protecting your privacy is of utmost importance to us. We strive to
            handle your personal information responsibly and in accordance with
            applicable data protection laws. By using our Services, you
            acknowledge that you have read and understood this Privacy Policy
            and consent to the collection, use, and disclosure of your personal
            information as described herein.
          </Text>
        </View>

        <Text>Thank you for entrusting us with your personal information.</Text>
        <Text>FireBeats Privacy Team</Text>
      </ScrollView>
    </CustomSafeView>
  );
};

export default PrivacyPolicy;
