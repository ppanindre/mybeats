import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";
import { getPatient } from "../../../graphql/queries";

const client = generateClient();

export const patientService = {
    createPatient: async (userId, profileData) => {
        console.log("profile data", profileData);
    },

    getPatient: async (patientId) => {
        try {
            const response = await client.graphql({
                query: getPatient,
                variables: {
                    id: patientId,
                },
            });
            
        } catch (error) {
            console.error("Error while fetching patient", error);
            Sentry.captureException(error, {
                extra: { message: "Error while fetching patient" },
            });
        }
    },
};
