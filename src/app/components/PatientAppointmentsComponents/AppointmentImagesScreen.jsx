import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorNoteActionCreator } from '../../../../store/actions/doctorNoteActions';
import RNFS from 'react-native-fs'; 
import { CameraRoll } from '@react-native-camera-roll/camera-roll'; 
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

    // storage permission for android
    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission",
                        message: "This app needs access to your storage to download images.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    // handling download image
    const handleDownloadImage = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage permission is required to download images.');
            return;
        }

        const imageUrl = imageUrls[currentImageIndex]?.uri || imageUrls[currentImageIndex]?.url || imageUrls[currentImageIndex];
        const filename = imageUrl.split('/').pop();
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${filename}`;

        try {
            // downloading the image
            const downloadRes = await RNFS.downloadFile({
                fromUrl: imageUrl,
                toFile: downloadDest,
            }).promise;

            if (downloadRes.statusCode === 200) {
                if (Platform.OS === 'android') {
                    // moving to android's Pictures directory
                    const destPath = `${RNFS.PicturesDirectoryPath}/${filename}`;
                    await RNFS.moveFile(downloadDest, destPath);
                    Alert.alert('Download Success', 'Image has been saved to your gallery.');
                } else if (Platform.OS === 'ios') {
                    // for iOS, saving the image to the Photos library
                    try {
                        await CameraRoll.save(downloadDest, { type: 'photo' });
                        Alert.alert('Download Success', 'Image has been saved to your Photos library.');
                    } catch (error) {
                        console.log('Save error', error);
                        Alert.alert('Download Error', 'Failed to save image to the Photos library.');
                    }
                }
            } else {
                Alert.alert('Error', 'Failed to download image.');
            }
        } catch (error) {
            console.log('Download error', error);
            Alert.alert('Error', 'An error occurred while downloading the image.');
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
                                    onPress={handleDownloadImage}
                                    className="absolute right-0 top-0"
                                >
                                    <Ionicons
                                        name="download"
                                        size={35}
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
