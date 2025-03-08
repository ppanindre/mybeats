import {
    DOCTOR_CREATE_REQUEST,
    DOCTOR_CREATE_SUCCESS,
    DOCTOR_CREATE_FAILURE,
    DOCTOR_GET_REQUEST,
    DOCTOR_GET_SUCCESS,
    DOCTOR_GET_FAILURE,
    DOCTOR_LIST_FAILURE,
    DOCTOR_LIST_SUCCESS,
    DOCTOR_LIST_REQUEST,
    DOCTOR_UPDATE_FAILURE,
    DOCTOR_UPDATE_REQUEST,
    DOCTOR_UPDATE_SUCCESS,
} from "../types/doctorActionTypes";
import { createDoctor, updateDoctor } from "../../src/graphql/mutations";
import { getDoctor, listDoctors } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";

const client = generateClient();

export const createDoctorActionCreator =
    (doctorDetails, imageData) => async (dispatch, getState) => {
        try {
            const user = getState().UserReducer;
            const doctorId = user.userId;

            // latest version of the doctor
            const fetchResponse = await client.graphql({
                query: getDoctor,
                variables: { doctorID: doctorId },
            });
            const latestDoctor = fetchResponse.data.getDoctor;
            const latestVersion = latestDoctor._version;

             //  existing specializations from Redux 
             const { secondarySpecializations } = getState().secondarySpecializationReducer;

             let secondarySpecializationIds = [];
 
             if (Array.isArray(doctorDetails.secondarySpecialization)) {
                 // converting names to IDs using redux
                 secondarySpecializationIds = doctorDetails.secondarySpecialization
                     .map(specName => {
                         const matchingSpec = secondarySpecializations.find(spec => spec.name === specName);
                         return matchingSpec ? matchingSpec.id : null;
                     })
                     .filter(id => id !== null); // to remve invalid/missing IDs
             } else if (typeof doctorDetails.secondarySpecialization === "string") {
                 // Handle semicolon-separated string of names 
                 secondarySpecializationIds = doctorDetails.secondarySpecialization
                     .split(";")
                     .map(specName => {
                         const matchingSpec = secondarySpecializations.find(spec => spec.name.trim() === specName.trim());
                         return matchingSpec ? matchingSpec.id : null;
                     })
                     .filter(id => id !== null);
             }


            dispatch({ type: DOCTOR_CREATE_REQUEST });

            const response = await client.graphql({
                query: createDoctor,
                variables: {
                    input: {
                        doctorID: doctorId,
                        firstname: doctorDetails.firstName,
                        lastname: doctorDetails.lastName,
                        email: doctorDetails.email,
                        phoneNumber: doctorDetails.phoneNumber,
                        licenseNumber: doctorDetails.licenseNumber,
                        address: doctorDetails.address,
                        city: doctorDetails.city,
                        state: doctorDetails.state,
                        experience: doctorDetails.experience,
                        primarySpecializationId: doctorDetails.primarySpecializationId,
                        secondarySpecializationIds: secondarySpecializationIds.length > 0 ? secondarySpecializationIds : null,
                        upiId: doctorDetails.upiId,
                        availableForVideoConsultation:
                            doctorDetails.availableForVideoConsultation,
                        feeForVideoConsultation:
                            doctorDetails.feeForVideoConsultation,
                        educationExperience: doctorDetails.educationExperience,
                        awardsRecognition: doctorDetails.awardsRecognition,
                        website: doctorDetails.website,
                        zipcode: doctorDetails.zipcode,
                        _version: latestVersion,
                    },
                },
            });

            dispatch({
                type: DOCTOR_CREATE_SUCCESS,
                payload: response.data.createDoctor,
            });
        } catch (error) {
            console.error("Error while creating doctor", error);
            dispatch({
                type: DOCTOR_CREATE_FAILURE,
                payload: error.message || "Error while creating doctor",
            });
        }
    };

    export const updateDoctorActionCreator =
    (doctorDetails, imageData, version) => async (dispatch, getState) => {
        try {
            dispatch({ type: DOCTOR_UPDATE_REQUEST });

            const user = getState().UserReducer;
            const doctorId = user.userId;

            // latest version of the doctor
            const fetchResponse = await client.graphql({
                query: getDoctor,
                variables: { doctorID: doctorId },
            });
            const latestDoctor = fetchResponse.data.getDoctor;
            const latestVersion = latestDoctor._version;

            // Convert secondary specialization names to IDs
            const { secondarySpecializations } = getState().secondarySpecializationReducer;

            let secondarySpecializationIds = doctorDetails.secondarySpecializationIds || [];
            if (Array.isArray(doctorDetails.secondarySpecialization)) {
                secondarySpecializationIds = doctorDetails.secondarySpecialization
                    .map(specName => {
                        const matchingSpec = secondarySpecializations.find(spec => spec.name === specName);
                        return matchingSpec ? matchingSpec.id : null;
                    })
                    .filter(id => id !== null);
            }

            console.log("🟢 Final Data Sent to AWS:", {
                doctorID: doctorId,
                primarySpecializationId: doctorDetails.primarySpecializationId,
                secondarySpecializationIds: secondarySpecializationIds.length > 0 ? secondarySpecializationIds : [],
                _version: latestVersion,
            });

            const response = await client.graphql({
                query: updateDoctor,
                variables: {
                    input: {
                        doctorID: doctorId,
                        firstname: doctorDetails.firstName,
                        lastname: doctorDetails.lastName,
                        email: doctorDetails.email,
                        phoneNumber: doctorDetails.phoneNumber,
                        licenseNumber: doctorDetails.licenseNumber,
                        address: doctorDetails.address,
                        city: doctorDetails.city,
                        state: doctorDetails.state,
                        experience: doctorDetails.experience,
                        primarySpecializationId: doctorDetails.primarySpecializationId,
                        secondarySpecializationIds: secondarySpecializationIds.length > 0 ? secondarySpecializationIds : [],
                        upiId: doctorDetails.upiId,
                        availableForVideoConsultation: doctorDetails.availableForVideoConsultation,
                        feeForVideoConsultation: doctorDetails.feeForVideoConsultation,
                        educationExperience: doctorDetails.educationExperience,
                        awardsRecognition: doctorDetails.awardsRecognition,
                        website: doctorDetails.website,
                        zipcode: doctorDetails.zipcode,
                        _version: latestVersion,
                    },
                },
            });


            dispatch({
                type: DOCTOR_UPDATE_SUCCESS,
                payload: response.data.updateDoctor,
            });
        } catch (error) {
            console.error("AWS UpdateDoctor Error:", error);
            dispatch({ type: DOCTOR_UPDATE_FAILURE, payload: error });
        }
    };


