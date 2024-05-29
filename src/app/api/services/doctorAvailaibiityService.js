import * as Sentry from "@sentry/react-native";
import { generateClient } from "aws-amplify/api";
import { createAppointmentSlot } from "../../../graphql/mutations";

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
    createAppointmentSlot: async (
        doctorId,
        patientId,
        startTime,
        endTime
    ) => {
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

            console.log('response', response);

        } catch (error) {
            console.error("Error while setting appointment slot", error);
            Sentry.captureException(error, {extra: {message: "Error captured while creating appointment slot"}})
        }
    },
};
