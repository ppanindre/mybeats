import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import { getUrl } from "aws-amplify/storage";
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

// to convert URI to Blob for image uploads
const uriToBlob = async (uri) => {
    try {
        const response = await fetch(uri); 
        const blob = await response.blob();  
        return blob;
    } catch (error) {
        console.error('Error converting URI to Blob:', error);
        throw error;
    }
};

// creating doctor notes and handling image uploads
export const createDoctorNoteActionCreator = (appointmentId, doctorNotes, images) => async (dispatch, getState) => {
    try {
        dispatch({ type: DOCTOR_NOTE_CREATE_REQUEST });

        // getting the _version
        const appointmentResponse = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });
        const appointment = appointmentResponse.data.getAppointment;
        const _version = appointment._version;
        const existingImagePaths = appointment.imagePaths || [];

        // Extract only the base file names from existing image paths for accurate comparison
        const existingFileNames = existingImagePaths.map((path) => path.split('/').pop());

        // Separate images into new and existing (already uploaded URLs)
        const newImages = images.filter(
            (image) => !existingFileNames.includes(image.fileName)
        );

        const newImagePaths = await Promise.all(
            newImages.map(async (image) => {
                //  processing those images with local URIs (not already uploaded URLs)
                if (image.uri && !existingFileNames.includes(image.fileName)) {
                    try {
                        const fileBlob = await uriToBlob(image.uri);
                        const fileExtension = image.uri.split('.').pop();

                        let fileName = `appointments/${appointmentId}/${Date.now()}_${image.fileName || 'image'}`;
                        if (!fileName.endsWith(`.${fileExtension}`)) {
                            fileName += `.${fileExtension}`;
                        }

                        const result = await uploadData({
                            key: `${fileName}`,
                            data: fileBlob,
                            options: {
                                accessLevel: 'public',
                            },
                        }).result;

                        console.log('New image uploaded to S3:', result);
                        return result.key;
                    } catch (error) {
                        console.warn(`Skipping image upload for ${image.fileName} - Error:`, error);
                        return null;
                    }
                }
                // If no local uri, skipping processing
                return null; 
            })
        );

        // filering out any null paths from newImagePaths and combine with existing paths
        const updatedImagePaths = [...existingImagePaths, ...newImagePaths.filter((path) => path !== null)];

        const response = await client.graphql({
            query: updateAppointment,
            variables: {
                input: {
                    id: appointmentId,
                    doctorNotes: doctorNotes,
                    imagePaths: updatedImagePaths,
                    _version: _version,
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

// fetchng doctor notes and image URLs for a specific appointment
export const getDoctorNoteActionCreator = (appointmentId) => async (dispatch) => {
    try {
        dispatch({ type: DOCTOR_NOTE_GET_REQUEST });

        const response = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });

        const appointment = response.data.getAppointment;
        const doctorNotes = appointment.doctorNotes;
        const imagePaths = appointment.imagePaths || []; 

        if (imagePaths.length === 0) {
            console.log('No image paths available');
        }

        // S3 public URL prefix
        const S3_PUBLIC_URL_PREFIX = 'https://mybeats-profile-images21f51-stabledev.s3.amazonaws.com/public/';

        // appending the S3 public URL prefix to each image path
        const imageUrls = imagePaths.map(path => S3_PUBLIC_URL_PREFIX + path);

        dispatch({
            type: DOCTOR_NOTE_GET_SUCCESS,
            payload: {
                doctorNotes,
                imageUrls,  
            },
        });
    } catch (error) {
        console.error("Error fetching doctor note", error);
        dispatch({
            type: DOCTOR_NOTE_GET_FAILURE,
            payload: error,
        });
    }
};