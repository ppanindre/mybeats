import {
    MEDICAL_MASTERDATA_REQUEST,
    MEDICAL_MASTERDATA_SUCCESS,
    MEDICAL_MASTERDATA_FAIL,
  } from '../types/medicalMasterDataTypes';
  
  import { generateClient } from 'aws-amplify/api';
  import {
    listAllergies,
    listProcedures,
    listImmunizations,
  } from '../../src/graphql/queries';
  
  const client = generateClient();
  
  const fetchAllPages = async (query) => {
    let nextToken = null;
    let allItems = [];
  
    do {
      const res = await client.graphql({
        query,
        variables: { nextToken },
      });
  
      const { items, nextToken: newToken } = res.data[Object.keys(res.data)[0]];
      allItems = [...allItems, ...items];
      nextToken = newToken;
    } while (nextToken);
  
    return allItems;
  };
  
  export const fetchMedicalMasterData = () => async (dispatch) => {
    dispatch({ type: MEDICAL_MASTERDATA_REQUEST });
  
    try {
      const [allergies, procedures, immunizations] = await Promise.all([
        fetchAllPages(listAllergies),
        fetchAllPages(listProcedures),
        fetchAllPages(listImmunizations),
      ]);
  
      const formatItems = (items) => [
        ...items.map((item, index) => ({
          _id: String(index + 1),
          value: item.name,
        })),
        { _id: "other", value: "Other" },
      ];      
  
      dispatch({
        type: MEDICAL_MASTERDATA_SUCCESS,
        payload: {
          allergies: formatItems(allergies),
          procedures: formatItems(procedures),
          immunizations: formatItems(immunizations),
        },
      });
    } catch (error) {
      dispatch({
        type: MEDICAL_MASTERDATA_FAIL,
        payload: error.message || 'Failed to fetch medical master data',
      });
    }
  };
  