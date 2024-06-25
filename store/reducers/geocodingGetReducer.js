import {
    GEOCODING_GET_REQUEST,
    GEOCODING_GET_SUCCESS,
    GEOCODING_GET_FAILURE,
} from '../types/geocodingActionTypes';

const geocodingGetReducer = (state = {}, action) => {
    switch (action.type) {
        case GEOCODING_GET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GEOCODING_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                coordinates: action.payload,
            };
        case GEOCODING_GET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default geocodingGetReducer;
