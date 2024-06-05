import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";
import { getPatient } from "../../../graphql/queries";
import { createPatient } from "../../../graphql/mutations";
import { patientActionType } from "../../../../store/PatientReducer/PatientActionType";

const client = generateClient();

export const patientService = {
    createPatient: async (userId, email, profileData) => {
        console.log("userid", userId);

        try {
            const response = await client.graphql({
                query: createPatient,
                variables: {
                    input: {
                        id: userId,
                        firstname: profileData.firstName,
                        lastname: profileData.lastName,
                        email: email,
                        phoneNumber: "123-456-7890",
                        address: "123 Main St",
                        zipcode: "12345",
                    },
                },
            });

            console.log("patient created ", response);
        } catch (error) {
            console.error("Error while creating patient", error);
            Sentry.captureException(error, {
                extra: { message: "Error while creating patient" },
            });
        }
    },

    getPatient: async (patientId) => {
        try {

            console.log("patient id", patientId)
            const response = await client.graphql({
                query: getPatient,
                variables: {
                    id: patientId,
                },
            });

            const patient = response.data.getPatient;

            console.log("patient", patient);

            return patient;
        } catch (error) {
            console.error("Error while fetching patient", error);
            Sentry.captureException(error, {
                extra: { message: "Error while fetching patient" },
            });
        }
    },
};
