import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import SubHeading from './SubHeading';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const colors = {
    white: '#fff',
    PRIMARY: '#0165fc',
    SECONDARY: '#dbeafe',
    LIGHT_GRAY: '#e6e8eb',
    GRAY: '#a6a4a4',
};

export default function BookingSection({
    type,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime, }) {


    const [next7Days, setNext7Days] = useState([]);
    const [timeList, setTimeList] = useState([]);


    // const [selectedDate, setSelectedDate] = useState();
    // const [selectedTime, setSelectedTime] = useState();
    const [notes, setNotes] = useState();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getDays();
        // getTime();
    }, [])

    useEffect(() => {
        if (selectedDate) {
            getTime();
        } else {
            setTimeList([]);
        }
    }, [selectedDate]);

    const getDays = () => {
        const today = moment();
        const nextSevenDays = [];
        for (let i = 1; i < 8; i++) {
            const date = moment().add(i, 'days');
            nextSevenDays.push({
                date: date,
                day: date.format('ddd'),
                formmatedDate: date.format('Do MMM')
            })

        }
        setNext7Days(nextSevenDays)
    }

    const getTime = () => {
        const timeList = [];
        for (let i = 8; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }

        setTimeList(timeList)
    }


    return (
        <View>
            {/* <Text style={{
                fontSize: 18,
                color: 'gray'
            }}>Book Appointment</Text> */}

            <SubHeading subHeadingTitle={'Day'} seelAll={false} />

            <FlatList
                data={next7Days}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={
                        [styles.dayButton,
                        selectedDate == item.date
                            ? { backgroundColor: colors.PRIMARY }
                            : null
                        ]
                    }
                        onPress={() => setSelectedDate(item.date)}
                    >
                        <Text style={[{
                            fontFamily: 'appfont',
                        },
                        selectedDate == item.date
                            ? { color: colors.white }
                            : null
                        ]}>{item.day}</Text>
                        <Text style={[{
                            fontFamily: 'appfont-semi',
                            fontSize: 16
                        },
                        selectedDate == item.date
                            ? { color: colors.white }
                            : null]}>{item.formmatedDate}</Text>

                    </TouchableOpacity>
                )}
            />

            {selectedDate && (
                <>
                    <SubHeading subHeadingTitle={'Time'} seelAll={false} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={
                                [styles.dayButton, {
                                    paddingVertical: 16,
                                    backgroundColor: selectedTime == item.time ? colors.PRIMARY : 'transparent'
                                },
                                !selectedDate && { opacity: 0.5 },
                                selectedTime == item.time
                                    ? { backgroundColor: colors.PRIMARY }
                                    : null
                                ]
                            }
                                onPress={() => setSelectedTime(item.time)}
                                disabled={!selectedDate}
                            >

                                <Text style={[{
                                    fontFamily: 'appfont-semi',
                                    fontSize: 16,
                                    color: selectedTime == item.time ? colors.white : 'black'
                                },
                                selectedTime == item.time
                                    ? { color: colors.white }
                                    : null]}>{item.time}</Text>

                            </TouchableOpacity>
                        )}
                    />
                </>
            )}



        </View>
    )
}

const styles = StyleSheet.create({
    dayButton: {
        borderWidth: 1,
        borderRadius: 99,
        padding: 5,

        paddingHorizontal: 20,
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.GRAY
    }
})