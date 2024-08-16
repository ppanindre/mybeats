// import React, { useRef, useEffect, useState } from 'react';
// import { View, TouchableOpacity, PermissionsAndroid, Platform, Text } from 'react-native';
// import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

// const CameraView = ({ onCapture, onCancel }) => {
//   const cameraRef = useRef(null);
//   const [isCameraAuthorized, setIsCameraAuthorized] = useState(false);

//   useEffect(() => {
//     async function requestPermissions() {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: "Camera Permission",
//             message: "This app needs access to your camera",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
//         setIsCameraAuthorized(granted === PermissionsAndroid.RESULTS.GRANTED);
//       } else {
//         setIsCameraAuthorized(true); 
//       }
//     }

//     requestPermissions();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       onCapture(data.uri);
//     }
//   };

//   if (!isCameraAuthorized) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View className="flex-1 bg-black">
//       <RNCamera
//         ref={cameraRef}
//         className="flex-1 justify-end items-center"
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//         captureAudio={false}
//       />
//       {/* Close (X) button */}
//       <TouchableOpacity className="absolute top-3 left-3 p-2" onPress={onCancel}>
//         <Icon name="close" size={30} color="white" />
//       </TouchableOpacity>
//       {/* Camera capture button */}
//       <View className="flex-row justify-center mb-5">
//         <TouchableOpacity className="p-2" onPress={takePicture}>
//           <Icon name="camera-outline" size={60} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CameraView;

import { View, Text } from 'react-native'
import React from 'react'

const CameraView = () => {
  return (
    <View>
      <Text>CameraView</Text>
    </View>
  )
}

export default CameraView
