import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";

import { createDoctor, updateDoctor } from "../../../graphql/mutations";
import { listSpecialties, getDoctor } from "../../../graphql/queries";
import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import ScreenContainer from "../../components/Containers/ScreenContainer";

function DoctorProfile() {
    const client = generateClient();
    const user = useSelector((state) => state.UserReducer);

    const [pageIndex, setPageIndex] = useState(0);
    const [doctorData, setDoctorData] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const goToNextForm = (formData) => {
        setDoctorData((prevData) => ({
            ...prevData,
            ...formData,
        }));
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
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

    const fetchDoctorData = async () => {
        try {
            const response = await client.graphql({
                query: getDoctor,
                variables: { doctorID: "18" },
            });
            const doctor = response.data.getDoctor;
            if (doctor) {
                const fetchedData = {
                    firstName: doctor.firstname,
                    lastName: doctor.lastname,
                    phoneNumber: doctor.phoneNumber,
                    licenseNumber: doctor.licenseNumber,
                    upiId: doctor.upiId,
                    address: doctor.address,
                    city: doctor.city,
                    zipcode: doctor.zipcode,
                    primarySpecialization: doctor.primarySpecializationId,
                    secondarySpecialization: doctor.secondarySpecialization,
                    availableForVideoConsultation: doctor.availableForVideoConsultation,
                    feeForVideoConsultation: doctor.feeForVideoConsultation,
                    experience: doctor.experience,
                    educationExperience: doctor.educationExperience,
                    awardsRecognition: doctor.awardsRecognition,
                    website: doctor.website,
                };
                setDoctorData(fetchedData);
            } else {
                console.log('Doctor not found');
            }
        } catch (error) {
            console.error("Error fetching doctor data", error);
        } finally {
            setLoading(false); // Setting loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchDoctorData();
    }, []);

    const handleSubmit = async (formData) => {
        const finalDoctorData = { ...doctorData, ...formData, doctorID: "19" };

        try {
            const existingDoctorResponse = await client.graphql({
                query: getDoctor,
                variables: { doctorID: finalDoctorData.doctorID },
            });

            const existingDoctor = existingDoctorResponse.data.getDoctor;

            if (existingDoctor) {
                const response = await client.graphql({
                    query: updateDoctor,
                    variables: {
                        input: {
                            doctorID: existingDoctor.doctorID,
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
                            primarySpecializationId: finalDoctorData.primarySpecialization,
                            secondarySpecialization: finalDoctorData.secondarySpecialization,
                            availableForVideoConsultation: finalDoctorData.availableForVideoConsultation,
                            feeForVideoConsultation: finalDoctorData.feeForVideoConsultation,
                            educationExperience: finalDoctorData.educationExperience,
                            awardsRecognition: finalDoctorData.awardsRecognition,
                            website: finalDoctorData.website,
                            _version: existingDoctor._version,
                        },
                    },
                });
                console.log('Doctor updated successfully', response);
            } else {
                const response = await client.graphql({
                    query: createDoctor,
                    variables: {
                        input: {
                            doctorID: finalDoctorData.doctorID,
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
                            primarySpecializationId: finalDoctorData.primarySpecialization,
                            secondarySpecialization: finalDoctorData.secondarySpecialization,
                            availableForVideoConsultation: finalDoctorData.availableForVideoConsultation,
                            feeForVideoConsultation: finalDoctorData.feeForVideoConsultation,
                            educationExperience: finalDoctorData.educationExperience,
                            awardsRecognition: finalDoctorData.awardsRecognition,
                            website: finalDoctorData.website,
                        },
                    },
                });
                console.log('Doctor created successfully', response);
            }
        } catch (error) {
            console.error("Error while creating/updating doctor", error);
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

    if (loading) {
        return <ScreenContainer><Text>Loading...</Text></ScreenContainer>; // Show loading state
    }

    return (
        <ScreenContainer>
            {pageIndex === 0 && (
                <DoctorProfileForm1 handlePressNext={goToNextForm} initialData={doctorData} />
            )}
            {pageIndex === 1 && (
                <DoctorProfileForm2
                    handlePressNext={goToNextForm}
                    handlePressBack={goToPreviousForm}
                    specialties={specialties}
                    initialData={doctorData}
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
