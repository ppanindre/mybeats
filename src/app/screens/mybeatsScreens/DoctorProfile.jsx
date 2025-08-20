import React, { useState, useEffect } from "react";
import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import Loader from "../../components/Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctorActionCreator,
  updateDoctorActionCreator,
} from "../../../../store/actions/doctorActions";
import { fetchPrimarySpecializations } from "../../../../store/actions/primarySpecializationActions";
import { fetchSecondarySpecializations } from "../../../../store/actions/secondarySpecializationActions";
import getImageData from "../../utils/getImageData";
import { uploadData, getUrl } from "aws-amplify/storage";
import { Alert } from "react-native";

function DoctorProfile() {
  const { doctor, loading, error } = useSelector(
    (state) => state.doctorGetReducer
  );
  const { specializations } = useSelector(
    (state) => state.primarySpecializationReducer
  );

  const { secondarySpecializations } = useSelector(
    (state) => state.secondarySpecializationReducer
  );

  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(0);
  const [doctorData, setDoctorData] = useState(doctor || {});
  const [imageData, setImageData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchPrimarySpecializations());
     dispatch(fetchSecondarySpecializations());
  }, [dispatch]);

  const goToNextForm = async (formData, imageUri) => {
    setDoctorData((prevData) => ({
      ...prevData,
      ...formData,
    }));

    if (imageUri) {
      const fileData = await getImageData(imageUri);

      const result = await uploadData({
        key: "album/2024/1.jpg",
        data: fileData,
        options: {
          accessLevel: "guest",
        },
      }).result;

      console.log("succeeded", result);
      setImageData(result.key); // key
    }

    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  const goToPreviousForm = (formData) => {
    setDoctorData((prevData) => ({
      ...prevData,
      ...formData,
    }));
    setPageIndex((prevPageIndex) => prevPageIndex - 1);
  };

  const handleSubmit = async (finalDoctorData) => {
    setIsSubmitting(true);

    const doctorDetails = {
        ...doctorData,
        ...finalDoctorData,
    };

    console.log("Submitting Doctor Data:", doctorDetails); 

    try {
        let message = "";
        console.log("doctor", doctor)

        if (doctor) {
            message = await dispatch(
                updateDoctorActionCreator(doctorDetails, imageData, doctor._version)
            );
        } else {


            message = await dispatch(
                createDoctorActionCreator(doctorDetails, imageData)
            );
        }
        Alert.alert("Doctor Profile Updated", message);
    } catch (error) {
        Alert.alert("Error", "Failed to update the doctor profile.");
    }
    finally {
        setIsSubmitting(false); 
      }
};


  if (loading || isSubmitting) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      {pageIndex === 0 && (
        <DoctorProfileForm1
          handlePressNext={goToNextForm}
          initialData={doctorData}
        />
      )}
      {pageIndex === 1 && (
        <DoctorProfileForm2
          handlePressNext={goToNextForm}
          handlePressBack={goToPreviousForm}
          initialData={doctorData}
          specializations={specializations}
          secondarySpecializations={secondarySpecializations}
        />
      )}
      {pageIndex === 2 && (
        <DoctorProfileForm3
          handlePressSubmit={handleSubmit}
          handlePressBack={goToPreviousForm}
          initialData={doctorData}
        />
      )}
    </ScreenContainer>
  );
}

export default DoctorProfile;
