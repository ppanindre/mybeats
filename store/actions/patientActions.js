import auth from "@react-native-firebase/auth";
import { generateClient } from "aws-amplify/api";

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

const client = generateClient();

export const createPatientActionCreator =
    (patientDetails) => async (dispatch) => {
        try {
            dispatch({ type: PATIENT_CREATE_REQUEST });

            const patientId = auth().currentUser.uid;
            const email = auth().currentUser.email;

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
                    },
                },
            });

            console.log("response", response.data.createPatient);

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

            // Checking if the patient exists
            const existingPatientResponse = await client.graphql({
                query: getPatient,
                variables: { id: patientId },
            });

            const existingPatient = existingPatientResponse.data.getPatient;

            let response;

            if (existingPatient) {
                // If patient exists, update the details 
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
                            _version: existingPatient._version, 
                        },
                    },
                });

                dispatch({
                    type: PATIENT_UPDATE_SUCCESS,
                    payload: response.data.updatePatient,
                });
            } else {
                // If the patient does not exist, create the patient
                response = await client.graphql({
                    query: createPatient,
                    variables: {
                        input: {
                            id: patientId,
                            firstname: patientDetails.firstName,
                            lastname: patientDetails.lastName,
                            email: auth().currentUser.email,
                            phoneNumber: "123-456-7890",
                            address: "123 Main St",
                            zipcode: "12345",
                            age: patientDetails.age,
                            weight: patientDetails.weight,
                            height: patientDetails.height,
                            profession: patientDetails.profession,
                            underlyingCondition: patientDetails.underlyingCondition,
                        },
                    },
                });

                dispatch({
                    type: PATIENT_CREATE_SUCCESS,
                    payload: response.data.createPatient,
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
            variables: {
                id: patientId,
            },
        });

        dispatch({
            type: PATIENT_GET_SUCCESS,
            payload: response.data.getPatient,
        });
    } catch (error) {
        console.error("Error while fetching patient details", error);
        dispatch({
            type: PATIENT_GET_FAILURE,
            payload: error.message || "Error while fetching patient details",
        });
    }
};

export const listPatientsActionCreator = () => async (dispatch) => {
    dispatch({ type: PATIENT_LIST_REQUEST });
    try {
        const response = await client.graphql({
            query: listPatients
        });
        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload: response.data.listPatients.items
        });
    } catch (error) {
        console.error("Error while getting patients", error);
        dispatch({
            type: PATIENT_LIST_FAILURE,
            payload: error.message || "Error while getting patients"
        });
    }
};
