import {
    PRIMARY_SPECIALIZATION_REQUEST,
    PRIMARY_SPECIALIZATION_SUCCESS,
    PRIMARY_SPECIALIZATION_FAILURE,

    PRIMARY_TO_SECONDARY_REQUEST,
    PRIMARY_TO_SECONDARY_SUCCESS,
    PRIMARY_TO_SECONDARY_FAILURE,
} from "../types/primarySpecializationActionTypes";

export const primarySpecializationReducer = (state = {}, action) => {
    switch (action.type) {
        case PRIMARY_SPECIALIZATION_REQUEST:
            return { loading: true };
        case PRIMARY_SPECIALIZATION_SUCCESS:
            return { loading: false, specializations: action.payload };
        case PRIMARY_SPECIALIZATION_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const primaryToSecondaryReducer = (state = { mappings: [] }, action) => {
    switch (action.type) {
        case PRIMARY_TO_SECONDARY_REQUEST:
            return { loading: true, mappings: [] };
        case PRIMARY_TO_SECONDARY_SUCCESS:
            return { loading: false, mappings: action.payload };
        case PRIMARY_TO_SECONDARY_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};