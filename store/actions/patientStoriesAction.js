import { generateClient } from "aws-amplify/api";
import {
    PATIENT_STORIES_LIST_BY_DOCTOR_REQUEST,
    PATIENT_STORIES_LIST_BY_DOCTOR_SUCCESS,
    PATIENT_STORIES_LIST_BY_DOCTOR_FAILURE,
    PATIENT_STORY_CREATE_REQUEST,
    PATIENT_STORY_CREATE_SUCCESS,
    PATIENT_STORY_CREATE_FAILURE,
    PATIENT_STORY_GET_REQUEST,
    PATIENT_STORY_GET_SUCCESS,
    PATIENT_STORY_GET_FAILURE,
} from "../types/patientStoriesActionTypes";
import { listPatientStories } from "../../src/graphql/queries";
import { createPatientStory} from "../../src/graphql/mutations";
import { storiesByAppointment } from "../../src/graphql/queries";

const client = generateClient();

export const patientStoriesListByDoctorsActionCreators = (doctorID) => async (dispatch) => {
    try {
        dispatch({ type: PATIENT_STORIES_LIST_BY_DOCTOR_REQUEST });

        const response = await client.graphql({
            query: listPatientStories,
            variables: {
                filter: {
                    doctorID: { eq: doctorID },
                },
            },
        });

        if (response.data && response.data.listPatientStories && response.data.listPatientStories.items) {
            const stories = response.data.listPatientStories.items;
            dispatch({
                type: PATIENT_STORIES_LIST_BY_DOCTOR_SUCCESS,
                payload: stories,
            });
        } else {
            dispatch({
                type: PATIENT_STORIES_LIST_BY_DOCTOR_FAILURE,
                payload: 'No patient stories found',
            });
        }
    } catch (error) {
        console.error("Error fetching patient stories by doctor", error);
        dispatch({
            type: PATIENT_STORIES_LIST_BY_DOCTOR_FAILURE,
            payload: error,
        });
    }
};

export const createPatientStoryActionCreator = (doctorID, patientID, patientName, rating, review, appointmentID) => async (dispatch) => {
    try {
        dispatch({ type: PATIENT_STORY_CREATE_REQUEST });



        // Current date in ISO format
        const date = new Date().toISOString();

        const response = await client.graphql({
            query: createPatientStory,
            variables: {
                input: {
                    doctorID: String(doctorID),
                    patientID: String(patientID),
                    patientName: String(patientName),
                    rating: rating,
                    story: String(review || "No review provided"), 
                    date: String(date),
                    appointmentID: String(appointmentID),
                },
            },
        });

        dispatch({
            type: PATIENT_STORY_CREATE_SUCCESS,
            payload: response.data.createPatientStory,
        });
    } catch (error) {
        console.error("Error creating patient story", error);
        dispatch({
            type: PATIENT_STORY_CREATE_FAILURE,
            payload: error,
        });
    }
};

export const getPatientStoryActionCreator = (appointmentID) => async (dispatch) => {
    try {
        dispatch({ type: PATIENT_STORY_GET_REQUEST });

        const response = await client.graphql({
            query: storiesByAppointment, 
            variables: { appointmentID: appointmentID },
        });

        console.log("API response for patient story:", response); 

        if (response.data && response.data.storiesByAppointment && response.data.storiesByAppointment.items.length > 0) {
            const patientStory = response.data.storiesByAppointment.items[0];  
            console.log("Fetched patient story from API:", patientStory);
            dispatch({
                type: PATIENT_STORY_GET_SUCCESS,
                payload: patientStory,
            });
        } else {
            console.log("No patient story found for appointment:", appointmentID);
            dispatch({
                type: PATIENT_STORY_GET_SUCCESS,
                payload: null, 
            });        }
    } catch (error) {
        console.error("Error fetching patient story", error);
        dispatch({
            type: PATIENT_STORY_GET_FAILURE,
            payload: error,
        });
    }
};