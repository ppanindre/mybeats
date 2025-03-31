import {
    SET_UMA_MESSAGES,
    SET_UMA_LOADING,
    CLEAR_UMA_MESSAGES,
  } from "../types/umaChatActionTypes";
  
  const initialState = {
    chats: {},
    loading: {},
  };
  
  const umaChatReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_UMA_MESSAGES:
        const { contextKey, messages } = action.payload;
        return {
          ...state,
          chats: {
            ...state.chats,
            [contextKey]: messages,
          },
          loading: {
            ...state.loading,
            [contextKey]: false,
          },
        };
  
      case SET_UMA_LOADING:
        return {
          ...state,
          loading: {
            ...state.loading,
            [action.payload.contextKey]: action.payload.isLoading,
          },
        };
  
      case CLEAR_UMA_MESSAGES:
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default umaChatReducer;
  