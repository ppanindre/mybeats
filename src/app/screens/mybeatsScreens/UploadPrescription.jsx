import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import CameraView from './CameraView';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/Containers/ScreenContainer';
import { useDispatch } from 'react-redux';
import { setImageUri, clearImageUri } from '../../../../store/actions/imageActions';
import { theme } from '../../../../tailwind.config';
import AppButton from '../../components/Buttons/AppButton';

// Items array
const checklistItems = [
    'Upload Clear Image',
    'Doctor Details Required',
    'Date Of Prescription',
    'Patient Details',
    'Dosage Details',
];

const UploadPrescription = () => {
    const dispatch = useDispatch();

    const [showCamera, setShowCamera] = useState(false);
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageFromLibrary = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setSelectedImage(source);
                dispatch(setImageUri(source.uri));
            }
        });
    };

    if (showCamera) {
        return <CameraView onCapture={(uri) => {
            setSelectedImage({ uri });
            setShowCamera(false);
        }} onCancel={() => setShowCamera(false)} />;
    }


    return (
        <ScreenContainer>
            <ScrollView>
                <View className="space-y-5">
                    <View className="relative rounded-lg p-5 mx-10 max-w-xs min-h-lg shadow-lg bg-primary">
                        <View className="absolute top-0 right-0 w-16 h-16 transform rotate-115  translate-x-8 -translate-y-8 z-0"></View>
                        <View style={{
                            position: 'absolute',
                            top: 9,
                            right: 4,
                            width: 0,
                            height: 0,
                            backgroundColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 0,
                            shadowOpacity: 0.5,
                            borderLeftWidth: 35,
                            borderTopWidth: 34,
                            borderLeftColor: 'transparent',
                            borderTopColor: theme.colors.lightPrimary,
                            transform: [{ translateX: 5 }, { translateY: -10 }, { rotate: '180deg' }],
                        }} />

                        <Text className="text-white font-[appfont-bold] text-lg  z-20">Requirements</Text>

                        {checklistItems.map((item, index) => (
                            <View key={index} className="flex-row items-center mb-2 z-20">
                                <Ionicons name="checkmark-circle" size={24} style={{ color: theme.colors.light }} />
                                <Text className="text-white font-[appfont-semi] pl-2">{item}</Text>
                            </View>
                        ))}

                    </View>
                </View>

                <View className="p-6 rounded-2xl">

                    {/* Upload file section */}
                    <View className="m-4 p-2 border-dashed border-2 rounded-lg flex justify-center items-center h-[320px] border-primary"
                    >
                        {selectedImage ? (
                            <>
                                <Image
                                    source={selectedImage}
                                    className="w-full h-full"
                                    resizeMode="contain"
                                />
                            </>
                        ) : (
                            <>
                                <Ionicons name="document-attach" size={30} style={{ color: theme.colors.primary }} />
                                <Text className="font-[appfont-bold] mt-2 text-primary">Upload file here</Text>
                            </>
                        )}
                    </View>

                    {selectedImage ? (
                        <View className="flex-row justify-between space-x-3">
                            <View className="flex-1">
                                <AppButton
                                    btnLabel="Cancel"
                                    onPress={() => {
                                        setSelectedImage(null);
                                        dispatch(clearImageUri());
                                    }}
                                    variant="light"
                                />
                            </View>
                            <View className="flex-1">
                                <AppButton
                                    btnLabel="Analyze"
                                    onPress={() => navigation.navigate('doctorMedicine')}
                                    variant="primary"
                                />
                            </View>
                        </View>
                    ) : (
                        <View className="flex-row justify-around space-x-3">
                            <View className="flex-1">
                                <AppButton
                                    btnLabel="Camera"
                                    onPress={() => setShowCamera(true)}
                                    variant="light"
                                    btnLeftIcon={<Ionicons name="camera" size={20} style={{ color: theme.colors.lightPrimary }} />}
                                />
                            </View>
                            <View className="flex-1">
                                <AppButton
                                    btnLabel="Gallery"
                                    onPress={pickImageFromLibrary}
                                    variant="primary"
                                    btnLeftIcon={<Ionicons name="images" size={20} style={{ color: theme.colors.light }} />}
                                />
                            </View>
                        </View>
                    )}

                </View>
            </ScrollView>
        </ScreenContainer>
    );


};

export default UploadPrescription;
