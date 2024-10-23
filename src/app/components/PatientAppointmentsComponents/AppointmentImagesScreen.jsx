import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';
import Loader from '../Utils/Loader';
import ScreenContainer from '../Containers/ScreenContainer';
import MultiLineInput from '../Inputs/MultiLineInput';
import { theme } from '../../../../tailwind.config';
import { Ionicons } from '@expo/vector-icons';

const PatientAppointmentNotesScreen = ({ route }) => {
    const { appointmentId } = route.params;
    const dispatch = useDispatch();
    const { loading, doctorNote, imageUrls } = useSelector((state) => state.doctorNoteGetReducer);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        dispatch(getDoctorNoteActionCreator(appointmentId));
    }, [dispatch, appointmentId]);

    const handleNextImage = () => {
        if (currentImageIndex < imageUrls.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (loading) return <Loader />;

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 space-y-10">
                {/* Doctor's Notes */}
                <View className="space-y-2">
                    <MultiLineInput
                        label="Doctor's Notes"
                        value={doctorNote || 'No notes available'}
                        editable={false}
                    />
                </View>

                {/* only if images are available */}
                {imageUrls && imageUrls.length > 0 && (
                    <View className="space-y-2">
                        <Text className="font-[appfont-semi] text-lg">Pictures</Text>
                        <View className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[320px]"
                            style={{ borderColor: theme.colors.primary }}
                        >
                            <View className="relative flex-1 w-full justify-center items-center">
                                <Image
                                    source={{ uri: imageUrls[currentImageIndex]?.uri || imageUrls[currentImageIndex]?.url || imageUrls[currentImageIndex] }}
                                    className="w-full h-full object-contain"
                                />
                                 <TouchableOpacity
                                    className="absolute right-2 top-2"
                                >
                                    <Ionicons
                                        name="download"
                                        size={28}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                                {/* Image Navigation */}
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
                                    disabled={currentImageIndex === imageUrls.length - 1}
                                >
                                    <Ionicons
                                        name="chevron-forward-circle"
                                        size={40}
                                        style={{ color: currentImageIndex === imageUrls.length - 1 ? theme.colors.darkSecondary : theme.colors.primary }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </ScreenContainer>
    );
};

export default PatientAppointmentNotesScreen;
