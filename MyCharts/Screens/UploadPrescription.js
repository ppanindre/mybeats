import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import CameraView from './CameraView';
import { useNavigation } from '@react-navigation/native';

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
        <View>
            <View className="bg-gray-100 p-4">
                <View className="relative bg-blue-600 rounded-lg p-5 mx-10 my-6 mb-12 max-w-xs min-h-lg shadow-lg">
                    <View className="absolute top-0 right-0 bg-gray-100 w-16 h-16 transform rotate-115  translate-x-8 -translate-y-8 z-0"></View>
                    <View style={styles.cornerFold} />

                    <Text className="text-white font-[appfont-bold] text-lg mb-4 z-20">Prescription Guide</Text>

                    {checklistItems.map((item, index) => (
                        <View key={index} className="flex-row items-center mb-2 z-20">
                            <Ionicons name="checkmark-circle" size={24} color="#34D399" />
                            <Text className="text-white font-[appfont-semi] pl-2">{item}</Text>
                        </View>
                    ))}

                    <Text className="text-white font-[appfont-bold] text-lg mb-2 mt-5 ml-1 z-20">How It Work</Text>
                    <View className="flex-row justify-between items-center z-20">
                        <View className="items-center flex-1 py-2 px-1">
                            <Ionicons name="cloud-upload" size={30} color="#FFFFFF" />
                            <Text className="text-white font-[appfont-semi] text-xs text-center mt-1">Upload Prescription</Text>
                        </View>
                        <View className="items-center flex-1 px-1">
                            <Ionicons name="notifications" size={30} color="#FFFFFF" />
                            <Text className="text-white font-[appfont-semi] text-xs text-center mt-1">Received Notification</Text>
                        </View>
                        <View className="items-center flex-1 px-1">
                            <Ionicons name="car" size={30} color="#FFFFFF" />
                            <Text className="text-white font-[appfont-semi] text-xs text-center mt-1">Medicine at your doorstep</Text>
                        </View>
                    </View>


                </View>
            </View>

            <View className="bg-white p-6 -mt-6 rounded-2xl">

                {/* Upload file section */}
                <View className="m-4 mt-1 border-dashed border-2 border-blue-300 rounded-lg flex justify-center items-center" style={styles.uploadSection}>
                    {selectedImage ? (
                        <>
                            <Image
                                source={selectedImage}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                className="absolute -top-1 right-0 bg-white p-1 rounded-full m-1"
                                onPress={() => setSelectedImage(null)}
                            >
                                <Ionicons name="close-circle" size={24} color="#4f6bed" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Ionicons name="document-attach" size={30} color="#4f6bed" />
                            <Text className="text-blue-600 font-[appfont-bold] mt-2">Upload file here</Text>
                        </>
                    )}
                </View>
                
                {selectedImage ? (
                    <View className="flex-row justify-around mb-5">
                        <TouchableOpacity className="bg-blue-500 text-white text-sm py-4 px-24 rounded-lg items-center"
                            onPress={() => navigation.navigate('ImageAnalyzeDisplay', { imageUri: selectedImage.uri })}
                        >
                            <Text className="font-[appfont-bold] text-white">Analyze Image</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="flex-row justify-around mb-5">
                        <TouchableOpacity className="flex flex-row bg-blue-500 text-white text-sm py-4 px-11 rounded-lg items-center" onPress={() => setShowCamera(true)} >
                            <Ionicons name="camera" size={20} color="#FFFFFF" />
                            <Text className="ml-2 font-semibold text-white">Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-row bg-cyan-500 text-white text-sm py-4 px-11 rounded-lg items-center" onPress={pickImageFromLibrary}>
                            <Ionicons name="images" size={20} color="#FFFFFF" />
                            <Text className="ml-2 font-semibold text-white">Gallery</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </View>
    );


};

const styles = StyleSheet.create({
    cornerFold: {
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
        borderTopColor: '#a6cde7',
        transform: [{ translateX: 5 }, { translateY: -10 }, { rotate: '180deg' }],
    },
    uploadSection: {
        margin: 16,
        marginTop: 4,
        padding: 10,
        borderColor: '#4f6bed',
        borderWidth: 2,
        borderRadius: 8,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
});

export default UploadPrescription;
