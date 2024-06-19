import {
    IMAGE_RECOGNITION_GET_REQUEST,
    IMAGE_RECOGNITION_GET_SUCCESS,
    IMAGE_RECOGNITION_GET_FAILURE
} from '../types/imageRecognitionActionTypes';

const initialState = {
    loading: false,
    recognizedTexts: [],
    error: null,
};

const imageRecognitionGetReducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_RECOGNITION_GET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case IMAGE_RECOGNITION_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                recognizedTexts: action.payload,
            };
        case IMAGE_RECOGNITION_GET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default imageRecognitionGetReducer;
