import {
    PRIMARY_SPECIALIZATION_REQUEST,
    PRIMARY_SPECIALIZATION_SUCCESS,
    PRIMARY_SPECIALIZATION_FAILURE,
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
