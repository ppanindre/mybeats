import {
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    PRESCRIPTION_CREATE_FAILURE,
    PRESCRIPTION_GET_REQUEST,
    PRESCRIPTION_GET_SUCCESS,
    PRESCRIPTION_GET_FAILURE,
    PRESCRIPTION_LIST_REQUEST,
    PRESCRIPTION_LIST_SUCCESS,
    PRESCRIPTION_LIST_FAILURE,
} from "../types/prescriptionActionTypes";
import { createPrescription } from "../../src/graphql/mutations";
import { getPrescription, listPrescriptions } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const createPrescriptionActionCreator = (prescriptionDetails) => async (dispatch, getState) => {
    try {
        const user = getState().UserReducer;
        const doctorId = user.userId;

        dispatch({ type: PRESCRIPTION_CREATE_REQUEST });

        if (!Array.isArray(prescriptionDetails)) {
            prescriptionDetails = [prescriptionDetails];
        }

        const response = await Promise.all(
            prescriptionDetails.map(prescription => 
                client.graphql({
                    query: createPrescription,
                    variables: {
                        input: {
                            doctorID: doctorId,
                            medicineName: prescription.medicineName,
                            type: prescription.type,
                            dosage: prescription.dosage,
                            days: prescription.days,
                            dosageQuantity: prescription.dosageQuantity,
                            startDate: prescription.startDate,
                            endDate: prescription.endDate,
                            patientID: prescription.patientID, 
                        },
                    },
                })
            )
        );

        dispatch({
            type: PRESCRIPTION_CREATE_SUCCESS,
            payload: response.map(res => res.data.createPrescription),
        });
    } catch (error) {
        console.error("Error while creating prescription", error);
        dispatch({
            type: PRESCRIPTION_CREATE_FAILURE,
            payload: error.message || "Error while creating prescription",
        });
    }
};

export const getPrescriptionActionCreator = (prescriptionId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRESCRIPTION_GET_REQUEST });

        const response = await client.graphql({
            query: getPrescription,
            variables: {
                id: prescriptionId,
            },
        });

        dispatch({
            type: PRESCRIPTION_GET_SUCCESS,
            payload: response.data.getPrescription,
        });
    } catch (error) {
        console.error("Error while fetching prescription", error);
        dispatch({
            type: PRESCRIPTION_GET_FAILURE,
            payload: error.message || "Error while fetching prescription",
        });
    }
};

export const listPrescriptionsActionCreator = () => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_LIST_REQUEST });

        const response = await client.graphql({
            query: listPrescriptions,
        });

        dispatch({
            type: PRESCRIPTION_LIST_SUCCESS,
            payload: response.data.listPrescriptions.items,
        });
    } catch (error) {
        console.error("Error while listing prescriptions", error);
        dispatch({ type: PRESCRIPTION_LIST_FAILURE, payload: error });
    }
};
