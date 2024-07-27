import {
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS,
    PATIENT_CREATE_FAILURE,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAILURE,
    PATIENT_GET_REQUEST,
    PATIENT_GET_SUCCESS,
    PATIENT_GET_FAILURE,
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAILURE,
} from "../types/patientActionTypes";

export const patientCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_CREATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case PATIENT_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                patient: action.payload,
            };
        }

        case PATIENT_CREATE_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export const patientUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_UPDATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case PATIENT_UPDATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                patient: action.payload,
            };
        }

        case PATIENT_UPDATE_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export const patientGetReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_GET_REQUEST: {
            return {
                loading: true,
            };
        }

        case PATIENT_GET_SUCCESS: {
            return {
                loading: false,
                success: true,
                patient: action.payload,
            };
        }

        case PATIENT_GET_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export const patientListReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_LIST_REQUEST:
            return {
                loading: true,
            };
        case PATIENT_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                patients: action.payload,
            };
        case PATIENT_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};