import { generateClient } from "aws-amplify/api";
import * as Sentry from "@sentry/react-native";
import {
    createAvailability,
    deleteAvailability,
} from "../../../graphql/mutations";
import {
    availabilityByDoctor,
    listAvailabilities,
} from "../../../graphql/queries";
import moment from "moment";

const client = generateClient();

export const availabilityService = {
    /**
     * create availability
     * @param {String} doctorId
     * @param {String} startTime
     * @param {String} endTime
     */
    createAvailability: async (doctorId, startTime, endTime) => {
        try {
            const response = await client.graphql({
                query: createAvailability,
                variables: {
                    input: {
                        doctorID: doctorId,
                        startTime: startTime,
                        endTime: endTime,
                        isAvailable: true,
                    },
                },
            });

            return response.data.createAvailability;

        } catch (error) {
            console.error("Error while creating availability", error);
            Sentry.captureException(error, {
                extra: { message: "Error while creating availability" },
            });
        }
    },

    /**
     * fetch availability by Doctor Id
     * @param {String} doctorId
     * @param {String} nextToken
     * @returns {{Array, String}}
     */
    availabilityByDoctor: async (doctorId, nextToken) => {
        try {
            const response = await client.graphql({
                query: availabilityByDoctor,
                variables: {
                    doctorID: doctorId,
                    sortDirection: "ASC",
                    nextToken: nextToken,
                    filter: {
                        _deleted: { ne: true },
                    },
                    limit: 10
                },
            });

            const availabilities = response.data.availabilityByDoctor.items;

            const doctorAvailabilityNextToken =
                response.data.availabilityByDoctor.nextToken;
            const groupedAvailabilities = availabilities.reduce(
                (acc, availability) => {
                    if (!availability._deleted) {
                        const dateKey = moment(availability.startTime).format(
                            "YYYY-MM-DD"
                        );

                        if (!acc[dateKey]) {
                            acc[dateKey] = [];
                        }
                        acc[dateKey].push({
                            start: availability.startTime,
                            end: availability.endTime,
                            id: availability.id,
                            version: availability._version,
                        });
                    }
                    return acc;
                },
                {}
            );

            // Convert the grouped object to an array with date and slots
            const formattedResponse = Object.keys(groupedAvailabilities).map(
                (date) => ({
                    date,
                    slots: groupedAvailabilities[date],
                })
            );

            return {
                fetchedAvailability: formattedResponse,
                nextToken: doctorAvailabilityNextToken,
            };
        } catch (error) {
            console.error("Error while fetching availability", error);
            Sentry.captureException(error, {
                extra: { message: "Error while fetching availability" },
            });
        }
    },

    deleteAvailability: async (availabilityId, version = 1) => {
        try {
            const response = await client.graphql({
                query: deleteAvailability,
                variables: {
                    input: {
                        id: availabilityId,
                        _version: version,
                    },
                },
            });

            console.log("response", response);
        } catch (error) {
            console.error("Error while creating availability", error);
            Sentry.captureException(error, {
                extra: { message: "Error while creating availability" },
            });
        }
    },
};
