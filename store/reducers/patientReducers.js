import {
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS,
    PATIENT_DETAILS_FAILURE,
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

        case PATIENT_DETAILS_FAILURE: {
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
