import {
  UMA_CHAT_LIST_REQUEST,
  UMA_CHAT_LIST_SUCCESS,
  UMA_CHAT_LIST_FAILURE,
  UMA_CHAT_CREATE_REQUEST,
  UMA_CHAT_CREATE_SUCCESS,
  UMA_CHAT_CREATE_FAILURE,
  UMA_CHAT_REMOVE_TYPING_MESSAGE
} from "../types/umaChatActionTypes";

import { listChatMessages } from "../../src/graphql/queries";
import { createChatMessage } from "../../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const client = generateClient();

// loading chat messages for doctor or doctor+patient 
export const listUmaMessagesAction =
  (doctorId, patientId = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: UMA_CHAT_LIST_REQUEST });

      const filter = patientId
        ? {
            doctorID: { eq: doctorId },
            patientID: { eq: patientId },
          }
        : {
            doctorID: { eq: doctorId },
            patientID: { attributeExists: false },
          };

      const response = await client.graphql({
        query: listChatMessages,
        variables: { filter },
      });

      dispatch({
        type: UMA_CHAT_LIST_SUCCESS,
        payload: {
          contextKey: patientId ? `patient_${patientId}` : "general",
          messages: response.data.listChatMessages.items,
        },
      });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      dispatch({
        type: UMA_CHAT_LIST_FAILURE,
        payload: error.message,
      });
    }
  };


export const sendUmaMessageAction =
  (text, doctorId, patient) => async (dispatch) => {
    const contextKey = patient ? `patient_${patient.id}` : "general";

    const timestamp = new Date().toISOString();
    const userMessage = {
      chatSessionId: contextKey,
      messageID: uuidv4(),
      timestamp,
      sender: "user",
      content: text,
      messageType: "text",
      status: "sent",
      doctorID: doctorId,
      ...(patient?.id && { patientID: patient.id }),
    };

    dispatch(createUmaMessageAction(userMessage)); 

    let hasResponded = false;

    const typingMessage = {
      chatSessionId: contextKey,
      messageID: "uma-typing",
      timestamp: new Date().toISOString(),
      sender: "uma",
      content: "Uma is typing...",
      messageType: "text",
      status: "typing",
      doctorID: doctorId,
      ...(patient?.id && { patientID: patient.id }),
    };

    const typingTimeout = setTimeout(() => {
      if (!hasResponded) {
        dispatch({ type: UMA_CHAT_CREATE_SUCCESS, payload: typingMessage });
      }
    }, 1000);

    try {
      let prompt = text;

      if (patient) {
        const h = patient.height / 100;
        const bmi = (patient.weight / (h * h)).toFixed(2);

        const underlyingConditions = patient.underlyingConditionsList?.length
          ? patient.underlyingConditionsList.join(", ")
          : "None";

        const professions = patient.professionList?.length
          ? patient.professionList.join(", ")
          : "None";
        
        const gender= patient.gender ?? "Not specified"
        // console.log("Patient underlying conditions:", underlyingConditions);
        // console.log("Patient profession list:", professions);
        // console.log("Patient gender:", gender); 
        

        prompt += `
          Patient details:
          - Name: ${patient.firstname} ${patient.lastname}
          - Age: ${patient.age}
          - Gender: ${gender}
          - Height: ${patient.height} cm
          - Weight: ${patient.weight} kg
          - BMI: ${bmi}
          - Professions: ${professions}
          - Underlying Conditions: ${underlyingConditions}
          Based on the above patient details, provide a direct interpretation or answer related to the user's question.`;
      }

      const res = await axios.post(
        "https://n8nl35sl6c.execute-api.us-east-1.amazonaws.com/default/medicalLLM",
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );

      hasResponded = true;
      clearTimeout(typingTimeout);

      dispatch({
        type: UMA_CHAT_REMOVE_TYPING_MESSAGE,
        payload: { contextKey },
      });

      let resultText = res.data?.result || "";
      if (res.data?.prompt) {
        const promptEscaped = res.data.prompt.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const promptRegex = new RegExp(`^${promptEscaped}[\\s\\?\\.:-]*`, "i");
        resultText = resultText.replace(promptRegex, "").trim();
      }
      resultText = resultText.replace(/\[[^\]]*\]/g, "").trim();
      resultText = resultText.replace(/^[\?\s:;.-]+/, "").trim();

      const botMessage = {
        chatSessionId: contextKey,
        messageID: uuidv4(),
        timestamp: new Date().toISOString(),
        sender: "uma",
        content: resultText || "Here’s some helpful information.",
        messageType: "text",
        status: "sent",
        doctorID: doctorId,
        ...(patient?.id && { patientID: patient.id }),
      };

      dispatch(createUmaMessageAction(botMessage));
    } catch (error) {
      console.error("Uma API error:", error);
      hasResponded = true;
      clearTimeout(typingTimeout);

      dispatch({
        type: UMA_CHAT_REMOVE_TYPING_MESSAGE,
        payload: { contextKey },
      });

      const fallback = {
        chatSessionId: contextKey,
        messageID: uuidv4(),
        timestamp: new Date().toISOString(),
        sender: "uma",
        content: "Sorry, I couldn’t get an answer right now. Please try again later.",
        messageType: "text",
        status: "sent",
        doctorID: doctorId,
        ...(patient?.id && { patientID: patient.id }),
      };

      dispatch(createUmaMessageAction(fallback));
    }
  };


export const createUmaMessageAction = (message) => async (dispatch) => {
  try {
    dispatch({ type: UMA_CHAT_CREATE_REQUEST });

    const response = await client.graphql({
      query: createChatMessage,
      variables: { input: message },
    });

    dispatch({
      type: UMA_CHAT_CREATE_SUCCESS,
      payload: response.data.createChatMessage,
    });
  } catch (error) {
    console.error("Error creating chat message:", error);
    dispatch({
      type: UMA_CHAT_CREATE_FAILURE,
      payload: error.message,
    });
  }
};
