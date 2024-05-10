
// Required in the future

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { listDoctors } from '../../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppointmentScreen from './AppointmentScreen';
import { onCreateDoctor, onUpdateDoctor, onDeleteDoctor } from '../../../graphql/subscriptions';
import Search from '../../../../MyCharts/Components/Search';
import { Modal, TextInput, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';

const colors = {
    white: '#fff',
    PRIMARY: '#0165fc',
    SECONDARY: '#dbeafe',
    LIGHT_GRAY: '#e6e8eb',
    GRAY: '#a6a4a4',
};
const DIMENSIONS = Dimensions.get('window')

const AllDoctors = ({ onBack, searchText, zipcode }) => {
    const client = generateClient();
    const navigation = useNavigation();
    // const [searchText, setSearchText] = useState('');


    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [allDoctors, setAllDoctors] = useState([]);
    const items = [
        { id: 'topRated', name: 'Sort by Ratings' },
        { id: 'experience', name: 'Experience' },
    ];

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        selectedItems.forEach((item) => {
            if (item === 'topRated') {
                sortDoctorsByTopRated();
            } else if (item === 'experience') {
                // sortDoctorsByExperience(); 
            }
        });
    };


    const handleDoctorClick = (doctor) => {
        // Navigate to AppointmentScreen and pass the selected doctor details
        const index = doctors.findIndex(d => d.id === doctor.id);
        setCurrentIndex(index);
        setSelectedDoctor(doctor);
    };

    const onGoForward = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < doctors.length) {
            setSelectedDoctor(doctors[nextIndex]);
            setCurrentIndex(nextIndex);
        } else {
            Alert.alert("End of the list", "You've reached the end of the doctor's list.");
            //   setSelectedDoctor(doctors[0]);
            //   setCurrentIndex(0);
        }
    };
    const onGoBackward = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setSelectedDoctor(doctors[prevIndex]);
            setCurrentIndex(prevIndex);
        } else {
            Alert.alert("Start of the list", "You've reached the start of the doctor's list.");
        }
    };
    const onClickBack = () => {
        setSelectedDoctor(null);
    }
    // const handleSearch = async (searchCriteria) => {
    //     setSearchText(searchCriteria.name);
    //     try {
    //         // Use the listDoctors query to fetch doctors based on search criteria
    //         const response = await client.graphql({
    //             query: listDoctors,
    //             variables: {
    //                 filter: {
    //                     and: [
    //                         { or: [{ firstname: { contains: searchCriteria.name } }, { lastname: { contains: searchCriteria.name } }] },
    //                         { specialization: { contains: searchCriteria.specialization } },
    //                         { zipcode: { contains: searchCriteria.zipcode } },
    //                     ],
    //                 }
    //             }
    //         });
    //         setDoctors(response.data.listDoctors.items);
    //     } catch (error) {
    //         console.error('Error fetching doctors:', error);
    //     }
    // };
    const [modalVisible, setModalVisible] = useState(false);
    const [filterZipcode, setFilterZipcode] = useState('');
    const [filterSpecialization, setFilterSpecialization] = useState('');
    const [showAllDoctors, setShowAllDoctors] = useState(false);

    const getRatingByDoctorId = (firstname) => {
        const ratings = {
            'Tanmay': '4.5',
            'Praneeth': '4.6',
            'Prabodh': '4.7'
        };
        return ratings[firstname] || null;
    };



    const handleFilterApply = () => {
        // Make sure to perform error checking or initialization as needed
        if (!filterZipcode && !filterSpecialization) {
            Alert.alert("Please enter a filter");
            return;
        }

        // Perform the filtering
        const filtered = allDoctors.filter((doc) => {
            return (filterZipcode ? doc.zipcode.includes(filterZipcode) : true) &&
                (filterSpecialization ? doc.specialization.includes(filterSpecialization) : true);
        });

        setDoctors(filtered);
        // Close the modal
        setModalVisible(false);
    };
    useEffect(() => {
        const fetchAllDoctors = async () => {
            try {
                let filter = {};
                if (searchText) {
                    filter = {
                        filter: {
                            or: [
                                { firstname: { contains: searchText } },
                                { lastname: { contains: searchText } }
                            ]
                        }
                    };
                }
                const response = await client.graphql({
                    query: listDoctors,
                    variables: filter,
                });
                setAllDoctors(response.data.listDoctors.items); // Update allDoctors state
                // Initially set doctors to allDoctors or a filtered version if `zipcode` is specified
                const initialDoctors = response.data.listDoctors.items.filter(doctor => !zipcode || doctor.zipcode === zipcode);
                setDoctors(initialDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchAllDoctors();
    }, [searchText]);
    useEffect(() => {
        // const handleSearch = async () => {
        //     // Fetch doctors without search criteria
        //     try {
        //         const response = await client.graphql({
        //             query: listDoctors
        //         });
        //         setDoctors(response.data.listDoctors.items);
        //     } catch (error) {
        //         console.error('Error fetching doctors:', error);
        //     }
        // };

        // handleSearch();

        // Subscription for doctors' updates
        const createDoctorSubscription = client.graphql({ query: onCreateDoctor })
            .subscribe({
                next: ({ data }) => {
                    const newDoctor = data.onCreateDoctor;
                    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
                },
                error: (error) => console.warn(error)
            });

        const updateDoctorSubscription = client.graphql({ query: onUpdateDoctor })
            .subscribe({
                next: ({ data }) => {
                    const updatedDoctor = data.onUpdateDoctor;
                    setDoctors((prevDoctors) => {
                        const index = prevDoctors.findIndex((doc) => doc.id === updatedDoctor.id);
                        if (index !== -1) {
                            const updatedDoctors = [...prevDoctors];
                            updatedDoctors[index] = updatedDoctor;
                            return updatedDoctors;
                        }
                        return prevDoctors;
                    });
                }
            });

        const deleteDoctorSubscription = client.graphql({ query: onDeleteDoctor })
            .subscribe({
                next: ({ data }) => {
                    const deletedDoctor = data.onDeleteDoctor;
                    setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== deletedDoctor.id));
                },
            });

        return () => {
            createDoctorSubscription.unsubscribe();
            updateDoctorSubscription.unsubscribe();
            deleteDoctorSubscription.unsubscribe();
        };
    }, []);
    const sortDoctorsByTopRated = () => {
        const sortedDoctors = [...doctors].sort((a, b) => {
            const ratingA = parseFloat(getRatingByDoctorId(a.firstname) || 0);
            const ratingB = parseFloat(getRatingByDoctorId(b.firstname) || 0);
            return ratingB - ratingA; // For descending order
        });
        setDoctors(sortedDoctors);
    };

    return (
        <View style={styles.container}>
            {!selectedDoctor ? (
                <>

                    {searchText ? (
                        <View style={styles.searchResultContainer}>
                            <Text style={styles.searchResultText}>Results for "{searchText}"</Text>
                            <TouchableOpacity onPress={onBack}>
                                <Ionicons name="close-circle" size={20} color="#333333" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.searchResultContainer}>
                            <Text style={styles.searchResultText}>Doctors near you</Text>
                            <TouchableOpacity onPress={onBack}>
                                <Ionicons name="close-circle" size={20} color="#333333" />
                            </TouchableOpacity>
                        </View>
                    )}



                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
                            <Ionicons name="options" size={20} color="#333333" />
                            <Text style={styles.filterButtonText}>Filter</Text>
                        </TouchableOpacity>
                        <View style={styles.multiSelectContainer}>
                            <MultiSelect
                                hideTags
                                items={items}
                                uniqueKey="id"
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Sort by"
                                styleDropdownMenu={styles.dropdownMenu}
                                // searchInputPlaceholderText="Search Items..."
                                onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                styleMainWrapper={{ borderBottomWidth: 0 }}
                                styleDropdownMenuSubsection={{ borderBottomWidth: 0 }}
                                // submitButtonColor="#CCC"
                                // submitButtonText="Choose"
                                hideSubmitButton={true}
                            />
                        </View>
                        {/* <TouchableOpacity style={styles.sortButton} onPress={sortDoctorsByTopRated}>
                            <Text style={styles.sortButtonText}>Sort by Top Rated</Text>
                        </TouchableOpacity> */}
                    </View>


                    <FlatList
                        data={doctors}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleDoctorClick(item)}>
                                <View style={styles.listItem}>
                                    <Image
                                        source={require('../../assets/doc1.webp')}
                                        style={styles.image}
                                    />
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.doctorName}>{`Dr. ${item.firstname} ${item.lastname}`}</Text>

                                        <View style={styles.specializationAndRatingContainer}>
                                            <Text style={styles.specialization}>Specialization: {item.specialization}</Text>
                                            {getRatingByDoctorId(item.firstname) && (
                                                <View style={styles.starRatingContainer}>
                                                    <Ionicons name="star" size={22} color="#FFA500" />
                                                    <Text style={styles.starRatingText}>{getRatingByDoctorId(item.firstname)}</Text>
                                                </View>
                                            )}
                                        </View>
                                        <View style={styles.locationContainer}>
                                            <Ionicons name="location" size={22} color={styles.locationIcon.color} />
                                            <Text style={styles.zipCode}>{item.zipcode}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    {/* <Button title="Back" onPress={onBack} /> */}
                    {modalVisible && (
                        <View style={styles.overlayStyle} />
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    placeholder="Zip Code"
                                    style={styles.modalInput}
                                    value={filterZipcode}
                                    onChangeText={setFilterZipcode}
                                />
                                <TextInput
                                    placeholder="Specialization"
                                    style={styles.modalInput}
                                    value={filterSpecialization}
                                    onChangeText={setFilterSpecialization}
                                />
                                <View style={styles.modalButtonGroup}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.applyButton]}
                                        onPress={handleFilterApply}>
                                        <Text style={styles.modalButtonText}>Apply</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.cancelButton]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </>
            ) : (
                <AppointmentScreen doctor={selectedDoctor} onClickBack={onClickBack} onGoForward={onGoForward} onGoBack={onGoBackward} currentIndex={currentIndex} doctors={doctors}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    doctorItem: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        alignSelf: 'center',
    },
    modalInput: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f7f7f7',
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    applyButton: {
        backgroundColor: '#007AFF',
        width: '85%',
    },
    cancelButton: {
        backgroundColor: '#FFA500',
        width: '85%',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    infoContainer: {
        marginLeft: 15,
    },
    doctorName: {
        fontSize: 18,
        fontFamily: 'appfont-semi',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        color: '#0165fc',
    },
    zipCode: {
        fontSize: 16,
        fontFamily: 'appfont',
        color: '#a6a4a4',
        width: '70%',
    },
    specialization: {
        fontSize: 16,
        fontFamily: 'appfont',
        color: '#a6a4a4',
        marginBottom: 4,
    },
    // headerContainer: {
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     alignItems: 'center',
    // },
    // filterButton: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#FFA500',
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 5,
    //     alignSelf: 'flex-start',
    // },
    // filterButtonText: {
    //     color: '#333333',
    //     marginLeft: 5,
    // },
    searchResultText: {
        padding: 5,
        fontSize: 16,
        color: 'gray',
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starRatingText: {
        marginLeft: 5,
        fontSize: 16,
        color: colors.GRAY,
    },
    specializationAndRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    starRatingText: {
        marginLeft: 5,
        fontSize: 16,
        color: colors.GRAY,
    },
    sortButton: {
        backgroundColor: '#dbeafe',
        padding: 10,
        borderRadius: 5,
    },
    sortButtonText: {
        color: '#0165fc',
    },
    searchResultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        margin: 5,
    },
    overlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFA500',
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    filterButtonText: {
        color: '#333333',
        marginLeft: 5,
        fontWeight: '500', 
    },
    multiSelectContainer: {
        width: 210,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e6e8eb',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    dropdownMenu: {
        paddingHorizontal: 5,
        height: 50,
        marginBottom:0
      },
});

export default AllDoctors;
