import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";
import { getDoctor } from "../../../graphql/queries";
import { createDoctor } from "../../../graphql/mutations";

const client = generateClient();

export const doctorService = {
    createDoctor: async (userId, email, profileData) => {
        try {
            const response = await client.graphql({
                query: createDoctor,
                variables: {
                    input: {
                        id: userId,
                        firstname: profileData.firstName,
                        lastname: profileData.lastName,
                        email: email,
                        phoneNumber: profileData.phoneNumber,
                        address: profileData.address,
                        zipcode: profileData.zipcode,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while creating patient", error);
            Sentry.captureException(error, {
                extra: { message: "Error while creating patient" },
            });
        }
    },

    getDoctor: async (doctorId, dispatch) => {
        try {
            const response = await client.graphql({
                query: getDoctor,
                variables: {
                    doctorID: doctorId,
                },
            });

            const doctor = response.data.getDoctor;

            console.log("doctor", doctor);

            // dispatch({
            //     type: patientActionType.SET_PATIENT,
            //     payload: { patientData: patient },
            // });
        } catch (error) {
            console.error("Error while fetching doctor", error);
            Sentry.captureException(error, {
                extra: { message: "Error while fetching doctor" },
            });
        }
    },
};
