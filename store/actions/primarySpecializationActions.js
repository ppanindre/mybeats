import {
    PRIMARY_SPECIALIZATION_REQUEST,
    PRIMARY_SPECIALIZATION_SUCCESS,
    PRIMARY_SPECIALIZATION_FAILURE,

    PRIMARY_TO_SECONDARY_REQUEST,
    PRIMARY_TO_SECONDARY_SUCCESS,
    PRIMARY_TO_SECONDARY_FAILURE,
} from "../types/primarySpecializationActionTypes";
import { listSpecialties, listPrimaryToSecondaries } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const fetchPrimarySpecializations = () => async (dispatch) => {
    try {
        dispatch({ type: PRIMARY_SPECIALIZATION_REQUEST });

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

        console.log("Filtered Secondary Specialization IDs:", secondarySpecializationIDs);

        // Filter out secondary specializations from primary list
        const filteredPrimarySpecializations = specialties.filter(
            (spec) => !secondarySpecializationIDs.has(spec.id)
        );

        console.log("Updated Filtered Primary Specializations:", filteredPrimarySpecializations);

        dispatch({
            type: PRIMARY_SPECIALIZATION_SUCCESS,
            payload: filteredPrimarySpecializations,
        });

    } catch (error) {
        console.error("Error while fetching specializations", error);
        dispatch({
            type: PRIMARY_SPECIALIZATION_FAILURE,
            payload: error.message || "Error while fetching specializations",
        });
    }
};

export const fetchPrimaryToSecondaryMappings = () => async (dispatch) => {
    try {
        dispatch({ type: PRIMARY_TO_SECONDARY_REQUEST });

        // Fetch primary to secondary mappings
        const response = await client.graphql({ query: listPrimaryToSecondaries });
        const mappings = response.data.listPrimaryToSecondaries.items;

        console.log("Loaded Primary-to-Secondary Mappings:", mappings);

        dispatch({
            type: PRIMARY_TO_SECONDARY_SUCCESS,
            payload: mappings,
        });
    } catch (error) {
        console.error("Error fetching primary-to-secondary mappings", error);
        dispatch({
            type: PRIMARY_TO_SECONDARY_FAILURE,
            payload: error.message || "Error fetching primary-to-secondary mappings",
        });
    }
};
