import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import ScreenContainer from "../Containers/ScreenContainer";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../../../tailwind.config";
import AppButton from "../Buttons/AppButton";
import PrescriptionCamera from "../../screens/mybeatsScreens/PrescriptionCamera";
import {
  createOrUpdateLabTestResultActionCreator,
  getLabTestResultsActionCreator,
} from "../../../../store/actions/labTestResultsActions";
import Loader from "../Utils/Loader";
import CustomInput from "../../../../components/CustomInput";

const UploadLabTestResult = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { labTestResult } = route.params || {};
  const { loading: submitLoading } = useSelector(
    (state) => state.labTestResultCreateReducer
  );

  const [title, setTitle] = useState(labTestResult?.title || "");
  const [images, setImages] = useState(
    labTestResult?.labResultImages?.map((uri) => ({
      uri,
      isBackend: true,
    })) || []
  ); // all images (existing + new)
  const [newImages, setNewImages] = useState([]); // newly added images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);

  // checking if form is new or an update
  const isNewForm = !labTestResult?.id;

  //  submit button logic
  useEffect(() => {
    const hasTitle = title.trim().length > 0;
    const hasImages = images.length > 0;

    if (isNewForm) {
      // For new form, enabling submit btn if title and at least one image exist
      setIsSubmitEnabled(hasTitle && hasImages);
    } else {
      // for updates, check for changes in title or images
      const titleChanged = title.trim() !== labTestResult?.title?.trim();
      const backendImageUris = labTestResult?.labResultImages || [];
      const currentImageUris = images.map((img) => img.uri);

      const imagesChanged =
        backendImageUris.length !== currentImageUris.length ||
        !backendImageUris.every((uri) => currentImageUris.includes(uri));

      setIsSubmitEnabled(titleChanged || imagesChanged);
    }
  }, [title, images, labTestResult, isNewForm]);

  // to pick images from the gallery
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
            fileName: asset.fileName || `gallery_${Date.now()}`,
          }));

          const existingUris = images.map((img) => img.uri);
          const newGalleryImages = selectedImages.filter(
            (img) => !existingUris.includes(img.uri)
          );

          if (newGalleryImages.length > 0) {
            setNewImages((prev) => [...prev, ...newGalleryImages]);
            setImages((prev) => [...prev, ...newGalleryImages]);
          }
        }
      }
    );
  };

  // camera
  const handleCapture = (uri) => {
    const newImage = { uri, fileName: `camera_${Date.now()}` };
    setNewImages((prev) => [...prev, newImage]);
    setImages((prev) => [...prev, newImage]);
    setShowCamera(false);
  };

  // to remove an image
  const removeImage = (index) => {
    const imageToRemove = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (newImages.some((img) => img.uri === imageToRemove.uri)) {
      setNewImages((prevNewImages) =>
        prevNewImages.filter((img) => img.uri !== imageToRemove.uri)
      );
    }

    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(Math.max(updatedImages.length - 1, 0));
    }
    setIsSubmitEnabled(title.trim() !== "" && newImages.length > 0);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please provide a title for the lab test result.");
      return;
    }

    try {
      await dispatch(
        createOrUpdateLabTestResultActionCreator(
          title,
          images,
          labTestResult?.id || null
        )
      );
      Alert.alert("Success", "Your lab test result has been submitted.");
      dispatch(getLabTestResultsActionCreator());
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  if (submitLoading) return <Loader />;

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
      <View className="flex-1">
        <View className="space-y-8 p-4 flex-1">
          {/* Title Input */}
          <CustomInput
            label="Enter Test Title"
            placeholder="Lab Test Title"
            value={title}
            onChangeText={setTitle}
            editable={true}
          />

          {/* Images Container */}
          <View className="rounded-2xl flex-1">
            <View className="p-2 border-dashed border-2 rounded-lg flex justify-center items-center w-full border-primary">
              {isImageLoading && images.length > 0 && (
                <ActivityIndicator
                  size="medium"
                  color={theme.colors.primary}
                  style={{ position: "absolute" }}
                />
              )}
              {images.length > 0 ? (
                <View className="relative w-full h-full bg-darkSecondary">
                  <Image
                    source={{ uri: images[currentIndex]?.uri }}
                    className="w-full h-full rounded-lg"
                    resizeMode="contain"
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {!images[currentIndex]?.isBackend && (
                    <TouchableOpacity
                      onPress={() => removeImage(currentIndex)}
                      className="absolute right-0 top-0 bg-white rounded-full"
                    >
                      <Ionicons
                        name="close-circle"
                        size={35}
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                  )}

                  {/* Plus Icon for adding more images */}
                  {images.length > 0 && (
                    <TouchableOpacity
                      onPress={pickImagesFromGallery}
                      className="flex items-center absolute right-0 bottom-0"
                    >
                      <Ionicons
                        name="add-circle"
                        size={35}
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                  )}

                  {/* Previous Image */}
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  >
                    <Ionicons
                      name="chevron-back-circle"
                      size={40}
                      color={
                        currentIndex === 0
                          ? theme.colors.darkSecondary
                          : theme.colors.primary
                      }
                    />
                  </TouchableOpacity>

                  {/* Next Image */}
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, images.length - 1)
                      )
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  >
                    <Ionicons
                      name="chevron-forward-circle"
                      size={40}
                      color={
                        currentIndex === images.length - 1
                          ? theme.colors.darkSecondary
                          : theme.colors.primary
                      }
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                  <TouchableOpacity
                    className="items-center justify-center h-full w-full"
                    onPress={pickImagesFromGallery}
                  >
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
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between px-4 mt-4 space-x-3">
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
    </ScreenContainer>
  );
};

export default UploadLabTestResult;
