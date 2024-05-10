import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../../components/CustomButton";
import { generateClient } from "aws-amplify/api";
import { getDoctor, getPatient } from "../../../graphql/queries";
import { createAppointment, updateDoctor } from "../../../graphql/mutations";
import ActionButton from "../../../../MyCharts/Components/ActionButton";
import { tr } from "react-native-paper-dates";
import BookAppointment from "../../../../MyCharts/Components/BookAppointment";
import { FontAwesome5 } from '@expo/vector-icons';


const colors = {
  white: '#fff',
  PRIMARY: '#0165fc',
  SECONDARY: '#dbeafe',
  LIGHT_GRAY: '#e6e8eb',
  GRAY: '#a6a4a4',
};
const AppointmentScreen = ({ doctor, onClickBack, onGoForward, onGoBack, currentIndex, doctors }) => {
  const navigation = useNavigation();
  const client = generateClient();

  console.log(doctor);
  const [availableSlots, setAvailableSlots] = useState(
    JSON.parse(doctor.availableSlots)
  );

  const [isBooking, setIsBooking] = useState(false);


  const handleAppointmentClick = () => {
    // Set the state to indicate that the booking process has started
    setIsBooking(true);
  };

  if (isBooking) {
    // Render the BookAppointment component instead of the current content
    // Pass any props you need for the booking component
    return <BookAppointment doctor={doctor} onBack={() => setIsBooking(false)} />;
  }

  const handleBookAppointment = async (selectedSlot, selectedDate) => {
    console.log(selectedSlot, selectedDate);
    try {
      const response = await client.graphql({
        query: getDoctor,
        variables: {
          id: doctor.id,
        },
      });

      const patient = await client.graphql({
        query: getPatient,
        variables: {
          id: "d2e46041-0bdb-41ae-ba34-9627a14ed0fc",
        },
      });

      console.log("patient", patient.data.getPatient);

      const currentDoctor = response.data.getDoctor;
      console.log("Current doctor " + currentDoctor);
      // // Assuming availableSlots is an object where keys are dates and values are arrays of slots
      const availableSlots = JSON.parse(currentDoctor.availableSlots) || {};

      if (availableSlots[selectedDate]?.includes(selectedSlot)) {
        // Update slot in real-time

        const updatedSlots = {
          ...availableSlots,
          [selectedDate]: availableSlots[selectedDate].filter(
            (slot) => slot !== selectedSlot
          ),
        };

        console.log(JSON.stringify(updatedSlots));
        console.log(doctor.id);

        const updateDoctorResponse = await client.graphql({
          query: updateDoctor,
          variables: {
            input: {
              id: doctor.id,
              availableSlots: JSON.stringify(updatedSlots),
            },
          },
        });

        console.log("Doctor updated:", updateDoctorResponse.data.updateDoctor);

        //   // Store appointment details in the database
        const createAppointmentResponse = await client.graphql({
          query: createAppointment,
          variables: {
            input: {
              // patient: "d2e46041-0bdb-41ae-ba34-9627a14ed0fc",
              chosenSlot: "2",
              date: selectedDate,
            },
          },
        });

        const bookedAppointment =
          createAppointmentResponse.data.createAppointment;
        console.log(selectedDate);

        // Handle successful booking, update UI, etc.
        console.log("Appointment booked successfully:", bookedAppointment);
        Alert.alert("Appointment Booked");
        navigation.navigate("ChatRoom");
      } else {
        // Handle case where the selected slot is no longer available
        console.log("Selected slot is no longer available");
      }
    } catch (error) {
      // Handle booking error
      console.error("Error booking appointment:", error);
    }
  };

  const ongoBack = () => {
    onClickBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      <View>


        <View style={styles.imageCard}>
          <Image
            source={require('../../assets/doc1.webp')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.closeButton} onPress={ongoBack}>
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>




        <View style={{
          marginTop: -20,
          marginBottom: -10,
          backgroundColor: colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 15
        }}>

          <Text style={{
            fontSize: 21,
            textAlign: 'center',
            marginBottom: 8,
            fontFamily: 'appfont-semi'
          }}>{`${doctor?.firstname} ${doctor?.lastname}`}</Text>
          <TouchableOpacity disabled={currentIndex === 0} style={[styles.backButton, currentIndex === 0 && styles.disabledButton]} onPress={onGoBack} >
            <Ionicons name="chevron-back" size={37} color={currentIndex === 0 ? "grey" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity disabled={currentIndex === doctors.length - 1} style={[styles.forwardButton, (currentIndex === doctors.length - 1) && styles.disabledButton]}
            onPress={onGoForward}>
            <Ionicons name="chevron-forward" size={37} color={currentIndex === doctors.length - 1 ? "grey" : "black"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />

      {/* <HorizontalLine/> */}
      <TouchableOpacity

        onPress={handleAppointmentClick}
        style={{
          padding: 13,
          backgroundColor: colors.PRIMARY,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginBottom: 10,
          zIndex: 20
        }}>
        <Text style={{
          color: colors.white,
          textAlign: 'center',
          fontFamily: 'appfont-semi',
          fontSize: 17
        }}>Book Appointment</Text>

      </TouchableOpacity>

      <ActionButton />

      <View style={styles.separator} />

      <Text style={{
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        fontFamily: 'appfont-semi'
      }}>About</Text>
      <Text style={{
        marginLeft: 15,
        marginBottom: 20
      }}
      >{`Specialization: ${doctor?.specialization}`}</Text>


      {/* slot selection UI here */}
      {/* {Object.entries(availableSlots).map(([date, slots]) => (
        <View key={date}>
          <Text style={styles.subHeading}>{`Date: ${date}`}</Text>
          <View style={styles.slotContainer}>
            {slots.map((slot) => (
              <CustomButton
                variant="primary"
                key={slot}
                btnLabel={`Slot ${slot}`}
                 onPress={() => {
              console.log(`Attempting to book appointment on ${date} for slot ${slot}`);
              handleBookAppointment(slot, date);
            }}
                onPress={() => handleBookAppointment(slot, date)}
              />
            ))}
          </View>
        </View>
      ))} */}


    </ScrollView>
  );
};

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <CustomButton variant="primary" btnLabel="Back" onPress={ongoBack} />

//       <Text>{`${doctor?.firstname} ${doctor?.lastname}`}</Text>
//       <Text>{`Specialization: ${doctor?.specialization}`}</Text>
//       <Text>{`Zipcode: ${doctor?.zipcode}`}</Text>

//       <Text>Select Appointment Slot:</Text>

//       {Object.entries(availableSlots).map(([date, slots]) => (
//         <View key={date}>
//           <Text style={styles.subHeading}>{`Date: ${date}`}</Text>
//           <View style={styles.slotContainer}>
//             {slots.map((slot) => (
//               <CustomButton
//                 variant="primary"
//                 key={slot}
//                 btnLabel={`Slot ${slot}`}
//                 onPress={() => handleBookAppointment(slot, date)}
//               />
//             ))}
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  doctorName: {
    fontSize: 23,
    fontFamily: 'appfont-semi',
  },
  specialtyItem: {
    marginRight: 10,
    color: colors.GRAY,
  },
  zipcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 10
  },
  zipcodeText: {
    fontSize: 16,
    fontFamily: 'appfont',
    color: colors.GRAY,
    marginLeft: 5,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 11
  },
  hoursText: {
    fontSize: 16,
    fontFamily: 'appfont',
    color: colors.GRAY,
    marginLeft: 5,
  },
  separator: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: colors.LIGHT_GRAY,
    margin: 5,
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  imageCard: {
    position: 'relative',
    width: '100%',
    height: 390,
  },
  image: {
    width: '100%',
    height: 390,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forwardButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default AppointmentScreen;
