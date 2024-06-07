import {
    AVAILABILITIES_BY_DOCTOR_FAILURE,
    AVAILABILITIES_BY_DOCTOR_REQUEST,
    AVAILABILITIES_BY_DOCTOR_SUCCESS,
    AVAILABILITY_CREATE_FAILURE,
    AVAILABILITY_CREATE_REQUEST,
    AVAILABILITY_CREATE_SUCCESS,
    AVAILABILITY_DELETE_FAILURE,
    AVAILABILITY_DELETE_REQUEST,
    AVAILABILITY_DELETE_SUCCESS,
    AVAILABILITY_EXISTS,
    AVAILABILITY_GET_FAILURE,
    AVAILABILITY_GET_REQUEST,
    AVAILABILITY_GET_SUCCESS,
    AVAILABILITY_UPDATE_FAILURE,
    AVAILABILITY_UPDATE_REQUEST,
    AVAILABILITY_UPDATE_SUCCESS,
} from "../types/availabilityActionTypes";

export const availabilityCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITY_CREATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case AVAILABILITY_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                availability: action.payload,
            };
        }

        case AVAILABILITY_CREATE_FAILURE: {
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

export const availabilityUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITY_UPDATE_REQUEST: {
            return {
                loading: true,
            };
        }

        case AVAILABILITY_UPDATE_SUCCESS: {
            return {
                loading: false,
                success: true,
                availability: action.payload,
            };
        }

        case AVAILABILITY_UPDATE_FAILURE: {
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

export const availabilityGetReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITY_GET_REQUEST: {
            return {
                loading: true,
            };
        }

        case AVAILABILITY_GET_SUCCESS: {
            return {
                loading: false,
                success: true,
                availability: action.payload,
            };
        }

        case AVAILABILITY_GET_FAILURE: {
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

export const availabilitesByDoctorReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITIES_BY_DOCTOR_REQUEST: {
            return {
                loading: true,
            };
        }

        case AVAILABILITIES_BY_DOCTOR_SUCCESS: {
            return {
                loading: false,
                sucess: true,
                availabilities: action.payload,
            };
        }

        case AVAILABILITIES_BY_DOCTOR_FAILURE: {
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

export const availabilityDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITY_DELETE_REQUEST: {
            return {
                loading: true,
            };
        }

        case AVAILABILITY_DELETE_SUCCESS: {
            return {
                loading: false,
                sucess: true,
                availability: action.payload,
            };
        }

        case AVAILABILITY_DELETE_FAILURE: {
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

export const availabilityExistsReducer = (state = {}, action) => {
    switch (action.type) {
        case AVAILABILITY_EXISTS: {
            return {
                availabilityExists: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
