import {
    DOCTOR_CREATE_FAILURE,
    DOCTOR_CREATE_REQUEST,
    DOCTOR_CREATE_SUCCESS,
    DOCTOR_GET_FAILURE,
    DOCTOR_GET_FOR_PROFILE_VIEW_FAILURE,
    DOCTOR_GET_FOR_PROFILE_VIEW_REQUEST,
    DOCTOR_GET_FOR_PROFILE_VIEW_SUCCESS,
    DOCTOR_GET_REQUEST,
    DOCTOR_GET_SUCCESS,
    DOCTOR_LIST_FAILURE,
    DOCTOR_LIST_REQUEST,
    DOCTOR_LIST_SUCCESS,
    DOCTOR_UPDATE_FAILURE,
    DOCTOR_UPDATE_REQUEST,
    DOCTOR_UPDATE_SUCCESS,
} from "../types/doctorActionTypes";

export const doctorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_CREATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case DOCTOR_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                doctor: action.payload,
            };
        }

        case DOCTOR_CREATE_FAILURE: {
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

export const doctorUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_UPDATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case DOCTOR_UPDATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                doctor: action.payload,
            };
        }

        case DOCTOR_UPDATE_FAILURE: {
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

export const doctorGetReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_GET_REQUEST: {
            return {
                loading: true,
            };
        }

        case DOCTOR_GET_SUCCESS: {
            return {
                loading: false,
                success: true,
                doctor: action.payload,
            };
        }

        case DOCTOR_GET_FAILURE: {
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

export const doctorsListReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_LIST_REQUEST: {
            return {
                loading: true,
            };
        }

        case DOCTOR_LIST_SUCCESS: {
            return {
                loading: false,
                success: true,
                doctors: action.payload,
            };
        }

        case DOCTOR_LIST_FAILURE: {
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


export const doctorGetForProfileViewReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_GET_FOR_PROFILE_VIEW_REQUEST: {
            return {
                loading: true,
            };
        }

        case DOCTOR_GET_FOR_PROFILE_VIEW_SUCCESS: {
            return {
                loading: false,
                success: true,
                doctor: action.payload,
            };
        }

        case DOCTOR_GET_FOR_PROFILE_VIEW_FAILURE: {
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