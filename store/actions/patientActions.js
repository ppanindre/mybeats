import auth from "@react-native-firebase/auth";
import { generateClient } from "aws-amplify/api";

import {
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS,
    PATIENT_DETAILS_FAILURE,
} from "../types/patientActionTypes";
import { createPatient } from "../../src/graphql/mutations";

const client = generateClient();

export const createPatientActionCreator =
    (patientDetails) => async (dispatch) => {
        try {
            dispatch({ type: PATIENT_CREATE_REQUEST });

            console.log("patient details", patientDetails);

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
                type: PATIENT_DETAILS_FAILURE,
                payload: error.message || "Error while creating patient",
            });
        }
    };
