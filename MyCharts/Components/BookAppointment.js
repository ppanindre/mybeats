import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from './ActionButton';
import { ActivityIndicator } from 'react-native-paper';
import { generateClient } from 'aws-amplify/api';
import { getDoctor, getPatient } from '../../src/graphql/queries';
import { createAppointment, updateDoctor } from '../../src/graphql/mutations';
import { useNavigation } from "@react-navigation/native";


const colors = {
  white: '#fff',
  PRIMARY: '#0165fc',
  SECONDARY: '#dbeafe',
  LIGHT_GRAY: '#e6e8eb',
  GRAY: '#a6a4a4',
};

const BookAppointment = ({ doctor, onBack }) => {
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loader, setLoader] = useState(false);
  const client = generateClient();

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await client.graphql({
          query: getDoctor,
          variables: { id: doctor.id },
        });
        const slots = JSON.parse(response.data.getDoctor.availableSlots);
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
        Alert.alert("Error", "Failed to fetch available slots.");
      }
    };

    fetchAvailableSlots();
  }, [doctor.id]);

  const navigation = useNavigation(); // make sure to import useNavigation from '@react-navigation/native'
  const datesList = Object.keys(availableSlots).map(date => ({
    date,
    slots: availableSlots[date],
  }));

  // Filter the time list for the selected date
  const timeList = selectedDate ? availableSlots[selectedDate] : [];
  const bookAppointment = async () => {
    // Ensure both date and time have been selected
    if (!selectedDate || !selectedTime) {
      Alert.alert("Error", "Please select both a date and a time to book your appointment.");
      return;
    }

    setLoader(true);
    try {
      // Fetch the current doctor's details
      const doctorResponse = await client.graphql({
        query: getDoctor,
        variables: { id: doctor.id },
      });

      // Fetch the patient details
      const patientResponse = await client.graphql({
        query: getPatient,
        variables: { id: "d2e46041-0bdb-41ae-ba34-9627a14ed0fc" }, // This should probably be dynamic
      });

      const patientId = patientResponse.data.getPatient.id; // Patient ID
      const currentDoctor = doctorResponse.data.getDoctor; // Current doctor's details
      const availableSlots = JSON.parse(currentDoctor.availableSlots) || {}; // Doctor's available slots

      // Check if the selected time is available on the selected date
      if (availableSlots[selectedDate]?.includes(selectedTime)) {
        // Update slots by removing the selected one
        const updatedSlots = {
          ...availableSlots,
          [selectedDate]: availableSlots[selectedDate].filter((slot) => slot !== selectedTime),
        };

        // Update the doctor's available slots
        await client.graphql({
          query: updateDoctor,
          variables: {
            input: {
              id: doctor.id,
              availableSlots: JSON.stringify(updatedSlots),
            },
          },
        });

        // Create the appointment in the database
        const createAppointmentResponse = await client.graphql({
          query: createAppointment,
          variables: {
            input: {
              patientId: patientId,
              time: selectedTime,
              date: selectedDate,
            },
          },
        });

        const bookedAppointment = createAppointmentResponse.data.createAppointment;
        Alert.alert("Appointment Booked", "Your appointment has been booked successfully.");
        navigation.navigate("ChatRoom");

      } else {
        Alert.alert("Error", "Selected slot is no longer available.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert("Error booking appointment", error.message || "An error occurred while trying to book the appointment.");
    } finally {
      setLoader(false);
    }
  };
  // const bookAppointment = async () => {
  //   if (!selectedSlot) {
  //     Alert.alert("Error", "Please select a slot to book your appointment.");
  //     return;
  //   }

  //   setLoader(true);
  //   try {
  //     // Fetch the current doctor's details
  //     const doctorResponse = await client.graphql({
  //       query: getDoctor,
  //       variables: { id: doctor.id },
  //     });

  //     // Fetch the patient details
  //     const patientResponse = await client.graphql({
  //       query: getPatient,
  //       variables: { id: "d2e46041-0bdb-41ae-ba34-9627a14ed0fc" }, // This should probably be dynamic
  //     });

  //     const patientId = patientResponse.data.getPatient.id; // Patient ID
  //     const currentDoctor = doctorResponse.data.getDoctor; // Current doctor's details
  //     const availableSlots = JSON.parse(currentDoctor.availableSlots) || {}; // Doctor's available slots

  //     if (availableSlots[selectedSlot.date]?.includes(selectedSlot.time)) {
  //       // Update slots by removing the selected one
  //       const updatedSlots = {
  //         ...availableSlots,
  //         [selectedSlot.date]: availableSlots[selectedSlot.date].filter((slot) => slot !== selectedSlot.time),
  //       };

  //       // Update the doctor's available slots
  //       await client.graphql({
  //         query: updateDoctor,
  //         variables: {
  //           input: {
  //             id: doctor.id,
  //             availableSlots: JSON.stringify(updatedSlots),
  //           },
  //         },
  //       });

  //       // Create the appointment in the database
  //       const createAppointmentResponse = await client.graphql({
  //         query: createAppointment,
  //         variables: {
  //           input: {
  //             patientId: patientId,
  //             time: selectedSlot.time,
  //             date: selectedSlot.date,
  //           },
  //         },
  //       });

  //       const bookedAppointment = createAppointmentResponse.data.createAppointment;
  //       Alert.alert("Appointment Booked", "Your appointment has been booked successfully.");
  //       navigation.navigate("ChatRoom");

  //     } else {
  //       Alert.alert("Error", "Selected slot is no longer available.");
  //     }
  //   } catch (error) {
  //     console.error("Error booking appointment:", error);
  //     Alert.alert("Error booking appointment", error.message || "An error occurred while trying to book the appointment.");
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
      }}>
        <Image source={require('../../assets/doc1.webp')}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
        <View>
          <Text style={{
            fontSize: 20,
            fontFamily: 'appfont-semi',
            marginBottom: 8
          }}>{`Dr. ${doctor?.firstname} ${doctor?.lastname}`}</Text>
          <View style={{
            display: 'flex', flexDirection: 'row',
            gap: 5, alignItems: 'center'
          }}>
            <Ionicons name="location" size={22} color={colors.PRIMARY} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'appfont',
              color: colors.GRAY,
              width: '70%'
            }}>{doctor?.zipcode}</Text>
          </View>


        </View>


      </View>
      <ActionButton />

      <View style={styles.separator} />

      {/* <Text style={styles.title}>Select Appointment Slot:</Text>
      {Object.entries(availableSlots).map(([date, slots]) => (
        <View key={date}>
          <Text style={styles.date}>{`Date: ${date}`}</Text>
          {slots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.slotButton, selectedSlot?.time === time && selectedSlot?.date === date && { backgroundColor: colors.PRIMARY }]}
              onPress={() => setSelectedSlot({ date, time })}
            >
              <Text style={styles.slotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))} */}
      <Text style={{
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 15,
        color: colors.GRAY
      }}>Select a date</Text>
      <FlatList
        data={datesList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dateButton, selectedDate === item.date && { backgroundColor: colors.PRIMARY }]}
            onPress={() => {
              setSelectedDate(item.date);
              setSelectedTime(null); // Reset the selected time when a new date is picked
            }}
          >
            <Text style={[styles.dateText, selectedDate === item.date && { color: colors.white }]}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Time selection list */}
      {selectedDate && (
        <>
          <Text style={{
            fontSize: 18,
            marginLeft: 10,
            marginTop: 20,
            marginBottom: 15,
            color: colors.GRAY
          }}>Select a time</Text>
          <FlatList
            data={timeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.timeButton, selectedTime === item && { backgroundColor: colors.PRIMARY }]}
                onPress={() => setSelectedTime(item)}
              >
                <Text style={[styles.timeText, selectedTime === item && { color: colors.white }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <TouchableOpacity
        onPress={() => bookAppointment()}
        disabled={loader}
        style={{
          padding: 15,
          backgroundColor: colors.PRIMARY,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginTop: 35,
          marginBottom: 5,
          zIndex: 20
        }}>
        {!loader ? <Text style={{
          color: colors.white,
          textAlign: 'center',
          fontFamily: 'appfont-semi',
          fontSize: 17
        }}>Make Appointment</Text>
          : <ActivityIndicator />
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onBack()}
        disabled={loader}
        style={{
          padding: 15,
          backgroundColor: colors.PRIMARY,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginTop: 15,
          marginBottom: 10,
          zIndex: 20
        }}>
        <Text style={{
          color: colors.white,
          textAlign: 'center',
          fontFamily: 'appfont-semi',
          fontSize: 17
        }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    marginLeft: 5,
    color: colors.PRIMARY,
  },
  separator: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: colors.LIGHT_GRAY,
    margin: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  slotButton: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 5,
  },
  slotText: {
    fontSize: 16,
  },
  bookButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 18,
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GRAY,
  },
  timeButton: {
    paddingHorizontal: 24,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GRAY,
  },
});

export default BookAppointment;
