import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Vision API key

export const IMAGE_RECOGNITION_REQUEST = 'IMAGE_RECOGNITION_REQUEST';
export const IMAGE_RECOGNITION_SUCCESS = 'IMAGE_RECOGNITION_SUCCESS';
export const IMAGE_RECOGNITION_FAILURE = 'IMAGE_RECOGNITION_FAILURE';

export const imageRecognitionRequest = () => ({
  type: IMAGE_RECOGNITION_REQUEST,
});

export const imageRecognitionSuccess = (recognizedTexts) => ({
  type: IMAGE_RECOGNITION_SUCCESS,
  payload: recognizedTexts,
});

export const imageRecognitionFailure = (error) => ({
  type: IMAGE_RECOGNITION_FAILURE,
  payload: error,
});

export const analyzeImage = (imageUri) => async (dispatch) => {
  dispatch(imageRecognitionRequest());

  try {
    const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      requests: [
        {
          image: {
            content: base64ImageData,
          },
          features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
        },
      ],
    });

    if (response.data.responses[0].textAnnotations) {
      const recognizedTexts = response.data.responses[0].textAnnotations.map(annotation => annotation.description);
      dispatch(imageRecognitionSuccess(recognizedTexts));
    } else {
      dispatch(imageRecognitionFailure('No text detected.'));
    }
  } catch (error) {
    dispatch(imageRecognitionFailure(`Error analyzing image: ${error.message}`));
  }
};
