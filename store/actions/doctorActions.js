import {
    DOCTOR_CREATE_REQUEST,
    DOCTOR_CREATE_SUCCESS,
    DOCTOR_CREATE_FAILURE,
    DOCTOR_GET_REQUEST,
    DOCTOR_GET_SUCCESS,
    DOCTOR_GET_FAILURE,
} from "../types/doctorActionTypes";
import { createDoctor } from "../../src/graphql/mutations";
import { getDoctor } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const createDoctorActionCreator =
    (doctorDetails) => async (dispatch, getState) => {
        try {
            const user = getState().UserReducer;

            const doctorId = user.userId;

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
                        licenseNumber: doctorDetails.licenseNumber, // Ensure this field exists in doctorDetails
                        address: doctorDetails.address,
                        city: doctorDetails.city,
                        state: doctorDetails.state,
                        experience: doctorDetails.experience,
                        secondarySpecialization:
                            doctorDetails.secondarySpecialization,
                        upiId: doctorDetails.upiId,
                        availableForVideoConsultation:
                            doctorDetails.availableForVideoConsultation,
                        feeForVideoConsultation:
                            doctorDetails.feeForVideoConsultation,
                        educationExperience: doctorDetails.educationExperience,
                        awardsRecognition: doctorDetails.awardsRecognition,
                        website: doctorDetails.website,
                        zipcode: doctorDetails.zipcode,
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

export const getDoctorActionCreator = () => async (dispatch, getState) => {
    try {
        const user = getState().UserReducer;
        const doctorId = user.userId;

        dispatch({ type: DOCTOR_GET_REQUEST });

        const response = await client.graphql({
            query: getDoctor,
            variables: {
                doctorID: doctorId,
            },
        });

        dispatch({
            type: DOCTOR_GET_SUCCESS,
            payload: response.data.getDoctor,
        });
    } catch (error) {
        console.error("Error while fetching doctor details", error);
        dispatch({
            type: DOCTOR_GET_FAILURE,
            payload: error.message || "Error while fetching doctor details",
        });
    }
};
