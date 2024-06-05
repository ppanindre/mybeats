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
} from "../types/patientActionTypes";
import { createPatient, updatePatient } from "../../src/graphql/mutations";
import { getPatient } from "../../src/graphql/queries";

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
            const email = auth().currentUser.email;

            const response = await client.graphql({
                query: updatePatient,
                variables: {
                    input: {
                        id: patientId,
                        firstname: patientDetails.firstName,
                        lastname: patientDetails.lastName,
                        email: email,
                        phoneNumber: "123-456-7890",
                        address: "123 Main St",
                        zipcode: "12345",
                    },
                },
            });

            dispatch({
                type: PATIENT_UPDATE_SUCCESS,
                payload: response.data.updatePatient,
            });
        } catch (error) {
            console.error("Error while upadting patient", error);
            dispatch({
                type: PATIENT_UPDATE_FAILURE,
                payload: error.message || "Error while creating patient",
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
