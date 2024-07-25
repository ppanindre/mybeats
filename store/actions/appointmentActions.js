import { generateClient } from "aws-amplify/api";
import {
    APPOINTMENT_CREATE_FAILURE,
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_DELETE_FAILURE,
    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS,
    APPOINTMENT_LIST_AVAILABLE_FAILURE,
    APPOINTMENT_LIST_AVAILABLE_REQUEST,
    APPOINTMENT_LIST_AVAILABLE_SUCCESS,
    APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
    APPOINTMENT_LIST_BY_DOCTOR_REQUEST,
    APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
    APPOINTMENT_LIST_BY_PATIENT_REQUEST,
    APPOINTMENT_LIST_BY_PATIENT_SUCCESS,
    APPOINTMENT_LIST_BY_PATIENT_FAILURE
} from "../types/appointmentActionTypes.js";
import moment from "moment";
import { getPatient, getDoctor, listAppointments } from "../../src/graphql/queries.js";
import {
    createAppointment,
    deleteAppointment,
} from "../../src/graphql/mutations.js";

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

export const deleteAppointmentActionCreator =
    (appointmentId, version = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: APPOINTMENT_DELETE_REQUEST });

            await client.graphql({
                query: deleteAppointment,
                variables: {
                    input: {
                        id: appointmentId,
                        _version: version,
                    },
                },
            });

            dispatch({ type: APPOINTMENT_DELETE_SUCCESS });

        } catch (error) {
            console.error("Error deleting appointment", error, appointmentId);
            dispatchEvent({ type: APPOINTMENT_DELETE_FAILURE, payload: error });
        }
    };

export const listAppointmentsByDoctorActionCreators =
    (doctorId) => async (dispatch, getState) => {
        try {
            if (!doctorId) {
                const user = getState().UserReducer;
                doctorId = user.userId;
            }

            dispatch({ type: APPOINTMENT_LIST_BY_DOCTOR_REQUEST });

            const response = await client.graphql({
                query: listAppointments,
                variables: {
                    filter: {
                        doctorID: { eq: doctorId },
                        _deleted: { ne: true },
                    },
                },
            });

            const appointmentsWithPatientData = await Promise.all(
                response.data.listAppointments.items.map(async (appointment) => {
                    const patientResponse = await client.graphql({
                        query: getPatient,
                        variables: { id: appointment.patientId },
                    });
                    appointment.patient = patientResponse.data.getPatient;
                    return appointment;
                })
            );

            dispatch({
                type: APPOINTMENT_LIST_BY_DOCTOR_SUCCESS,
                payload: appointmentsWithPatientData,
            });
        } catch (error) {
            console.error("Error while listing appointments", error);
            dispatch({
                type: APPOINTMENT_LIST_BY_DOCTOR_FAILURE,
                payload: error,
            });
        }
    };

    export const listAppointmentsByPatientActionCreators = (patientId) => async (dispatch) => {
        try {
            dispatch({ type: APPOINTMENT_LIST_BY_PATIENT_REQUEST });
            console.log('Fetching appointments for patient:', patientId);
    
            const response = await client.graphql({
                query: listAppointments,
                variables: {
                    filter: {
                        patientId: { eq: patientId },
                        _deleted: { ne: true },
                    },
                },
            });
        
            if (response.data && response.data.listAppointments && response.data.listAppointments.items) {
                const appointments = response.data.listAppointments.items;
                console.log('Fetched appointments:', appointments);
    
                if (appointments.length > 0) {
                    const appointmentsWithDoctorData = await Promise.all(
                        appointments.map(async (appointment) => {
                            const doctorResponse = await client.graphql({
                                query: getDoctor,
                                variables: { doctorID: appointment.doctorID },
                            });
    
                            appointment.doctor = doctorResponse.data.getDoctor;
                            return appointment;
                        })
                    );
    
                    dispatch({
                        type: APPOINTMENT_LIST_BY_PATIENT_SUCCESS,
                        payload: appointmentsWithDoctorData,
                    });
                } else {
                    console.log('No appointments found for patient:', patientId);
                    dispatch({
                        type: APPOINTMENT_LIST_BY_PATIENT_SUCCESS,
                        payload: [],
                    });
                }
            } else {
                console.error('Failed to fetch appointments:', response.data);
                dispatch({
                    type: APPOINTMENT_LIST_BY_PATIENT_FAILURE,
                    payload: 'Failed to fetch appointments',
                });
            }
        } catch (error) {
            console.error("Error while listing appointments", error);
            dispatch({
                type: APPOINTMENT_LIST_BY_PATIENT_FAILURE,
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
