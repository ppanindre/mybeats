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

export const patientStoriesListByDoctorReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_STORIES_LIST_BY_DOCTOR_REQUEST:
            return {
                loading: true,
            };

        case PATIENT_STORIES_LIST_BY_DOCTOR_SUCCESS:
            return {
                loading: false,
                success: true,
                patientStories: action.payload,
            };

        case PATIENT_STORIES_LIST_BY_DOCTOR_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const patientStoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_STORY_CREATE_REQUEST:
            return {
                loading: true,
            };

        case PATIENT_STORY_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                patientStory: action.payload,
            };

        case PATIENT_STORY_CREATE_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const patientStoryGetReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_STORY_GET_REQUEST:
            return {
                loading: true,
            };

        case PATIENT_STORY_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                patientStory: action.payload,
            };

        case PATIENT_STORY_GET_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
