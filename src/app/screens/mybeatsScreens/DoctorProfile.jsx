import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";

import { createDoctor } from "../../../graphql/mutations";
import { listSpecialties } from "../../../graphql/queries";
import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import ScreenContainer from "../../components/Containers/ScreenContainer";

function DoctorProfile() {
    const client = generateClient();

    const user = useSelector((state) => state.UserReducer);

    const [pageIndex, setPageIndex] = useState(0);
    const [doctorData, setDoctorData] = useState(null);
    const [specialties, setSpecialties] = useState([]);

    const goToNextForm = (formData) => {
        setDoctorData({
            ...doctorData,
            ...formData,
        });

        setPageIndex(pageIndex + 1);
    };

    const goToPreviousForm = () => {
        setPageIndex(pageIndex - 1);
    };

    const handleSubmit = async (formData) => {
        const finalDoctorData = { ...doctorData, ...formData };
        try {
            const response = await client.graphql({
                query: createDoctor,
                variables: {
                    input: {
                        doctorID: "12",
                        email: finalDoctorData.email,
                        firstname: finalDoctorData.firstName,
                        lastname: finalDoctorData.lastName,
                        zipcode: finalDoctorData.zipcode,
                        address: finalDoctorData.address,
                        city: finalDoctorData.city,
                        licenseNumber: finalDoctorData.licenseNumber,
                        phoneNumber: finalDoctorData.phoneNumber,
                        upiId: finalDoctorData.upiId,
                        experience: finalDoctorData.experience,
                    },
                },
            });
            console.log('Doctor created successfully', response);
        } catch (error) {
            console.error("Error while creating doctor", error);
        }
    };

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await client.graphql({
                    query: listSpecialties,
                });
                const specialties = response.data.listSpecialties.items;
                setSpecialties(specialties.map(spec => ({ _id: spec.id, value: spec.name })));
            } catch (error) {
                console.error("Error fetching specialties", error);
            }
        };

        fetchSpecialties();
    }, []);

    return (
        <ScreenContainer>
            {pageIndex === 0 && (
                <DoctorProfileForm1 handlePressNext={goToNextForm} />
            )}
            {pageIndex === 1 && (
                <DoctorProfileForm2
                    handlePressNext={goToNextForm}
                    handlePressBack={goToPreviousForm}
                    specialties={specialties}
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
