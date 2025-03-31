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
import { setUmaMessages } from "../../../../store/actions/umaChatActions";
import { useMemo } from "react";
import axios from "axios";

let shouldShowNotice = true;

const UmaChatBot = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const patient = route?.params?.patientId;
  const contextKey = patient ? `patient_${patient.id}` : "general";
  const rawMessages = useSelector((state) => state.umaChatReducer.chats);
  const messages = useMemo(
    () => rawMessages?.[contextKey] || [],
    [rawMessages, contextKey]
  );
  const scrollRef = useRef();
  const [showNotice, setShowNotice] = useState(shouldShowNotice);

  const cameFromDoctorDashboard = route?.params?.from === "patientDashboard";

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const h = height / 100;
    return (weight / (h * h)).toFixed(2);
  };

  useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        id: "uma-welcome",
        sender: "uma",
        body: patient?.firstname
          ? `Hi, I’m Uma! I’m here to help with patient ${patient.firstname} ${patient.lastname}.`
          : "Hi, I’m Uma! I’m here to help you with any medical questions 🤖",
        timeStamp: Date.now(),
      };
      dispatch(setUmaMessages(contextKey, [welcome]));
    }
  }, []);

  useEffect(() => {
    if (patient) {
      console.log("Patient Details:", {
        id: patient.id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        age: patient.age,
        height: patient.height,
        weight: patient.weight,
      });
    }
  }, [patient]);
  

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
  
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      body: text,
      timeStamp: Date.now(),
    };
  
    const updatedMessages = [...messages, userMessage];
    dispatch(setUmaMessages(contextKey, updatedMessages));
  
    setTimeout(async () => {
      const typingMessage = {
        id: "uma-typing",
        sender: "uma",
        body: "Uma is typing...",
        timeStamp: Date.now(),
        isTyping: true,
      };
  
      dispatch(setUmaMessages(contextKey, [...updatedMessages, typingMessage]));
  
      try {
        let prompt = text;
  
        if (patient) {
          const name = `${patient.firstname} ${patient.lastname}`;
          const age = patient.age || "";
          const height = patient.height || "";
          const weight = patient.weight || "";
          const bmi = calculateBMI(height, weight) || "";
  
          prompt += `
  
          Patient details:
          - Name: ${name}
          - Age: ${age}
          - Height: ${height} cm
          - Weight: ${weight} kg
          - BMI: ${bmi}
          
          Based on the above patient details, provide a direct interpretation or answer related to the user's question.`;
                } 
          // else {
          //         prompt += `
          
          // Remember your name is Uma, a friendly AI medical assistant. If the user greets with "hi" or similar, respond with: "Hi, Uma here to help. How can I assist you today?"`;
          //       }
  
        const payload = { prompt };
        console.log("Sending Payload:", payload);
  
        const response = await axios.post(
          {apiUrl},
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
  
        console.log("Uma API raw response:", response.data);
  
        let resultText = response.data?.result || "";
  
        if (response.data?.prompt) {
          const promptEscaped = response.data.prompt.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          const promptRegex = new RegExp(`^${promptEscaped}[\\s\\?\\.:-]*`, "i");
          resultText = resultText.replace(promptRegex, "").trim();
        }
  
        resultText = resultText.replace(/\[[^\]]*\]/g, "").trim(); // removing [Reviewed...], [+], [–]
        resultText = resultText.replace(/^[\?\s:;.-]+/, "").trim(); // removing leading punctuation
  
        const botReply = {
          id: (Date.now() + 1).toString(),
          sender: "uma",
          body: resultText || "Here’s some helpful information.",
          timeStamp: Date.now(),
        };
  
        const finalMessages = [...updatedMessages, botReply].filter(
          (msg) => msg.id !== "uma-typing"
        );
  
        dispatch(setUmaMessages(contextKey, finalMessages));
      } catch (err) {
        console.error("Uma API error:", err);
        const fallback = {
          id: (Date.now() + 1).toString(),
          sender: "uma",
          body: "Sorry, I couldn’t get an answer right now. Please try again later.",
          timeStamp: Date.now(),
        };
  
        const finalMessages = [...updatedMessages, fallback].filter(
          (msg) => msg.id !== "uma-typing"
        );
  
        dispatch(setUmaMessages(contextKey, finalMessages));
      }
    }, 1000);
  };
  
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const grouped = {};
    messages.forEach((msg) => {
      const dateKey = moment(msg.timeStamp).format("D MMM, YYYY");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

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

                {Object.keys(groupedMessages).map((date, idx) => (
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
                          message={msg.body}
                          time={moment(msg.timeStamp).format("h:mm A")}
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
