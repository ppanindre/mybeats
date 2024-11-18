import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import {
    PRESCRIPTION_IMAGE_CREATE_REQUEST,
    PRESCRIPTION_IMAGE_CREATE_SUCCESS,
    PRESCRIPTION_IMAGE_CREATE_FAILURE,
    PRESCRIPTION_IMAGE_GET_REQUEST,
    PRESCRIPTION_IMAGE_GET_SUCCESS,
    PRESCRIPTION_IMAGE_GET_FAILURE,
} from "../types/prescriptionImageActionTypes";
import { getAppointment } from "../../src/graphql/queries.js";
import { updateAppointment } from "../../src/graphql/mutations.js";

export const uriToBlob = async (uri) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error converting URI to Blob:', error);
        throw error;
    }
};

const client = generateClient();

// Action creator to upload prescription images for an appointment
export const createPrescriptionImageActionCreator = (appointmentId, images) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_IMAGE_CREATE_REQUEST });

        // Fetch the current appointment details to get the _version and existing image paths
        const appointmentResponse = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });
        const appointment = appointmentResponse.data.getAppointment;
        const _version = appointment._version;
        const existingImagePaths = appointment.prescriptionImagePaths || [];

        // Filter images that haven't been uploaded based on file names
        const existingFileNames = existingImagePaths.map((path) => path.split('/').pop());
        const newImages = images.filter((image) => !existingFileNames.includes(image.fileName));

        // Convert URIs to blobs and upload to S3, collecting new image paths
        const newImagePaths = await Promise.all(
            newImages.map(async (image) => {
                if (image.uri && !existingFileNames.includes(image.fileName)) {
                    try {
                        const fileBlob = await uriToBlob(image.uri);
                        const fileExtension = image.uri.split('.').pop();
                        let fileName = `appointments/${appointmentId}/prescription_${Date.now()}_${image.fileName || 'image'}`;
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

                        console.log('New prescription image uploaded to S3:', result);
                        return result.key;
                    } catch (error) {
                        console.warn(`Skipping image upload for ${image.fileName} - Error:`, error);
                        return null;
                    }
                }
                return null;
            })
        );

        // Filter out any null paths from newImagePaths and combine with existing paths
        const updatedImagePaths = [...existingImagePaths, ...newImagePaths.filter((path) => path !== null)];

        // Update the appointment with new prescription image paths
        const response = await client.graphql({
            query: updateAppointment,
            variables: {
                input: {
                    id: appointmentId,
                    prescriptionImagePaths: updatedImagePaths,
                    _version: _version,
                },
            },
        });

        dispatch({
            type: PRESCRIPTION_IMAGE_CREATE_SUCCESS,
            payload: response.data.updateAppointment,
        });
    } catch (error) {
        console.error("Error creating prescription images", error);
        dispatch({
            type: PRESCRIPTION_IMAGE_CREATE_FAILURE,
            payload: error,
        });
    }
};


export const getPrescriptionImageActionCreator = (appointmentId) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_IMAGE_GET_REQUEST });

        const response = await client.graphql({
            query: getAppointment,
            variables: { id: appointmentId },
        });

        const appointment = response.data.getAppointment;
        const imagePaths = appointment.prescriptionImagePaths || [];

        const S3_PUBLIC_URL_PREFIX = 'https://mybeats-profile-images21f51-stabledev.s3.amazonaws.com/public/';
        const imageUrls = imagePaths.map(path => S3_PUBLIC_URL_PREFIX + path);

        dispatch({
            type: PRESCRIPTION_IMAGE_GET_SUCCESS,
            payload: imageUrls,
        });
    } catch (error) {
        console.error("Error fetching prescription images", error);
        dispatch({
            type: PRESCRIPTION_IMAGE_GET_FAILURE,
            payload: error,
        });
    }
};


