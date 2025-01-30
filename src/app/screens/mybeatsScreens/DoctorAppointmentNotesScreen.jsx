import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import MultiLineInput from "../../components/Inputs/MultiLineInput";
import AppButton from "../../components/Buttons/AppButton";
import { theme } from "../../../../tailwind.config";
import {
  createDoctorNoteActionCreator,
  getDoctorNoteActionCreator,
} from "../../../../store/actions/doctorNoteActions";
import Loader from "../../components/Utils/Loader";
import PrescriptionCamera from "./PrescriptionCamera";

const DoctorAppointmentNotesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appointmentId } = route.params;
  const { loading, doctorNote, imageUrls } = useSelector(
    (state) => state.doctorNoteGetReducer
  );

  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]); // all images (backend + new)
  const [newImages, setNewImages] = useState([]); // only newly added images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    dispatch(getDoctorNoteActionCreator(appointmentId));
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (doctorNote !== undefined) {
      setNotes(doctorNote || "");
    }
    if (imageUrls !== undefined) {
      const backendImages = imageUrls.map((url) => ({
        uri: url,
        isBackend: true, // markng backend images
      }));
      setImages(backendImages);
    }
  }, [doctorNote, imageUrls]);

  const addImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 0,
    });

    if (!result.didCancel && result.assets) {
      const newSelectedImages = result.assets.map((img) => ({
        uri: img.uri,
        isBackend: false, // marking as new images
      }));

      setImages((prev) => [...prev, ...newSelectedImages]);
      setNewImages((prev) => [...prev, ...newSelectedImages]); // only tracking new images
    }
  };

  const handleCapture = (uri) => {
    const newImage = { uri, isBackend: false };
    setImages((prev) => [...prev, newImage]);
    setNewImages((prev) => [...prev, newImage]);
    setShowCamera(false);
  };

  const removeImage = (index) => {
    const imageToRemove = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // removing from newImages only if it is a newly added image
    if (!imageToRemove.isBackend) {
      setNewImages((prev) => prev.filter((img) => img.uri !== imageToRemove.uri));
    }

    if (currentImageIndex >= updatedImages.length) {
      setCurrentImageIndex(Math.max(updatedImages.length - 1, 0));
    }
  };

  const handleSubmit = () => {
    if (!notes.trim()) {
      Alert.alert("Error", "Please add notes before submitting.");
      return;
    }

    // submitting only the new images and keeping the backend images same
    dispatch(createDoctorNoteActionCreator(appointmentId, notes, newImages));
    Alert.alert("Success", "Your notes have been submitted.");
    navigation.goBack();
  };

  const isSubmitDisabled = notes.length === 0;

  if (loading) return <Loader />;
  if (showCamera) {
    return (
      <PrescriptionCamera
        onCapture={handleCapture}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  return (
    <ScreenContainer>
      <ScrollView>
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
              <View
                className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[320px]"
                style={{ borderColor: theme.colors.primary }}
              >
                <View className="relative flex-1 w-full justify-center items-center">
                  <Image
                    source={{ uri: images[currentImageIndex]?.uri }}
                    className="w-full h-full object-contain"
                  />
                  {/* Show remove button only for newly added images */}
                  {!images[currentImageIndex]?.isBackend && (
                    <TouchableOpacity
                      className="absolute right-0 top-0 transform"
                      onPress={() => removeImage(currentImageIndex)}
                    >
                      <Ionicons
                        name="close-circle"
                        size={35}
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentImageIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  >
                    <Ionicons
                      name="chevron-back-circle"
                      size={40}
                      color={
                        currentImageIndex === 0
                          ? theme.colors.darkSecondary
                          : theme.colors.primary
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentImageIndex((prev) =>
                        Math.min(prev + 1, images.length - 1)
                      )
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  >
                    <Ionicons
                      name="chevron-forward-circle"
                      size={40}
                      color={
                        currentImageIndex === images.length - 1
                          ? theme.colors.darkSecondary
                          : theme.colors.primary
                      }
                    />
                  </TouchableOpacity>

                  {/* Plus Icon for Adding More Images */}
                  <TouchableOpacity
                    onPress={addImageFromGallery}
                    className="flex items-center absolute right-0 bottom-0"
                  >
                    <Ionicons
                      name="add-circle"
                      size={35}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View className="space-y-2">
              <Text className="font-[appfont-semi] text-lg">Pictures</Text>
              <View
                className="border-dashed border-2 rounded-lg p-2 justify-center items-center h-[320px]"
                style={{ borderColor: theme.colors.primary }}
              >
                <TouchableOpacity className="items-center" onPress={addImageFromGallery}>
                  <Ionicons
                    name="document-attach"
                    size={30}
                    style={{ color: theme.colors.primary }}
                  />
                  <Text className="font-[appfont-bold] mt-2 text-primary">
                    Upload file here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* {(!doctorNote || !imageUrls) && ( */}
      <View className="flex-row space-x-3">
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
            variant={isSubmitDisabled ? "disabled" : "primary"}
            btnLabel="Submit"
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
      {/* )} */}
    </ScreenContainer>
  );
};

export default DoctorAppointmentNotesScreen;
