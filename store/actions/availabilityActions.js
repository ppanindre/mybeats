import { generateClient } from "aws-amplify/api";
import {
    AVAILABILITIES_BY_DOCTOR_FAILURE,
    AVAILABILITIES_BY_DOCTOR_REQUEST,
    AVAILABILITIES_BY_DOCTOR_SUCCESS,
    AVAILABILITY_CREATE_FAILURE,
    AVAILABILITY_CREATE_REQUEST,
    AVAILABILITY_CREATE_SUCCESS,
    AVAILABILITY_DELETE_FAILURE,
    AVAILABILITY_DELETE_REQUEST,
    AVAILABILITY_DELETE_SUCCESS,
} from "../types/availabilityActionTypes";
import {
    createAvailability,
    deleteAvailability,
} from "../../src/graphql/mutations";
import { availabilityByDoctor } from "../../src/graphql/queries";
import moment from "moment";

const client = generateClient();

export const createAvailabilityActionCreator =
    (startTime, endTime) => async (dispatch, getState) => {
        try {
            dispatch({ type: AVAILABILITY_CREATE_REQUEST });

            const user = getState().UserReducer;
            const doctorId = user.userId;

            const response = await client.graphql({
                query: createAvailability,
                variables: {
                    input: {
                        doctorID: doctorId,
                        startTime: startTime,
                        endTime: endTime,
                    },
                },
            });

            dispatch({
                type: AVAILABILITY_CREATE_SUCCESS,
                payload: response.data.createAvailability,
            });

            dispatch(getAvailabilitiesByDoctorActionCreator());
        } catch (error) {
            console.error("Error while creating availability", error);
            dispatch({ type: AVAILABILITY_CREATE_FAILURE, payload: error });
        }
    };

export const getAvailabilitiesByDoctorActionCreator =
    () => async (dispatch, getState) => {
        try {
            dispatch({ type: AVAILABILITIES_BY_DOCTOR_REQUEST });

            const user = getState().UserReducer;
            const doctorId = user.userId;

            const response = await client.graphql({
                query: availabilityByDoctor,
                variables: {
                    doctorID: doctorId,
                    sortDirection: "ASC",
                    filter: {
                        _deleted: { ne: true },
                    },
                },
            });

            const availabilities = response.data.availabilityByDoctor.items;

            const groupedAvailabilities = {};

            availabilities.forEach((availability) => {
                // Extract the date part from startTime
                const date = moment(availability.startTime).format(
                    "YYYY-MM-DD"
                );

                // Initialize the array for the date if it doesn't exist
                if (!groupedAvailabilities[date]) {
                    groupedAvailabilities[date] = [];
                }

                // Add the availability to the array
                groupedAvailabilities[date].push({
                    id: availability.id,
                    startTime: availability.startTime,
                    endTime: availability.endTime,
                    version: availability._version,
                });
            });

            // Sort the keys in ascending order
            const sortedKeys = Object.keys(groupedAvailabilities).sort(
                (a, b) => new Date(a) - new Date(b)
            );
            const sortedGroupedAvailabilities = {};

            sortedKeys.forEach((key) => {
                sortedGroupedAvailabilities[key] = groupedAvailabilities[key];
            });

            dispatch({
                type: AVAILABILITIES_BY_DOCTOR_SUCCESS,
                payload: groupedAvailabilities,
            });
        } catch (error) {
            console.error("Error while fetching availabilites", error);
            dispatch({
                type: AVAILABILITIES_BY_DOCTOR_FAILURE,
                payload: error,
            });
        }
    };

export const deleteAvailabilityActionCreator =
    (availabilityId, version = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: AVAILABILITY_DELETE_REQUEST });

            const response = await client.graphql({
                query: deleteAvailability,
                variables: {
                    input: {
                        id: availabilityId,
                        _version: version,
                    },
                },
            });

            dispatch({
                type: AVAILABILITY_DELETE_SUCCESS,
                payload: response.data.deleteAvailability,
            });

            dispatch(getAvailabilitiesByDoctorActionCreator());
        } catch (error) {
            console.error("Error while deleting availability", error);
            dispatch({ type: AVAILABILITY_DELETE_FAILURE, payload: error });
        }
    };
