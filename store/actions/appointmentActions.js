import { generateClient } from "aws-amplify/api";
import {
    APPOINTMENT_CREATE_FAILURE,
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_LIST_AVAILABLE_FAILURE,
    APPOINTMENT_LIST_AVAILABLE_REQUEST,
    APPOINTMENT_LIST_AVAILABLE_SUCCESS,
    APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
    APPOINTMENT_LIST_BY_DOCTOR_REQUEST,
    APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
} from "../types/appointmentActionTypes.js";
import moment from "moment";
import { slotsByDoctor } from "../../src/graphql/queries.js";
import { createAppointment } from "../../src/graphql/mutations.js";

const client = generateClient();

export const createAppointmentActionCreators =
    (doctorId, type, slot) => async (dispatch, getState) => {
        try {
            const user = getState().UserReducer;
            const patientId = user.userId;

            dispatch({ type: APPOINTMENT_CREATE_REQUEST });

            const response = await client.graphql({
                query: createAppointment,
                variables: {
                    input: {
                        patientId: patientId,
                        doctorID: doctorId,
                        type: type,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        isBooked: true,
                    },
                },
            });

            dispatch({
                type: APPOINTMENT_CREATE_SUCCESS,
                payload: response.data.createAppointment,
            });
        } catch (error) {
            console.error("Error creating appointment", error);
            dispatch({ type: APPOINTMENT_CREATE_FAILURE, payload: error });
        }
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

            // Create a Set of booked start times
            const bookedStartTimes = new Set(
                appointmentsByDoctor.map((appt) => appt.startTime)
            );

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
                        const slotStartTimeISO = startTime
                            .clone()
                            .toISOString();

                        if (!bookedStartTimes.has(slotStartTimeISO)) {
                            slots[dateKey].push({
                                startTime: slotStartTimeISO,
                                endTime: slotEndTime.clone().toISOString(),
                            });
                        }

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
