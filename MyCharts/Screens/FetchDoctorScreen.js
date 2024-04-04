import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { listDoctors } from '../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import CustomButton from '../../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppointmentScreen from './AppointmentScreen';
import { onCreateDoctor, onUpdateDoctor, onDeleteDoctor } from '../../src/graphql/subscriptions'
import Search from '../Components/Search';
import Slider from '../Components/Slider';
import SubHeading from '../Components/SubHeading';
import AllDoctors from './AllDoctors';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
    white: '#fff',
    PRIMARY: '#0165fc',
    SECONDARY: '#dbeafe',
    LIGHT_GRAY: '#e6e8eb',
    GRAY: '#a6a4a4',
};
const FetchDoctorScreen = () => {

    const client = generateClient();
    const navigation = useNavigation();

    const [searchCriteria, setSearchCriteria] = useState({
        name: '',
        specialization: '',
        zipcode: ''
    });
   

    const [searchByName, setsearchByName] = useState('');
    const [searchBySpecialization, setsearchBySpecialization] = useState('');
    const [searchByZipcode, setsearchByZipcode] = useState('');
    const [showAllDoctors, setShowAllDoctors] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentListType, setCurrentListType] = useState('doctorsNearYou'); // 'doctorsNearYou' or 'userAdded'


    const route = useRoute(); // Use route to access parameters
    // const [addedDoctor, setAddedDoctor] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    const [userAddedDoctors, setUserAddedDoctors] = useState([]);

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchText, setSearchText] = useState('');


    // const handleDoctorClick = (doctor) => {
    //     // Navigate to AppointmentScreen and pass the selected doctor details
    //     const index = doctors.findIndex(d => d.id === doctor.id);
    //     setCurrentIndex(index);
    //     setSelectedDoctor(doctor);
    // };

    // const onGoForward = () => {
    //     const nextIndex = currentIndex + 1;
    //     if (nextIndex < doctors.length) {
    //         setSelectedDoctor(doctors[nextIndex]);
    //         setCurrentIndex(nextIndex);
    //     } else {
    //         Alert.alert("Start of the list", "You've reached the end of the doctor's list.");
    //         // If you want to loop back to the first doctor when the end is reached:
    //         //   setSelectedDoctor(doctors[0]);
    //         //   setCurrentIndex(0);

    //     }
    // };
    // const onGoBackward = () => {
    //     const prevIndex = currentIndex - 1;
    //     if (prevIndex >= 0) {
    //         setSelectedDoctor(doctors[prevIndex]);
    //         setCurrentIndex(prevIndex);
    //     } else {
    //         Alert.alert("Start of the list", "You've reached the start of the doctor's list.");
    //     }
    // };
    const handleDoctorClick = (doctor, listType) => {
        const currentList = listType === 'userAdded' ? userAddedDoctors : doctors;
        const index = currentList.findIndex(d => d.id === doctor.id);
        setCurrentIndex(index);
        setSelectedDoctor(doctor);
    };
    const onGoForward = () => {
        const currentList = currentListType === 'userAdded' ? userAddedDoctors : doctors;
        const nextIndex = currentIndex + 1;
        if (nextIndex < currentList.length) {
            setSelectedDoctor(currentList[nextIndex]);
            setCurrentIndex(nextIndex);
        } else {
            Alert.alert("End of the list", "You've reached the end of the doctor's list.");
        }
    };

    const onGoBackward = () => {
        const currentList = currentListType === 'userAdded' ? userAddedDoctors : doctors;
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setSelectedDoctor(currentList[prevIndex]);
            setCurrentIndex(prevIndex);
        } else {
            Alert.alert("Start of the list", "You've reached the start of the doctor's list.");
        }
    };



    const toggleView = () => {
        setShowAllDoctors(prevState => !prevState);
        setSearchText('');
        setsearchByZipcode('11219');
    };

    const colors = {
        white: '#fff',
        PRIMARY: '#0165fc',
        SECONDARY: '#dbeafe',
        LIGHT_GRAY: '#e6e8eb',
        GRAY: '#a6a4a4',
    };

    const onClickBack = () => {
        setSelectedDoctor(null);
    }

    const updateZipcodeAndSpecialization = async (zipcode, specialization) => {
        await AsyncStorage.setItem('zipcode', zipcode);
        await AsyncStorage.setItem('specialization', specialization);
    };

    useEffect(() => {
        const loadAddedDoctors = async () => {
            const addedDoctorsStr = await AsyncStorage.getItem('addedDoctors');
            const addedDoctors = addedDoctorsStr ? JSON.parse(addedDoctorsStr) : [];
            console.log('Loaded added doctors:', addedDoctors);
            setUserAddedDoctors(addedDoctors); 
        };

        loadAddedDoctors();
    }, []);
    useEffect(() => {
        const loadSettings = async () => {
            const storedZipcode = await AsyncStorage.getItem('zipcode');
            const storedSpecialization = await AsyncStorage.getItem('specialization');
            if (storedZipcode && storedSpecialization) {
                setsearchByZipcode(storedZipcode);
                setsearchBySpecialization(storedSpecialization);
            }
        };

        loadSettings();
    }, []);

    const handleDeleteDoctor = async (deletedDoctorId) => {
        // Remove the doctor from AsyncStorage
        const addedDoctorsStr = await AsyncStorage.getItem('addedDoctors');
        let addedDoctors = addedDoctorsStr ? JSON.parse(addedDoctorsStr) : [];
        addedDoctors = addedDoctors.filter(doctor => doctor.id !== deletedDoctorId);
        await AsyncStorage.setItem('addedDoctors', JSON.stringify(addedDoctors));

        // Update local state to reflect the deletion
        setUserAddedDoctors(addedDoctors);
        setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== deletedDoctorId));
    };
    useEffect(() => {
        // handleSearch();
        const fetchDoctors = async () => {
            try {
                const response = await client.graphql({
                    query: listDoctors,
                    variables: {},
                });
                setAllDoctors(response.data.listDoctors.items); // Update the allDoctors state
                const filteredDoctors = response.data.listDoctors.items.filter(doctor => doctor.zipcode === '11219');
                setDoctors(filteredDoctors);
                // setDoctors(response.data.listDoctors.items);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();


        //Subsription for new Doctors created
        const createDoctorSubscription = client.graphql({ query: onCreateDoctor })
            .subscribe({
                next: ({ data }) => {
                    const newDoctor = data.onCreateDoctor;
                    // setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
                    if (newDoctor.zipcode === '11219') {
                        setDoctors(prevDoctors => [...prevDoctors, newDoctor]);
                    }
                    setUserAddedDoctors(prevDoctors => [...prevDoctors, newDoctor]);
                },
                error: (error) => console.warn(error)
            });

        // const updateDoctorSubscription = client.graphql({ query: onUpdateDoctor })
        //     .subscribe({
        //         next: async ({ data }) => {
        //             console.log("Updated")
        //             const updatedDoctor = data.onUpdateDoctor;
        //             setUserAddedDoctors(prev => prev.map(doc => doc.id === updatedDoctor.id ? updatedDoctor : doc));
        //             console.log(updatedDoctor.id);


        //             // setDoctors((prevDoctors) => {
        //             //     const index = prevDoctors.findIndex((doc) => doc.id === updatedDoctor.id);
        //             //     if (index !== -1) {
        //             //         const updatedDoctors = [...prevDoctors];
        //             //         updatedDoctors[index] = updatedDoctor;
        //             //         return updatedDoctors;
        //             //     }
        //             //     return prevDoctors;
        //             // });
        //             if(updatedDoctor.zipcode === '11219') {
        //         setDoctors((prevDoctors) => {
        //             const index = prevDoctors.findIndex((doc) => doc.id === updatedDoctor.id);
        //             if (index !== -1) {
        //                 // If the doctor is found, update it
        //                 const updatedDoctors = [...prevDoctors];
        //                 updatedDoctors[index] = updatedDoctor;
        //                 return updatedDoctors;
        //             } else {
        //                 // If the doctor with the specific zipcode wasn't previously in the list, add it
        //                 return [...prevDoctors, updatedDoctor];
        //             }
        //         });
        //         await updateZipcodeAndSpecialization(updatedDoctor.zipcode, updatedDoctor.specialization);
        //     } else {
        //         // If the updated doctor does not have the zipcode '11219', remove it from the list if it exists
        //         setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== updatedDoctor.id));
        //     }
        //         }
        //     });
        const updateDoctorSubscription = client.graphql({ query: onUpdateDoctor })
            .subscribe({
                next: async ({ data }) => {
                    const updatedDoctor = data.onUpdateDoctor;

                    // current list of added doctors from AsyncStorage
                    const addedDoctorsStr = await AsyncStorage.getItem('addedDoctors');
                    let addedDoctors = addedDoctorsStr ? JSON.parse(addedDoctorsStr) : [];

                    // Update the doctor in the addedDoctors array
                    const updatedAddedDoctors = addedDoctors.map(doc =>
                        doc.id === updatedDoctor.id ? updatedDoctor : doc
                    );

                    // Save the updated array back to AsyncStorage
                    await AsyncStorage.setItem('addedDoctors', JSON.stringify(updatedAddedDoctors));

                    // Update local state
                    setUserAddedDoctors(updatedAddedDoctors);

                    if (updatedDoctor.zipcode === '11219') {
                        setDoctors((prevDoctors) => {
                            const index = prevDoctors.findIndex((doc) => doc.id === updatedDoctor.id);
                            if (index !== -1) {
                                const updatedDoctors = [...prevDoctors];
                                updatedDoctors[index] = updatedDoctor;
                                return updatedDoctors;
                            } else {
                                return [...prevDoctors, updatedDoctor];
                            }
                        });
                        await updateZipcodeAndSpecialization(updatedDoctor.zipcode, updatedDoctor.specialization);
                    } else {
                        setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== updatedDoctor.id));
                    }
                },
                error: (error) => console.warn(error)
            });


        const deleteDoctorSubscription = client.graphql({ query: onDeleteDoctor })
            .subscribe({
                next: ({ data }) => {
                    const deletedDoctor = data.onDeleteDoctor;
                    setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== deletedDoctor.id));
                    handleDeleteDoctor(deletedDoctor.id);
                },
            });

        return () => {
            createDoctorSubscription.unsubscribe();
            updateDoctorSubscription.unsubscribe();
            deleteDoctorSubscription.unsubscribe();
        };

    }, []);

    const handleSearch = async (criteria) => {
        setSearchText(criteria.name);
        setShowAllDoctors(true);
        // try {
        //     // Use the listDoctors query to fetch doctors based on search criteria
        //     const response = await client.graphql({
        //         query: listDoctors,
        //         variables: {
        //             filter: {
        //                 and: [
        //                     { or: [{ firstname: { contains: searchCriteria.name } }, { lastname: { contains: searchCriteria.name } }] },
        //                     { specialization: { contains: searchCriteria.specialization } },
        //                     { zipcode: { contains: searchCriteria.zipcode } },
        //                 ],
        //             }
        //         }
        //     });
        //     setDoctors(response.data.listDoctors.items);
        // } catch (error) {
        //     console.error('Error fetching doctors:', error);
        // }
        // const searchedDoctors = allDoctors.filter(doctor => {
        //     return doctor.firstname.includes(criteria.name) || doctor.lastname.includes(criteria.name); // Adjust according to your criteria
        // });
        // setDoctors(searchedDoctors);
    };

    if (showAllDoctors) {
        return <AllDoctors searchText={searchText} zipcode={searchByZipcode} onBack={() => setShowAllDoctors(false)} />;
    }

    return (
        <ScrollView style={styles.container}>


            {showAllDoctors ? (
                <AllDoctors onBack={() => setShowAllDoctors(false)} />
            ) :
                !selectedDoctor ? (

                    // Conditionally render AppointmentScreen if a doctor is selected


                    <View>
                        {/* <Search setSearchText={handleSearch} /> */}
                        <View style={styles.searchAndAddContainer}>
                            <Search setSearchText={handleSearch} />
                            <TouchableOpacity
                                style={styles.addDoctorButton}
                                onPress={() => navigation.navigate('AddDoctor')}>
                                <Ionicons name="md-person-add" size={24} style={styles.addDoctorIcon} />
                                {/* <Text style={styles.addDoctorButtonText}>Doctor</Text> */}
                            </TouchableOpacity>
                        </View>


                        {/* <Slider /> */}
                        {/* {addedDoctor ? (
                            <>
                                <SubHeading subHeadingTitle={'Your Doctors'} />
                                <View style={styles.card}>
                                    <Image
                                        source={require('../../assets/doc1.webp')}
                                        style={styles.image}
                                    />
                                    <View style={styles.info}>
                                        <Text style={styles.name}>{`${addedDoctor.firstname} ${addedDoctor.lastname}`}</Text>
                                        <Text style={styles.details}>{`Specialization: ${addedDoctor.specialization}`}</Text>
                                        <Text style={styles.details}>{`Zipcode: ${addedDoctor.zipcode}`}</Text>
                                    </View>
                                </View>
                            </>


                        ) : (
                            <Slider />
                        )} */}
                        {
                            userAddedDoctors.length > 0 ? (
                                <>
                                    <SubHeading subHeadingTitle={'Your Doctors'} />
                                    <FlatList
                                        data={userAddedDoctors}
                                        keyExtractor={(item, index) => item.id.toString() || index.toString()}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item: doctor }) => (
                                            // <TouchableOpacity onPress={() => handleDoctorClick(doctor)}>
                                            <TouchableOpacity onPress={() => { handleDoctorClick(doctor, 'userAdded'); setCurrentListType('userAdded'); }}>
                                                <View style={styles.card}>
                                                    <Image
                                                        source={require('../../assets/doc1.webp')}
                                                        style={styles.image}
                                                    />
                                                    <View style={styles.info}>
                                                        <Text style={styles.name}>{`${doctor.firstname} ${doctor.lastname}`}</Text>
                                                        <Text style={styles.details}>{`Specialization: ${doctor.specialization}`}</Text>
                                                        <Text style={styles.details}>{`Zipcode: ${doctor.zipcode}`}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        )}
                                    />
                                </>
                            ) : (
                                <Slider />
                            )
                        }



                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <SubHeading subHeadingTitle={'Doctors near you'} />
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text style={{
                                    fontFamily: 'appfont',
                                    color: colors.PRIMARY
                                }}>See all</Text>
                            </TouchableOpacity>
                        </View>



                        {/* <TextInput
                        style={styles.input}
                        placeholder="Search by firstname, lastname"
                        onChangeText={(text) => setsearchByName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Search by specialization"
                        onChangeText={(text) => setsearchBySpecialization(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Search by zipcode"
                        onChangeText={(text) => setsearchByZipcode(text)}
                    /> */}
                        {/* <CustomButton variant="primary" btnLabel="Search" onPress={handleSearch} /> */}

                        <FlatList
                            data={doctors}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // <TouchableOpacity onPress={() => handleDoctorClick(item)}>
                                <TouchableOpacity onPress={() => { handleDoctorClick(item, 'doctorsNearYou'); setCurrentListType('doctorsNearYou'); }}>
                                    <View style={styles.card}>
                                        <Image
                                            source={require('../../assets/doc1.webp')}
                                            style={styles.image}
                                        />
                                        <View style={styles.info}>
                                            <Text style={styles.name}>{`${item.firstname} ${item.lastname}`}</Text>
                                            <Text style={styles.details}>{`Specialization: ${item.specialization}`}</Text>
                                            <Text style={styles.details}>{`Zipcode: ${item.zipcode}`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                ) :
                    (
                        <AppointmentScreen doctor={selectedDoctor} onClickBack={onClickBack} onGoForward={onGoForward} onGoBack={onGoBackward} currentIndex={currentIndex} doctors={currentListType === 'userAdded' ? userAddedDoctors : doctors}
                        />
                    )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 300,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        marginTop: 1,
        marginRight: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 240,
        width: 300,
    },
    info: {
        padding: 7,
    },
    name: {
        fontFamily: 'appfont-semi',
        fontSize: 16,
    },
    details: {
        color: '#888888',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    doctorItem: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
    },
    searchAndAddContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addDoctorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY,
        paddingHorizontal: 10,
        paddingVertical: 9,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 5,
        marginTop: -4
    },
    addDoctorButtonText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 16,
    },

    addDoctorIcon: {
        color: '#fff',
    },
});

export default FetchDoctorScreen;
