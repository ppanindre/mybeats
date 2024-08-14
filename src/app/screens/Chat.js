import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  RefreshControl,
  Platform,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";

import CustomSafeView from "../../../components/CustomSafeView";
import MessageInput from "../../../components/MessageInput";
import ChatBubble from "../../../components/ChatBubble";
import { firebaseCollections } from "../../../constants/firebaseCollections";
import TopNavbar from "../components/Utils/TopNavbar";


/**
 * Generate a random string for id
 * @returns A random string
 */
const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

let channelId = null;

const Chat = () => {
  // REDUX STORE
  const user = useSelector((state) => state.UserReducer); // get user listener

  // STATES
  const [texts, setTexts] = useState([]); // texts
  const [displayTexts, setDisplayTexts] = useState(null); // texts to be displayed
  const [refreshing, setRefreshing] = useState(false); // is refreshing

  const textRef = useRef(texts);

  //update read everytime text is updated.
  //this is required since we want to use the text array in an async function.
  useEffect(() => {
    textRef.current = texts;
    //when a change is text happens we find out index of the last message sent from user
    //for showing the read / delivered status
    //The array is reversed since we want the last index.
    let userMessageIndex = [...texts]
      .reverse()
      .findIndex((item) => item.sender === user.userId);
    let adminMessageIndex = [...texts]
      .reverse()
      .findIndex((item) => item.sender === "admin");

    //if no index are found then the values are kepr as -1 else they are changed to reflect the actual indexes.
    if (userMessageIndex != -1) {
      userMessageIndex = texts.length - userMessageIndex - 1;
    }
    if (adminMessageIndex != -1) {
      adminMessageIndex = texts.length - adminMessageIndex - 1;
      //update message status to read for the admin
      updateMessageStatus(texts[adminMessageIndex]);
    }
  }, [texts]);

  // Create channel for the user, if a channel does not exist for the user, create one
  useEffect(() => {
    let unsubscribe = null;
    const userId = user.userId ?? ""; // get user id

    firestore()
      .collection(firebaseCollections.MESSAGE_COLLECTION)
      .where("userId", "==", userId)
      .limit(1)
      .get()
      .then((snapshot) => {
        // No channel found for messages
        if (snapshot.empty) {
          createChatChannel().then(() => {
            unsubscribe = attachListener();
          });
        } else {
          //attach a realtime listener and populate messages.
          channelId = snapshot.docs[0].get("channelId");
          //load last 10 messages
          loadInitialMessages().then(() => {
            unsubscribe = attachListener();
          });
        }
      });

    // clean up the listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      channelId = null;
    };
  }, []);

  // Update the status of the message from delivered to read when the last message has been read by the user
  const updateMessageStatus = async (message) => {
    if (message.status !== "Read" && message.messageId) {
      try {
        await firestore()
          .collection(firebaseCollections.MESSAGE_COLLECTION)
          .doc(channelId)
          .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
          .doc(message.messageId)
          .update({ status: "Read" });
      } catch (error) {}
    }
  };

  // Function to fetch older messages when user goes up
  const fetchOlderMessages = async () => {
    if (textRef && textRef.current && textRef.current.length > 1) {
      setRefreshing(true);
      const firstTimeStamp = textRef.current[0].timeStamp;
      try {
        const querySnapshots = await firestore()
          .collection(firebaseCollections.MESSAGE_COLLECTION)
          .doc(channelId)
          .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
          .orderBy("timeStamp", "desc")
          .where("timeStamp", "<", firstTimeStamp)
          .limit(10)
          .get();

        //if no messages are present set the refreshing flag to false.
        if (querySnapshots.size == 0) {
          setRefreshing(false);
        }

        querySnapshots.forEach((querySnapshot) => {
          const clonedTexts = [...textRef.current];
          clonedTexts.unshift(querySnapshot.data());
          setTexts(clonedTexts);

          const updatedTexts = groupTexts(clonedTexts);

          setDisplayTexts(updatedTexts);
        });

        setRefreshing(false);
      } catch (error) {
        Sentry.captureException(error, {extra: {message: "Error while fetching older messages"}})
      }
    }
  };

  // Attach a listener to the message sub collection to read any incoming texts and show it to the user
  const attachListener = () => {
    return firestore()
      .collection(firebaseCollections.MESSAGE_COLLECTION)
      .doc(channelId)
      .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
      .orderBy("timeStamp", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        const data = snapshot.docs[0].data();
        const textArray = textRef.current;
        if (
          textArray.length === 0 ||
          (textArray.length > 0 &&
            textArray[textArray.length - 1].messageId != data.messageId)
        ) {
          textArray.push(data);
        }

        //message ids are same hence replace the object.
        if (
          textArray.length > 0 &&
          textArray[textArray.length - 1].messageId == data.messageId
        ) {
          textArray.pop();
          textArray.push(data);
        }

        setTexts([...textArray]); // set texts

        const updatedTexts = groupTexts([...textArray]);

        setDisplayTexts(updatedTexts); // set display texts
      });
  };

  /**
   * Method to create a chat channel when one does not exist for the user.
   */
  const createChatChannel = async () => {
    const uniqueId = generateRandomId(); // generate a unique id

    // create channel
    try {
      await firestore()
        .collection(firebaseCollections.MESSAGE_COLLECTION)
        .doc(uniqueId)
        .set({
          userId: user.userId,
          channelId: uniqueId,
          timeStamp: new Date().getTime(),
        });
      channelId = uniqueId;

      // send an automaitc message from admin
      await firestore()
        .collection(firebaseCollections.MESSAGE_COLLECTION)
        .doc(channelId)
        .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
        .add({
          body: "Welcome",
          messageId: "randomId1234",
          status: "Read",
          sender: "admin",
          timeStamp: new Date().getTime(),
        });
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while creating channel" },
      });
    }
  };

  /**
    Load Initial Messages for the user when they open the chat
   */
  const loadInitialMessages = async () => {
    try {
      // get the latest messages
      const querySnapshot = await firestore()
        .collection(firebaseCollections.MESSAGE_COLLECTION)
        .doc(channelId)
        .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
        .orderBy("timeStamp", "desc")
        .limit(10)
        .get();
      let messagesArray = [];
      querySnapshot.forEach((item) => {
        messagesArray.unshift(item.data());
      });

      setTexts(messagesArray); // set messages

      const updatedTexts = groupTexts(messagesArray); // groupt texts

      setDisplayTexts(updatedTexts);
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while loading initial messages" },
      });
    }
  };

  /** 
   Post messages to the database
  */
  const postMessage = async (message) => {
    //ignore if message is empty
    if (message.trim() === "") {
      return;
    }

    const messageId = generateRandomId();
    const data = {
      status: "Delivered",
      messageId: messageId,
      sender: user.userId,
      body: message,
      timeStamp: new Date().getTime(),
    };
    try {
      await firestore()
        .collection(firebaseCollections.MESSAGE_COLLECTION)
        .doc(channelId)
        .collection(firebaseCollections.MESSAGES_SUB_COLLECTION)
        .doc(messageId)
        .set(data);

      // Add data to local array
      // const textArray = textRef.current;
      // textArray.push(data);
      // setTexts([...textArray]);

      // const updatedTexts = groupTexts([...textArray]);
      // setDisplayTexts(updatedTexts);
    } catch (error) {
      Sentry.captureException(error, {
        extra: { message: "Error while posting messages" },
      });
    }
  };

  // Function to group texts based on date
  const groupTexts = (texts) => {
    const updatedTexts = {};

    texts.forEach((text) => {
      const date = moment(text.timeStamp).format("D MMM, YYYY");
      if (updatedTexts[date]) {
        updatedTexts[date].push(text);
      } else {
        updatedTexts[date] = [text];
      }
    });

    return updatedTexts;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <CustomSafeView sentry-label="chat" style={{ flex: 1 }}>
        {/* Avoid keyboard coming over the screen in ios */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : ""}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View className="relative flex-1" style={{ height: "100%" }}>
            {/* Header */}

            {/* Top navbar */}
            <TopNavbar showSync={false} />

            {/* Chat Screen */}
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={fetchOlderMessages} // fetch messages when refreshing
                />
              }
              keyboardShouldPersistTaps="handled"
              className="p-5 relative"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
            >
              {/* Texts */}
              {displayTexts !== null &&
                Object.keys(displayTexts).map((date, index) => (
                  <View key={index}>
                    <View className="items-center mb-5">
                      <View className="bg-gray-300 p-2 rounded-lg">
                        <Text className="text-xs">{date}</Text>
                      </View>
                    </View>

                    {/* Chat bubble */}
                    {displayTexts[date].map((data, index) => (
                      <ChatBubble
                        key={index}
                        sender={data.sender}
                        message={data.body}
                        time={moment(data.timeStamp).format("h:mm A")}
                      />
                    ))}
                  </View>
                ))}
            </ScrollView>

            {/* Message Input */}
            <View className="relative bottom-0" style={{ width: "100%" }}>
              <MessageInput
                sentry-label="chat-send-msg-btn"
                onSubmit={postMessage}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </CustomSafeView>
    </TouchableWithoutFeedback>
  );
};

export default Chat;
