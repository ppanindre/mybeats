import { SET_IMAGE_URI, CLEAR_IMAGE_URI } from '../types/imageActionTypes';

const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_IMAGE_URI:
            return {
                ...state,
                imageUri: action.payload,
            };
        case CLEAR_IMAGE_URI:
            return {
                ...state,
                imageUri: null,
            };
        default:
            return state;
    }
};

export default imageReducer;
