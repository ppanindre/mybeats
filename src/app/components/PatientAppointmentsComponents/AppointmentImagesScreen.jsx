import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';
import AppButton from '../Buttons/AppButton';
import Loader from '../Utils/Loader';
import ScreenContainer from '../Containers/ScreenContainer';

const AppointmentImagesScreen = ({ route }) => {
    const { appointmentId } = route.params;
    const dispatch = useDispatch();
    const { loading, doctorNote, imageUrls } = useSelector((state) => state.doctorNoteGetReducer);
    const [imageUrlsState, setImageUrlsState] = useState([]);  

    useEffect(() => {
        dispatch(getDoctorNoteActionCreator(appointmentId));
    }, [dispatch, appointmentId]);

    useEffect(() => {
        if (imageUrls && Array.isArray(imageUrls)) {
            console.log('Fetched image URLs:', imageUrls);  
            setImageUrlsState(imageUrls); 
        }
    }, [imageUrls]);

    const handleDownloadImage = (url) => {
        Alert.alert('Image downloaded', 'Image has been successfully downloaded.');
    };

    if (loading) return <Loader />;

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 space-y-5">
                <Text className="font-[appfont-semi] text-lg">Appointment Images</Text>

                {(!imageUrlsState || imageUrlsState.length === 0) ? (
                    <Text>No images available for this appointment.</Text>
                ) : (
                    imageUrlsState.map((url, index) => (
                        <View key={index} className="mb-4">
                            {url ? (
                                <>
                                    <Image
                                        source={{ uri: `${url}?timestamp=${Date.now()}` }} 
                                        style={{ width: '100%', height: 200, borderRadius: 8 }}
                                        resizeMode="contain"
                                        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}  
                                    />
                                    <AppButton
                                        btnLabel="Download Image"
                                        variant="primary"
                                        onPress={() => handleDownloadImage(url)}
                                    />
                                </>
                            ) : (
                                <Text>Image URL not available</Text>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </ScreenContainer>
    );
};

export default AppointmentImagesScreen;
