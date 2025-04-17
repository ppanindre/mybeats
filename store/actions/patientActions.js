import auth from "@react-native-firebase/auth";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";

import {
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAILURE,
    PATIENT_GET_REQUEST,
    PATIENT_GET_FAILURE,
    PATIENT_GET_SUCCESS,
    PATIENT_CREATE_FAILURE,
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAILURE,
} from "../types/patientActionTypes";
import { createPatient, updatePatient } from "../../src/graphql/mutations";
import { getPatient } from "../../src/graphql/queries";
import { listPatients } from "../../src/graphql/queries";
import { listAppointments } from "../../src/graphql/queries";

const client = generateClient();
const uriToBlob = async (uri) => {
    try {
        const response = await fetch(uri);
        return await response.blob();
    } catch (error) {
        console.error("URI to Blob error", error);
        throw error;
    }
};

export const createPatientActionCreator =
    (patientDetails) => async (dispatch) => {
        try {
            dispatch({ type: PATIENT_CREATE_REQUEST });

            const patientId = auth().currentUser.uid;
            const email = auth().currentUser.email;

            let profileImageUrl = null;
            if (patientDetails.profileImageUri) {
                const blob = await uriToBlob(patientDetails.profileImageUri);
                const extension = patientDetails.profileImageUri.split(".").pop();
                const fileName = `patients/${patientId}/profile_${Date.now()}.${extension}`;
                const result = await uploadData({
                    key: fileName,
                    data: blob,
                    options: { accessLevel: "public" },
                }).result;

                console.log("Upload success:", result.key);
                profileImageUrl = `https://mybeats-profile-images21f51-stabledev.s3.amazonaws.com/public/${result.key}`;
            }

            const response = await client.graphql({
                query: createPatient,
                variables: {
                    input: {
                        id: patientId,
                        firstname: patientDetails.firstName,
                        lastname: patientDetails.lastName,
                        email: email,
                        phoneNumber: "123-456-7890",
                        address: "123 Main St",
                        zipcode: "12345",
                        age: patientDetails.age,
                        weight: patientDetails.weight,
                        height: patientDetails.height,
                        profileImage: profileImageUrl,
                        ProfessionList: patientDetails.selectedProfessionList || [],
                        underlyingConditionsList: patientDetails.selectedConditionsList || [],
                        otherCondition: patientDetails.otherCondition || null,
                    },
                },
            });


            dispatch({
                type: PATIENT_CREATE_SUCCESS,
                payload: response.data.createPatient,
            });
        } catch (error) {
            console.error("Error while creating patient", error);
            dispatch({
                type: PATIENT_CREATE_FAILURE,
                payload: error.message || "Error while creating patient",
            });
        }
    };

export const updatePatientActionCreator =
    (patientDetails) => async (dispatch) => {
        try {
            dispatch({ type: PATIENT_UPDATE_REQUEST });

            const patientId = auth().currentUser.uid;
            const existingPatientResponse = await client.graphql({
                query: getPatient,
                variables: { id: patientId },
            });

            const existingPatient = existingPatientResponse.data.getPatient;
            let profileImageUrl = existingPatient.profileImage;

            if (patientDetails.profileImageUri) {
                const blob = await uriToBlob(patientDetails.profileImageUri);
                const extension = patientDetails.profileImageUri.split(".").pop();
                const fileName = `patients/${patientId}/profile_${Date.now()}.${extension}`;
                const result = await uploadData({
                    key: fileName,
                    data: blob,
                    options: { accessLevel: "public" },
                }).result;
                profileImageUrl = `https://mybeats-profile-images21f51-stabledev.s3.amazonaws.com/public/${result.key}`;
            }

            let response;

            if (existingPatient) {
                response = await client.graphql({
                    query: updatePatient,
                    variables: {
                        input: {
                            id: patientId,
                            firstname: patientDetails.firstName,
                            lastname: patientDetails.lastName,
                            email: existingPatient.email,
                            phoneNumber: "123-456-7890",
                            address: "123 Main St",
                            zipcode: "12345",
                            age: patientDetails.age,
                            weight: patientDetails.weight,
                            height: patientDetails.height,
                            profileImage: profileImageUrl,
                            professionList: patientDetails.professionList || [],
                            underlyingConditionsList: patientDetails.underlyingConditionsList || [],                            
                            otherCondition: patientDetails.otherCondition || null,
                            _version: existingPatient._version,
                        },
                    },
                });

                dispatch({
                    type: PATIENT_UPDATE_SUCCESS,
                    payload: response.data.updatePatient,
                });
            }
        } catch (error) {
            console.error("Error while updating or creating patient", error);
            dispatch({
                type: PATIENT_UPDATE_FAILURE,
                payload: error.message || "Error while updating or creating patient",
            });
        }
    };

    export const getPatientActionCreator = () => async (dispatch, getState) => {
        try {
            const user = getState().UserReducer;
            const patientId = user.userId;
    
            dispatch({ type: PATIENT_GET_REQUEST });
    
            const response = await client.graphql({
                query: getPatient,
                variables: { id: patientId },
            });
    
            const patient = response.data.getPatient;
    
            if (!patient) {
                dispatch({
                    type: PATIENT_GET_SUCCESS,
                    payload: null,
                });
                return;
            }
    
            dispatch({
                type: PATIENT_GET_SUCCESS,
                payload: patient,
            });
        } catch (error) {
            console.error("Error while fetching patient details", error);
            dispatch({
                type: PATIENT_GET_FAILURE,
                payload: error.message || "Error while fetching patient details",
            });
        }
    };
    
export const listPatientsActionCreator = () => async (dispatch, getState) => {
    dispatch({ type: PATIENT_LIST_REQUEST });
    try {
        const state = getState();
        const doctorID = state.UserReducer.userId; // current doctor's ID

        // all appointments for the doctor
        const appointmentsResponse = await client.graphql({
            query: listAppointments,
            variables: { filter: { doctorID: { eq: doctorID }, isBooked: { eq: true } } },
        });

        const appointments = appointmentsResponse.data.listAppointments.items;

        //  unique patient IDs from appointments
        const patientIds = [...new Set(appointments.map((appointment) => appointment.patientId))];

        // all patients
        const allPatientsResponse = await client.graphql({
            query: listPatients,
        });

        const allPatients = allPatientsResponse.data.listPatients.items;

        // Step 4: filtering patients having appointments with the current doctor
        const filteredPatients = allPatients.filter((patient) =>
            patientIds.includes(patient.id)
        );

        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload: filteredPatients,
        });
    } catch (error) {
        console.error("Error while getting patients", error);
        dispatch({
            type: PATIENT_LIST_FAILURE,
            payload: error.message || "Error while getting patients",
        });
    }
};
