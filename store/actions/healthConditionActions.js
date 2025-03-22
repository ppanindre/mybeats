import {
    FETCH_HEALTH_CONDITIONS_REQUEST,
    FETCH_HEALTH_CONDITIONS_SUCCESS,
    FETCH_HEALTH_CONDITIONS_FAILURE,
    FETCH_SECONDARY_SPECIALIZATIONS_REQUEST,
    FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS,
    FETCH_SECONDARY_SPECIALIZATIONS_FAILURE,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_REQUEST,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_SUCCESS,
    FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_FAILURE,
} from "../types/healthConditionActionTypes";

import { listHealthConditions, listSpecialtyHealthConditions, listSpecialties, listDoctors } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

// to get all health conditions
export const fetchHealthConditionsActionCreator = () => async (dispatch, getState) => {
    const { healthConditions } = getState().healthConditionReducer || {};

    if (healthConditions.length) return;

    dispatch({ type: FETCH_HEALTH_CONDITIONS_REQUEST });

    try {
        let allHealthConditions = [];
        let nextToken = null;

        do {
            const response = await client.graphql({
                query: listHealthConditions,
                variables: { nextToken },
            });

            allHealthConditions = allHealthConditions.concat(response.data.listHealthConditions.items || []);
            nextToken = response.data.listHealthConditions.nextToken;

        } while (nextToken);

        dispatch({
            type: FETCH_HEALTH_CONDITIONS_SUCCESS,
            payload: allHealthConditions,
        });
    } catch (error) {
        console.error("Error fetching health conditions:", error);
        dispatch({
            type: FETCH_HEALTH_CONDITIONS_FAILURE,
            payload: error.message || "Error fetching health conditions",
        });
    }
};

// to get secondary specializations for a health condition
export const fetchSecondarySpecializationsByHealthCondition = (healthConditionName) => async (dispatch, getState) => {
    dispatch({ type: FETCH_SECONDARY_SPECIALIZATIONS_REQUEST });

    try {
        const { healthConditions } = getState().healthConditionReducer || {};
        const matchedHealthCondition = healthConditions.find(
            (hc) => hc.name.toLowerCase() === healthConditionName.toLowerCase()
        );

        if (!matchedHealthCondition) {
            dispatch({ type: FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS, payload: [] });
            return;
        }

        let allSpecialtyItems = [];
        let nextToken = null;

        do {
            const specialtyResponse = await client.graphql({
                query: listSpecialtyHealthConditions,
                variables: { filter: { healthConditionId: { eq: matchedHealthCondition.id } }, nextToken },
            });

            allSpecialtyItems = allSpecialtyItems.concat(specialtyResponse?.data?.listSpecialtyHealthConditions?.items || []);
            nextToken = specialtyResponse?.data?.listSpecialtyHealthConditions?.nextToken;

        } while (nextToken);

        const specialtyIds = allSpecialtyItems.map((item) => item.specialtyId);
        if (!specialtyIds.length) {
            dispatch({ type: FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS, payload: [] });
            return;
        }

        let allSpecialties = [];
        nextToken = null;

        do {
            const specialtiesResponse = await client.graphql({
                query: listSpecialties,
                variables: { nextToken },
            });

            allSpecialties = allSpecialties.concat(specialtiesResponse?.data?.listSpecialties?.items || []);
            nextToken = specialtiesResponse?.data?.listSpecialties?.nextToken;

        } while (nextToken);

        const filteredSpecializations = allSpecialties.filter((spec) => specialtyIds.includes(spec.id));

        dispatch({
            type: FETCH_SECONDARY_SPECIALIZATIONS_SUCCESS,
            payload: filteredSpecializations,
        });

        // fetching primary specializations linked to these secondary specializations
        const primaryToSecondaryMap = getState().primaryToSecondaryReducer?.mappings || [];
        const mappedPrimarySpecializationIds = primaryToSecondaryMap
            .filter((entry) => specialtyIds.includes(entry.secondarySpecialtyID))
            .map((entry) => entry.primarySpecialtyID);

        dispatch(fetchDoctorsBySecondarySpecializations([...specialtyIds, ...mappedPrimarySpecializationIds]));

    } catch (error) {
        console.error("Error fetching secondary specializations by health condition:", error);
        dispatch({
            type: FETCH_SECONDARY_SPECIALIZATIONS_FAILURE,
            payload: error.message || "Error fetching secondary specializations",
        });
    }
};

// getting doctors for both primary and secondary specializations
export const fetchDoctorsBySecondarySpecializations = (specializationIds) => async (dispatch) => {
    dispatch({ type: FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_REQUEST });

    try {
        if (!specializationIds.length) {
            dispatch({ type: FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_SUCCESS, payload: [] });
            return;
        }

        let allDoctors = [];
        let nextToken = null;

        do {
            const doctorResponse = await client.graphql({
                query: listDoctors,
                variables: {
                    filter: {
                        or: [
                            ...specializationIds.map((id) => ({ secondarySpecializationIds: { contains: id } })),
                            ...specializationIds.map((id) => ({ primarySpecializationId: { eq: id } }))
                        ],
                    },
                    nextToken,
                },
            });

            allDoctors = allDoctors.concat(doctorResponse?.data?.listDoctors?.items || []);
            nextToken = doctorResponse?.data?.listDoctors?.nextToken;

        } while (nextToken);

        dispatch({
            type: FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_SUCCESS,
            payload: allDoctors,
        });

    } catch (error) {
        console.error("Error fetching doctors by secondary specializations:", error);
        dispatch({
            type: FETCH_DOCTORS_BY_SECONDARY_SPECIALIZATION_FAILURE,
            payload: error.message || "Error fetching doctors",
        });
    }
};
