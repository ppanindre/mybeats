import {
  UMA_CHAT_LIST_REQUEST,
  UMA_CHAT_LIST_SUCCESS,
  UMA_CHAT_LIST_FAILURE,
  UMA_CHAT_CREATE_REQUEST,
  UMA_CHAT_CREATE_SUCCESS,
  UMA_CHAT_CREATE_FAILURE,
  UMA_CHAT_REMOVE_TYPING_MESSAGE
} from "../types/umaChatActionTypes";

const initialState = {
  chats: {}, // { contextKey: [messages] }
  loadingMessages: false,
  sendingMessage: false,
  error: null,
};

const umaChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UMA_CHAT_LIST_REQUEST:
      return {
        ...state,
        loadingMessages: true,
        error: null,
      };

    case UMA_CHAT_LIST_SUCCESS: {
      const { contextKey, messages } = action.payload;
      return {
        ...state,
        loadingMessages: false,
        chats: {
          ...state.chats,
          [contextKey]: messages,
        },
      };
    }

    case UMA_CHAT_LIST_FAILURE:
      return {
        ...state,
        loadingMessages: false,
        error: action.payload,
      };

    case UMA_CHAT_CREATE_REQUEST:
      return {
        ...state,
        sendingMessage: true,
        error: null,
      };

    case UMA_CHAT_CREATE_SUCCESS: {
      const newMessage = action.payload;
      const contextKey = newMessage.patientID
        ? `patient_${newMessage.patientID}`
        : "general";
      return {
        ...state,
        sendingMessage: false,
        chats: {
          ...state.chats,
          [contextKey]: [...(state.chats[contextKey] || []), newMessage],
        },
      };
    }

    case UMA_CHAT_CREATE_FAILURE:
      return {
        ...state,
        sendingMessage: false,
        error: action.payload,
      };

    case UMA_CHAT_REMOVE_TYPING_MESSAGE: {
      const { contextKey } = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          [contextKey]: (state.chats[contextKey] || []).filter(
            (msg) => msg.messageID !== "uma-typing"
          ),
        },
      };
    }

    default:
      return state;
  }
};

export default umaChatReducer;
