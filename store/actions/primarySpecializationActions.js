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

const fetchAllSpecialties = async () => {
    let nextToken = null;
    let allSpecialties = [];

    do {
        const response = await client.graphql({
            query: listSpecialties,
            variables: { nextToken },
        });

        allSpecialties = [...allSpecialties, ...response.data.listSpecialties.items];
        nextToken = response.data.listSpecialties.nextToken; // Get next page token
    } while (nextToken);

    return allSpecialties;
};

export const fetchPrimarySpecializations = () => async (dispatch) => {
    try {
        dispatch({ type: PRIMARY_SPECIALIZATION_REQUEST });

        const specialties = await fetchAllSpecialties();

        // primary-to-secondary mappings
        const primaryToSecondaryResponse = await client.graphql({ query: listPrimaryToSecondaries });
        const primaryToSecondaryMappings = primaryToSecondaryResponse.data.listPrimaryToSecondaries.items || [];

        // Extract unique IDs for primary specializations
        const primarySpecializationIDs = new Set(
            primaryToSecondaryMappings.map((entry) => entry.primarySpecialtyID)
        );

        const filteredPrimarySpecializations = specialties.filter(
            (spec) => primarySpecializationIDs.has(spec.id) && !spec._deleted // excluding deleted records
        );

        // missing primary specializations that were expected but not found in specialties
        const missingSpecialties = [...primarySpecializationIDs].filter(
            (id) => !specialties.some((spec) => spec.id === id)
        );

        console.log("Final Primary Specializations:", filteredPrimarySpecializations);
        if (missingSpecialties.length > 0) {
            console.warn("Missing Specialties (Expected but not found):", missingSpecialties);
        }

        dispatch({
            type: PRIMARY_SPECIALIZATION_SUCCESS,
            payload: filteredPrimarySpecializations,
        });

    } catch (error) {
        console.error("Error while fetching primary specializations", error);
        dispatch({
            type: PRIMARY_SPECIALIZATION_FAILURE,
            payload: error.message || "Error while fetching primary specializations",
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
