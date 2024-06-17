import React, { useState } from "react";
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
import getImageData from "../../utils/getImageData";
import { uploadData } from "aws-amplify/storage";

function DoctorProfile() {
    const { loading, doctor, error } = useSelector(
        (state) => state.doctorGetReducer
    );

    const dispatch = useDispatch();

    const [pageIndex, setPageIndex] = useState(0);
    const [doctorData, setDoctorData] = useState({});
    const [imageData, setImageData] = useState(null);

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
        }

        // setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    const goToPreviousForm = (formData) => {
        if (formData) {
            setDoctorData((prevData) => ({
                ...prevData,
                ...formData,
            }));
        }
        setPageIndex((prevPageIndex) => prevPageIndex - 1);
    };

    const handleSubmit = (finalDoctorData) => {
        const doctorDetails = {
            ...doctorData,
            ...finalDoctorData,
        };

        if (doctor) {
            dispatch(
                updateDoctorActionCreator(
                    doctorDetails,
                    imageData,
                    doctor._version
                )
            );
        } else {
            dispatch(createDoctorActionCreator(doctorDetails, imageData));
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <ScreenContainer>
            {pageIndex === 0 && (
                <DoctorProfileForm1
                    handlePressNext={goToNextForm}
                    initialData={doctor || {}}
                />
            )}
            {pageIndex === 1 && (
                <DoctorProfileForm2
                    handlePressNext={goToNextForm}
                    handlePressBack={goToPreviousForm}
                    initialData={doctor || {}}
                />
            )}
            {pageIndex === 2 && (
                <DoctorProfileForm3
                    handlePressSubmit={handleSubmit}
                    handlePressBack={goToPreviousForm}
                    initialData={doctor || {}}
                />
            )}
        </ScreenContainer>
    );
}

export default DoctorProfile;
