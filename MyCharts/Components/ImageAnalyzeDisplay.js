//AIzaSyBvWzAkoyGpuDrJUMB3K9eUr16DOJ9U6LA
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
// import PageHeader from '../Home/Shared/PageHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const ImageAnalyzeDisplay = ({ route }) => {
  const navigation = useNavigation(); 
  const { imageUri } = route.params;
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeImage = async () => {
    setAnalyzing(true); 
    try {
      const apiKey = "AIzaSyBvWzAkoyGpuDrJUMB3K9eUr16DOJ9U6LA"; // Replace with your actual API key
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
          },
        ],
      };

      const response = await axios.post(apiURL, requestData);
      // Handling the response for text detection
      if (response.data.responses[0].textAnnotations) {
        setTextAnnotations(response.data.responses[0].textAnnotations);
      } else {
        setTextAnnotations([]);
        alert('No text detected.');
      }
    } catch (error) {
      console.error('Error analyzing image: ', error);
      alert('Error analyzing image. Please try again later.');
    }
    setAnalyzing(false); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{
        marginTop: 15,
      }}>
        {/* <PageHeader title={'Image Detection'} /> */}
        <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.goBack()}>
            <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>No image selected.</Text>
        )}
      </View>
      {!analyzing && (
        <TouchableOpacity onPress={analyzeImage} style={styles.analyzeButton}>
          <Text style={styles.analyzeButtonText}>Analyze Image</Text>
        </TouchableOpacity>
      )}
      {analyzing && <Text style={styles.analyzingText}>Analyzing...</Text>}
      <View style={styles.labelsContainer}>
        {textAnnotations.length > 0 && (
          <Text style={styles.labelText}>
            {textAnnotations[0].description} 
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
  },
  labelsContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  analyzeButton: {
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  analyzeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  analyzingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -14,
    right: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default ImageAnalyzeDisplay;
