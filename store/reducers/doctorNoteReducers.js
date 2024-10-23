import {
    DOCTOR_NOTE_CREATE_REQUEST,
    DOCTOR_NOTE_CREATE_SUCCESS,
    DOCTOR_NOTE_CREATE_FAILURE,
    DOCTOR_NOTE_GET_REQUEST,
    DOCTOR_NOTE_GET_SUCCESS,
    DOCTOR_NOTE_GET_FAILURE,
} from "../types/doctorNoteActionTypes.js";

export const doctorNoteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_NOTE_CREATE_REQUEST:
            return {
                loading: true,
            };
        case DOCTOR_NOTE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                doctorNote: action.payload,
            };
        case DOCTOR_NOTE_CREATE_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const doctorNoteGetReducer = (state = { doctorNote: "", imageUrls: [] }, action) => {
    switch (action.type) {
        case DOCTOR_NOTE_GET_REQUEST:
            return {
                loading: true,
            };
        case DOCTOR_NOTE_GET_SUCCESS:
            return {
                loading: false,
                doctorNote: action.payload.doctorNotes,
                imageUrls: action.payload.imageUrls,  
            };
        case DOCTOR_NOTE_GET_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

