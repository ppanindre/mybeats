import {
    SECONDARY_SPECIALIZATION_REQUEST,
    SECONDARY_SPECIALIZATION_SUCCESS,
    SECONDARY_SPECIALIZATION_FAILURE,
} from "../types/secondarySpecializationActionTypes";

import { listSpecialties, listPrimaryToSecondaries } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const fetchSecondarySpecializations = () => async (dispatch) => {
    try {
        dispatch({ type: SECONDARY_SPECIALIZATION_REQUEST });

        // Fetch all specializations
        const specialtiesResponse = await client.graphql({
            query: listSpecialties,
        });
        const specialties = specialtiesResponse.data.listSpecialties.items;

        // Fetch primary-to-secondary mappings
        const primaryToSecondaryResponse = await client.graphql({
            query: listPrimaryToSecondaries,
        });

        const primaryToSecondaryMappings = primaryToSecondaryResponse.data.listPrimaryToSecondaries.items;

        // Extract all secondary specialization IDs
        const secondarySpecializationIDs = new Set(
            primaryToSecondaryMappings.map((entry) => entry.secondarySpecialtyID)
        );

        // Filter only secondary specializations
        const filteredSecondarySpecializations = specialties.filter((spec) =>
            secondarySpecializationIDs.has(spec.id)
        );

        dispatch({
            type: SECONDARY_SPECIALIZATION_SUCCESS,
            payload: filteredSecondarySpecializations,
        });

    } catch (error) {
        console.error("Error while fetching secondary specializations", error);
        dispatch({
            type: SECONDARY_SPECIALIZATION_FAILURE,
            payload: error.message || "Error while fetching secondary specializations",
        });
    }
};
