import { IMAGE_RECOGNITION_REQUEST, IMAGE_RECOGNITION_SUCCESS, IMAGE_RECOGNITION_FAILURE } from './ImageRecognitionActions';

const initialState = {
  loading: false,
  recognizedTexts: [],
  error: null,
};

const ImageRecognitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_RECOGNITION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case IMAGE_RECOGNITION_SUCCESS:
      return {
        ...state,
        loading: false,
        recognizedTexts: action.payload,
      };
    case IMAGE_RECOGNITION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ImageRecognitionReducer;
