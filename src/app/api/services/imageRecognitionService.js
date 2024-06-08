import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Vision API key

const imageRecognitionService = {
  analyzeImage: async (imageUri) => {
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
        return recognizedTexts;
      } else {
        console.error('No text detected.');
        return [];
      }
    } catch (error) {
      console.error('Error analyzing image: ', error);
      throw error;
    }
  }
};

export default imageRecognitionService;
