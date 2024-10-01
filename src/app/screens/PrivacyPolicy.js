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
      <View className="flex-row items-center space-x-2 border-b-2 p-5 borderdarkSecondary">
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
        {/* Last Updated Date */}
        <View>
          <Text className="font-bold">Last Updated: 29 Sept 2024</Text>
        </View>

        {/* Introduction */}
        <View>
          <Text className="font-bold">Introduction</Text>
          <Text>
            This Privacy Policy sets forth the principles governing the
            collection, use, disclosure, retention, and protection of Personal
            Information ("PI") as processed by FireBeats Inc. ("FireBeats",
            "we", "us", "our") within the scope of our mobile application (the
            "App") designed for health risk mitigation in firefighters. By
            utilizing our Services, you consent to this Privacy Policy, which is
            subject to continuous review to ensure compliance with applicable
            regulations and standards, including but not limited to the General
            Data Protection Regulation (GDPR), the California Consumer Privacy
            Act (CCPA), and the Health Insurance Portability and Accountability
            Act (HIPAA).
          </Text>
        </View>

        {/* Information We Collect */}
        <View>
          <Text className="font-bold">1. Information We Collect</Text>
          <View>
            <Text className="font-bold">1.1 Personal Information</Text>
            <Text>
              We process the following categories of Personal Information to
              provide the Services: Contact Information: Identifiable
              information such as first name, last name, email, and address.
              Demographic Data: Age, gender, weight, and height. Health-Related
              Information: Physiological data derived from wearable devices,
              including but not limited to heart rate, activity levels, and
              sleep data, all of which may be classified as health data under
              relevant laws.
            </Text>
          </View>

          <View>
            <Text className="font-bold">1.2 Non-Personal Information</Text>
            <Text>
              Device Information: Technical data regarding the user’s device,
              operating system, and browser information. Usage Data: Information
              such as app interactions, access times, and browsing patterns,
              which is aggregated and anonymized to remove identifiable
              attributes.
            </Text>
          </View>
        </View>

        {/* Legal Basis for Processing */}
        <View>
          <Text className="font-bold">2. Legal Basis for Processing</Text>
          <Text>
            We process Personal Information based on the following legal grounds
            pursuant to Article 6 of the GDPR and other applicable laws: -
            Performance of a Contract: To provide our health monitoring and
            notification services. - Legitimate Interests: To improve, optimize,
            and personalize our services. - Consent: Explicit consent is
            required for processing sensitive personal data such as
            health-related information. - Compliance with Legal Obligations: To
            comply with relevant statutory or regulatory requirements.
          </Text>
        </View>

        {/* Purpose of Processing */}
        <View>
          <Text className="font-bold">3. Purpose of Processing</Text>
          <Text>
            The data collected will be used for: - Health Risk Detection: Our
            machine learning algorithms analyze heart rate, activity levels, and
            sleep patterns to detect early signs of cardiovascular diseases such
            as arrhythmia or hypertension. - Caloric Analysis: Data from the
            camera is used to calculate caloric intake based on images of food
            items. - Service Enhancement: Non-personal usage data is analyzed to
            improve functionality, identify technical issues, and optimize user
            experience.
          </Text>
        </View>

        {/* Data Sharing and Disclosure */}
        <View>
          <Text className="font-bold">4. Data Sharing and Disclosure</Text>
          <Text>
            We maintain strict data privacy standards and will only share
            Personal Information under the following circumstances: -
            Third-Party Service Providers: We may engage trusted service
            providers to process data on our behalf. These entities are
            contractually bound to implement stringent data security measures
            consistent with the requirements of GDPR Article 28 and
            HIPAA-compliant data security standards, including pseudonymization,
            encryption, and access restrictions. - Legal and Regulatory
            Compliance: We may disclose your Personal Information to
            governmental authorities, courts, or regulatory bodies when required
            to do so by law (e.g., compliance with subpoenas or court orders). -
            With Consent: In certain instances, we may share data with third
            parties where explicit user consent has been obtained.
          </Text>
        </View>

        {/* Data Security */}
        <View>
          <Text className="font-bold">5. Data Security</Text>
          <Text>
            We utilize robust technical and organizational safeguards in
            accordance with ISO/IEC 27001 standards and the NIST Cybersecurity
            Framework to prevent unauthorized access, alteration, or disclosure
            of Personal Information. These measures include but are not limited
            to encryption protocols (TLS/SSL), regular security audits, access
            control, and pseudonymization. Despite these efforts, no data
            transmission or storage mechanism can be guaranteed as entirely
            secure, and as such FireBeats disclaims liability for any breaches
            beyond its control.
          </Text>
        </View>

        {/* Data Retention and Deletion */}
        <View>
          <Text className="font-bold">6. Data Retention and Deletion</Text>
          <Text>
            We retain Personal Information for as long as necessary to fulfill
            the purposes for which it was collected, subject to legal and
            regulatory retention requirements. Data that is no longer required
            will be securely anonymized or deleted in accordance with GDPR
            Article 17 and HIPAA guidelines upon user request or at the
            conclusion of service provision.
          </Text>
        </View>

        {/* User Rights and Choices */}
        <View>
          <Text className="font-bold">7. User Rights and Choices</Text>
          <Text>
            Users retain the following rights under applicable data protection
            laws as outlined in GDPR Article 20 and HIPAA guidelines: - Access
            and Portability: You have the right to request access to the data we
            process and receive it in a structured, commonly used,
            machine-readable format. - Rectification: You may request the
            correction or amendment of inaccurate or incomplete data. - Erasure
            (Right to be Forgotten): Users may request the deletion of their
            data except where retention is required by law or for legitimate
            business interests. - Data Processing Restriction and Objection: You
            may restrict the processing of your data or object to certain types
            of processing. - Withdrawal of Consent: Where processing is based on
            consent, you may withdraw consent at any time without affecting the
            lawfulness of processing based on consent before its withdrawal.
          </Text>
        </View>

        {/* Children's Privacy */}
        <View>
          <Text className="font-bold">8. Children’s Privacy</Text>
          <Text>
            Our Services are not directed towards individuals under the age of
            18, and we do not knowingly process the data of minors without
            verified parental consent in accordance with COPPA and applicable
            child protection laws.
          </Text>
        </View>

        {/* Changes to This Privacy Policy */}
        <View>
          <Text className="font-bold">9. Changes to This Privacy Policy</Text>
          <Text>
            We reserve the right to modify this Privacy Policy to reflect
            changes in legal requirements or our data handling practices.
            Material changes will be communicated to users via the app or other
            appropriate means, with the updated policy available on our website.
            Continued use of the Services will constitute acceptance of the
            revised policy.
          </Text>
        </View>

        {/* Contact Information */}
        <View>
          <Text className="font-bold">Contact Information</Text>
          <Text>
            If you have any inquiries or wish to exercise your data protection
            rights, please contact us at firebeatsapp@gmail.com.
          </Text>
        </View>
      </ScrollView>
    </CustomSafeView>
  );
};

export default PrivacyPolicy;
