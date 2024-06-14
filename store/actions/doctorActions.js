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
} from "../types/doctorActionTypes";
import { createDoctor } from "../../src/graphql/mutations";
import { getDoctor, listDoctors } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const createDoctorActionCreator =
    (doctorDetails, imageData) => async (dispatch, getState) => {
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

export const updateDoctorActionCreator = () => async (dispatch) => {
    try {
        dispatch({type: DOCTOR_UPDATE_REQUEST});

        

    } catch (error) {
        console.error("Error while updating doctor", error);
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
