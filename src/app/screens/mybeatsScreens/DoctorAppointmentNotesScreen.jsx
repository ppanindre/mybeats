import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreenContainer from '../../components/Containers/ScreenContainer';
import MultiLineInput from '../../components/Inputs/MultiLineInput';
import AppButton from '../../components/Buttons/AppButton';
import { theme } from '../../../../tailwind.config';
import { createDoctorNoteActionCreator, getDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';
import Loader from '../../components/Utils/Loader';

const DoctorAppointmentNotesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { appointmentId } = route.params;

    const { loading, doctorNote, imageUrls } = useSelector((state) => state.doctorNoteGetReducer);

    const [notes, setNotes] = useState('');
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        dispatch(getDoctorNoteActionCreator(appointmentId));
    }, [dispatch, appointmentId]);

    useEffect(() => {
        if (doctorNote !== undefined) {
            setNotes(doctorNote || '');
        }
        if (imageUrls !== undefined) {
            setImages(imageUrls || []);
        }
    }, [doctorNote, imageUrls]);

    const addImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0,
        });

        if (!result.didCancel && result.assets) {
            setImages([...images, ...result.assets]);
        }
    };


    const removeImage = (uri) => {
        setImages(images.filter(image => image.uri !== uri));
        // Reset the index if no images are left
        if (currentImageIndex >= images.length - 1) {
            setCurrentImageIndex(images.length - 2 >= 0 ? images.length - 2 : 0);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Dispatching the action to save the doctor's notes
        dispatch(createDoctorNoteActionCreator(appointmentId, notes, images));
        Alert.alert("Your notes have been submitted.")
        navigation.goBack();
    };

    const isSubmitDisabled = notes.length === 0;

    if (loading) return <Loader />

    return (
        <ScreenContainer>
            <View className="flex-1 space-y-5">
                <View className="space-y-2">
                    <MultiLineInput
                        label={doctorNote ? "Doctor's Notes" : "Write your notes here"}
                        value={notes}
                        onChangeText={setNotes}
                        editable={!doctorNote}
                    />
                </View>

                {images.length > 0 ? (
                    <View className="space-y-2">
                        <Text className="font-[appfont-semi] text-lg">Pictures</Text>
                        <View className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[320px]"
                            style={{ borderColor: theme.colors.primary }}
                        >
                            <View className="relative flex-1 w-full justify-center items-center">
                                <Image
                                    source={{ uri: images[currentImageIndex]?.uri || images[currentImageIndex]?.url || images[currentImageIndex] }}
                                    className="w-full h-full object-contain"
                                />
                                {!doctorNote && (
                                    <TouchableOpacity
                                        className="absolute right-2 top-2 transform -translate-y-1"
                                        onPress={() => removeImage(images[currentImageIndex]?.uri)}
                                    >
                                        <Ionicons name="close-circle" size={28} color={theme.colors.primary} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={handlePreviousImage}
                                    className="absolute left-0 top-1/2 transform -translate-y-2 p-2"
                                    disabled={currentImageIndex === 0}
                                >
                                    <Ionicons
                                        name="chevron-back-circle"
                                        size={40}
                                        style={{ color: currentImageIndex === 0 ? theme.colors.darkSecondary : theme.colors.primary }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleNextImage}
                                    className="absolute right-0 top-1/2 transform -translate-y-2 p-2"
                                    disabled={currentImageIndex === images.length - 1}
                                >
                                    <Ionicons
                                        name="chevron-forward-circle"
                                        size={40}
                                        style={{ color: currentImageIndex === images.length - 1 ? theme.colors.darkSecondary : theme.colors.primary }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className="space-y-2">
                        <Text className="font-[appfont-semi] text-lg">Pictures</Text>
                        <View className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[320px]"
                            style={{ borderColor: theme.colors.primary }}
                        >
                            {images.length === 0 ? (
                                <>
                                    <Ionicons name="document-attach" size={30} style={{ color: theme.colors.primary }} />
                                    <Text style={{ color: theme.colors.primary }} className="font-[appfont-bold]">Add Pictures here</Text>
                                </>
                            ) : (
                                <View className="relative flex-1 w-full justify-center items-center">
                                    <Image
                                        source={{ uri: images[currentImageIndex]?.uri || images[currentImageIndex]?.url }}
                                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                    />
                                    <TouchableOpacity
                                        onPress={handlePreviousImage}
                                        className="absolute left-0 top-1/2 transform -translate-y-2 p-2"
                                        disabled={currentImageIndex === 0}
                                    >
                                        <Ionicons
                                            name="chevron-back-circle"
                                            size={40}
                                            style={{ color: currentImageIndex === 0 ? theme.colors.darkSecondary : theme.colors.primary }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleNextImage}
                                        className="absolute right-0 top-1/2 transform -translate-y-2 p-2"
                                        disabled={currentImageIndex === images.length - 1}
                                    >
                                        <Ionicons
                                            name="chevron-forward-circle"
                                            size={40}
                                            style={{ color: currentImageIndex === images.length - 1 ? theme.colors.darkSecondary : theme.colors.primary }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
            {(!doctorNote || !imageUrls) && (
                <View className="flex-row space-x-3">
                    <View className="flex-1">
                        <AppButton
                            onPress={addImage}
                            variant="primary"
                            btnLabel="Add Picture"
                        />
                    </View>
                    <View className="flex-1">
                        <AppButton
                            onPress={handleSubmit}
                            variant={isSubmitDisabled ? "disabled" : "primary"}
                            btnLabel="Submit"
                            disabled={isSubmitDisabled}
                        />
                    </View>
                </View>
            )}
        </ScreenContainer>
    );
};

export default DoctorAppointmentNotesScreen;
