import {
    SECONDARY_SPECIALIZATION_REQUEST,
    SECONDARY_SPECIALIZATION_SUCCESS,
    SECONDARY_SPECIALIZATION_FAILURE,
} from "../types/secondarySpecializationActionTypes";

const initialState = {
    loading: false,
    secondarySpecializations: [],
    error: null,
};

export const secondarySpecializationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECONDARY_SPECIALIZATION_REQUEST:
            return { ...state, loading: true };

        case SECONDARY_SPECIALIZATION_SUCCESS:
            return { ...state, loading: false, secondarySpecializations: action.payload };

        case SECONDARY_SPECIALIZATION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
