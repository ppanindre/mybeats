import {
    PRESCRIPTION_IMAGE_CREATE_REQUEST,
    PRESCRIPTION_IMAGE_CREATE_SUCCESS,
    PRESCRIPTION_IMAGE_CREATE_FAILURE,
    PRESCRIPTION_IMAGE_GET_REQUEST,
    PRESCRIPTION_IMAGE_GET_SUCCESS,
    PRESCRIPTION_IMAGE_GET_FAILURE,
} from "../types/prescriptionImageActionTypes";

export const prescriptionImageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_IMAGE_CREATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case PRESCRIPTION_IMAGE_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointment: action.payload,
            };
        }

        case PRESCRIPTION_IMAGE_CREATE_FAILURE: {
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

export const prescriptionImageGetReducer = (state = { imageUrls: [] }, action) => {
    switch (action.type) {
        case PRESCRIPTION_IMAGE_GET_REQUEST: {
            return {
                loading: true,
            };
        }

        case PRESCRIPTION_IMAGE_GET_SUCCESS: {
            return {
                loading: false,
                imageUrls: action.payload,
            };
        }

        case PRESCRIPTION_IMAGE_GET_FAILURE: {
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
