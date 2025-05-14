import {
    MEDICAL_MASTERDATA_REQUEST,
    MEDICAL_MASTERDATA_SUCCESS,
    MEDICAL_MASTERDATA_FAIL,
  } from '../types/medicalMasterDataTypes';
  
  const initialState = {
    allergies: [],
    procedures: [],
    immunizations: [],
    loading: false,
    error: null,
  };
  
  export const medicalMasterDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case MEDICAL_MASTERDATA_REQUEST:
        return { ...state, loading: true, error: null };
  
      case MEDICAL_MASTERDATA_SUCCESS:
        return {
          ...state,
          loading: false,
          allergies: action.payload.allergies,
          procedures: action.payload.procedures,
          immunizations: action.payload.immunizations,
        };
  
      case MEDICAL_MASTERDATA_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  