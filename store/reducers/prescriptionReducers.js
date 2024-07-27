import {
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    PRESCRIPTION_CREATE_FAILURE,
    PRESCRIPTION_GET_REQUEST,
    PRESCRIPTION_GET_SUCCESS,
    PRESCRIPTION_GET_FAILURE,
    PRESCRIPTION_LIST_REQUEST,
    PRESCRIPTION_LIST_SUCCESS,
    PRESCRIPTION_LIST_FAILURE,
} from "../types/prescriptionActionTypes";

export const prescriptionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_CREATE_REQUEST:
            return { loading: true };

        case PRESCRIPTION_CREATE_SUCCESS:
            return { loading: false, success: true, prescription: action.payload };

        case PRESCRIPTION_CREATE_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const prescriptionGetReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_GET_REQUEST:
            return { loading: true };

        case PRESCRIPTION_GET_SUCCESS:
            return { loading: false, success: true, prescription: action.payload };

        case PRESCRIPTION_GET_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const prescriptionListReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_LIST_REQUEST:
            return { loading: true };

        case PRESCRIPTION_LIST_SUCCESS:
            return { loading: false, success: true, prescriptions: action.payload };

        case PRESCRIPTION_LIST_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
