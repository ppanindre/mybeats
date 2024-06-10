import {
    APPOINTMENT_CREATE_FAILURE,
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_GET_FAILURE,
    APPOINTMENT_GET_REQUEST,
    APPOINTMENT_GET_SUCCESS,
    APPOINTMENT_LIST_AVAILABLE_FAILURE,
    APPOINTMENT_LIST_AVAILABLE_REQUEST,
    APPOINTMENT_LIST_AVAILABLE_SUCCESS,
    APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
    APPOINTMENT_LIST_BY_DOCTOR_REQUEST,
    APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
    APPOINTMENT_LIST_FAILURE,
    APPOINTMENT_LIST_REQUEST,
    APPOINTMENT_LIST_SUCCESS,
    APPOINTMENT_UPDATE_FAILURE,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,
} from "../types/appointmentActionTypes.js";

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

export const appointmentsListByDoctorReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_LIST_BY_DOCTOR_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_LIST_BY_DOCTOR_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointmentsByDoctor: action.payload,
            };
        }

        case APPOINTMENT_LIST_BY_DOCTOR_FAILURE: {
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

export const appointmentListReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_LIST_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_LIST_SUCCESS: {
            return {
                loading: false,
                success: true,
                appointments: action.payload,
            };
        }

        case APPOINTMENT_LIST_FAILURE: {
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

export const appointmentListAvailableReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_LIST_AVAILABLE_REQUEST: {
            return {
                loading: true,
            };
        }

        case APPOINTMENT_LIST_AVAILABLE_SUCCESS: {
            return {
                loading: false,
                success: true,
                availableAppointments: action.payload,
            };
        }

        case APPOINTMENT_LIST_AVAILABLE_FAILURE: {
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
