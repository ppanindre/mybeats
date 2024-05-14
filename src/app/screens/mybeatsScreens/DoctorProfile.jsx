import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import { createDoctor } from "../../../graphql/mutations";
import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import ScreenContainer from "../../components/Containers/ScreenContainer";

function DoctorProfile() {
    const client = generateClient();

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

    const handleSubmit = async () => {
        try {
            console.log("doctor data", doctorData);
            const response = await client.graphql({
                query: createDoctor,
                variables: {
                    input: {
                        doctorID: "4",
                        email: doctorData.email,
                        firstname: doctorData.firstName,
                        lastname: doctorData.lastName,
                        zipcode: doctorData.zipcode,
                    },
                },
            });

            console.log("response", response);

        } catch (error) {
            console.error("Error while creating doctor", error);
        }
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
