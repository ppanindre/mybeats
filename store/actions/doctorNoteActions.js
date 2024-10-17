import { generateClient } from "aws-amplify/api";
import {
    DOCTOR_NOTE_CREATE_REQUEST,
    DOCTOR_NOTE_CREATE_SUCCESS,
    DOCTOR_NOTE_CREATE_FAILURE,
    DOCTOR_NOTE_GET_REQUEST,
    DOCTOR_NOTE_GET_SUCCESS,
    DOCTOR_NOTE_GET_FAILURE
} from "../types/doctorNoteActionTypes.js";
import { getAppointment } from "../../src/graphql/queries.js";
import { updateAppointment } from "../../src/graphql/mutations.js";

const client = generateClient();

// creating doctor notes
export const createDoctorNoteActionCreator = (appointmentId, doctorNotes) => async (dispatch) => {
    try {
        dispatch({ type: DOCTOR_NOTE_CREATE_REQUEST });

        const appointmentResponse = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });

        const appointment = appointmentResponse.data.getAppointment;

        // Add doctor notes to the appointment
        const response = await client.graphql({
            query: updateAppointment,
            variables: {
                input: {
                    id: appointmentId,
                    doctorNotes: doctorNotes,
                    _version: appointment._version, 
                },
            },
        });

        dispatch({
            type: DOCTOR_NOTE_CREATE_SUCCESS,
            payload: response.data.updateAppointment,
        });
    } catch (error) {
        console.error("Error creating doctor note", error);
        dispatch({
            type: DOCTOR_NOTE_CREATE_FAILURE,
            payload: error,
        });
    }
};

// fetching doctor notes for a specific appointment
export const getDoctorNoteActionCreator = (appointmentId) => async (dispatch) => {
    try {
        dispatch({ type: DOCTOR_NOTE_GET_REQUEST });

        const response = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });

        const doctorNotes = response.data.getAppointment.doctorNotes;

        dispatch({
            type: DOCTOR_NOTE_GET_SUCCESS,
            payload: doctorNotes,
        });
    } catch (error) {
        console.error("Error fetching doctor note", error);
        dispatch({
            type: DOCTOR_NOTE_GET_FAILURE,
            payload: error,
        });
    }
};