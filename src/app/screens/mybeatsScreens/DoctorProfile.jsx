import React, { useState } from "react";
import { useSelector } from "react-redux";

import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import ScreenContainer from "../../components/Containers/ScreenContainer";

function DoctorProfile() {
    // Get user
    const user = useSelector((state) => state.UserReducer);

    // STATES
    const [pageIndex, setPageIndex] = useState(0);
    const [doctorData, setDoctorData] = useState(null);

    /**
     * function to handle when user clicks
     * on next
     */
    const goToNextForm = (formData) => {
        // unpack the form data and append the doctor data
        setDoctorData({
            ...doctorData,
            ...formData,
        });

        setPageIndex(pageIndex + 1);
    };

    /**
     * funtion to go back to the previous form
     */
    const goToPreviousForm = () => {
        setPageIndex(pageIndex - 1);
    };

    const handleSubmit = () => {
        console.log('doctor data', doctorData);
    };

    return (
        <ScreenContainer>
            {pageIndex === 0 && (
                <DoctorProfileForm1 handlePressNext={goToNextForm} />
            )}
            {pageIndex === 1 && (
                <DoctorProfileForm2
                    handlePressNext={goToNextForm}
                    handlePressBack={goToPreviousForm}
                />
            )}
            {pageIndex === 2 && (
                <DoctorProfileForm3
                    handlePressSubmit={handleSubmit}
                    handlePressBack={goToPreviousForm}
                />
            )}
        </ScreenContainer>
    );
}

export default DoctorProfile;
