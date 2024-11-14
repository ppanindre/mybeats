import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../../../tailwind.config";
import AppButton from "../../components/Buttons/AppButton";
import PrescriptionCamera from "./PrescriptionCamera";
import {
  createPrescriptionImageActionCreator,
  getPrescriptionImageActionCreator,
} from "../../../../store/actions/prescriptionImageActions";
import Loader from "../../components/Utils/Loader";

const UploadPrescription = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { appointmentId, patientId } = route.params;

  const { loading, imageUrls } = useSelector(
    (state) => state.prescriptionImageGetReducer
  );


  const [showCamera, setShowCamera] = useState(false);
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    dispatch(getPrescriptionImageActionCreator(appointmentId));
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (imageUrls !== undefined) {
      setImages(imageUrls || []);
      setIsSubmitEnabled(false);
    }
  }, [imageUrls]);

  const pickImagesFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 0,
      },
      (response) => {
        if (response.assets) {
          const selectedImages = response.assets.map((asset) => ({
            uri: asset.uri,
          }));

          const newImages = selectedImages.filter(
            (img) => !imageUrls.includes(img.uri)
          );

          if (newImages.length > 0) {
            setIsSubmitEnabled(true); 
          }
          setImages((prevImages) => [...prevImages, ...selectedImages]);
        }
      }
    );
  };

  const checkIfSubmitEnabled = (updatedImages) => {
    const hasNewImages = updatedImages.some((img) => !imageUrls.includes(img.uri));
    setIsSubmitEnabled(hasNewImages);
  };

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);    
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(Math.max(updatedImages.length - 1, 0));
    }
  };

  const handleSubmit =  async () => {
    dispatch(createPrescriptionImageActionCreator(appointmentId, images));
    Alert.alert("Your prescription images have been submitted.");
    navigation.goBack();
    await dispatch(getPrescriptionImageActionCreator(appointmentId));
  };

  if (loading) return <Loader />;


  if (showCamera) {
    return (
      <PrescriptionCamera
        onCapture={(uri) => {
          const newImage = { uri };
          setImages((prevImages) => [...prevImages, newImage]);
          checkIfSubmitEnabled([...images, newImage]);
          setShowCamera(false);
        }}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  const isBackendImage = (imageUri) => {
    return imageUrls.includes(imageUri);
  };

  return (
    <ScreenContainer>
      <ScrollView>

        <View className="rounded-2xl">
          {/* Upload file section */}
          <View className="p-2 border-dashed border-2 rounded-lg flex justify-center items-center h-[320px] border-primary">
            {images.length > 0 ? (
              <View className="relative w-full h-full">
                <Image
                  source={{
                    uri:
                      images[currentIndex]?.uri ||
                      images[currentIndex],
                  }}
                  className="w-full h-full object-cover rounded-lg"
                  resizeMode="cover"
                />
               {!isBackendImage(images[currentIndex]) && (
                  <TouchableOpacity
                    onPress={() => removeImage(currentIndex)}
                    className="absolute right-0 bg-white rounded-full"
                  >
                    <Ionicons name="close-circle" size={25} color={theme.colors.primary} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={pickImagesFromGallery}
                  className="absolute -bottom-11 right-0"
                >
                  <Ionicons name="add-circle" size={30} color={theme.colors.primary} />
                </TouchableOpacity>
                {/* Image Navigation */}
                <TouchableOpacity
                  onPress={handlePreviousImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1"
                  disabled={currentIndex === 0}
                >
                  <Ionicons
                    name="chevron-back-circle"
                    size={40}
                    style={{ color: currentIndex === 0 ? theme.colors.darkSecondary : theme.colors.primary }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1"
                  disabled={currentIndex === images.length - 1}
                >
                  <Ionicons
                    name="chevron-forward-circle"
                    size={40}
                    style={{ color: currentIndex === images.length - 1 ? theme.colors.darkSecondary : theme.colors.primary }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity className="items-center" onPress={pickImagesFromGallery}>
                <Ionicons
                  name="document-attach"
                  size={30}
                  style={{ color: theme.colors.primary }}
                />
                <Text className="font-[appfont-bold] mt-2 text-primary">
                  Upload file here
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>


      {images.length > 0 ? (
        <View className="flex-row justify-between space-x-3">
          <View className="flex-1">
            <AppButton
              btnLabel="Camera"
              onPress={() => setShowCamera(true)}
              variant="light"
            />
          </View>
          <View className="flex-1">
            <AppButton
              onPress={handleSubmit}
              btnLabel="Submit"
              variant={isSubmitEnabled ? "light" : "disabled"}
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
              btnLeftIcon={
                <Ionicons
                  name="camera"
                  size={18}
                  style={{ color: theme.colors.lightPrimary }}
                />
              }
            />
          </View>
          <View className="flex-1">
            <AppButton
              btnLabel="Give Prescription"
              onPress={() => navigation.navigate('doctorMedicine', { appointmentId, patientId })}
              variant="light"
            />
          </View>
        </View>
      )}
    </ScreenContainer>
  );
};

export default UploadPrescription;
