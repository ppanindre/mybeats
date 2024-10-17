import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreenContainer from '../../components/Containers/ScreenContainer';
import MultiLineInput from '../../components/Inputs/MultiLineInput';
import AppButton from '../../components/Buttons/AppButton';
import { theme } from '../../../../tailwind.config';
import { createDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';

const DoctorAppointmentNotesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { appointmentId, existingNotes } = route.params;

    const [notes, setNotes] = useState(existingNotes || '');
    const [images, setImages] = useState([]);

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
    };

    const handleSubmit = () => {
        // Dispatch the action to save the doctor's notes
        dispatch(createDoctorNoteActionCreator(appointmentId, notes));
        Alert.alert("Your notes have been submitted.")
        navigation.goBack();
    };

    const isSubmitDisabled = notes.length === 0 && images.length === 0;

    return (
        <ScreenContainer>
            <View className="flex-1 space-y-5">
                <View className="space-y-2">
                    <MultiLineInput
                        label="Write your notes here"
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>
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
                            <ScrollView className="w-full space-y-2" showsVerticalScrollIndicator={false}>
                                {images.map((image, index) => (
                                    <View key={index} className="flex-row items-center justify-between space-x-5 p-2 border-b" style={{ borderColor: theme.colors.lightPrimary }}>
                                        <TouchableOpacity className="flex-1" >
                                            <Text style={{ color: theme.colors.primary }}>{image.fileName}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => removeImage(image.uri)}>
                                            <Ionicons name="close-circle" size={24} style={{ color: theme.colors.primary }} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </View>
            {!existingNotes && (
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
