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
    PRESCRIPTION_DELETE_REQUEST,
    PRESCRIPTION_DELETE_SUCCESS,
    PRESCRIPTION_DELETE_FAILURE,
} from "../types/prescriptionActionTypes";
import { createPrescription } from "../../src/graphql/mutations";
import { getPrescription, listPrescriptions } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { deletePrescription } from "../../src/graphql/mutations";

const client = generateClient();

export const createDoctorPrescriptionActionCreator = (prescriptionDetails, appointmentID, patientID) => async (dispatch, getState) => {
    try {
        const user = getState().UserReducer;
        const doctorId = user.userId;

        dispatch({ type: PRESCRIPTION_CREATE_REQUEST });

        if (!Array.isArray(prescriptionDetails)) {
            prescriptionDetails = [prescriptionDetails];
        }

        const response = await Promise.all(
            prescriptionDetails.map(prescription => {
                console.log("Prescription:", {
                    doctorID: doctorId,
                    medicineName: prescription.name,
                    type: prescription.type,
                    dosage: prescription.period,
                    days: prescription.days,
                    dosageQuantity: prescription.meals,
                    startDate: prescription.startDate,
                    endDate: prescription.endDate,
                    patientID: patientID,
                    appointmentID: appointmentID,
                });

                return client.graphql({
                    query: createPrescription,
                    variables: {
                        input: {
                            doctorID: doctorId,
                            medicineName: prescription.name,
                            type: prescription.type,
                            dosage: prescription.period,
                            days: prescription.days,
                            dosageQuantity: prescription.meals,
                            startDate: prescription.startDate,
                            endDate: prescription.endDate,
                            patientID: patientID,
                            appointmentID: appointmentID,
                        },
                    },
                });
            })
        );

        dispatch({
            type: PRESCRIPTION_CREATE_SUCCESS,
            payload: response.map(res => res.data.createPrescription),
        });
    } catch (error) {
        console.error("Error while creating doctor prescription", error);
        dispatch({
            type: PRESCRIPTION_CREATE_FAILURE,
            payload: error.message || "Error while creating doctor prescription",
        });
    }
};



export const getDoctorPrescriptionActionCreator = (prescriptionId) => async (dispatch) => {
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
        console.error("Error while fetching doctor prescription", error);
        dispatch({
            type: PRESCRIPTION_GET_FAILURE,
            payload: error.message || "Error while fetching doctor prescription",
        });
    }
};

export const listDoctorPrescriptionsByAppointmentActionCreator = (appointmentID) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_LIST_REQUEST });

        const response = await client.graphql({
            query: listPrescriptions,
            variables: { filter: { appointmentID: { eq: appointmentID } } },
        });

        const prescriptions = response.data.listPrescriptions.items.filter(
            (prescription) => !prescription._deleted
        );

        dispatch({
            type: PRESCRIPTION_LIST_SUCCESS,
            payload: prescriptions,
        });
    } catch (error) {
        console.error("Error while listing prescriptions for appointment", error);
        dispatch({ type: PRESCRIPTION_LIST_FAILURE, payload: error });
    }
};

export const deleteDoctorPrescriptionActionCreator = (prescriptionId, version) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_DELETE_REQUEST });

        const response = await client.graphql({
            query: deletePrescription,
            variables: { input: { id: prescriptionId, _version: version } }, 
        });

        if (response.data.deletePrescription) {
            dispatch({
                type: PRESCRIPTION_DELETE_SUCCESS,
                payload: prescriptionId, 
            });
            return { success: true };
        } else {
            throw new Error("Deletion unsuccessful");
        }
    } catch (error) {
        console.error("Error while deleting doctor prescription", error);
        dispatch({
            type: PRESCRIPTION_DELETE_FAILURE,
            payload: error.message || "Error while deleting doctor prescription",
        });
        return { success: false };
    }
};
