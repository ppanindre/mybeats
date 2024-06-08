import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import CameraView from './CameraView';
import { useNavigation } from '@react-navigation/native';
import { customTheme } from '../../../../constants/themeConstants';
import ScreenContainer from '../../components/Containers/ScreenContainer';

// Items array
const checklistItems = [
    'Upload Clear Image',
    'Doctor Details Required',
    'Date Of Prescription',
    'Patient Details',
    'Dosage Details',
];

const UploadPrescription = () => {

    const [showCamera, setShowCamera] = useState(false);
    const navigation = useNavigation();
    const handleCapture = (uri) => {
        setSelectedImage({ uri });
        setShowCamera(false);
    };

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
                <View className="bg-white">
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
                            borderTopColor: customTheme.colors.lightPrimary,
                            transform: [{ translateX: 5 }, { translateY: -10 }, { rotate: '180deg' }],
                        }} />

                        <Text className="text-white font-[appfont-bold] text-lg mb-4 z-20">Requirements</Text>

                        {checklistItems.map((item, index) => (
                            <View key={index} className="flex-row items-center mb-2 z-20">
                                <Ionicons name="checkmark-circle" size={24} style={{ color: customTheme.colors.light }} />
                                <Text className="text-white font-[appfont-semi] pl-2">{item}</Text>
                            </View>
                        ))}

                    </View>
                </View>

                <View className="bg-white p-6 rounded-2xl">

                    {/* Upload file section */}
                    <View className="m-4 mt-1 p-2 border-dashed border-2 rounded-lg flex justify-center items-center h-[320px] border-primary"
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
                                <Ionicons name="document-attach" size={30} style={{ color: customTheme.colors.primary }} />
                                <Text className="font-[appfont-bold] mt-2 text-primary">Upload file here</Text>
                            </>
                        )}
                    </View>

                    {selectedImage ? (
                        <View className="flex-row justify-between mb-5 space-x-3">
                            <TouchableOpacity className="flex flex-row text-white text-sm py-4 px-14 rounded-lg items-center bg-lightPrimary"
                                onPress={() => setSelectedImage(null)}
                            >
                                <Text className="ml-2 font-[appfont-bold] text-light">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex flex-row text-sm px-14 rounded-lg items-center bg-primary"
                                //  onPress={() => navigation.navigate('ImageAnalyzeDisplay', { imageUri: selectedImage.uri })}
                                onPress={() => navigation.navigate('doctorMedicine', { imageUri: selectedImage.uri })}
                            >
                                <Text className="ml-2 font-[appfont-bold] text-light">Analyze</Text>
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <View className="flex-row justify-around space-x-5">
                            <TouchableOpacity className="flex flex-row text-white text-sm py-4 px-11 rounded-lg items-center bg-lightPrimary"
                                onPress={() => setShowCamera(true)} >
                                <Ionicons name="camera" size={20} style={{ color: customTheme.colors.light }} />
                                <Text className="ml-2 font-semibold text-light">Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex flex-row text-white text-sm py-4 px-11 rounded-lg items-center bg-primary"
                                onPress={pickImageFromLibrary}>
                                <Ionicons name="images" size={20} style={{ color: customTheme.colors.light }} />
                                <Text className="ml-2 font-semibold text-light">Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </ScreenContainer>
    );


};

export default UploadPrescription;
