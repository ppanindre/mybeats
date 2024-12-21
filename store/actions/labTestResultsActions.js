import {
  LAB_TEST_RESULT_CREATE_REQUEST,
  LAB_TEST_RESULT_CREATE_SUCCESS,
  LAB_TEST_RESULT_CREATE_FAILURE,
  LAB_TEST_RESULT_GET_REQUEST,
  LAB_TEST_RESULT_GET_SUCCESS,
  LAB_TEST_RESULT_GET_FAILURE,
  LAB_TEST_RESULT_GET_BY_PATIENT_REQUEST,
  LAB_TEST_RESULT_GET_BY_PATIENT_SUCCESS,
  LAB_TEST_RESULT_GET_BY_PATIENT_FAILURE,
} from "../types/labTestResultsActionTypes";

import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import {
  createLabTestResult,
  updateLabTestResult,
} from "../../src/graphql/mutations";
import {
  listLabTestResults,
  getLabTestResult,
} from "../../src/graphql/queries";
import { v4 as uuidv4 } from "uuid";

const client = generateClient();

const S3_PUBLIC_URL_PREFIX =
  "https://mybeats-profile-images21f51-stabledev.s3.us-east-1.amazonaws.com/public/";

// action creator to create or update a new lab test result
export const createOrUpdateLabTestResultActionCreator =
  (title, images, labTestResultId = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: LAB_TEST_RESULT_CREATE_REQUEST });

      const user = getState().UserReducer;
      const patientId = user?.userId;

      if (!patientId) throw new Error("Patient ID is missing.");

      let _version = null; // holds the current version while updating
      let folderId = null; // folderId

      // fetchng latest _version and folderId if updating an existing lab test result
      if (labTestResultId) {
        const response = await client.graphql({
          query: getLabTestResult,
          variables: { id: labTestResultId },
        });
        const labTestResult = response.data.getLabTestResult;
        _version = labTestResult._version;

        // Extract the folder ID from the existing image paths if available
        if (labTestResult?.labResultImages?.length > 0) {
          const firstImagePath = labTestResult.labResultImages[0];
          const match = firstImagePath.match(
            /labTestResults\/.*?\/(labTest_.*?)\//
          );
          if (match && match[1]) {
            folderId = match[1]; // existing folder
          }
        }
      }

      // new folderId for new entries or if not extracted above
      if (!folderId) {
        folderId = `labTest_${Date.now()}`;
      }

      const existingImagePaths = images
        .filter((image) => image.isBackend)
        .map((image) => image.uri);

      const newImages = images.filter((image) => !image.isBackend);

      // uploading images with unique file names
      const uploadedImagePaths = await Promise.all(
        newImages.map(async (image) => {
          try {
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const fileExtension = image.uri.split(".").pop();

            // unique file name using uuidv4
            const fileName = `labTestResults/${patientId}/${folderId}/labTestResult_${uuidv4()}.${fileExtension}`;

            const uploadResult = await uploadData({
              key: fileName,
              data: blob,
              options: { accessLevel: "public" },
            }).result;

            console.log(
              "Uploaded Image Path:",
              `${S3_PUBLIC_URL_PREFIX}${uploadResult.key}`
            );
            return `${S3_PUBLIC_URL_PREFIX}${uploadResult.key}`;
          } catch (error) {
            console.error("Error uploading image:", error);
            return null;
          }
        })
      );

      const allImagePaths = [
        ...existingImagePaths,
        ...uploadedImagePaths.filter(Boolean),
      ];

      const mutationVariables = labTestResultId
        ? {
            input: {
              id: labTestResultId,
              title,
              labResultImages: allImagePaths,
              _version,
            },
          }
        : {
            input: {
              patientID: patientId,
              title,
              labResultImages: allImagePaths,
            },
          };

      const mutation = labTestResultId
        ? updateLabTestResult
        : createLabTestResult;

      const response = await client.graphql({
        query: mutation,
        variables: mutationVariables,
      });

      dispatch({
        type: LAB_TEST_RESULT_CREATE_SUCCESS,
        payload:
          response.data[
            labTestResultId ? "updateLabTestResult" : "createLabTestResult"
          ],
      });
    } catch (error) {
      console.error("Error creating/updating lab test result:", error);
      dispatch({
        type: LAB_TEST_RESULT_CREATE_FAILURE,
        payload: error.message || error,
      });
    }
  };

// action creator to fetch lab test results for the app user
export const getLabTestResultsActionCreator =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: LAB_TEST_RESULT_GET_REQUEST });

      const user = getState().UserReducer;
      const patientId = user?.userId;

      if (!patientId) {
        throw new Error("Patient ID is missing from the Redux state.");
      }

      const response = await client.graphql({
        query: listLabTestResults,
        variables: {
          filter: { patientID: { eq: patientId } },
          limit: 100,
        },
      });

      const labTestResults = response?.data?.listLabTestResults?.items || [];

      // formatting image URLs
      const formattedResults = labTestResults.map((result) => ({
        ...result,
        labResultImages: result.labResultImages.map((path) =>
          path.startsWith(S3_PUBLIC_URL_PREFIX)
            ? path
            : `${S3_PUBLIC_URL_PREFIX}${path}`
        ),
      }));

      dispatch({
        type: LAB_TEST_RESULT_GET_SUCCESS,
        payload: formattedResults,
      });
    } catch (error) {
      console.error("Error fetching lab test results:", error);
      dispatch({
        type: LAB_TEST_RESULT_GET_FAILURE,
        payload: error.message || error,
      });
    }
  };

// action creator to fetch lab test results based on patient id
export const getLabTestResultsByPatientActionCreator =
  (patientId) => async (dispatch) => {
    try {
      dispatch({ type: LAB_TEST_RESULT_GET_BY_PATIENT_REQUEST });

      const response = await client.graphql({
        query: listLabTestResults,
        variables: {
          filter: { patientID: { eq: patientId } },
          limit: 100,
        },
      });

      const labTestResults = response?.data?.listLabTestResults?.items || [];

      // formatting image URLs
      const formattedResults = labTestResults.map((result) => ({
        ...result,
        labResultImages: result.labResultImages.map((path) =>
          path.startsWith(S3_PUBLIC_URL_PREFIX)
            ? path
            : `${S3_PUBLIC_URL_PREFIX}${path}`
        ),
      }));

      dispatch({
        type: LAB_TEST_RESULT_GET_BY_PATIENT_SUCCESS,
        payload: formattedResults,
      });
    } catch (error) {
      console.error("Error fetching lab test results by patient:", error);
      dispatch({
        type: LAB_TEST_RESULT_GET_BY_PATIENT_FAILURE,
        payload: error.message || error,
      });
    }
  };