export const listDoctorsActionCreator = () => async (dispatch) => {
    try {
        dispatch({ type: DOCTOR_LIST_REQUEST });

        const response = await client.graphql({
            query: listDoctors,
        });

        dispatch({
            type: DOCTOR_LIST_SUCCESS,
            payload: response.data.listDoctors.items,
        });
    } catch (error) {
        console.error("Error while getting doctors", error);
        dispatch({ type: DOCTOR_LIST_FAILURE, payload: error });
    }
};

export const getDoctorActionCreator = () => async (dispatch, getState) => {
    try {
        const user = getState().UserReducer;
        const doctorId = user.userId;

        dispatch({ type: DOCTOR_GET_REQUEST });

        const response = await client.graphql({
            query: getDoctor,
            variables: { doctorID: doctorId },
        });

        const doctorData = response.data.getDoctor;

        console.log("🟢 Fetched Doctor Data:", doctorData);

        // Fetch all specializations from Redux
        const { secondarySpecializations } = getState().secondarySpecializationReducer;

        // Map secondary specialization IDs to names
        const mappedSecondarySpecializations = (doctorData.secondarySpecializationIds || []).map(id => {
            const matchedSpec = secondarySpecializations.find(spec => spec.id === id);
            return matchedSpec ? { id, name: matchedSpec.name } : { id, name: "Unknown" };
        });

        // Updated doctor data with mapped secondary specializations
        const updatedDoctorData = {
            ...doctorData,
            secondarySpecializations: mappedSecondarySpecializations, // Replace IDs with name objects
        };

        console.log("🟢 Updated Doctor Data with Mapped Secondary Specializations:", updatedDoctorData);

        dispatch({
            type: DOCTOR_GET_SUCCESS,
            payload: updatedDoctorData,
        });

    } catch (error) {
        console.error("Error while fetching doctor details", error);
        dispatch({
            type: DOCTOR_GET_FAILURE,
            payload: error.message || "Error while fetching doctor details",
        });
    }
};