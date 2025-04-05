import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import CustomSafeView from "../../../../components/CustomSafeView";
import MessageInput from "../../../../components/MessageInput";
import ChatBubble from "../../../../components/ChatBubble";
import { Ionicons } from "@expo/vector-icons";
import { customTheme } from "../../../../constants/themeConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  listUmaMessagesAction,
  createUmaMessageAction,
  sendUmaMessageAction,
} from "../../../../store/actions/umaChatActions";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import Loader from "../Utils/Loader";

let shouldShowNotice = true;

const UmaChatBot = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const patient = route?.params?.patientId;
  const doctorId = useSelector((state) => state.UserReducer?.userId);
  const contextKey = patient ? `patient_${patient.id}` : "general";
  const rawMessages = useSelector((state) => state.umaChatReducer.chats);
  const messages = useMemo(
    () => rawMessages?.[contextKey] || [],
    [rawMessages, contextKey]
  );
  const scrollRef = useRef();
  const [showNotice, setShowNotice] = useState(shouldShowNotice);
  const { loadingMessages, sendingMessage } = useSelector((state) => state.umaChatReducer);

  const cameFromDoctorDashboard = route?.params?.from === "patientDashboard";

  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    if (doctorId) {
      dispatch(listUmaMessagesAction(doctorId, patient?.id || null)).then(() => {
        hasFetchedOnce.current = true;
      });
    }
  }, [doctorId, patient]);
  
  useEffect(() => {
    if (!hasFetchedOnce.current || !doctorId) return;
  
    const welcomeText = patient?.firstname
      ? `Hi, I’m Uma! I’m here to help with patient ${patient.firstname} ${patient.lastname}.`
      : "Hi, I’m Uma! I’m here to help you with any medical questions 🤖";
  
    const hasWelcomeMessage = messages.some(
      (msg) =>
        msg.sender === "uma" &&
        msg.messageType === "text" &&
        msg.content?.trim() === welcomeText.trim()
    );
  
    if (!hasWelcomeMessage) {
      const welcomeMessage = {
        chatSessionId: contextKey,
        messageID: uuidv4(),
        timestamp: new Date().toISOString(),
        sender: "uma",
        content: welcomeText,
        messageType: "text",
        status: "sent",
        doctorID: doctorId,
        ...(patient?.id && { patientID: patient.id }),
      };
  
      dispatch(createUmaMessageAction(welcomeMessage));
    }
  }, [messages, doctorId]);
  
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
  
    dispatch(sendUmaMessageAction(text, doctorId, patient));
  };
  
  
  // Group messages by date
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  
  const groupMessagesByDate = () => {
    const grouped = {};
    sortedMessages.forEach((msg) => {
      const dateKey = moment(msg.timestamp).format("D MMM, YYYY");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    });
    return grouped;
  };
  
  const groupedMessages = groupMessagesByDate();

  if (loadingMessages) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <CustomSafeView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            <ScrollView
              ref={scrollRef}
              className="p-5"
              contentContainerStyle={{ paddingBottom: 100 }}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: true })
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="space-y-8">
                {/* Static Notice at top if NOT from doc dashboard */}
                {cameFromDoctorDashboard && showNotice && (
                  <View className="bg-darkSecondary px-5 py-2 rounded-lg">
                    <Text className="text-xs text-white text-center">
                      If you have questions related to a specific patient,
                      please navigate to that patient's profile and message me.
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowNotice(false);
                        shouldShowNotice = false;
                      }}
                      className="absolute top-1 right-1"
                    >
                      <Ionicons
                        name="close-circle"
                        size={18}
                        style={{ color: customTheme.colors.dark }}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {!loadingMessages && Object.keys(groupedMessages).map((date, idx) => (
                  <View className="space-y-5" key={idx}>
                    {/* Date Bubble */}
                    <View className="items-center">
                      <View className="bg-darkSecondary p-2 rounded-lg">
                        <Text className="text-xs text-white">{date}</Text>
                      </View>
                    </View>

                    <View>
                      {/* Chat messages with date */}
                      {groupedMessages[date].map((msg, index) => (
                        <ChatBubble
                          key={index}
                          sender={msg.sender === "uma" ? "admin" : "user"}
                          message={msg.content}
                          time={moment(msg.timestamp).format("h:mm A")}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View className="absolute bottom-0 w-full">
              <MessageInput onSubmit={handleSendMessage} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </CustomSafeView>
    </TouchableWithoutFeedback>
  );
};

export default UmaChatBot;
