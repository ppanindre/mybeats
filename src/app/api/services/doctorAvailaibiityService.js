import * as Sentry from "@sentry/react-native";
import { generateClient } from "aws-amplify/api";
import moment from "moment";
import {
    createAppointmentSlot,
    deleteAppointmentSlot,
    updateAppointmentSlot,
} from "../../../graphql/mutations";
import {
    listAppointmentSlots,
    slotsByStartTime,
} from "../../../graphql/queries";

const client = generateClient();

export const doctorAvailabilityService = {
    /**
     * create appointment slot for a particular date
     * @param {string} doctorId
     * @param {string} patientId
     * @param {string} startTime
     * @param {string} endTime
     * @returns {Promise<void>}
     */
    createAppointmentSlot: async (doctorId, patientId, startTime, endTime) => {
        try {
            const response = await client.graphql({
                query: createAppointmentSlot,
                variables: {
                    input: {
                        doctorID: doctorId, // change the doctor id
                        patientId: patientId,
                        startTime: startTime,
                        endTime: endTime,
                        isBooked: false,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while setting appointment slot", error);
            Sentry.captureException(error, {
                extra: {
                    message: "Error captured while creating appointment slot",
                },
            });
        }
    },

    /**
     * delete appointment slot for a particular date
     * @param {String} slotId
     */
    deleteAppointmentSlot: async (slotId, _version) => {
        try {
            const response = await client.graphql({
                query: deleteAppointmentSlot,
                variables: {
                    input: {
                        id: slotId,
                        _version: _version,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while deleting appointment", error);
            Sentry.captureException(error, {
                extra: {
                    message: "Error captured while deleting appointment slot",
                },
            });
        }
    },

    /**
     * fetch appointment slots for the particular doctor
     * using doctorID
     * @param {*} doctorID
     */
    listAppointmentSlots: async (doctorID) => {
        try {
            const response = await client.graphql({
                query: listAppointmentSlots,
                variables: {
                    sortDirections: "ASC",
                    filter: {
                        doctorID: { eq: doctorID },
                    },
                },
            });

            const fetchedSlots =
                response.data.listAppointmentSlots.items.filter(
                    (slot) => !slot._deleted
                );

            // Transform the data to group by date
            const newGroupedSlots = fetchedSlots.reduce((acc, slot) => {
                const dateKey = moment(slot.startTime).format("YYYY-MM-DD");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push({
                    id: slot.id,
                    start: slot.startTime,
                    end: slot.endTime,
                    isBooked: slot.isBooked,
                    _version: slot._version,
                });
                return acc;
            }, {});

            return newGroupedSlots;
        } catch (error) {
            console.error("Error while fetching appointment slots", error);
            Sentry.captureException(error, {
                extra: {
                    message: "Error captured while getting appointment slots",
                },
            });
        }
    },

    /**
     * book appointment slot
     * @param {String} slotId
     */
    bookAppointmentSlot: async (slotId, _version) => {
        try {
            const response = await client.graphql({
                query: updateAppointmentSlot,
                variables: {
                    input: {
                        id: slotId,
                        isBooked: true,
                        _version: _version,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while booking appointment", error);
            Sentry.captureException(error, {
                extra: {
                    message: "Error captured while getting appointment slots",
                },
            });
        }
    },
};
