import { APPOINTMENT_CREATE_FAILURE, APPOINTMENT_CREATE_REQUEST, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_GET_FAILURE, APPOINTMENT_GET_REQUEST, APPOINTMENT_GET_SUCCESS, APPOINTMENT_UPDATE_FAILURE, APPOINTMENT_UPDATE_REQUEST, APPOINTMENT_UPDATE_SUCCESS } from "../types/appointmentActionTypes.js";


export const appointmentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_CREATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointment: action.payload,
            };
        }

        case APPOINTMENT_CREATE_FAILURE: {
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

export const appointmentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_UPDATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_UPDATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointment: action.payload,
            };
        }

        case APPOINTMENT_UPDATE_FAILURE: {
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

export const appointmentGetReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_GET_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_GET_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointment: action.payload,
            };
        }

        case APPOINTMENT_GET_FAILURE: {
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
