import {
    FETCH_HEALTH_CONDITIONS_REQUEST,
    FETCH_HEALTH_CONDITIONS_SUCCESS,
    FETCH_HEALTH_CONDITIONS_FAILURE,
    FETCH_SECONDARY_SPECIALIZATIONS_REQUEST,
    FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS,
    FETCH_SECONDARY_SPECIALIZATIONS_FAILURE,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_REQUEST,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_SUCCESS,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_FAILURE,
} from "../types/healthConditionActionTypes";

export const healthConditionReducer = (state = { healthConditions: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case FETCH_HEALTH_CONDITIONS_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_HEALTH_CONDITIONS_SUCCESS:
            return { ...state, isLoading: false, healthConditions: action.payload };
        case FETCH_HEALTH_CONDITIONS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const secondarySpecializationByHealthConditionReducer = (state = { specializations: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case FETCH_SECONDARY_SPECIALIZATIONS_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS:
            return { ...state, isLoading: false, specializations: [...action.payload] }; 
        case FETCH_SECONDARY_SPECIALIZATIONS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const doctorsBySecondarySpecializationReducer = (state = { doctors: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_REQUEST:
            return { ...state, isLoading: true, doctors: [] };  
        case FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_SUCCESS:
            return { ...state, isLoading: false, doctors: action.payload };
        case FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

