import { generateClient } from "aws-amplify/api";
import {
    APPOINTMENT_LIST_AVAILABLE_FAILURE,
    APPOINTMENT_LIST_AVAILABLE_REQUEST,
    APPOINTMENT_LIST_AVAILABLE_SUCCESS,
    APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
    APPOINTMENT_LIST_BY_DOCTOR_REQUEST,
    APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
} from "../types/appointmentActionTypes.js";
import moment from "moment";
import { slotsByDoctor } from "../../src/graphql/queries.js";

const client = generateClient();

export const createAppointmentActionCreators =
    () => async (dispatch, getState) => {
        try {
        } catch (error) {}
    };

export const listAppointmentsByDoctorActionCreators =
    (doctorId) => async (dispatch, getState) => {
        try {
            dispatch({ type: APPOINTMENT_LIST_BY_DOCTOR_REQUEST });

            const response = await client.graphql({
                query: slotsByDoctor,
                variables: {
                    doctorID: doctorId,
                },
            });

            dispatch({
                type: APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
                payload: response.data.slotsByDoctor.items,
            });
        } catch (error) {
            console.error("Error while listing appointments", error);
            dispatch({
                type: APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
                payload: error,
            });
        }
    };

export const listAvailableAppointmentsActionCreators =
    () => async (dispatch, getState) => {
        try {
            dispatch({ type: APPOINTMENT_LIST_AVAILABLE_REQUEST });

            const { availabilities } = getState().availabilitesByDoctorReducer;
            const { appointmentsByDoctor } =
                getState().appointmentsListByDoctorReducer;

            const slots = {};

            Object.keys(availabilities).forEach((dateKey) => {
                slots[dateKey] = [];

                availabilities[dateKey].forEach((availability) => {
                    const startTime = moment(availability.startTime);
                    const endTime = moment(availability.endTime);

                    while (startTime.isBefore(endTime)) {
                        const slotEndTime = startTime
                            .clone()
                            .add(15, "minutes");
                        slots[dateKey].push({
                            startTime: startTime.clone().toISOString(),
                            endTime: slotEndTime.clone().toISOString(),
                            isBooked: false, // Assume all slots are initially available
                        });
                        startTime.add(15, "minutes");
                    }
                });
            });

            dispatch({
                type: APPOINTMENT_LIST_AVAILABLE_SUCCESS,
                payload: slots,
            });
        } catch (error) {
            console.error(
                "Error while fetching list available appointments",
                error
            );
            dispatch({
                type: APPOINTMENT_LIST_AVAILABLE_FAILURE,
                payload: error,
            });
        }
    };
