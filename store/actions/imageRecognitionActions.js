import {
    IMAGE_RECOGNITION_GET_REQUEST,
    IMAGE_RECOGNITION_GET_SUCCESS,
    IMAGE_RECOGNITION_GET_FAILURE,
} from '../types/imageRecognitionActionTypes';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Vision API key

export const analyzeImage = (imageUri) => async (dispatch) => {
    dispatch({ type: IMAGE_RECOGNITION_GET_REQUEST });

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
            dispatch({
                type: IMAGE_RECOGNITION_GET_SUCCESS,
                payload: recognizedTexts,
            });
        } else {
            dispatch({
                type: IMAGE_RECOGNITION_GET_FAILURE,
                payload: 'No text detected.',
            });
        }
    } catch (error) {
        dispatch({
            type: IMAGE_RECOGNITION_GET_FAILURE,
            payload: `Error analyzing image: ${error.message}`,
        });
    }
};
