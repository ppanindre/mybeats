
// Maybe required in the future.


import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneNumberInput from 'react-native-phone-number-input';

// Import your GraphQL mutation
import { createDoctor } from '../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import CustomSafeView from '../../components/CustomSafeView';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddDoctor = () => {
  const client = generateClient();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [doctorDetails, setDoctorDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    specialization: '',
    phoneNumber: '',
    address: '',
    zipcode: '',
  });

  const handleAddDoctor = async () => {
    try {
      const newDoctor = await client.graphql({
        query: createDoctor,
        variables: {
          input: doctorDetails,
        },
      });

      const addedDoctors = JSON.parse(await AsyncStorage.getItem('addedDoctors')) || [];
      addedDoctors.push(newDoctor.data.createDoctor);
      await AsyncStorage.setItem('addedDoctors', JSON.stringify(addedDoctors));

      Alert.alert("Congratulations! Your doctor is added")
      // navigation.navigate('FetchDoctor', { addedDoctor: newDoctor.data.createDoctor });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <CustomSafeView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Doctor</Text>
          <Image source={require('../../assets/adddoc.png')} style={styles.logo} resizeMode="contain" />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => setDoctorDetails((prev) => ({ ...prev, firstname: text }))}
            value={doctorDetails.firstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setDoctorDetails((prev) => ({ ...prev, lastname: text }))}
            value={doctorDetails.lastname}
          />
          <PhoneNumberInput
            defaultCode="US"
            layout="first"
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            // textInputStyle={styles.input}
            onChangeText={(text) => {
              setDoctorDetails((prev) => ({ ...prev, phoneNumber: text }));
            }}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            withShadow
            autoFocus
          />
          <TouchableOpacity className="bg-red-200" onPress={handleAddDoctor}>
            <Text>Add Doctor</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </CustomSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
    marginTop: -19,
    fontFamily: 'appfont-semi'
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 8,
    borderColor: '#D1D5DB',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  phoneInputContainer: {
    width: '100%',
    height: 60,
    marginBottom: 14,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#D1D5DB',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  phoneInputTextContainer: {
    //  backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#0165fc',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    width: 240,
    height: 290,
    marginBottom: -15,
  },
});

export default AddDoctor;
