import {
    SET_UMA_MESSAGES,
    SET_UMA_LOADING,
    CLEAR_UMA_MESSAGES,
  } from "../types/umaChatActionTypes";
  
  export const setUmaMessages = (contextKey, messages) => ({
    type: SET_UMA_MESSAGES,
    payload: { contextKey, messages },
  });
  
  export const setUmaLoading = (contextKey, isLoading) => ({
    type: SET_UMA_LOADING,
    payload: { contextKey, isLoading },
  });
  
  export const clearUmaMessages = () => ({
    type: CLEAR_UMA_MESSAGES,
  });
  