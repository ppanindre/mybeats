import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import moment from "moment";
import CustomButton from "../../../components/CustomButton";
import { theme } from "../../../tailwind.config";
import CustomSafeView from "../../../components/CustomSafeView";

const ListItem = ({ children }) => {
  return (
    <View className="flex flex-row">
      <Text style={{ fontSize: 16, marginRight: 4 }}>•</Text>
      <Text>{children}</Text>
    </View>
  );
};

const ConsentForm = ({ onConsent, alreadyConsented = false, goBack }) => {
  const user = useSelector((state) => state.UserReducer);

  const formattedDate = moment(user?.profileData?.consentDate).format(
    "MMM DD, YYYY"
  );

  return (
    <CustomSafeView>
      {/* Header */}
      <View className="flex-row items-center justify-between  border-b-2 p-5 border-darkSecondary">
        <View className="flex flex-row items-center space-x-2">
          {alreadyConsented && (
            <TouchableOpacity sentry-label="profile-back-btn" onPress={goBack}>
              <ChevronLeftIcon color={theme.colors.dark} />
            </TouchableOpacity>
          )}
          <Text className="text-2xl font-bold">Consent Form</Text>
        </View>

        {user && (
          <View>{alreadyConsented && <Text>{formattedDate}</Text>}</View>
        )}
      </View>

      <ScrollView
        className="p-5 space-y-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View>
          <Text className="font-bold">LAST UPDATED: March 18, 2025</Text>
        </View>

        <Text>
          You are invited to participate in a pilot study aimed at evaluating an
          AI-based health monitoring application designed to improve firefighter
          health and provide advanced insurance analytics. We are conducting
          this pilot test in collaboration with your insurance company.
        </Text>

        {/* 1. Invitation & Voluntary Participation */}
        <View>
          <Text className="font-bold text-lg">
            1. Invitation & Voluntary Participation
          </Text>
          <View className="pl-4 space-y-2 mt-2">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Participation is completely voluntary.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Your decision to participate, withdraw, or not participate will
                not affect your relationship with any entity.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You may withdraw at any time without penalty by using the
                “Withdraw Participation” option in the app or by uninstalling
                the app.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Withdrawal does not affect the use of data collected previously
                during your participation.
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Purpose of the Study */}
        <View>
          <Text className="font-bold text-lg">2. Purpose of the Study</Text>
          <Text className="mt-2">The purpose of this pilot study is to:</Text>
          <View className="pl-4 space-y-2 mt-2">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Assess the effectiveness of an AI-powered mobile application in
                providing personalized health insights to firefighters and
                enabling them to improve their health.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Use wearable health tracker data to create analytics for
                insurance companies.
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Eligibility */}
        <View>
          <Text className="font-bold text-lg">3. Eligibility</Text>
          <Text className="mt-2">
            You are eligible to participate if you are an active firefighter
            who:
          </Text>
          <View className="pl-4 space-y-2 mt-2">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Agrees to wear a health tracker (either one provided by the
                study or your own device).
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Is willing to sync your device with our mobile app for data
                collection over a 30-day period.
              </Text>
            </View>
          </View>
        </View>

        {/* 4. Study Procedures */}
        <View>
          <Text className="font-bold text-lg">4. Study Procedures</Text>
          <Text className="mt-2">
            If you agree to participate, you will be asked to do the following
            over a 30-day period:
          </Text>

          {/* a. Health Tracker Use */}
          <Text className="font-bold mt-2">a. Health Tracker Use:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You will receive a health tracker or use your own.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You are expected to charge and wear the tracker as consistently
                as possible.
              </Text>
            </View>
          </View>

          {/* b. Data Syncing */}
          <Text className="font-bold mt-4">b. Data Syncing:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Connect and sync your health tracker with our mobile app daily.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                The app will automatically upload your data (e.g., heart rate,
                activity levels, sleep patterns, caloric intake, etc.) directly
                to our AI models without manual intervention.
              </Text>
            </View>
          </View>

          {/* c. AI-Generated Insights */}
          <Text className="font-bold mt-4">c. AI-Health Insights:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Receive personalized health insights and recommendations within
                the app.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                These insights are for informational purposes only and do not
                constitute medical advice.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Generate points based on wearables data and weekly leaderboards
                to encourage community engagement and promote a healthy
                lifestyle among participants.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                The gamification and social features are provided solely for
                motivational purposes and are not intended for performance
                evaluation.
              </Text>
            </View>
          </View>

          {/* d. Feedback Submission */}
          <Text className="font-bold mt-4">d. Feedback Submission:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                At the end of the pilot study, you will be asked to complete a
                brief survey regarding your experience with the app.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Survey responses will be de-linked from personally identifiable
                information and used only for aggregate analysis.
              </Text>
            </View>
          </View>

          <Text className="mt-4">
            After the pilot test, you may disconnect the health tracker with the
            app and continue to use your devices the way you were using it
            before participating in the pilot test. At the end of the pilot
            test, if you were provided with a health tracker by us, please
            return it. Please contact us at contact@mybeatshealth.com for return
            instructions.
          </Text>
        </View>
        {/* 5. Data Collection, Use & Privacy */}
        <View>
          <Text className="font-bold text-lg">
            5. Data Collection, Use & Privacy
          </Text>

          {/* What We Collect */}
          <Text className="font-bold mt-2">What We Collect:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Health data (heart rate, activity, sleep patterns, caloric
                intake, etc.) from your wearable device.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                App interaction data (usage logs, engagement with gamifications
                and social features, survey responses).
              </Text>
            </View>
          </View>

          {/* How We Use Your Data */}
          <Text className="font-bold mt-4">How We Use Your Data:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                To provide real-time, AI-driven health insights tailored to you.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                To create analytics, insights, and information for insurance
                companies.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Any identifiable data will not be shared with your employer.
              </Text>
            </View>
          </View>

          {/* Data Security & Confidentiality */}
          <Text className="font-bold mt-4">
            Data Security & Confidentiality:
          </Text>
          <Text className="pl-4 mt-1">
            • All data is stored securely on cloud servers. Access to data is
            limited to authorized personnel for system monitoring and support.
            We do not share your personally identifiable information with third
            parties except in the following circumstances:
          </Text>
          <Text className="pl-4 mt-1">
            • With your explicit consent, when you authorize additional sharing.
          </Text>
          <Text className="pl-4 mt-1">
            • With trusted third-party service providers who help operate our
            Services (these providers are contractually required to protect your
            data).
          </Text>
          <Text className="pl-4 mt-1">
            • As required by law, regulation, or legal process (such as
            subpoenas or court orders).
          </Text>
          <Text className="pl-4 mt-1">
            • To protect our rights, property, or safety, and that of our users
            and others.
          </Text>

          {/* Future Use of Data */}
          <Text className="font-bold mt-4">Future Use of Data:</Text>
          <Text className="pl-4 mt-1">
            • Data may be used for future research and further enhancement of
            our AI models.
          </Text>

          <Text className="mt-4">
            {" "}
            Additionally, the analytics generated through your data may be
            shared with your insurance company for risk assessment, application
            development, and improving insurance-related analytics. Any
            decisions made based on such analytics are solely at the user's
            risk.
          </Text>
        </View>
        {/* 6. Risks & Discomforts */}
        <View>
          <Text className="font-bold text-lg">6. Risks & Discomforts</Text>

          {/* Potential Risks */}
          <Text className="font-bold mt-2">Potential Risks:</Text>
          <View className="pl-4 space-y-2 mt-1">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                The mobile app may use additional battery power and cellular
                data.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                This study is not intended to provide medical advice or
                emergency health monitoring.
              </Text>
            </View>
          </View>

          {/* Discomforts */}
          <Text className="font-bold mt-4">Discomforts:</Text>
          <Text className="pl-4 mt-1">
            • Minimal, primarily related to charging and wearing the health
            tracker, and syncing data daily.
          </Text>
        </View>
        {/* 7. Benefits */}
        <View>
          <Text className="font-bold text-lg">7. Benefits</Text>

          {/* Personal Benefits */}
          <Text className="font-bold mt-2">Personal Benefits:</Text>
          <Text className="pl-4 mt-1">
            • Gain access to personalized, AI-driven health insights that may
            help you manage your health better.
          </Text>

          {/* Broader Benefits */}
          <Text className="font-bold mt-4">Broader Benefits:</Text>
          <Text className="pl-4 mt-1">
            • Your participation will help improve tools that may benefit the
            wider firefighting community.
          </Text>
        </View>
        {/* 8. Withdrawal & Data Retention */}
        <View>
          <Text className="font-bold text-lg">
            8. Withdrawal & Data Retention
          </Text>
          <View className="pl-4 space-y-2 mt-2">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You may withdraw from the study at any time by uninstalling the
                app or clicking the “Withdraw Participation” option in the app.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                If you withdraw, no new data will be collected, but previously
                de-identified, aggregate data may continue to be used for
                research and analytics purposes.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                Upon withdrawal, you may request the deletion of any remaining
                personal data by contacting us at: contact@mybeatshealth.com.
              </Text>
            </View>
          </View>
        </View>
        {/* 9. Contact Information */}
        <View>
          <Text className="font-bold text-lg">9. Contact Information</Text>
          <Text className="mt-2">
            You may chat with our team through the app if you face any issues.
            For questions about your rights as a participant and concerns
            regarding your data or about this pilot study, please contact us at{" "}
            <Text className="underline">contact@mybeatshealth.com</Text>
          </Text>

          {/* <Text>Phone: +1-(732) 639-0066</Text> */}
        </View>
        {/* 10. Agreement to Participate */}
        <View>
          <Text className="font-bold text-lg">
            10. Agreement to Participate
          </Text>
          <Text className="mt-2">
            By clicking “I Consent” below, you acknowledge that:
          </Text>
          <View className="pl-4 space-y-2 mt-2">
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You have read and understood this Consent Form.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You voluntarily agree to participate in the pilot study.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You consent to the collection, processing, use, and sharing of
                your health data as described above.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text style={{ marginRight: 8 }}>•</Text>
              <Text className="flex-1">
                You understand that you can withdraw at any time without
                penalty.
              </Text>
            </View>
          </View>
        </View>

        {!alreadyConsented && (
          <View className="flex flex-row space-x-5 justify-between">
            <View className="flex flex-1">
              <CustomButton
                variant="light"
                btnLabel="I do not Consent"
                onPress={() =>
                  Alert.alert(
                    "",
                    "We can not access your health data without your consent. Unfortunately, you can not proceed further and use our app. Sorry!"
                  )
                }
              />
            </View>
            <View className="flex flex-1">
              <CustomButton
                variant={alreadyConsented ? "disabled" : "primary"}
                onPress={() => onConsent(true)}
                btnLabel="I Consent"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </CustomSafeView>
  );
};

export default ConsentForm;
