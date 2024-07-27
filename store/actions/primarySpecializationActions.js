import {
    PRIMARY_SPECIALIZATION_REQUEST,
    PRIMARY_SPECIALIZATION_SUCCESS,
    PRIMARY_SPECIALIZATION_FAILURE,
} from "../types/primarySpecializationActionTypes";
import { listSpecialties } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const fetchPrimarySpecializations = () => async (dispatch) => {
    try {
        dispatch({ type: PRIMARY_SPECIALIZATION_REQUEST });

        const response = await client.graphql({
            query: listSpecialties,
        });

        dispatch({
            type: PRIMARY_SPECIALIZATION_SUCCESS,
            payload: response.data.listSpecialties.items,
        });
    } catch (error) {
        console.error("Error while fetching specializations", error);
        dispatch({
            type: PRIMARY_SPECIALIZATION_FAILURE,
            payload: error.message || "Error while fetching specializations",
        });
    }
};
